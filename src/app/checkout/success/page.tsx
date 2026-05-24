import { createClient } from "@/lib/supabase/server";
import { formatPrice } from "@/data/products";
import Link from "next/link";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order: orderId } = await searchParams;

  let order: { id: string; order_number: string | null; subtotal: number; created_at: string } | null = null;
  if (orderId) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("orders")
      .select("id, order_number, subtotal, created_at")
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
          Order placed
        </h1>
        <p className="text-slate-500 leading-relaxed mb-6">
          Thank you for your order. We&apos;ve received it and will email you a
          confirmation along with secure payment instructions shortly.
        </p>

        {order && (
          <div className="bg-soft-cream rounded-2xl border border-slate-200/70 p-5 mb-6 text-left">
            <div className="flex justify-between py-1.5">
              <span className="text-slate-500 text-sm">Order number</span>
              <span className="text-ink-950 text-sm font-mono font-medium">
                {order.order_number ?? order.id.slice(0, 8).toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-500 text-sm">Total</span>
              <span className="text-ink-950 text-sm font-semibold">
                {formatPrice(Number(order.subtotal))}
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
