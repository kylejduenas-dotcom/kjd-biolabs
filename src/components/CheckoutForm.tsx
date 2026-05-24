"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { createClient } from "@/lib/supabase/client";
import { formatPrice, tintStyles } from "@/data/products";

const SHIPPING = [
  { id: "standard", label: "Standard", eta: "3–5 business days", cost: 9.99 },
  { id: "express", label: "Express", eta: "1–2 business days", cost: 24.99 },
  { id: "overnight", label: "Overnight", eta: "Next business day", cost: 44.99 },
];

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

  const shippingCost = SHIPPING[ship].cost;
  const total = subtotal + shippingCost;

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const placeOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }
    setLoading(true);
    setError(null);
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
      })
      .select("id")
      .single();

    if (orderErr || !order) {
      setError("Could not place your order. Please try again.");
      setLoading(false);
      return;
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
      setLoading(false);
      return;
    }

    clear();
    router.push(`/checkout/success?order=${order.id}`);
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
    <form onSubmit={placeOrder} className="grid lg:grid-cols-3 gap-8">
      {/* Shipping */}
      <div className="lg:col-span-2 space-y-6">
        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-red-700 text-sm">{error}</div>
        )}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-7">
          <h2 className="font-display font-bold text-lg text-ink-950 mb-5">Shipping details</h2>
          <div className="space-y-4">
            <div>
              <Label>Full name</Label>
              <input required value={form.name} onChange={set("name")} className="field-input" placeholder="Dr. Jane Doe" />
            </div>
            <div>
              <Label>Street address</Label>
              <input required value={form.address} onChange={set("address")} className="field-input" placeholder="123 Research Park Dr, Suite 400" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>City</Label>
                <input required value={form.city} onChange={set("city")} className="field-input" placeholder="Boston" />
              </div>
              <div>
                <Label>State / Province</Label>
                <input required value={form.state} onChange={set("state")} className="field-input" placeholder="MA" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>ZIP / Postal code</Label>
                <input required value={form.zip} onChange={set("zip")} className="field-input" placeholder="02115" />
              </div>
              <div>
                <Label>Country</Label>
                <input required value={form.country} onChange={set("country")} className="field-input" />
              </div>
            </div>
            <div>
              <Label>Order notes (optional)</Label>
              <textarea value={form.notes} onChange={set("notes")} rows={3} className="field-input resize-none" placeholder="Anything we should know about this order" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-7">
          <h2 className="font-display font-bold text-lg text-ink-950 mb-1">Shipping speed</h2>
          <p className="text-slate-500 text-sm mb-5">Choose how fast you need it.</p>
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
                  </span>
                </span>
                <span className="text-ink-950 font-semibold text-sm">{formatPrice(s.cost)}</span>
              </button>
            ))}
          </div>
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
              <span className="text-ink-950 font-medium">{formatPrice(shippingCost)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-slate-100">
              <span className="text-ink-950 font-semibold">Total</span>
              <span className="text-ink-950 font-display font-bold text-lg">{formatPrice(total)}</span>
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-ink-950 text-white py-3.5 rounded-full font-semibold hover:bg-teal-600 transition-all disabled:opacity-50 inline-flex items-center justify-center gap-2">
            {loading && <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
            {loading ? "Placing order…" : "Place Order"}
          </button>
          <p className="text-slate-400 text-xs text-center mt-4 leading-relaxed">
            We&apos;ll confirm your order and send secure payment instructions by email. Research use only.
          </p>
        </div>
      </div>
    </form>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-ink-950 text-sm font-medium mb-1.5">{children}</label>;
}
