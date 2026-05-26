import { products, tintStyles, priceFor, formatPrice, imageFor, strengthFor } from "@/data/products";
import Link from "next/link";
import Image from "next/image";
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
  const photo = imageFor(product.slug);
  const strength = strengthFor(product.slug);

  const specs = [
    ...(strength ? [{ label: "Strength", value: strength }] : []),
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
            className="rounded-[2rem] relative overflow-hidden aspect-[4/5] self-start"
            style={{ background: style.bg }}
          >
            <span className="absolute top-5 left-5 z-10 text-[11px] uppercase tracking-wider font-semibold px-3 py-1 rounded-full bg-white/70 backdrop-blur text-ink-900">
              {product.category}
            </span>
            {photo ? (
              <Image
                src={photo}
                alt={`${product.name} research peptide vial`}
                fill
                priority
                quality={95}
                sizes="(max-width: 1024px) 100vw, 620px"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center p-12">
                <div className="animate-float scale-110">
                  <Vial name={product.name} tint={product.tint} size="lg" />
                </div>
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-ink-950 mb-2">
              {product.name}
            </h1>
            <p className="text-teal-600 font-semibold text-lg mb-3">
              {product.subtitle}
            </p>
            {strength && (
              <div className="mb-4">
                <span className="inline-flex items-center rounded-full bg-slate-100 text-ink-950 text-xs font-semibold px-3 py-1">
                  {strength} per vial
                </span>
              </div>
            )}

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

            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { t: "Free shipping", s: "over $150", d: "M9 17a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1" },
                { t: "Damage protection", s: "every order", d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
                { t: "Secure checkout", s: "256-bit SSL", d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
              ].map((b) => (
                <div key={b.t} className="flex flex-col items-center text-center rounded-2xl border border-slate-200/70 bg-soft-cream px-2 py-4">
                  <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-teal-600 mb-2 shadow-sm">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d={b.d} />
                    </svg>
                  </span>
                  <span className="text-ink-950 text-xs font-semibold leading-tight">{b.t}</span>
                  <span className="text-slate-400 text-[11px] mt-0.5">{b.s}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Tick>Third-party tested</Tick>
              <Tick>CoA on request</Tick>
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

        {/* Compound Information */}
        <div className="mt-16 sm:mt-20">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-11 h-11 rounded-2xl bg-soft-cream flex items-center justify-center text-teal-600 shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
            </span>
            <div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-ink-950 leading-tight">Compound Information</h2>
              <p className="text-slate-500 text-sm">Technical specifications</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="rounded-3xl border border-slate-200/70 bg-white p-6 sm:p-7">
              <p className="text-slate-400 text-[11px] font-semibold uppercase tracking-[0.18em] mb-1">Molecular Profile</p>
              <h3 className="text-ink-950 font-display font-bold text-lg mb-5">What is {product.name}?</h3>
              <dl>
                {specs.filter((s) => s.label !== "Storage").map((spec) => (
                  <div key={spec.label} className="flex items-start justify-between gap-4 py-3 border-b border-slate-100 last:border-0">
                    <dt className="text-slate-500 text-sm shrink-0">{spec.label}</dt>
                    <dd className="text-ink-950 text-sm text-right font-medium break-words">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="rounded-3xl border border-slate-200/70 bg-white p-6 sm:p-7">
              <p className="text-slate-400 text-[11px] font-semibold uppercase tracking-[0.18em] mb-1">Storage Requirements</p>
              <h3 className="text-ink-950 font-display font-bold text-lg mb-5">Stability Information</h3>
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="inline-flex items-center rounded-full bg-slate-100 text-slate-600 text-xs font-medium px-3 py-1.5">{product.form}</span>
                <span className="inline-flex items-center rounded-full bg-slate-100 text-slate-600 text-xs font-medium px-3 py-1.5">Avoid freeze/thaw</span>
                <span className="inline-flex items-center rounded-full bg-slate-100 text-slate-600 text-xs font-medium px-3 py-1.5">Keep sealed</span>
              </div>
              <div className="rounded-2xl bg-soft-cream border border-slate-200/60 p-4 flex items-start gap-3">
                <span className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-teal-600 shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                </span>
                <div>
                  <p className="text-ink-950 text-sm font-semibold mb-0.5">Storage</p>
                  <p className="text-slate-500 text-sm leading-relaxed">{product.storage}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-display font-bold text-ink-950 mb-8">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => {
                const rStyle = tintStyles[p.tint];
                const rPhoto = imageFor(p.slug);
                return (
                  <Link key={p.slug} href={`/products/${p.slug}`} className="group block">
                    <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300">
                      <div className="h-44 relative overflow-hidden" style={{ background: rStyle.bg }}>
                        {rPhoto ? (
                          <Image src={rPhoto} alt={p.name} fill quality={85} sizes="(max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.04]" />
                        ) : (
                          <div className="h-full flex items-center justify-center">
                            <Vial name={p.name} tint={p.tint} size="sm" />
                          </div>
                        )}
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

      {/* CTA — Ready to start your research */}
      <section className="relative overflow-hidden bg-logo-gradient py-20 sm:py-24">
        <div className="glow-blob -top-24 left-1/4 w-96 h-96" style={{ background: "rgba(255,255,255,0.12)" }} />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
            Ready to Start Your Research?
          </h2>
          <p className="text-white/85 text-base sm:text-lg mb-8 max-w-xl mx-auto">
            Browse our catalog of 28+ research-grade peptides. Every compound
            backed by third-party testing and full documentation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/products" className="inline-flex items-center gap-2 bg-white text-ink-950 px-8 py-4 rounded-full font-semibold hover:bg-teal-50 transition-all">
              Explore Catalog
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 border border-white/40 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all">
              Contact Us
            </Link>
          </div>
        </div>
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
