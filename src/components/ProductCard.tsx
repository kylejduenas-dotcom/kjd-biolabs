import Link from "next/link";
import type { Product } from "@/data/products";

const categoryColors: Record<string, string> = {
  "Tissue Repair": "from-emerald-400/20 to-emerald-600/20 border-emerald-500/20",
  Dermal: "from-pink-400/20 to-rose-600/20 border-pink-500/20",
  Metabolic: "from-amber-400/20 to-orange-600/20 border-amber-500/20",
  Secretagogue: "from-cyan-400/20 to-blue-600/20 border-cyan-500/20",
  Cellular: "from-violet-400/20 to-purple-600/20 border-violet-500/20",
  Neuro: "from-indigo-400/20 to-blue-600/20 border-indigo-500/20",
  Circadian: "from-slate-400/20 to-gray-600/20 border-slate-500/20",
  Blend: "from-teal-400/20 to-emerald-600/20 border-teal-500/20",
  Supplies: "from-gray-400/20 to-slate-600/20 border-gray-500/20",
};

const categoryBadgeColors: Record<string, string> = {
  "Tissue Repair": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Dermal: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  Metabolic: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Secretagogue: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  Cellular: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  Neuro: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  Circadian: "bg-slate-500/10 text-slate-400 border-slate-500/20",
  Blend: "bg-teal-500/10 text-teal-400 border-teal-500/20",
  Supplies: "bg-gray-500/10 text-gray-400 border-gray-500/20",
};

export default function ProductCard({ product }: { product: Product }) {
  const gradient = categoryColors[product.category] || categoryColors.Cellular;
  const badge = categoryBadgeColors[product.category] || categoryBadgeColors.Cellular;

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative h-full bg-navy-900 rounded-2xl border border-white/5 overflow-hidden hover:border-teal-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-500/5">
        <div
          className={`h-48 bg-gradient-to-br ${gradient} flex items-center justify-center relative`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_70%)]" />
          <div className="text-center relative z-10">
            <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center mx-auto mb-2 group-hover:scale-105 transition-transform">
              <svg
                className="w-10 h-10 text-white/60"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-white font-semibold text-lg group-hover:text-teal-400 transition-colors">
              {product.name}
            </h3>
            <span
              className={`shrink-0 text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-md border ${badge}`}
            >
              {product.category}
            </span>
          </div>
          <p className="text-slate-400 text-sm mb-3">{product.subtitle}</p>
          <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mb-4">
            {product.description}
          </p>
          <div className="flex items-center justify-between pt-3 border-t border-white/5">
            <span className="text-teal-400 text-xs font-medium">
              {product.purity} Purity
            </span>
            <span className="text-teal-400 text-sm font-semibold group-hover:translate-x-1 transition-transform">
              View Details &rarr;
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
