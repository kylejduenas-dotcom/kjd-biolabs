import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/data/products";
import { tintStyles, priceFor, formatPrice, imageFor } from "@/data/products";
import Vial from "@/components/Vial";

export default function ProductCard({ product }: { product: Product }) {
  const style = tintStyles[product.tint];
  const price = priceFor(product.slug);
  // Original studio photo (keeps each product's own background) — fills the tile.
  const photo = imageFor(product.slug);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex h-full flex-col rounded-3xl border border-slate-200/70 bg-white p-2.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg"
    >
      {/* Pastel product tile */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl" style={{ background: style.bg }}>
        {photo ? (
          <Image
            src={photo}
            alt={`${product.name} research peptide vial`}
            fill
            quality={90}
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.05]"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Vial name={product.name} tint={product.tint} size="lg" />
          </div>
        )}
      </div>

      {/* Title + From price */}
      <div className="mt-3 flex items-start justify-between gap-2 px-1">
        <h3 className="font-display font-bold leading-tight text-ink-950 text-[15px] sm:text-base group-hover:text-teal-600 transition-colors">
          {product.name}
        </h3>
        <div className="shrink-0 text-right">
          <span className="block text-[10px] uppercase tracking-wide text-slate-500 leading-none">From</span>
          <span className="block font-display font-bold leading-tight text-ink-950 text-base sm:text-lg">
            {formatPrice(price)}
          </span>
        </div>
      </div>

      <p className="mt-1 px-1 text-xs sm:text-sm text-slate-500 line-clamp-1">{product.subtitle}</p>

      {/* View button */}
      <span className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-ink-950 py-2.5 text-sm font-semibold text-white transition-colors group-hover:bg-teal-600">
        View
      </span>
    </Link>
  );
}
