"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import type { Tint } from "@/data/products";

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
  const [qty, setQtyLocal] = useState(1);

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center border border-slate-200 rounded-full">
        <button
          onClick={() => setQtyLocal(Math.max(1, qty - 1))}
          aria-label="Decrease quantity"
          className="w-11 h-12 flex items-center justify-center text-slate-500 hover:text-ink-950 text-lg"
        >
          &minus;
        </button>
        <span className="w-8 text-center font-medium text-ink-950">{qty}</span>
        <button
          onClick={() => setQtyLocal(qty + 1)}
          aria-label="Increase quantity"
          className="w-11 h-12 flex items-center justify-center text-slate-500 hover:text-ink-950 text-lg"
        >
          +
        </button>
      </div>
      <button
        onClick={() => add({ slug, name, subtitle, price, tint }, qty)}
        className="flex-1 inline-flex items-center justify-center gap-2 bg-ink-950 text-white py-3.5 rounded-full font-semibold hover:bg-teal-600 hover:shadow-lg hover:shadow-ink-950/20 transition-all"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        Add to Cart
      </button>
    </div>
  );
}
