import { NextResponse } from "next/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { getCheckoutStatus } from "@/lib/coinbase";
import { fulfillPaidOrder } from "@/lib/fulfillment";

export const runtime = "nodejs";

// Coinbase Business checkout webhook. Rather than reconstruct the Hook0
// signature, we treat the event as a trigger and AUTHORITATIVELY re-confirm the
// checkout's status directly with Coinbase (authenticated GET) before marking
// an order paid — so a spoofed event cannot mark anything paid. Env-gated.
export async function POST(req: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const apiKeyId = process.env.COINBASE_API_KEY_ID;
  const apiSecret = process.env.COINBASE_PRIVATE_KEY;
  if (!supabaseUrl || !serviceKey || !apiKeyId || !apiSecret) {
    return NextResponse.json({ ok: false, error: "Not configured." }, { status: 503 });
  }

  const raw = await req.text();
  let event: { id?: string; eventType?: string };
  try {
    event = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid payload." }, { status: 400 });
  }

  const checkoutId = event.id;
  if (!checkoutId) {
    return NextResponse.json({ ok: true, ignored: "no checkout id" });
  }

  // Authoritatively confirm with Coinbase. Only "COMPLETED" counts as paid.
  const status = await getCheckoutStatus(checkoutId);
  if (status !== "COMPLETED") {
    return NextResponse.json({ ok: true, ignored: true, status });
  }

  const admin = createAdminClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });
  const { data: order } = await admin
    .from("orders")
    .select("id, status")
    .eq("payment_ref", `coinbase:${checkoutId}`)
    .maybeSingle();
  if (!order) {
    return NextResponse.json({ ok: true, unmatched: true });
  }

  if (order.status !== "paid") {
    await admin.from("orders").update({ status: "paid", paid_at: new Date().toISOString() }).eq("id", order.id);
  }

  try {
    await fulfillPaidOrder(order.id, admin);
  } catch {
    // Best-effort; payment is already confirmed + recorded.
  }

  return NextResponse.json({ ok: true });
}
