import { createClient as createAdminClient } from "@supabase/supabase-js";
import { getCheckoutStatus } from "@/lib/coinbase";
import { fulfillPaidOrder } from "@/lib/fulfillment";

/**
 * Authoritatively reconcile a crypto order by its id.
 *
 * Coinbase Business has no webhook UI, so payment is confirmed on the
 * success-redirect instead: we read the order's recorded Coinbase checkout id
 * (`payment_ref = coinbase:<id>`), re-confirm the checkout status directly with
 * Coinbase (authenticated GET), and only then mark the order paid + fulfill.
 * Because the status comes straight from Coinbase, a customer cannot fake a
 * payment by visiting the success URL manually.
 *
 * Safe to call repeatedly (idempotent): if the order is already paid, or the
 * checkout isn't COMPLETED, it does nothing. Requires the service-role key; if
 * that's missing it no-ops so checkout still works (order stays pending).
 */
export async function reconcileCryptoOrderById(orderId: string): Promise<"paid" | "pending" | "skipped"> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) return "skipped";

  const admin = createAdminClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });

  const { data: order } = await admin
    .from("orders")
    .select("id, status, payment_ref")
    .eq("id", orderId)
    .maybeSingle();
  if (!order) return "skipped";
  if (order.status === "paid") return "paid";

  const ref: string | null = order.payment_ref;
  if (!ref || !ref.startsWith("coinbase:")) return "pending";
  const checkoutId = ref.slice("coinbase:".length);

  const status = await getCheckoutStatus(checkoutId);
  if (status !== "COMPLETED") return "pending";

  await admin
    .from("orders")
    .update({ status: "paid", paid_at: new Date().toISOString() })
    .eq("id", order.id);

  try {
    await fulfillPaidOrder(order.id, admin);
  } catch {
    // Best-effort; payment is already confirmed + recorded.
  }
  return "paid";
}
