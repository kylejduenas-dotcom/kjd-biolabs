"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { createClient } from "@/lib/supabase/client";
import { formatPrice, tintStyles } from "@/data/products";
import NmiCardFields, { type NmiHandle } from "@/components/NmiCardFields";

const FREE_SHIPPING_THRESHOLD = 150;
const HANDLING_MIN_DAYS = 1; // business days to dispatch (ships by)
const HANDLING_MAX_DAYS = 2;
const NMI_ENABLED = !!process.env.NEXT_PUBLIC_NMI_TOKENIZATION_KEY;
const CRYPTO_ENABLED = !!process.env.NEXT_PUBLIC_CRYPTO_CHECKOUT;

const SHIPPING = [
  { id: "standard", label: "Standard", eta: "3–5 business days", cost: 4.99, transitMin: 3, transitMax: 5 },
  { id: "express", label: "Express", eta: "1–2 business days", cost: 19.99, transitMin: 1, transitMax: 2 },
  { id: "overnight", label: "Overnight", eta: "Next business day", cost: 39.99, transitMin: 1, transitMax: 1 },
];

// US shipping holidays (carriers pause) — observed dates, 2026–2027.
const SHIPPING_HOLIDAYS = new Set([
  "2026-01-01", "2026-05-25", "2026-07-03", "2026-09-07", "2026-11-26", "2026-12-25",
  "2027-01-01", "2027-05-31", "2027-07-05", "2027-09-06", "2027-11-25", "2027-12-24",
]);

