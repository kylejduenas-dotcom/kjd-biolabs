"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { tintStyles, formatPrice, lineTotal, bundleDiscountPct, imageFor } from "@/data/products";

export default function CartPage() {
  const { items, setQty, remove, subtotal, savings, count, hydrated } = useCart();

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-soft-cream border-b border-slate-200/70 py-12 sm:py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-ink-950">
            Your Cart
          </h1>
          {hydrated && count > 0 && (
            <p className="text-slate-500 mt-2">{count} item{count > 1 ? "s" : ""} in your cart</p>
          )}
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {!hydrated ? null : items.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center mx-auto mb-6">
                <svg className="w-9 h-9 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <p className="text-slate-500 text-lg mb-6">Your cart is empty.</p>
              <Link href="/products" className="inline-flex items-center gap-2 bg-ink-950 text-white px-7 py-3.5 rounded-full font-semibold hover:bg-teal-600 transition-all">
                Browse Products
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <div key={item.slug} className="flex gap-5 bg-white border border-slate-200/80 rounded-3xl p-4 sm:p-5">
                    <Link href={`/products/${item.slug}`} className="w-24 h-24 rounded-2xl shrink-0 relative overflow-hidden flex items-center justify-center" style={imageFor(item.slug) ? undefined : { background: tintStyles[item.tint].bg }}>
                      {imageFor(item.slug) ? (
                        <Image src={imageFor(item.slug)!} alt={item.name} fill sizes="96px" className="object-cover" />
                      ) : (
                        <svg className="w-10 h-10 text-ink-950/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                      )}
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <Link href={`/products/${item.slug}`} className="text-ink-950 font-display font-bold hover:text-teal-600 transition-colors">
                            {item.name}
                          </Link>
                          <p className="text-slate-400 text-sm">{item.subtitle}</p>
                          <p className="text-slate-500 text-sm mt-1">{formatPrice(item.price)} each</p>
                        </div>
                        <button onClick={() => remove(item.slug)} aria-label="Remove" className="text-slate-300 hover:text-red-500 transition-colors shrink-0">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-slate-200 rounded-full">
                          <button onClick={() => setQty(item.slug, item.quantity - 1)} aria-label="Decrease" className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-ink-950">&minus;</button>
                          <span className="w-8 text-center text-sm font-medium text-ink-950">{item.quantity}</span>
                          <button onClick={() => setQty(item.slug, item.quantity + 1)} aria-label="Increase" className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-ink-950">+</button>
                        </div>
                        <div className="text-right">
                          <span className="block text-ink-950 font-display font-bold">{formatPrice(lineTotal(item.price, item.quantity))}</span>
                          {item.quantity > 1 && (
                            <span className="inline-flex items-center gap-1.5">
                              <span className="text-slate-400 text-xs line-through">{formatPrice(item.price * item.quantity)}</span>
                              <span className="text-teal-700 text-[11px] font-semibold">Save {bundleDiscountPct(item.quantity)}%</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <Link href="/products" className="inline-flex items-center gap-2 text-teal-600 font-semibold text-sm hover:text-teal-700 pt-2">
                  &larr; Continue shopping
                </Link>
              </div>

              {/* Summary */}
              <div>
                <div className="bg-soft-cream rounded-3xl border border-slate-200/70 p-6 sticky top-24">
                  <h2 className="font-display font-bold text-lg text-ink-950 mb-5">Order Summary</h2>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Subtotal</span>
                      <span className="text-ink-950 font-medium">{formatPrice(subtotal)}</span>
                    </div>
                    {savings > 0 && (
                      <div className="flex justify-between">
                        <span className="text-teal-700 font-medium inline-flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                          Bundle savings
                        </span>
                        <span className="text-teal-700 font-semibold">&minus;{formatPrice(savings)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-slate-500">Shipping</span>
                      <span className="text-slate-400">Calculated at checkout</span>
                    </div>
                    <div className="border-t border-slate-200 pt-3 flex justify-between">
                      <span className="text-ink-950 font-semibold">Total</span>
                      <span className="text-ink-950 font-display font-bold text-lg">{formatPrice(subtotal)}</span>
                    </div>
                  </div>
                  <Link href="/checkout" className="mt-6 block w-full bg-ink-950 text-white text-center py-3.5 rounded-full font-semibold hover:bg-teal-600 transition-all">
                    Proceed to Checkout
                  </Link>
                  <p className="text-slate-400 text-xs text-center mt-4 leading-relaxed">
                    Research use only. By checking out you confirm you are a qualified researcher.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
