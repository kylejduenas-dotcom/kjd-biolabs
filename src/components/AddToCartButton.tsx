"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import {
  type Tint,
  BUNDLE_TIERS,
  lineTotal,
  lineSavings,
  formatPrice,
  imageTransparentFor,
} from "@/data/products";
import Vial from "@/components/Vial";

const TIER_LABELS: Record<number, string> = { 1: "Single", 2: "Stock up", 3: "Best value" };

function VialStack({
  count,
  photo,
  name,
  tint,
}: {
  count: number;
  photo: string | null;
  name: string;
  tint: Tint;
}) {
  const n = Math.min(Math.max(count, 1), 3);
  return (
    <span className="flex items-end justify-center">
      {Array.from({ length: n }).map((_, i) => (
        <span key={i} className={i > 0 ? "-ml-3" : ""} style={{ zIndex: i }}>
          {photo ? (
            <Image
              src={photo}
              alt=""
              width={28}
              height={35}
              sizes="32px"
              className="h-8 w-auto object-contain"
            />
          ) : (
            <span className="block scale-[0.25] origin-bottom">
              <Vial name={name} tint={tint} size="sm" />
            </span>
          )}
        </span>
      ))}
    </span>
  );
}

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
  const photo = imageTransparentFor(slug);
  const maxQty = BUNDLE_TIERS[BUNDLE_TIERS.length - 1].qty;
  const selectedTotal = lineTotal(price, qty);

  return (
    <div>
      <div className="space-y-2">
        {BUNDLE_TIERS.map((tier) => {
          const total = lineTotal(price, tier.qty);
          const full = price * tier.qty;
          const save = lineSavings(price, tier.qty);
          const selected = qty === tier.qty;
          const label = TIER_LABELS[tier.qty] ?? `${tier.qty}-pack`;
          const popular = tier.qty === maxQty;
          return (
            <button
              key={tier.qty}
              type="button"
              onClick={() => setQty(tier.qty)}
              className={`relative w-full flex items-center gap-3 rounded-xl border bg-white px-3 py-2.5 text-left transition-all ${
                selected
                  ? "border-ink-950 ring-2 ring-ink-950/10"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              {tier.pct > 0 && !popular && (
                <span className="absolute -top-2.5 left-4 z-10 inline-flex items-center rounded-full bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wide px-2.5 py-0.5 shadow-sm">
                  Save {tier.pct}%
                </span>
              )}
              {popular && (
                <span className="absolute -top-2.5 left-4 z-10 inline-flex items-center gap-1 rounded-full bg-ink-950 text-white text-[10px] font-bold uppercase tracking-wide px-2.5 py-0.5 shadow-sm">
                  <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.07 3.3a1 1 0 00.95.68h3.46c.97 0 1.37 1.24.59 1.81l-2.8 2.04a1 1 0 00-.36 1.11l1.06 3.3c.3.92-.75 1.68-1.53 1.11l-2.8-2.03a1 1 0 00-1.18 0l-2.8 2.03c-.78.57-1.83-.19-1.53-1.11l1.06-3.3a1 1 0 00-.36-1.11l-2.8-2.04c-.78-.57-.38-1.81.6-1.81h3.45a1 1 0 00.95-.68l1.07-3.3z" />
                  </svg>
                  Most popular
                </span>
              )}

              <span className="shrink-0 w-16 flex justify-center">
                <VialStack count={tier.qty} photo={photo} name={name} tint={tint} />
              </span>

              <span className="flex-1 min-w-0">
                <span className="block text-ink-950 font-semibold text-sm sm:text-[15px]">
                  {tier.qty} {tier.qty === 1 ? "vial" : "vials"}
                  <span className="text-slate-400 font-normal"> &middot; {label}</span>
                </span>
                {tier.pct > 0 ? (
                  <span className="block text-emerald-600 text-xs font-medium mt-0.5">
                    You save {formatPrice(save)}
                  </span>
                ) : (
                  <span className="block text-slate-400 text-xs mt-0.5">Standard pricing</span>
                )}
              </span>

              <span className="text-right shrink-0">
                <span className="block text-ink-950 font-bold text-base leading-tight">
                  {formatPrice(total)}
                </span>
                {tier.pct > 0 ? (
                  <span className="block text-slate-400 text-xs line-through">{formatPrice(full)}</span>
                ) : (
                  <span className="block text-slate-400 text-xs">{formatPrice(price)} each</span>
                )}
              </span>

              <span
                className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selected ? "border-ink-950" : "border-slate-300"
                }`}
              >
                {selected && <span className="w-2.5 h-2.5 rounded-full bg-ink-950" />}
              </span>
            </button>
          );
        })}
      </div>

      <button
        onClick={() => add({ slug, name, subtitle, price, tint }, qty)}
        className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-ink-950 text-white py-3.5 rounded-full font-semibold hover:bg-teal-600 hover:shadow-lg hover:shadow-ink-950/20 transition-all"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        Add {qty} {qty === 1 ? "vial" : "vials"} &middot; {formatPrice(selectedTotal)}
      </button>
    </div>
  );
}
