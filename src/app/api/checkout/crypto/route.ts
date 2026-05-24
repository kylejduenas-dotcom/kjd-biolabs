import { NextResponse } from "next/server";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import crypto from "node:crypto";

export const runtime = "nodejs";

const COINBASE_HOST = "business.coinbase.com";
const COINBASE_PATH = "/api/v1/checkouts";

function b64url(input: Buffer | string): string {
  return Buffer.from(input).toString("base64url");
}

// Build a Coinbase CDP-style Ed25519 JWT for a Business API call.
// Mirrors KJD Capital's edge function (docs.cdp.coinbase.com authentication).
function buildCoinbaseJwt(apiKeyId: string, apiSecretBase64: string, method: string, host: string, path: string): string {
  const keyBytes = Buffer.from(apiSecretBase64, "base64");
  if (keyBytes.length !== 64) {
    throw new Error(`Coinbase secret key has unexpected length: ${keyBytes.length} bytes (expected 64 for Ed25519)`);
  }
  const seed = keyBytes.subarray(0, 32);
  const publicBytes = keyBytes.subarray(32, 64);

  const privateKey = crypto.createPrivateKey({
    key: {
      kty: "OKP",
      crv: "Ed25519",
      d: seed.toString("base64url"),
      x: publicBytes.toString("base64url"),
    },
    format: "jwk",
  });

  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "EdDSA", typ: "JWT", kid: apiKeyId, nonce: crypto.randomBytes(16).toString("hex") };
  const payload = { iss: "cdp", sub: apiKeyId, nbf: now, exp: now + 120, uri: `${method} ${host}${path}` };
  const signingInput = `${b64url(JSON.stringify(header))}.${b64url(JSON.stringify(payload))}`;
  const signature = crypto.sign(null, Buffer.from(signingInput), privateKey);
  return `${signingInput}.${b64url(signature)}`;
}

// Creates a Coinbase hosted crypto checkout for the authenticated user's pending order.
// Amount is derived server-side from the stored order. Env-gated: dormant until keys exist.
export async function POST(req: Request) {
  const apiKeyId = process.env.COINBASE_API_KEY_ID;
  const apiSecret = process.env.COINBASE_PRIVATE_KEY;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!apiKeyId || !apiSecret || !supabaseUrl || !serviceKey) {
    return NextResponse.json({ ok: false, error: "Crypto payments are not configured yet." }, { status: 503 });
  }

  let body: { orderId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
  const { orderId } = body;
  if (!orderId) {
    return NextResponse.json({ ok: false, error: "Missing order." }, { status: 400 });
  }

  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ ok: false, error: "Please sign in to pay." }, { status: 401 });
  }

  const admin = createAdminClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });
  const { data: order, error: orderErr } = await admin
    .from("orders")
    .select("id, order_number, subtotal, shipping_cost, status, user_id")
    .eq("id", orderId)
    .single();

  if (orderErr || !order) {
    return NextResponse.json({ ok: false, error: "Order not found." }, { status: 404 });
  }
  if (order.user_id !== user.id) {
    return NextResponse.json({ ok: false, error: "Not authorized for this order." }, { status: 403 });
  }
  if (order.status === "paid") {
    return NextResponse.json({ ok: false, error: "This order is already paid." }, { status: 409 });
  }

  const amount = (Number(order.subtotal) + Number(order.shipping_cost ?? 0)).toFixed(2);
  const orderRef = order.order_number ?? order.id;
  const origin = req.headers.get("origin") ?? `https://${req.headers.get("host") ?? "kjd-biolabs.vercel.app"}`;

  let jwt: string;
  try {
    jwt = buildCoinbaseJwt(apiKeyId, apiSecret, "POST", COINBASE_HOST, COINBASE_PATH);
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

  // Record the Coinbase checkout reference (payment stays pending until confirmed).
  if (checkoutId) {
    await admin.from("orders").update({ payment_ref: `coinbase:${checkoutId}` }).eq("id", order.id);
  }

  return NextResponse.json({ ok: true, url });
}