function ymd(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// Advance a date by N business days (skips weekends + shipping holidays).
function addBusinessDays(start: Date, days: number) {
  const d = new Date(start);
  let added = 0;
  while (added < days) {
    d.setDate(d.getDate() + 1);
    const dow = d.getDay();
    if (dow !== 0 && dow !== 6 && !SHIPPING_HOLIDAYS.has(ymd(d))) added++;
  }
  return d;
}

function fmtDate(d: Date) {
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

function fmtRange(a: Date, b: Date) {
  return a.toDateString() === b.toDateString() ? fmtDate(a) : `${fmtDate(a)} – ${fmtDate(b)}`;
}

// Ships-by window (handling) + method transit → delivery window.
function estimateFor(method: (typeof SHIPPING)[number], today: Date) {
  const shipFrom = addBusinessDays(today, HANDLING_MIN_DAYS);
  const shipTo = addBusinessDays(today, HANDLING_MAX_DAYS);
  const deliverFrom = addBusinessDays(shipFrom, method.transitMin);
  const deliverTo = addBusinessDays(shipTo, method.transitMax);
  return { shipsBy: fmtRange(shipFrom, shipTo), delivery: fmtRange(deliverFrom, deliverTo) };
}

const CONTINUE_BTN =
  "w-full bg-ink-950 text-white py-3 rounded-full font-semibold hover:bg-teal-600 transition-all";

export default function CheckoutForm({
  userId,
  email,
  defaultName,
}: {
  userId: string;
  email: string;
  defaultName: string;
}) {
  const router = useRouter();
  const { items, subtotal, clear, hydrated } = useCart();
  const [form, setForm] = useState({
    name: defaultName || "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
    notes: "",
  });
  const [ship, setShip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [agree, setAgree] = useState({ research: false, powder: false });
  const confirmed = agree.research && agree.powder;
  const [today, setToday] = useState<Date | null>(null);
  useEffect(() => setToday(new Date()), []);
  const estimates = today ? SHIPPING.map((m) => estimateFor(m, today)) : null;
  const nmiRef = useRef<NmiHandle>(null);

  const [step, setStep] = useState(1);
  const defaultPayMethod: "card" | "crypto" | "manual" = NMI_ENABLED ? "card" : CRYPTO_ENABLED ? "crypto" : "manual";
  const [payMethod, setPayMethod] = useState<"card" | "crypto" | "manual">(defaultPayMethod);
  const bothMethods = NMI_ENABLED && CRYPTO_ENABLED;

  const qualifiesFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = ship === 0 && qualifiesFreeShipping ? 0 : SHIPPING[ship].cost;
  const total = subtotal + shippingCost;

  const payMethodLabel =
    payMethod === "card" ? "Credit / debit card" : payMethod === "crypto" ? "Crypto (Coinbase)" : "Payment instructions by email";
  const finalLabel = payMethod === "crypto" ? "Pay with crypto" : "Place order";

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const handleApproved = (orderId: string) => {
    clear();
    router.push(`/checkout/success?order=${orderId}`);
  };
  const handlePaymentError = (msg: string) => {
    setError(msg || "Payment could not be completed. Please try again.");
    setLoading(false);
  };

  // Creates the pending order + items. Returns the new order id, or null on failure (error already set).
  const createPendingOrder = async (): Promise<string | null> => {
    const est = estimateFor(SHIPPING[ship], new Date());
    const supabase = createClient();
    const { data: order, error: orderErr } = await supabase
      .from("orders")
      .insert({
        user_id: userId,
        email,
        subtotal,
        shipping_method: SHIPPING[ship].label,
        shipping_cost: shippingCost,
        status: "pending",
        shipping_name: form.name,
        shipping_address: form.address,
        shipping_city: form.city,
        shipping_state: form.state,
        shipping_zip: form.zip,
        shipping_country: form.country,
        notes: form.notes,
        terms_accepted_at: new Date().toISOString(),
        ships_by: est.shipsBy,
        delivery_estimate: est.delivery,
      })
      .select("id")
      .single();

    if (orderErr || !order) {
      setError("Could not place your order. Please try again.");
      return null;
    }

    const payload = items.map((i) => ({
      order_id: order.id,
      product_slug: i.slug,
      product_name: i.name,
      unit_price: i.price,
      quantity: i.quantity,
    }));
    const { error: itemsErr } = await supabase.from("order_items").insert(payload);
    if (itemsErr) {
      setError("Your order was created but items could not be saved. Please contact support.");
      return null;
    }
    return order.id;
  };

  const continueFromShipping = () => {
    if (!form.name || !form.address || !form.city || !form.state || !form.zip) {
      setError("Please fill in your name and full shipping address.");
      return;
    }
    setError(null);
    setStep(2);
  };

  const submitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }
    if (!confirmed) {
      setError("Please confirm both statements above to place your order.");
      return;
    }
    setLoading(true);
    setError(null);
    const orderId = await createPendingOrder();
    if (!orderId) {
      setLoading(false);
      return;
    }

    if (payMethod === "crypto") {
      try {
        const res = await fetch("/api/checkout/crypto", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId }),
        });
        const data = await res.json();
        if (res.ok && data.ok && data.url) {
          clear();
          window.location.href = data.url; // Coinbase hosted checkout
          return;
        }
        setError(data.error || "Could not start crypto checkout. Please try again.");
        setLoading(false);
      } catch {
        setError("Could not reach the crypto payment provider. Please try again.");
        setLoading(false);
      }
      return;
    }

    if (payMethod === "card" && NMI_ENABLED) {
      nmiRef.current?.startPayment(orderId); // result handled in callbacks
      return;
    }

    clear();
    router.push(`/checkout/success?order=${orderId}`);
  };

  if (hydrated && items.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-500 text-lg mb-6">Your cart is empty — nothing to check out.</p>
        <Link href="/products" className="inline-flex items-center gap-2 bg-ink-950 text-white px-7 py-3.5 rounded-full font-semibold hover:bg-teal-600 transition-all">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={submitOrder} onKeyDown={(e) => { if (e.key === "Enter" && step < 4) e.preventDefault(); }} className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-5">
        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-red-700 text-sm">{error}</div>
        )}

        {/* Step 1 — Shipping details */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-7">
          <StepHeader n={1} title="Shipping details" active={step === 1} done={step > 1} onEdit={() => setStep(1)} />
          {step === 1 && (
            <div className="mt-5 space-y-4">
              <div>
                <Label>Full name</Label>
                <input value={form.name} onChange={set("name")} className="field-input" placeholder="Dr. Jane Doe" />
              </div>
              <div>
                <Label>Street address</Label>
                <input value={form.address} onChange={set("address")} className="field-input" placeholder="123 Research Park Dr, Suite 400" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>City</Label>
                  <input value={form.city} onChange={set("city")} className="field-input" placeholder="Boston" />
                </div>
                <div>
                  <Label>State / Province</Label>
                  <input value={form.state} onChange={set("state")} className="field-input" placeholder="MA" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>ZIP / Postal code</Label>
                  <input value={form.zip} onChange={set("zip")} className="field-input" placeholder="02115" />
                </div>
                <div>
                  <Label>Country</Label>
                  <input value={form.country} onChange={set("country")} className="field-input" />
                </div>
              </div>
              <div>
                <Label>Order notes (optional)</Label>
                <textarea value={form.notes} onChange={set("notes")} rows={2} className="field-input resize-none" placeholder="Anything we should know about this order" />
              </div>
              <button type="button" onClick={continueFromShipping} className={CONTINUE_BTN}>Continue to delivery</button>
            </div>
          )}
          {step > 1 && (
            <p className="mt-2 text-sm text-slate-500">{form.name} · {form.address}, {form.city}, {form.state} {form.zip}</p>
          )}
        </div>

        {/* Step 2 — Delivery speed */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-7">
          <StepHeader n={2} title="Delivery speed" active={step === 2} done={step > 2} onEdit={() => setStep(2)} />
          {step === 2 && (
            <div className="mt-5">
              {qualifiesFreeShipping ? (
                <div className="flex items-center gap-2 rounded-xl bg-teal-50 border border-teal-200/70 px-4 py-2.5 mb-4 text-teal-800 text-sm">
                  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  <span>Your order qualifies for <strong>free standard shipping</strong>.</span>
                </div>
              ) : (
                <div className="rounded-xl bg-soft-cream border border-slate-200/70 px-4 py-2.5 mb-4 text-slate-600 text-sm">
                  Add <strong className="text-ink-950">{formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)}</strong> more to unlock <strong className="text-ink-950">free standard shipping</strong>.
                </div>
              )}
              <div className="space-y-3">
                {SHIPPING.map((s, i) => (
                  <button
                    type="button"
                    key={s.id}
                    onClick={() => setShip(i)}
                    className={`w-full flex items-center justify-between gap-3 p-4 rounded-2xl border text-left transition-all ${
                      i === ship ? "border-teal-500 bg-teal-50/60 ring-1 ring-teal-500/30" : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${i === ship ? "border-teal-600" : "border-slate-300"}`}>
                        {i === ship && <span className="w-2 h-2 rounded-full bg-teal-600" />}
                      </span>
                      <span>
                        <span className="block text-ink-950 font-semibold text-sm">{s.label}</span>
                        <span className="block text-slate-400 text-xs">{s.eta}</span>
                        {estimates && <span className="block text-teal-700 text-xs mt-0.5">Arrives {estimates[i].delivery}</span>}
                      </span>
                    </span>
                    <span className="text-sm font-semibold">
                      {i === 0 && qualifiesFreeShipping ? (
                        <span className="inline-flex items-center gap-1.5">
                          <span className="text-slate-400 line-through font-normal">{formatPrice(s.cost)}</span>
                          <span className="text-teal-600">FREE</span>
                        </span>
                      ) : (
                        <span className="text-ink-950">{formatPrice(s.cost)}</span>
                      )}
                    </span>
                  </button>
                ))}
              </div>
              <button type="button" onClick={() => setStep(3)} className={`${CONTINUE_BTN} mt-5`}>Continue to payment</button>
            </div>
          )}
          {step > 2 && (
            <p className="mt-2 text-sm text-slate-500">
              {SHIPPING[ship].label} · {shippingCost === 0 ? "Free" : formatPrice(shippingCost)}
              {estimates ? ` · arrives ${estimates[ship].delivery}` : ""}
            </p>
          )}
        </div>

        {/* Step 3 — Payment */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-7">
          <StepHeader n={3} title="Payment" active={step === 3} done={step > 3} onEdit={() => setStep(3)} />
          {step === 3 && (
            <div className="mt-5 space-y-4">
              {bothMethods && (
                <div className="grid grid-cols-2 gap-3">
                  <PayTile selected={payMethod === "card"} onClick={() => setPayMethod("card")} label="Card" sub="Visa · MC · Amex" />
                  <PayTile selected={payMethod === "crypto"} onClick={() => setPayMethod("crypto")} label="Crypto" sub="USDC · BTC · ETH" />
                </div>
              )}
              {payMethod === "crypto" && CRYPTO_ENABLED && (
                <p className="text-slate-500 text-sm leading-relaxed">You&apos;ll be securely redirected to Coinbase to complete payment in crypto. Your order is confirmed once the payment settles on-chain.</p>
              )}
              {payMethod === "manual" && (
                <p className="text-slate-500 text-sm leading-relaxed">After you place your order, we&apos;ll email you secure payment instructions to complete your purchase.</p>
              )}
              <button type="button" onClick={() => setStep(4)} className={CONTINUE_BTN}>Continue to review</button>
            </div>
          )}
          {step > 3 && <p className="mt-2 text-sm text-slate-500">{payMethodLabel}</p>}

          {/* Card fields stay mounted across steps 3→4 so tokenization works on submit. */}
          {NMI_ENABLED && payMethod === "card" && (
            <div className={step === 3 ? "mt-4 pt-4 border-t border-slate-100" : "hidden"}>
              <p className="text-slate-500 text-xs mb-3 inline-flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0-1.105.895-2 2-2s2 .895 2 2m-8 0V7a4 4 0 118 0m-9 4h10a2 2 0 012 2v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6a2 2 0 012-2z" /></svg>
                Secured by NMI · 256-bit SSL
              </p>
              <NmiCardFields ref={nmiRef} onApproved={handleApproved} onError={handlePaymentError} />
            </div>
          )}
        </div>

        {/* Step 4 — Review & confirm */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-7">
          <StepHeader n={4} title="Review &amp; confirm" active={step === 4} done={false} onEdit={() => {}} />
          {step === 4 && (
            <div className="mt-5">
              <div className="space-y-3">
                <label className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${agree.research ? "border-teal-500/50 bg-teal-50/50" : "border-slate-200 hover:border-slate-300"}`}>
                  <input
                    type="checkbox"
                    checked={agree.research}
                    onChange={(e) => setAgree({ ...agree, research: e.target.checked })}
                    className="mt-0.5 w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500/25 shrink-0"
                  />
                  <span className="text-slate-600 text-sm leading-relaxed">
                    I certify that I am at least <strong className="text-ink-950">21 years old</strong> and am acquiring these materials strictly for{" "}
                    <strong className="text-ink-950">laboratory research</strong>. They are <strong className="text-ink-950">not for human or animal consumption</strong>{" "}
                    and not for clinical, therapeutic, or diagnostic use. I take full responsibility for lawful, safe handling and release KJD BioLabs from any liability arising from misuse.
                  </span>
                </label>
                <label className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${agree.powder ? "border-teal-500/50 bg-teal-50/50" : "border-slate-200 hover:border-slate-300"}`}>
                  <input
                    type="checkbox"
                    checked={agree.powder}
                    onChange={(e) => setAgree({ ...agree, powder: e.target.checked })}
                    className="mt-0.5 w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500/25 shrink-0"
                  />
                  <span className="text-slate-600 text-sm leading-relaxed">
                    I understand each product ships as a <strong className="text-ink-950">lyophilized (freeze-dried) powder</strong> to preserve stability and sterility in transit, and that{" "}
                    <strong className="text-ink-950">KJD BioLabs does not provide or endorse any dosing, usage, or administration guidance</strong> for any product sold.
                  </span>
                </label>
              </div>
              <p className="text-slate-400 text-xs mt-4 leading-relaxed">
                By placing this order you confirm you have read and accept our{" "}
                <Link href="/terms" className="text-teal-600 hover:underline">Terms</Link>,{" "}
                <Link href="/refund" className="text-teal-600 hover:underline">Refund Policy</Link>, and{" "}
                <Link href="/disclaimer" className="text-teal-600 hover:underline">research-use disclaimer</Link>.
              </p>
              <button type="submit" disabled={loading || !confirmed} className="mt-5 w-full bg-ink-950 text-white py-3.5 rounded-full font-semibold hover:bg-teal-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2">
                {loading && <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
                {loading ? "Processing…" : finalLabel}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      <div>
        <div className="bg-soft-cream rounded-3xl border border-slate-200/70 p-6 sticky top-24">
          <h2 className="font-display font-bold text-lg text-ink-950 mb-5">Your order</h2>
          <div className="space-y-3 mb-5 max-h-72 overflow-y-auto">
            {items.map((i) => (
              <div key={i.slug} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl shrink-0 flex items-center justify-center relative" style={{ background: tintStyles[i.tint].bg }}>
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-ink-950 text-white text-[10px] font-bold flex items-center justify-center">{i.quantity}</span>
                  <svg className="w-5 h-5 text-ink-950/30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-ink-950 text-sm font-medium truncate">{i.name}</p>
                  <p className="text-slate-400 text-xs">Qty {i.quantity}</p>
                </div>
                <span className="text-ink-950 text-sm font-medium">{formatPrice(i.price * i.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-200 pt-4 space-y-2 mb-5">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Subtotal</span>
              <span className="text-ink-950 font-medium">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Shipping ({SHIPPING[ship].label})</span>
              <span className="font-medium">
                {shippingCost === 0 ? <span className="text-teal-600 font-semibold">Free</span> : <span className="text-ink-950">{formatPrice(shippingCost)}</span>}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Shipment protection</span>
              <span className="text-teal-600 font-semibold">Free</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-slate-100">
              <span className="text-ink-950 font-semibold">Total</span>
              <span className="text-ink-950 font-display font-bold text-lg">{formatPrice(total)}</span>
            </div>
          </div>
          {estimates && (
            <div className="rounded-2xl border border-slate-200/70 bg-white p-4">
              <div className="flex items-start gap-2.5">
                <svg className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <div className="flex-1 text-xs leading-relaxed">
                  <div className="flex justify-between gap-3">
                    <span className="text-slate-500">Ships by</span>
                    <span className="text-ink-950 font-medium text-right">{estimates[ship].shipsBy}</span>
                  </div>
                  <div className="flex justify-between gap-3 mt-1">
                    <span className="text-slate-500">Estimated delivery</span>
                    <span className="text-ink-950 font-semibold text-right">{estimates[ship].delivery}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <p className="text-slate-400 text-xs text-center mt-4 leading-relaxed">Research use only.</p>
        </div>
      </div>
    </form>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-ink-950 text-sm font-medium mb-1.5">{children}</label>;
}

function StepHeader({ n, title, active, done, onEdit }: { n: number; title: string; active: boolean; done: boolean; onEdit: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${active || done ? "bg-ink-950 text-white" : "bg-slate-100 text-slate-400"}`}>
          {done ? (
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
          ) : (
            n
          )}
        </span>
        <h2 className={`font-display font-bold text-lg ${active || done ? "text-ink-950" : "text-slate-400"}`}>{title}</h2>
      </div>
      {done && (
        <button type="button" onClick={onEdit} className="text-teal-600 text-sm font-medium hover:underline">Edit</button>
      )}
    </div>
  );
}

function PayTile({ selected, onClick, label, sub }: { selected: boolean; onClick: () => void; label: string; sub: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-4 rounded-2xl border text-left transition-all ${selected ? "border-teal-500 bg-teal-50/60 ring-1 ring-teal-500/30" : "border-slate-200 hover:border-slate-300"}`}
    >
      <span className="block text-ink-950 font-semibold text-sm">{label}</span>
      <span className="block text-slate-400 text-xs mt-0.5">{sub}</span>
    </button>
  );
}
