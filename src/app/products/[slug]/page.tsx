import { products } from "@/data/products";
import Link from "next/link";
import { notFound } from "next/navigation";

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
    <div className="bg-navy-950 min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className="flex items-center gap-2 text-sm text-slate-500">
          <Link href="/products" className="hover:text-teal-400 transition-colors">
            Products
          </Link>
          <span>/</span>
          <span className="text-slate-300">{product.name}</span>
        </nav>
      </div>

      {/* Product detail */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image area */}
          <div className="bg-gradient-to-br from-navy-800 to-navy-900 rounded-3xl border border-white/5 flex items-center justify-center p-12 min-h-[400px] relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,184,166,0.06),transparent_70%)]" />
            <div className="relative text-center">
              <div className="w-32 h-32 rounded-3xl bg-white/5 backdrop-blur flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                <svg className="w-16 h-16 text-teal-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.75} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <p className="text-slate-500 text-sm">
                For research use only
              </p>
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 rounded-full px-3 py-1 mb-4">
              <span className="text-teal-400 text-xs font-medium">
                {product.category}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight">
              {product.name}
            </h1>
            <p className="text-teal-400 font-medium mb-6">{product.subtitle}</p>

            <p className="text-slate-400 leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="bg-navy-800/50 rounded-2xl border border-white/5 p-6 mb-8">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                Specifications
              </h3>
              <dl className="space-y-3">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-start justify-between gap-4 py-2 border-b border-white/5 last:border-0"
                  >
                    <dt className="text-slate-500 text-sm shrink-0">
                      {spec.label}
                    </dt>
                    <dd className="text-slate-200 text-sm text-right font-mono">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <svg className="w-4 h-4 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Third-party tested
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <svg className="w-4 h-4 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                CoA included
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <svg className="w-4 h-4 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                U.S. verified
              </div>
            </div>

            <div className="bg-amber-950/40 border border-amber-700/20 rounded-xl p-4">
              <p className="text-amber-400/80 text-xs leading-relaxed">
                <strong>Research Use Only:</strong> This product is intended
                exclusively for in vitro laboratory research. Not for human or
                veterinary use. Not for food or cosmetic purposes.
              </p>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-white mb-8 tracking-tight">
              Related Products
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((p) => (
                <Link key={p.slug} href={`/products/${p.slug}`} className="group block">
                  <div className="bg-navy-900 rounded-2xl border border-white/5 p-6 hover:border-teal-500/30 transition-all hover:-translate-y-1">
                    <h3 className="text-white font-semibold group-hover:text-teal-400 transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-slate-500 text-sm mt-1">{p.subtitle}</p>
                    <span className="text-teal-400 text-sm font-medium mt-3 inline-block">
                      View &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
