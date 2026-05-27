import { NextResponse } from "next/server";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { buildCoinbaseJwt } from "@/lib/coinbase";
import { priceFor, lineTotal } from "@/data/products";
import { shippingCostFor } from "@/data/shipping";
import { couponDiscount } from "@/data/coupons";

export const runtime = "nodejs";

const COINBASE_HOST = "business.coinbase.com";
const COINBASE_PATH = "/api/v1/checkouts";

// Creates a Coinbase hosted crypto checkout for the authenticated user's pending order.
// Needs ONLY the Coinbase keys to work — the order amount is read under the user's own
// session (RLS), so no service-role key is required for checkout. The service role is
// used opportunistically to record the checkout id for the auto-confirm webhook (a
// later add); if it isn't set, crypto still works, the order just stays pending until
// payment is reconciled. Env-gated: dormant until the Coinbase keys exist.
export async function POST(req: Request) {
  const apiKeyId = process.env.COINBASE_API_KEY_ID;
  const apiSecret = process.env.COINBASE_PRIVATE_KEY;

  if (!apiKeyId || !apiSecret) {
    return NextResponse.json({ ok: false, error: "Crypto payments are not configured yet." }, { status: 503 });
  }

  let body: { orderId?: string; coupon?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
  const { orderId, coupon } = body;
  if (!orderId) {
    return NextResponse.json({ ok: false, error: "Missing order." }, { status: 400 });
  }

  // Read the order under the user's session — RLS guarantees they can only read their own.
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ ok: false, error: "Please sign in to pay." }, { status: 401 });
  }

  const { data: order, error: orderErr } = await supabase
    .from("orders")
    .select("id, order_number, subtotal, shipping_cost, shipping_method, status")
    .eq("id", orderId)
    .single();

  if (orderErr || !order) {
    return NextResponse.json({ ok: false, error: "Order not found." }, { status: 404 });
  }
  if (order.status === "paid") {
    return NextResponse.json({ ok: false, error: "This order is already paid." }, { status: 409 });
  }

  // Recompute the amount server-side from authoritative product prices + the
  // shipping table — never trust the client-inserted subtotal/shipping_cost.
  const { data: lineItems } = await supabase
    .from("order_items")
    .select("product_slug, quantity")
    .eq("order_id", order.id);
  const realSubtotal = (lineItems ?? []).reduce(
    (sum, it) => sum + lineTotal(priceFor(String(it.product_slug)), Number(it.quantity)),
    0,
  );
  if (realSubtotal <= 0) {
    return NextResponse.json({ ok: false, error: "Could not price this order. Please try again." }, { status: 400 });
  }
  const discount = couponDiscount(coupon, realSubtotal);
  const amount = (realSubtotal - discount + shippingCostFor(order.shipping_method, realSubtotal)).toFixed(2);
  const orderRef = order.order_number ?? order.id;
  const origin = req.headers.get("origin") ?? `https://${req.headers.get("host") ?? "kjd-biolabs.vercel.app"}`;

  let jwt: string;
  try {
    jwt = buildCoinbaseJwt(apiKeyId, apiSecret, "POST", COINBASE_PATH);
  } catch {
    return NextResponse.json({ ok: false, error: "Crypto payment configuration error." }, { status: 500 });
  }

  const checkoutBody = {
    amount,
    currency: "USDC",
    description: `KJD BioLabs order ${orderRef}`,
    redirect_url: `${origin}/checkout/success?order=${order.id}&payment=crypto`,
  };

  let res: Response;
  try {
    res = await fetch(`https://${COINBASE_HOST}${COINBASE_PATH}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${jwt}`, "Content-Type": "application/json" },
      body: JSON.stringify(checkoutBody),
    });
  } catch {
    return NextResponse.json({ ok: false, error: "Could not reach the crypto payment provider." }, { status: 502 });
  }

  if (!res.ok) {
    return NextResponse.json({ ok: false, error: "Unable to create crypto checkout. Please try again." }, { status: 502 });
  }

  const data = await res.json();
  const url: string | undefined = data.url || data.checkout_url;
  const checkoutId: string | undefined = data.id;
  if (!url) {
    return NextResponse.json({ ok: false, error: "Crypto checkout unavailable. Please try again." }, { status: 502 });
  }

  // Optionally record the checkout id for the auto-confirm webhook (needs the service role).
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (checkoutId && supabaseUrl && serviceKey) {
    try {
      const admin = createAdminClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });
      // Record the checkout id for confirmation, plus the authoritative coupon +
      // discount so the receipt and emails reconcile with what Coinbase charges.
      await admin
        .from("orders")
        .update({
          payment_ref: `coinbase:${checkoutId}`,
          coupon_code: discount > 0 ? (coupon ?? "").toUpperCase().trim() : null,
          discount,
        })
        .eq("id", order.id);
    } catch {
      // best-effort; not required for the customer to pay
    }
  }

  return NextResponse.json({ ok: true, url });
}
