import { NextResponse } from "next/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { sendEmail, type LineItem } from "@/lib/fulfillment";
import { winbackHtml } from "@/lib/retention-emails";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Reorder / win-back. Research supplies get used up, so nudge past customers
// whose most-recent paid order is aging (45–75 days) to restock. Sends once per
// order, and only if the customer hasn't already placed a newer paid order.
//
// Scheduled daily via vercel.json. Protected by CRON_SECRET.
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

  const newerThan = new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString(); // 75d
  const olderThan = new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(); // 45d
  const { data: orders, error } = await admin
    .from("orders")
    .select("id, order_number, email, shipping_name, user_id, paid_at")
    .eq("status", "paid")
    .not("email", "is", null)
    .is("winback_emailed_at", null)
    .gt("paid_at", newerThan)
    .lt("paid_at", olderThan)
    .limit(100);

  if (error) {
    return NextResponse.json({ ok: false, error: "Query failed." }, { status: 500 });
  }

  let checked = 0;
  let emailed = 0;
  let alreadyReordered = 0;

  for (const o of orders ?? []) {
    checked++;

    // Skip (and stop re-checking) if the customer already placed a newer paid order.
    if (o.user_id) {
      const { data: newer } = await admin
        .from("orders")
        .select("id")
        .eq("user_id", o.user_id)
        .eq("status", "paid")
        .gt("paid_at", o.paid_at)
        .limit(1);
      if (newer && newer.length > 0) {
        await admin.from("orders").update({ winback_emailed_at: new Date().toISOString() }).eq("id", o.id);
        alreadyReordered++;
        continue;
      }
    }

    const { data: itemRows } = await admin
      .from("order_items")
      .select("product_name, unit_price, quantity")
      .eq("order_id", o.id);
    const items = (itemRows as LineItem[]) ?? [];
    const firstName = o.shipping_name ? String(o.shipping_name).split(" ")[0] : null;

    const sent = await sendEmail(
      o.email,
      "Time to restock your research supplies?",
      winbackHtml(items, firstName),
    );
    await admin.from("orders").update({ winback_emailed_at: new Date().toISOString() }).eq("id", o.id);
    if (sent) emailed++;
  }

  return NextResponse.json({ ok: true, checked, emailed, alreadyReordered });
}
