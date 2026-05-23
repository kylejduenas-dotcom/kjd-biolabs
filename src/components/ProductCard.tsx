import Link from "next/link";
import type { Product } from "@/data/products";
import { tintStyles } from "@/data/products";
import Vial from "@/components/Vial";

export default function ProductCard({ product }: { product: Product }) {
  const style = tintStyles[product.tint];

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="h-full bg-white rounded-3xl border border-slate-200/80 overflow-hidden hover:border-slate-300 hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1">
        <div
          className="h-52 flex items-center justify-center relative overflow-hidden"
          style={{ background: style.bg }}
        >
          <span className="absolute top-4 left-4 text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-white/70 backdrop-blur text-ink-900">
            {product.category}
          </span>
          <div className="group-hover:scale-105 group-hover:-translate-y-1 transition-transform duration-500">
            <Vial name={product.name} tint={product.tint} size="md" />
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-ink-950 font-display font-bold text-lg group-hover:text-teal-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-slate-500 text-sm mt-0.5 mb-3">{product.subtitle}</p>
          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <span className="text-xs text-slate-400 font-medium">
              {product.purity} Purity
            </span>
            <span className="text-teal-600 text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
              View
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
