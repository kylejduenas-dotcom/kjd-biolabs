"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { tintStyles, formatPrice, priceFor, lineTotal, bundleDiscountPct, imageFor } from "@/data/products";
import { FREE_SHIPPING_THRESHOLD } from "@/data/shipping";
import Vial from "@/components/Vial";

const BAC = { slug: "bacteriostatic-water", name: "Bacteriostatic Water", subtitle: "Research Supplies", tint: "aqua" as const };

function Thumb({ slug, name, tint }: { slug: string; name: string; tint: keyof typeof tintStyles }) {
  const photo = imageFor(slug);
  return (
    <div className="w-16 h-16 rounded-2xl shrink-0 relative overflow-hidden flex items-center justify-center" style={photo ? undefined : { background: tintStyles[tint].bg }}>
      {photo ? (
        <Image src={photo} alt={name} fill sizes="64px" className="object-cover" />
      ) : (
        <div className="scale-[0.42]">
          <Vial name={name} tint={tint} size="sm" />
        </div>
      )}
    </div>
  );
}

export default function CartDrawer() {
  const { items, isOpen, setOpen, setQty, remove, add, subtotal, savings, count } = useCart();
  const hasBac = items.some((i) => i.slug === BAC.slug);
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, subtotal === 0 ? 0 : (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[60] bg-ink-950/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />

      {/* Viewport-sized clip wrapper so the off-canvas panel never causes page-wide horizontal scroll */}
      <div className="fixed inset-0 z-[70] overflow-hidden pointer-events-none">
      <aside
        className={`absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-300 ${isOpen ? "translate-x-0 pointer-events-auto" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <h2 className="font-display font-bold text-xl text-ink-950">
            Shopping Cart {count > 0 && <span className="text-slate-400 font-sans font-normal text-sm">({count})</span>}
          </h2>
          <button onClick={() => setOpen(false)} aria-label="Close cart" className="p-2 text-slate-400 hover:text-ink-950 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-soft-cream flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
            <p className="text-slate-500 text-sm mb-5">Your cart is empty.</p>
            <Link href="/products" onClick={() => setOpen(false)} className="text-teal-600 font-semibold text-sm hover:text-teal-700">Browse products &rarr;</Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {items.map((item) => (
                <div key={item.slug} className="flex gap-3 p-3 rounded-2xl border border-slate-200/70 bg-soft-cream">
                  <Thumb slug={item.slug} name={item.name} tint={item.tint} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-ink-950 font-semibold text-sm truncate">{item.name}</p>
                        <span className="inline-block mt-0.5 text-[11px] font-medium text-slate-500 bg-white border border-slate-200/80 rounded-full px-2 py-0.5">{item.subtitle}</span>
                      </div>
                      <button onClick={() => remove(item.slug)} aria-label="Remove" className="text-slate-300 hover:text-red-500 transition-colors shrink-0">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center bg-white border border-slate-200 rounded-full">
                        <button onClick={() => setQty(item.slug, item.quantity - 1)} aria-label="Decrease" className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-ink-950 text-lg leading-none">&minus;</button>
                        <span className="w-7 text-center text-sm text-ink-950 font-semibold">{item.quantity}</span>
                        <button onClick={() => setQty(item.slug, item.quantity + 1)} aria-label="Increase" className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-ink-950 text-lg leading-none">+</button>
                      </div>
                      <div className="text-right">
                        <span className="block text-ink-950 font-bold text-sm">{formatPrice(lineTotal(item.price, item.quantity))}</span>
                        {item.quantity > 1 && (
                          <span className="inline-flex items-center gap-1.5">
                            <span className="text-slate-400 text-xs line-through">{formatPrice(item.price * item.quantity)}</span>
                            <span className="text-teal-700 text-[11px] font-semibold">&minus;{bundleDiscountPct(item.quantity)}%</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* BAC Water upsell */}
              {!hasBac && (
                <div className="flex items-center gap-3 p-3 rounded-2xl border border-teal-300/60 bg-teal-50/60">
                  <Thumb slug={BAC.slug} name={BAC.name} tint={BAC.tint} />
                  <div className="flex-1 min-w-0">
                    <p className="text-ink-950 font-semibold text-sm">Don&apos;t forget BAC Water</p>
                    <p className="text-slate-500 text-xs mt-0.5">Needed to reconstitute peptides · {formatPrice(priceFor(BAC.slug))}</p>
                  </div>
                  <button
                    onClick={() => add({ ...BAC, price: priceFor(BAC.slug) })}
                    className="shrink-0 inline-flex items-center gap-1 bg-ink-950 text-white text-xs font-semibold px-3.5 py-2 rounded-full hover:bg-teal-600 transition-all"
                  >
                    + Add
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-slate-100 px-5 py-5 space-y-4">
              {/* Free-shipping progress */}
              <div>
                {remaining > 0 ? (
                  <p className="text-sm text-slate-600">Add <strong className="text-ink-950">{formatPrice(remaining)}</strong> for <strong className="text-ink-950">free shipping</strong></p>
                ) : (
                  <p className="text-sm text-teal-700 font-semibold inline-flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    Free shipping unlocked!
                  </p>
                )}
                <div className="mt-2 h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-logo-gradient transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
              </div>

              {savings > 0 && (
                <div className="flex items-center justify-between pt-1">
                  <span className="text-teal-700 text-sm font-medium inline-flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Bundle savings
                  </span>
                  <span className="text-teal-700 font-semibold text-sm">&minus;{formatPrice(savings)}</span>
                </div>
              )}

              <div className={`flex items-center justify-between ${savings > 0 ? "" : "pt-1"}`}>
                <span className="text-slate-500 text-sm">Subtotal</span>
                <span className="text-ink-950 font-display font-bold text-xl">{formatPrice(subtotal)}</span>
              </div>

              <Link href="/checkout" onClick={() => setOpen(false)} className="flex items-center justify-center gap-2 w-full bg-logo-gradient text-white py-3.5 rounded-full font-semibold text-sm hover:shadow-lg hover:shadow-ink-950/15 transition-all">
                Proceed to Checkout
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>

              <div className="flex items-center justify-center gap-2 text-slate-400 text-xs">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                <span>Secure checkout · crypto &amp; card · 100% encrypted</span>
              </div>
            </div>
          </>
        )}
      </aside>
      </div>
    </>
  );
}
