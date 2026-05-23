"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { tintStyles, formatPrice } from "@/data/products";

export default function CartDrawer() {
  const { items, isOpen, setOpen, setQty, remove, subtotal, count } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[60] bg-ink-950/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Panel */}
      <aside
        className={`fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <h2 className="font-display font-bold text-lg text-ink-950">
            Your Cart {count > 0 && <span className="text-slate-400 font-sans font-normal text-sm">({count})</span>}
          </h2>
          <button onClick={() => setOpen(false)} aria-label="Close cart" className="p-2 text-slate-400 hover:text-ink-950 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <p className="text-slate-500 text-sm mb-5">Your cart is empty.</p>
            <Link href="/products" onClick={() => setOpen(false)} className="text-teal-600 font-semibold text-sm hover:text-teal-700">
              Browse products &rarr;
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.map((item) => (
                <div key={item.slug} className="flex gap-4">
                  <div
                    className="w-16 h-16 rounded-2xl shrink-0 flex items-center justify-center"
                    style={{ background: tintStyles[item.tint].bg }}
                  >
                    <svg className="w-7 h-7 text-ink-950/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-ink-950 font-semibold text-sm truncate">{item.name}</p>
                        <p className="text-slate-400 text-xs">{item.subtitle}</p>
                      </div>
                      <button onClick={() => remove(item.slug)} aria-label="Remove" className="text-slate-300 hover:text-red-500 transition-colors shrink-0">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-slate-200 rounded-full">
                        <button onClick={() => setQty(item.slug, item.quantity - 1)} aria-label="Decrease" className="w-7 h-7 flex items-center justify-center text-slate-500 hover:text-ink-950">
                          &minus;
                        </button>
                        <span className="w-7 text-center text-sm text-ink-950 font-medium">{item.quantity}</span>
                        <button onClick={() => setQty(item.slug, item.quantity + 1)} aria-label="Increase" className="w-7 h-7 flex items-center justify-center text-slate-500 hover:text-ink-950">
                          +
                        </button>
                      </div>
                      <span className="text-ink-950 font-semibold text-sm">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 px-6 py-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 text-sm">Subtotal</span>
                <span className="text-ink-950 font-display font-bold text-lg">{formatPrice(subtotal)}</span>
              </div>
              <p className="text-slate-400 text-xs">Shipping &amp; taxes calculated at checkout.</p>
              <Link href="/checkout" onClick={() => setOpen(false)} className="block w-full bg-ink-950 text-white text-center py-3.5 rounded-full font-semibold text-sm hover:bg-teal-600 transition-all">
                Checkout
              </Link>
              <Link href="/cart" onClick={() => setOpen(false)} className="block w-full text-center text-sm font-semibold text-slate-600 hover:text-ink-950">
                View full cart
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
