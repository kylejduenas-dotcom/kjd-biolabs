import { NextResponse } from "next/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { reconcileCryptoOrderById } from "@/lib/crypto-confirm";
import { sendEmail, type LineItem } from "@/lib/fulfillment";
import { abandonedCartHtml } from "@/lib/retention-emails";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Cart-abandonment recovery. Orders are created as `pending` at checkout; if the
// customer never completes payment the order sits pending. This job finds those
// (1h–7d old, not yet emailed), re-confirms crypto payment first so it never
// nudges someone who actually paid, then sends a single recovery email.
//
// Scheduled hourly via vercel.json. Protected by CRON_SECRET (Vercel sends it as
// `Authorization: Bearer <CRON_SECRET>` when that env var is set).
export async function GET(req: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && req.headers.get("authorization") !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ ok: false, error: "Not configured." }, { status: 503 });
  }

  const admin = createAdminClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });

  const olderThan = new Date(Date.now() - 60 * 60 * 1000).toISOString(); // 1h
  const newerThan = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(); // 7d
  const { data: orders, error } = await admin
    .from("orders")
    .select("id, order_number, email, shipping_name, status, payment_ref")
    .eq("status", "pending")
    .not("email", "is", null)
    .is("recovery_emailed_at", null)
    .lt("created_at", olderThan)
    .gt("created_at", newerThan)
    .limit(100);

  if (error) {
    return NextResponse.json({ ok: false, error: "Query failed." }, { status: 500 });
  }

  let checked = 0;
  let emailed = 0;
  let paidInstead = 0;

  for (const o of orders ?? []) {
    checked++;
    // If this is a crypto order that actually completed, confirm + fulfill it
    // instead of sending a "you forgot" nudge.
    if (o.payment_ref?.startsWith("coinbase:")) {
      try {
        if ((await reconcileCryptoOrderById(o.id)) === "paid") {
          paidInstead++;
          continue;
        }
      } catch {
        /* fall through to recovery */
      }
    }

    const { data: itemRows } = await admin
      .from("order_items")
      .select("product_name, unit_price, quantity")
      .eq("order_id", o.id);
    const items = (itemRows as LineItem[]) ?? [];
    const orderRef = o.order_number ?? o.id.slice(0, 8).toUpperCase();
    const firstName = o.shipping_name ? String(o.shipping_name).split(" ")[0] : null;

    const sent = await sendEmail(
      o.email,
      "You left items in your cart — finish your KJD BioLabs order",
      abandonedCartHtml(orderRef, items, firstName),
    );
    // Mark as emailed regardless, so a transient send failure doesn't loop daily.
    await admin.from("orders").update({ recovery_emailed_at: new Date().toISOString() }).eq("id", o.id);
    if (sent) emailed++;
  }

  return NextResponse.json({ ok: true, checked, emailed, paidInstead });
}
