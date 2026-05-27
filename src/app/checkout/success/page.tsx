import { createClient } from "@/lib/supabase/server";
import { reconcileCryptoOrderById } from "@/lib/crypto-confirm";
import { formatPrice } from "@/data/products";
import Link from "next/link";

interface OrderItem {
  product_name: string;
  unit_price: number;
  quantity: number;
}
interface Order {
  id: string;
  order_number: string | null;
  email: string | null;
  subtotal: number;
  shipping_cost: number | null;
  shipping_method: string | null;
  ships_by: string | null;
  delivery_estimate: string | null;
  discount: number | null;
  coupon_code: string | null;
  order_items: OrderItem[];
}

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

  let order: Order | null = null;
  if (orderId) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("orders")
      .select(
        "id, order_number, email, subtotal, shipping_cost, shipping_method, ships_by, delivery_estimate, discount, coupon_code, order_items(product_name, unit_price, quantity)",
      )
      .eq("id", orderId)
      .single();
    order = (data as Order) ?? null;
  }

  const items = order?.order_items ?? [];
  const listSubtotal = items.reduce((s, i) => s + Number(i.unit_price) * Number(i.quantity), 0);
  const subtotal = Number(order?.subtotal ?? 0);
  const bundleSavings = Math.round((listSubtotal - subtotal) * 100) / 100;
  const discount = Number(order?.discount ?? 0);
  const shipping = Number(order?.shipping_cost ?? 0);
  const total = subtotal - discount + shipping;
  const orderRef = order?.order_number ?? order?.id.slice(0, 8).toUpperCase() ?? "";

  return (
    <div className="bg-soft-cream min-h-[calc(100vh-4rem)] px-4 py-14 sm:py-20">
      <div className="max-w-xl mx-auto">
        {/* Status header */}
        <div className="text-center animate-fade-in">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <span className="absolute inset-0 rounded-full bg-teal-400/25 animate-ping-once" aria-hidden />
            <span className="relative w-16 h-16 rounded-full bg-teal-500 flex items-center justify-center shadow-lg shadow-teal-500/30">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </span>
          </div>
          <p className="text-teal-700 font-semibold text-xs uppercase tracking-[0.18em] mb-3">
            {paid ? "Payment confirmed" : "Order received"}
          </p>
          <h1 className="text-3xl sm:text-[2.4rem] font-display font-extrabold text-ink-950 tracking-[-0.02em] leading-tight mb-3">
            {paid ? "You're all set." : "Thank you for your order."}
          </h1>
          <p className="text-slate-500 text-[15px] leading-relaxed max-w-md mx-auto">
            {paid
              ? "Your payment cleared and we're preparing your order for dispatch."
              : "We've received your order. We'll email a confirmation with secure payment instructions shortly."}
            {order?.email ? (
              <>
                {" "}A receipt is on its way to{" "}
                <span className="text-ink-950 font-medium">{order.email}</span>.
              </>
            ) : null}
          </p>
        </div>

        {order && (
          <div className="mt-9 bg-white rounded-3xl border border-slate-200/80 shadow-soft-lg overflow-hidden animate-fade-in">
            {/* Order number bar */}
            <div className="flex items-center justify-between gap-4 px-6 sm:px-7 py-4 bg-ink-950">
              <span className="text-white/60 text-xs uppercase tracking-[0.16em] font-semibold">Order</span>
              <span className="text-white font-mono font-medium text-sm">{orderRef}</span>
            </div>

            <div className="p-6 sm:p-7">
              {/* Line items */}
              {items.length > 0 && (
                <ul className="space-y-3 mb-5">
                  {items.map((i, idx) => (
                    <li key={idx} className="flex items-baseline justify-between gap-4">
                      <span className="text-ink-950 text-sm">
                        {i.product_name}
                        <span className="text-slate-400"> &times; {i.quantity}</span>
                      </span>
                      <span className="text-ink-950 text-sm font-medium whitespace-nowrap">
                        {formatPrice(Number(i.unit_price) * Number(i.quantity))}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Totals */}
              <div className="border-t border-slate-100 pt-4 space-y-2">
                <SummaryRow label="Subtotal" value={formatPrice(items.length > 0 ? listSubtotal : subtotal)} />
                {bundleSavings > 0 && (
                  <SummaryRow label="Bundle savings" value={`−${formatPrice(bundleSavings)}`} accent />
                )}
                {discount > 0 && (
                  <SummaryRow
                    label={order.coupon_code ? `Promo (${order.coupon_code})` : "Promo"}
                    value={`−${formatPrice(discount)}`}
                    accent
                  />
                )}
                <SummaryRow
                  label={order.shipping_method ? `Shipping · ${order.shipping_method}` : "Shipping"}
                  value={shipping > 0 ? formatPrice(shipping) : "Free"}
                  accent={shipping === 0}
                />
                <div className="flex items-baseline justify-between gap-4 pt-3 mt-1 border-t border-slate-100">
                  <span className="text-ink-950 font-semibold">{paid ? "Total paid" : "Total"}</span>
                  <span className="text-ink-950 font-display font-bold text-xl">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Delivery */}
              {(order.ships_by || order.delivery_estimate) && (
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {order.ships_by && <DeliveryStat label="Ships by" value={order.ships_by} />}
                  {order.delivery_estimate && <DeliveryStat label="Est. delivery" value={order.delivery_estimate} highlight />}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Next steps */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center animate-fade-in">
          <Link
            href="/account"
            className="inline-flex items-center justify-center gap-2 bg-ink-950 text-white px-6 py-3.5 rounded-full font-semibold text-[15px] hover:bg-teal-600 transition-all"
          >
            Track this order
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 border border-slate-300 text-ink-950 px-6 py-3.5 rounded-full font-semibold text-[15px] hover:bg-white transition-all"
          >
            Keep shopping
          </Link>
        </div>

        <p className="text-slate-400 text-xs text-center mt-7 leading-relaxed max-w-sm mx-auto">
          A Certificate of Analysis is available for every batch. Reply to your confirmation email to request one. For laboratory research use only.
        </p>
      </div>
    </div>
  );
}

function SummaryRow({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 text-sm">
      <span className="text-slate-500">{label}</span>
      <span className={`font-medium whitespace-nowrap ${accent ? "text-teal-700" : "text-ink-950"}`}>{value}</span>
    </div>
  );
}

function DeliveryStat({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl border p-4 ${highlight ? "border-teal-200 bg-teal-50/60" : "border-slate-200/70 bg-soft-cream"}`}>
      <p className="text-slate-500 text-[11px] uppercase tracking-[0.12em] font-semibold mb-1">{label}</p>
      <p className={`text-sm font-semibold ${highlight ? "text-teal-800" : "text-ink-950"}`}>{value}</p>
    </div>
  );
}
