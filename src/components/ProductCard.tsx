"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/data/products";
import { tintStyles, priceFor, formatPrice, imageFor, strengthFor } from "@/data/products";
import Vial from "@/components/Vial";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }: { product: Product }) {
  const style = tintStyles[product.tint];
  const price = priceFor(product.slug);
  const photo = imageFor(product.slug);
  const strength = strengthFor(product.slug);
  const { add } = useCart();

  return (
    <div className="group h-full flex flex-col bg-white rounded-[24px] border border-slate-200/70 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft-lg hover:border-teal-300/70">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="aspect-[4/5] relative overflow-hidden" style={{ background: style.bg }}>
          {/* Category chip */}
          <span className="absolute top-3 left-3 z-10 inline-flex items-center rounded-full bg-white/85 backdrop-blur px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-ink-900 shadow-sm">
            {product.category}
          </span>
          {/* Purity badge */}
          <span className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 rounded-full bg-ink-950/90 backdrop-blur px-2.5 py-1 text-[10px] font-bold text-white shadow-sm">
            <svg className="w-3 h-3 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            99%+ Pure
          </span>

          {photo ? (
            <Image
              src={photo}
              alt={`${product.name} research peptide vial`}
              fill
              quality={90}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
            />
          ) : (
            <div className="h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
              <Vial name={product.name} tint={product.tint} size="lg" />
            </div>
          )}

          {/* Hover reveal: View details */}
          <div className="absolute inset-x-3 bottom-3 z-10 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <span className="flex items-center justify-center gap-1.5 rounded-full bg-white/95 backdrop-blur text-ink-950 text-xs font-semibold py-2.5 shadow-soft">
              View details
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-ink-950 font-display font-bold text-lg leading-tight group-hover:text-teal-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-slate-500 text-sm mt-1">
          {product.subtitle}
          {strength ? ` · ${strength}` : ""}
        </p>

        <div className="flex items-center gap-1.5 mt-2 text-[11px] font-semibold text-teal-700">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          CoA available · third-party tested
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="block text-ink-950 font-display font-bold text-xl leading-none">
              {formatPrice(price)}
            </span>
            <span className="text-slate-400 text-[11px]">per vial</span>
          </div>
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
            aria-label={`Add ${product.name} to cart`}
            className="inline-flex items-center gap-1.5 bg-ink-950 text-white text-xs font-semibold px-4 py-2.5 rounded-full hover:bg-teal-600 hover:shadow-lg hover:shadow-ink-950/20 transition-all"
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
