import { NextResponse } from "next/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { reconcileCryptoOrderById } from "@/lib/crypto-confirm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Safety net for crypto payments. Coinbase Business has no webhook, so the
// primary confirmation happens when the customer returns to /checkout/success.
// If they pay but never come back, this scheduled job catches it: every run it
// finds recent pending crypto orders and authoritatively re-confirms each with
// Coinbase (marking paid + fulfilling only if Coinbase says COMPLETED).
//
// Wired to run every 15 min via vercel.json. Protected by CRON_SECRET: Vercel
// automatically sends `Authorization: Bearer <CRON_SECRET>` on cron invocations
// when that env var is set, so a random visitor can't trigger it.
export async function GET(req: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
    }
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ ok: false, error: "Not configured." }, { status: 503 });
  }

  const admin = createAdminClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });

  // Only look at orders that are still pending, have a Coinbase checkout id, and
  // were created in the last 3 days (long-abandoned ones aren't worth polling).
  const since = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();
  const { data: pending, error } = await admin
    .from("orders")
    .select("id")
    .eq("status", "pending")
    .like("payment_ref", "coinbase:%")
    .gte("created_at", since)
    .limit(100);

  if (error) {
    return NextResponse.json({ ok: false, error: "Query failed." }, { status: 500 });
  }

  let checked = 0;
  let paid = 0;
  for (const o of pending ?? []) {
    checked++;
    try {
      const result = await reconcileCryptoOrderById(o.id);
      if (result === "paid") paid++;
    } catch {
      // best-effort; a single failure shouldn't abort the batch
    }
  }

  return NextResponse.json({ ok: true, checked, paid });
}
