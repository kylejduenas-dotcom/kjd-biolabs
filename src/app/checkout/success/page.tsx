import { createClient } from "@/lib/supabase/server";
import { reconcileCryptoOrderById } from "@/lib/crypto-confirm";
import { formatPrice } from "@/data/products";
import Link from "next/link";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string; payment?: string }>;
}) {
  const { order: orderId, payment } = await searchParams;

  // Coinbase Business has no webhook — so when a customer returns from a crypto
  // checkout we authoritatively re-confirm the payment with Coinbase here and
  // mark the order paid + fulfill. Idempotent and safe against manual visits.
  let paid = false;
  if (orderId && payment === "crypto") {
    paid = (await reconcileCryptoOrderById(orderId)) === "paid";
  }

  let order: { id: string; order_number: string | null; subtotal: number; shipping_cost: number | null; shipping_method: string | null; created_at: string; ships_by: string | null; delivery_estimate: string | null } | null = null;
  if (orderId) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("orders")
      .select("id, order_number, subtotal, shipping_cost, shipping_method, created_at, ships_by, delivery_estimate")
      .eq("id", orderId)
      .single();
    order = data;
  }

  return (
    <div className="bg-soft-cream min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full bg-white rounded-3xl border border-slate-200/80 shadow-soft-lg p-8 sm:p-10 text-center animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-teal-500 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-display font-extrabold text-ink-950 mb-3">
          {paid ? "Payment confirmed" : "Order placed"}
        </h1>
        <p className="text-slate-500 leading-relaxed mb-6">
          {paid
            ? "Thank you — your payment is confirmed and your order is being prepared. A confirmation email with tracking is on its way."
            : "Thank you for your order. We’ve received it and will email you a confirmation along with secure payment instructions shortly."}
        </p>

        {order && (
          <div className="bg-soft-cream rounded-2xl border border-slate-200/70 p-5 mb-6 text-left">
            <div className="flex justify-between py-1.5">
              <span className="text-slate-500 text-sm">Order number</span>
              <span className="text-ink-950 text-sm font-mono font-medium">
                {order.order_number ?? order.id.slice(0, 8).toUpperCase()}
              </span>
            </div>
            {order.shipping_method && (
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500 text-sm">Shipping</span>
                <span className="text-ink-950 text-sm font-medium">
                  {order.shipping_method} · {Number(order.shipping_cost ?? 0) === 0 ? "Free" : formatPrice(Number(order.shipping_cost))}
                </span>
              </div>
            )}
            {order.ships_by && (
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500 text-sm">Ships by</span>
                <span className="text-ink-950 text-sm font-medium">{order.ships_by}</span>
              </div>
            )}
            {order.delivery_estimate && (
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500 text-sm">Estimated delivery</span>
                <span className="text-ink-950 text-sm font-semibold">{order.delivery_estimate}</span>
              </div>
            )}
            <div className="flex justify-between py-1.5">
              <span className="text-slate-500 text-sm">Total</span>
              <span className="text-ink-950 text-sm font-semibold">
                {formatPrice(Number(order.subtotal) + Number(order.shipping_cost ?? 0))}
              </span>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/account" className="inline-flex items-center justify-center gap-2 bg-ink-950 text-white px-6 py-3 rounded-full font-semibold hover:bg-teal-600 transition-all">
            View my orders
          </Link>
          <Link href="/products" className="inline-flex items-center justify-center gap-2 border border-slate-300 text-ink-950 px-6 py-3 rounded-full font-semibold hover:bg-slate-50 transition-all">
            Keep shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
