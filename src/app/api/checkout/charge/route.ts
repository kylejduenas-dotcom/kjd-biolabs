import { NextResponse } from "next/server";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { fulfillPaidOrder } from "@/lib/fulfillment";
import { priceFor } from "@/data/products";
import { shippingCostFor } from "@/data/shipping";

export const runtime = "nodejs";

const NMI_ENDPOINT = "https://secure.nmi.com/api/transact.php";

// Charges a one-time Collect.js payment_token (card OR Apple/Google Pay wallet)
// against the authenticated user's pending order. The amount is derived
// server-side from the stored order — never trusted from the client.
export async function POST(req: Request) {
  const securityKey = process.env.NMI_SECURITY_KEY;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // Env-gated: stays dormant (and harmless) until NMI + service-role keys exist.
  if (!securityKey || !supabaseUrl || !serviceKey) {
    return NextResponse.json({ ok: false, error: "Payments are not configured yet." }, { status: 503 });
  }

  let body: { orderId?: string; paymentToken?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const { orderId, paymentToken } = body;
  if (!orderId || !paymentToken) {
    return NextResponse.json({ ok: false, error: "Missing payment details." }, { status: 400 });
  }

  // Authenticate the caller.
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ ok: false, error: "Please sign in to complete payment." }, { status: 401 });
  }

  // Privileged client to read the true amount and write the paid status.
  const admin = createAdminClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });
  const { data: order, error: orderErr } = await admin
    .from("orders")
    .select(
      "id, order_number, subtotal, shipping_cost, shipping_method, status, email, shipping_name, shipping_address, shipping_city, shipping_state, shipping_zip, user_id",
    )
    .eq("id", orderId)
    .single();

  if (orderErr || !order) {
    return NextResponse.json({ ok: false, error: "Order not found." }, { status: 404 });
  }
  if (order.user_id !== user.id) {
    return NextResponse.json({ ok: false, error: "Not authorized for this order." }, { status: 403 });
  }
  if (order.status === "paid") {
    return NextResponse.json({ ok: true, alreadyPaid: true });
  }

  // Recompute the amount server-side from authoritative product prices + the
  // shipping table — never trust the client-inserted subtotal/shipping_cost.
  const { data: lineItems } = await admin
    .from("order_items")
    .select("product_slug, quantity")
    .eq("order_id", order.id);
  const realSubtotal = (lineItems ?? []).reduce(
    (sum, it) => sum + priceFor(String(it.product_slug)) * Number(it.quantity),
    0,
  );
  if (realSubtotal <= 0) {
    return NextResponse.json({ ok: false, error: "Could not price this order. Please contact support." }, { status: 400 });
  }
  const amount = (realSubtotal + shippingCostFor(order.shipping_method, realSubtotal)).toFixed(2);
  const nameParts = (order.shipping_name ?? "").trim().split(/\s+/).filter(Boolean);
  const firstName = nameParts.shift() ?? "";
  const lastName = nameParts.join(" ");

  const params = new URLSearchParams({
    security_key: securityKey,
    type: "sale",
    payment_token: paymentToken,
    amount,
    orderid: order.order_number ?? order.id,
    email: order.email ?? "",
    first_name: firstName,
    last_name: lastName,
    address1: order.shipping_address ?? "",
    city: order.shipping_city ?? "",
    state: order.shipping_state ?? "",
    zip: order.shipping_zip ?? "",
  });

  let nmiText: string;
  try {
    const nmiRes = await fetch(NMI_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });
    nmiText = await nmiRes.text();
  } catch {
    return NextResponse.json({ ok: false, error: "Payment gateway unreachable. Please try again." }, { status: 502 });
  }

  // transact.php returns a URL-encoded query string.
  const result = new URLSearchParams(nmiText);
  const approved = result.get("response") === "1"; // 1 approved, 2 declined, 3 error
  const transactionId = result.get("transactionid");
  const responseText = result.get("responsetext") ?? "Payment was not approved.";

  if (approved) {
    await admin
      .from("orders")
      .update({ status: "paid", payment_ref: transactionId, paid_at: new Date().toISOString() })
      .eq("id", order.id);
    try {
      await fulfillPaidOrder(order.id, admin); // confirmation email + shipping label (env-gated, best-effort)
    } catch {
      // Payment already succeeded; fulfillment is best-effort.
    }
    return NextResponse.json({ ok: true, transactionId });
  }

  // Declined / error — leave the order pending so the customer can retry.
  return NextResponse.json({ ok: false, error: responseText }, { status: 402 });
}
