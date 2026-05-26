"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import {
  type Tint,
  BUNDLE_TIERS,
  lineTotal,
  unitPriceAfterBundle,
  formatPrice,
} from "@/data/products";

export default function AddToCartButton({
  slug,
  name,
  subtitle,
  price,
  tint,
}: {
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  tint: Tint;
}) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  const selectedTotal = lineTotal(price, qty);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-ink-950 font-display font-bold text-sm uppercase tracking-wider">
          Bundle &amp; Save
        </h3>
        <span className="text-slate-400 text-xs">More vials, bigger savings</span>
      </div>

      <div className="space-y-2.5">
        {BUNDLE_TIERS.map((tier) => {
          const total = lineTotal(price, tier.qty);
          const perUnit = unitPriceAfterBundle(price, tier.qty);
          const full = price * tier.qty;
          const selected = qty === tier.qty;
          const badge =
            tier.qty === 1 ? "Most popular" : tier.qty === 5 ? "Best value" : null;
          return (
            <button
              key={tier.qty}
              type="button"
              onClick={() => setQty(tier.qty)}
              className={`w-full flex items-center justify-between gap-3 p-4 rounded-2xl border text-left transition-all ${
                selected
                  ? "border-teal-500 bg-teal-50/60 ring-1 ring-teal-500/30"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <span className="flex items-center gap-3 min-w-0">
                <span
                  className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                    selected ? "border-teal-600" : "border-slate-300"
                  }`}
                >
                  {selected && <span className="w-2 h-2 rounded-full bg-teal-600" />}
                </span>
                <span className="min-w-0">
                  <span className="flex items-center gap-2">
                    <span className="text-ink-950 font-semibold text-sm">
                      {tier.qty} {tier.qty === 1 ? "vial" : "vials"}
                    </span>
                    {badge && (
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${
                          tier.qty === 5
                            ? "bg-teal-600 text-white"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {badge}
                      </span>
                    )}
                  </span>
                  <span className="block text-slate-400 text-xs mt-0.5">
                    {formatPrice(perUnit)} / vial
                  </span>
                </span>
              </span>
              <span className="text-right shrink-0">
                <span className="block text-ink-950 font-bold text-sm">
                  {formatPrice(total)}
                </span>
                {tier.pct > 0 ? (
                  <span className="inline-flex items-center gap-1.5 mt-0.5">
                    <span className="text-slate-400 text-xs line-through">
                      {formatPrice(full)}
                    </span>
                    <span className="text-teal-700 text-[11px] font-semibold">
                      Save {tier.pct}%
                    </span>
                  </span>
                ) : (
                  <span className="block text-slate-400 text-xs mt-0.5">&nbsp;</span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      <button
        onClick={() => add({ slug, name, subtitle, price, tint }, qty)}
        className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-ink-950 text-white py-3.5 rounded-full font-semibold hover:bg-teal-600 hover:shadow-lg hover:shadow-ink-950/20 transition-all"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        Add {qty} {qty === 1 ? "vial" : "vials"} &middot; {formatPrice(selectedTotal)}
      </button>
    </div>
  );
}
