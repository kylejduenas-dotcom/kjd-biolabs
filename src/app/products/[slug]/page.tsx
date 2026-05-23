import { products, tintStyles, priceFor, formatPrice } from "@/data/products";
import Link from "next/link";
import { notFound } from "next/navigation";
import Vial from "@/components/Vial";
import AddToCartButton from "@/components/AddToCartButton";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const style = tintStyles[product.tint];

  const specs = [
    { label: "Sequence", value: product.sequence },
    { label: "Molecular Weight", value: product.molecularWeight },
    { label: "Purity", value: product.purity },
    { label: "Form", value: product.form },
    { label: "Storage", value: product.storage },
  ];

  const related = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 3);

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className="flex items-center gap-2 text-sm text-slate-400">
          <Link href="/products" className="hover:text-teal-600 transition-colors">
            Products
          </Link>
          <span>/</span>
          <span className="text-ink-950 font-medium">{product.name}</span>
        </nav>
      </div>

      {/* Detail */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Vial */}
          <div
            className="rounded-[2rem] flex items-center justify-center p-12 min-h-[440px] relative overflow-hidden"
            style={{ background: style.bg }}
          >
            <span className="absolute top-5 left-5 text-[11px] uppercase tracking-wider font-semibold px-3 py-1 rounded-full bg-white/70 backdrop-blur text-ink-900">
              {product.category}
            </span>
            <div className="animate-float scale-110">
              <Vial name={product.name} tint={product.tint} size="lg" />
            </div>
          </div>

          {/* Info */}
          <div>
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-ink-950 mb-2">
              {product.name}
            </h1>
            <p className="text-teal-600 font-semibold text-lg mb-4">
              {product.subtitle}
            </p>

            <p className="text-3xl font-display font-extrabold text-ink-950 mb-6">
              {formatPrice(priceFor(product.slug))}
            </p>

            <p className="text-slate-500 leading-relaxed mb-6">
              {product.description}
            </p>

            <div className="mb-8">
              <AddToCartButton
                slug={product.slug}
                name={product.name}
                subtitle={product.subtitle}
                price={priceFor(product.slug)}
                tint={product.tint}
              />
            </div>

            <div className="bg-soft-cream rounded-3xl border border-slate-200/70 p-6 mb-6">
              <h3 className="text-ink-950 font-display font-bold text-sm uppercase tracking-wider mb-4">
                Specifications
              </h3>
              <dl className="space-y-1">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-start justify-between gap-4 py-2.5 border-b border-slate-200/70 last:border-0"
                  >
                    <dt className="text-slate-500 text-sm shrink-0">{spec.label}</dt>
                    <dd className="text-ink-950 text-sm text-right font-medium">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Tick>Third-party tested</Tick>
              <Tick>CoA included</Tick>
              <Tick>U.S. verified</Tick>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <p className="text-amber-800 text-xs leading-relaxed">
                <strong>Research Use Only:</strong> This product is intended
                exclusively for in vitro laboratory research. Not for human or
                veterinary use. Not for food or cosmetic purposes.
              </p>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-display font-bold text-ink-950 mb-8">
              Related Products
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => {
                const rStyle = tintStyles[p.tint];
                return (
                  <Link key={p.slug} href={`/products/${p.slug}`} className="group block">
                    <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300">
                      <div className="h-40 flex items-center justify-center" style={{ background: rStyle.bg }}>
                        <Vial name={p.name} tint={p.tint} size="sm" />
                      </div>
                      <div className="p-5">
                        <h3 className="text-ink-950 font-display font-bold group-hover:text-teal-600 transition-colors">
                          {p.name}
                        </h3>
                        <p className="text-slate-500 text-sm mt-0.5">{p.subtitle}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function Tick({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
      <svg className="w-4 h-4 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {children}
    </div>
  );
}
