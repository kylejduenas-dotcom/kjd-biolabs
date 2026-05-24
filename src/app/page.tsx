"use client";

import AgeGate from "@/components/AgeGate";
import Link from "next/link";
import { products } from "@/data/products";
import Vial from "@/components/Vial";
import ProductCard from "@/components/ProductCard";
import QualityProof from "@/components/QualityProof";

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
    title: "Verified 99%+ Purity",
    desc: "Each batch is confirmed by HPLC and mass-spectrometry analysis before it's released.",
  },
  {
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    title: "Documentation on Every Batch",
    desc: "Independent accredited-lab testing — with the full Certificate of Analysis available to you.",
  },
  {
    icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
    title: "Protected, Insured Shipping",
    desc: "If an order is lost, stolen, or damaged in transit, we replace it at no cost to you.",
  },
];

export default function Home() {
  return (
    <AgeGate>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center py-16 lg:py-20 lg:min-h-[620px]">
            {/* Copy */}
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200/60 rounded-full px-4 py-1.5 mb-7">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                <span className="text-teal-700 text-xs font-semibold uppercase tracking-wider">
                  Research-Grade Peptides
                </span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-display font-extrabold text-ink-950 leading-[1.02] mb-6 text-balance">
                Research-Grade Peptides,
                <br className="hidden sm:block" />{" "}
                <span className="text-logo-gradient">Independently Verified.</span>
              </h1>

              <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-lg">
                Every compound ships with a full Certificate of Analysis and is
                third-party tested in accredited U.S. labs — 99%+ identity
                purity, batch after batch.
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

            {/* Vial composition */}
            <div className="relative h-[540px] hidden lg:flex items-center justify-center">
              <div className="absolute w-96 h-96 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(56,189,238,0.12), transparent 70%)" }} />
              <div className="relative w-[440px] h-[330px] scale-[1.28]">
                {/* ground shadow */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-1 w-72 h-9 rounded-[50%] bg-ink-950/10 blur-lg" />
                {/* back-left */}
                <div className="absolute left-3 top-12 -rotate-[14deg] animate-float-slow z-10">
                  <Vial name="TB-500" tint="sky" size="md" />
                </div>
                {/* back-right */}
                <div className="absolute right-2 top-8 rotate-[14deg] animate-float-slow z-10" style={{ animationDelay: "0.5s" }}>
                  <Vial name="GHK-Cu" tint="rose" size="md" />
                </div>
                {/* front-center */}
                <div className="absolute left-1/2 -translate-x-1/2 top-0 animate-float z-20">
                  <Vial name="BPC-157" tint="mint" size="lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-logo-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-4xl sm:text-5xl font-display font-extrabold text-white mb-1">
                  {s.value}
                </p>
                <p className="text-white/70 text-sm">{s.label}</p>
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
              Our Quality Commitment
            </h2>
            <p className="text-slate-500 text-lg">
              Verifiable quality at every step — from synthesis to shipment,
              each batch clears our internal standards before it reaches your
              bench.
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

      {/* Interactive quality proof */}
      <section className="py-20 sm:py-28 bg-soft-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-teal-700 font-semibold text-sm uppercase tracking-wider">
              See the proof
            </span>
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-ink-950 mt-2 mb-4">
              Quality you can actually check
            </h2>
            <p className="text-slate-500 text-lg">
              Click through each test — potency, purity, stability, safety, and
              consistency — to see how we verify every batch. Real analysis, not
              just claims.
            </p>
          </div>
          <QualityProof />
        </div>
      </section>

      {/* Featured products */}
      <section className="py-20 sm:py-28 bg-soft-lavender">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-4xl sm:text-5xl font-display font-bold text-ink-950 mb-2">
                Featured Compounds
              </h2>
              <p className="text-slate-500 text-lg">
                Lab-tested and ready for your research
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
            {featured.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Affiliate */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-slate-200/80 bg-soft-cream p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">
                Affiliate Program
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-ink-950 mt-2 mb-2">
                Refer researchers. Earn commission.
              </h2>
              <p className="text-slate-500 max-w-lg">
                Share KJD BioLabs with your audience and get paid on every
                qualifying order you send our way.
              </p>
            </div>
            <Link
              href="/affiliate"
              className="shrink-0 inline-flex items-center gap-2 bg-ink-950 text-white px-7 py-3.5 rounded-full font-semibold hover:bg-teal-600 transition-all"
            >
              Become a Partner
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2rem] bg-logo-gradient px-8 py-16 sm:px-16 text-center">
            <div className="relative">
              <h2 className="text-3xl sm:text-5xl font-display font-bold text-white mb-4">
                Ready to Start Your Research?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                Browse our catalog of 28+ research-grade peptides. Every compound
                backed by third-party testing and full documentation.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/products" className="inline-flex items-center gap-2 bg-white text-ink-950 px-8 py-4 rounded-full font-semibold hover:bg-teal-50 transition-all">
                  Browse Catalog
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 border border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all">
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
