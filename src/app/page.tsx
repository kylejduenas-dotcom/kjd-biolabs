"use client";

import AgeGate from "@/components/AgeGate";
import Link from "next/link";
import { products, tintStyles } from "@/data/products";
import Vial from "@/components/Vial";

const featured = products.filter((p) =>
  ["bpc-157", "ghk-cu", "tb-500", "tesamorelin", "cjc-1295-ipamorelin", "nad-plus"].includes(p.slug)
);

const stats = [
  { value: "99%+", label: "Purity Guaranteed" },
  { value: "28+", label: "Research Compounds" },
  { value: "100%", label: "U.S. Verified" },
  { value: "5", label: "Quality Checks" },
];

const pillars = [
  {
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "99%+ Purity Guaranteed",
    desc: "Every batch verified via HPLC and mass spectrometry analysis.",
  },
  {
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    title: "CoA with Every Batch",
    desc: "Third-party tested in accredited U.S. laboratories with full documentation.",
  },
  {
    icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
    title: "Shipment Protection",
    desc: "Every order protected against damage, loss, or theft in transit.",
  },
];

export default function Home() {
  return (
    <AgeGate>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-full" style={{ background: "linear-gradient(135deg, #f5f3ff 0%, #ecfdf5 50%, #eff6ff 100%)" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[calc(100vh-4rem)] py-16">
            {/* Copy */}
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200/60 rounded-full px-4 py-1.5 mb-7">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                <span className="text-teal-700 text-xs font-semibold uppercase tracking-wider">
                  Research-Grade Peptides
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-extrabold text-ink-950 leading-[0.95] mb-6">
                Research Peptides You Can{" "}
                <span className="text-teal-600">Verify.</span>
              </h1>

              <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-lg">
                Research-grade peptides with a Certificate of Analysis on every
                batch. 99%+ identity purity, third-party tested in accredited
                U.S. laboratories.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 bg-ink-950 text-white px-8 py-4 rounded-full font-semibold hover:bg-teal-600 hover:shadow-lg hover:shadow-ink-950/20 transition-all"
                >
                  Browse Catalog
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 border border-slate-300 text-ink-950 px-8 py-4 rounded-full font-semibold hover:bg-slate-50 transition-all"
                >
                  Our Quality Process
                </Link>
              </div>
            </div>

            {/* Floating vials */}
            <div className="relative h-[420px] hidden lg:block">
              <div className="absolute top-8 left-12 animate-float">
                <Vial name="BPC-157" tint="mint" size="lg" />
              </div>
              <div className="absolute top-24 right-16 animate-float-slow">
                <Vial name="GHK-Cu" tint="rose" size="md" />
              </div>
              <div className="absolute bottom-0 left-1/3 animate-float" style={{ animationDelay: "1s" }}>
                <Vial name="TB-500" tint="sky" size="md" />
              </div>
              <div className="absolute bottom-12 right-8 animate-float-slow" style={{ animationDelay: "0.5s" }}>
                <Vial name="NAD+" tint="violet" size="sm" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-ink-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-4xl sm:text-5xl font-display font-extrabold text-white mb-1">
                  {s.value}
                </p>
                <p className="text-slate-400 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality pillars */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-ink-950 mb-4">
              The KJD BioLabs Guarantee
            </h2>
            <p className="text-slate-500 text-lg">
              Documented quality for research and laboratory use. Every batch
              meets our rigorous internal purity standards.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="group p-8 rounded-3xl bg-soft-cream border border-slate-200/70 hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-ink-950 text-teal-400 flex items-center justify-center mb-5 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={p.icon} />
                  </svg>
                </div>
                <h3 className="text-ink-950 font-display font-bold text-xl mb-2">
                  {p.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="py-20 sm:py-28 bg-soft-lavender">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-4xl sm:text-5xl font-display font-bold text-ink-950 mb-2">
                Featured Products
              </h2>
              <p className="text-slate-500 text-lg">
                Research peptides, third-party identity tested
              </p>
            </div>
            <Link
              href="/products"
              className="hidden sm:inline-flex items-center gap-2 text-ink-950 font-semibold text-sm hover:text-teal-600 transition-colors"
            >
              View all
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((product) => {
              return (
                <Link key={product.slug} href={`/products/${product.slug}`} className="group block">
                  <ProductCardInline product={product} />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2rem] bg-ink-950 px-8 py-16 sm:px-16 text-center">
            <div className="absolute inset-0 pointer-events-none opacity-60" style={{ background: "radial-gradient(circle at 30% 20%, rgba(45,212,191,0.18), transparent 50%), radial-gradient(circle at 80% 80%, rgba(167,139,250,0.15), transparent 50%)" }} />
            <div className="relative">
              <h2 className="text-3xl sm:text-5xl font-display font-bold text-white mb-4">
                Ready to Start Your Research?
              </h2>
              <p className="text-slate-300 text-lg mb-8 max-w-xl mx-auto">
                Browse our catalog of 28+ research-grade peptides. Every compound
                backed by third-party testing and full documentation.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/products" className="inline-flex items-center gap-2 bg-white text-ink-950 px-8 py-4 rounded-full font-semibold hover:bg-teal-400 transition-all">
                  Browse Catalog
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 border border-white/20 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AgeGate>
  );
}

function ProductCardInline({ product }: { product: (typeof products)[number] }) {
  const style = tintStyles[product.tint];
  return (
    <div className="h-full bg-white rounded-3xl border border-slate-200/80 overflow-hidden hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300">
      <div className="h-52 flex items-center justify-center relative" style={{ background: style.bg }}>
        <div className="group-hover:scale-105 group-hover:-translate-y-1 transition-transform duration-500">
          <Vial name={product.name} tint={product.tint} size="md" />
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-ink-950 font-display font-bold text-lg group-hover:text-teal-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-slate-500 text-sm mt-0.5 mb-3">{product.subtitle}</p>
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <span className="text-xs text-slate-400 font-medium">{product.purity} Purity</span>
          <span className="text-teal-600 text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
            View
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
