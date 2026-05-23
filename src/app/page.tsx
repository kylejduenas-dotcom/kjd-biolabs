"use client";

import AgeGate from "@/components/AgeGate";
import Link from "next/link";
import { products } from "@/data/products";

const featured = products.filter((p) =>
  ["bpc-157", "ghk-cu", "tb-500", "tesamorelin", "cjc-1295-ipamorelin", "nad-plus"].includes(p.slug)
);

const stats = [
  { value: "99%+", label: "Purity Guaranteed" },
  { value: "28+", label: "Research Compounds" },
  { value: "100%", label: "U.S. Verified" },
  { value: "5", label: "Quality Checks" },
];

const qualityPillars = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "99%+ Purity",
    desc: "Every batch verified via HPLC and mass spectrometry analysis.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "CoA with Every Batch",
    desc: "Third-party tested in accredited U.S. laboratories with full documentation.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    title: "Shipment Protection",
    desc: "Every order protected against damage, loss, or theft in transit.",
  },
];

export default function Home() {
  return (
    <AgeGate>
      {/* Hero */}
      <section className="relative bg-navy-950 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-teal-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-teal-400/3 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-36 lg:py-44">
          <div className="max-w-3xl animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 rounded-full px-4 py-1.5 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              <span className="text-teal-400 text-xs font-medium uppercase tracking-wider">
                Research-Grade Peptides
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6 tracking-tight">
              Precision Peptides for{" "}
              <span className="gradient-text">Serious Research</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-400 leading-relaxed mb-8 max-w-2xl">
              Research-grade peptides with Certificate of Analysis on every
              batch. 99%+ identity purity, third-party verified in accredited
              U.S. laboratories.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-teal-400 text-navy-950 px-8 py-3.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-teal-500/25 hover:-translate-y-0.5 transition-all"
              >
                Browse Catalog
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 border border-white/10 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-white/5 hover:border-white/20 transition-all"
              >
                Our Quality Process
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-navy-900 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl sm:text-4xl font-bold gradient-text mb-1">
                  {stat.value}
                </p>
                <p className="text-slate-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality pillars */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-950 mb-4 tracking-tight">
              The KJD BioLabs Guarantee
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Documented quality for research and laboratory use. Every batch
              meets our rigorous internal purity standards.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {qualityPillars.map((pillar) => (
              <div
                key={pillar.title}
                className="group p-8 rounded-2xl border border-slate-200 hover:border-teal-300 bg-white hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-5 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                  {pillar.icon}
                </div>
                <h3 className="text-navy-950 font-semibold text-lg mb-2">
                  {pillar.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-950 mb-2 tracking-tight">
                Featured Products
              </h2>
              <p className="text-slate-500">
                Research peptides, third-party identity tested
              </p>
            </div>
            <Link
              href="/products"
              className="hidden sm:inline-flex items-center gap-2 text-teal-600 font-semibold text-sm hover:text-teal-700 transition-colors"
            >
              View all
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group block"
              >
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-teal-300 hover:shadow-xl hover:shadow-teal-500/5 hover:-translate-y-1 transition-all duration-300">
                  <div className="h-44 bg-gradient-to-br from-navy-900 to-navy-800 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,184,166,0.08),transparent_70%)]" />
                    <div className="w-16 h-16 rounded-2xl bg-white/5 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 text-teal-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-navy-950 font-semibold text-lg group-hover:text-teal-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-slate-400 text-sm mt-1 mb-3">
                      {product.subtitle}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <span className="text-xs text-slate-400 font-medium">
                        {product.purity} Purity
                      </span>
                      <span className="text-teal-600 text-sm font-semibold group-hover:translate-x-1 transition-transform">
                        View &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="sm:hidden mt-8 text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-teal-600 font-semibold text-sm"
            >
              View all products &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 bg-navy-950 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
            Ready to Start Your Research?
          </h2>
          <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
            Browse our catalog of 28+ research-grade peptides. Every compound
            backed by third-party testing and full documentation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-teal-400 text-navy-950 px-8 py-3.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-teal-500/25 transition-all"
            >
              Browse Catalog &rarr;
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-white/10 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-white/5 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </AgeGate>
  );
}
