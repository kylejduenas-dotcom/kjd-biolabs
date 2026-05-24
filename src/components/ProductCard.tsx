"use client";

import Link from "next/link";
import type { Product } from "@/data/products";
import { tintStyles, priceFor, formatPrice } from "@/data/products";
import Vial from "@/components/Vial";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }: { product: Product }) {
  const style = tintStyles[product.tint];
  const price = priceFor(product.slug);
  const { add } = useCart();

  return (
    <div className="group h-full bg-white rounded-3xl border border-slate-200/80 overflow-hidden hover:border-slate-300 hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 flex flex-col">
      <Link href={`/products/${product.slug}`} className="block">
        <div
          className="h-80 flex items-center justify-center relative overflow-hidden"
          style={{ background: style.bg }}
        >
          <span className="absolute top-4 left-4 text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-white/70 backdrop-blur text-ink-900">
            {product.category}
          </span>
          <div className="group-hover:scale-105 group-hover:-translate-y-1 transition-transform duration-500">
            <Vial name={product.name} tint={product.tint} size="lg" />
          </div>
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-ink-950 font-display font-bold text-lg group-hover:text-teal-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-slate-500 text-sm mt-0.5 mb-4">{product.subtitle}</p>
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-100">
          <span className="text-ink-950 font-display font-bold text-lg">
            {formatPrice(price)}
          </span>
          <button
            onClick={() =>
              add({
                slug: product.slug,
                name: product.name,
                subtitle: product.subtitle,
                price,
                tint: product.tint,
              })
            }
            className="inline-flex items-center gap-1.5 bg-ink-950 text-white text-xs font-semibold px-4 py-2.5 rounded-full hover:bg-teal-600 transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
