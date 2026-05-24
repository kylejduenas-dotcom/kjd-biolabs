"use client";

import AgeGate from "@/components/AgeGate";
import Link from "next/link";
import { products } from "@/data/products";
import Vial from "@/components/Vial";
import ProductCard from "@/components/ProductCard";

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

const Arrow = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

export default function Home() {
  return (
    <AgeGate>
      {/* Hero */}
      <section className="relative -mt-16 pt-16 overflow-hidden bg-deep-hero text-white">
        <div className="absolute inset-0 starfield opacity-50 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-0 w-[640px] h-[640px] rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(111,224,205,0.14), transparent 70%)" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center py-20 lg:py-24 lg:min-h-[640px]">
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-7">
                <div className="w-1.5 h-1.5 rounded-full bg-mint-400" />
                <span className="text-mint-300 text-xs font-semibold uppercase tracking-wider">
                  Research-Grade Peptides
                </span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-display font-extrabold leading-[1.02] mb-6 text-balance">
                Research Peptides,
                <br className="hidden sm:block" />{" "}
                <span className="text-mint-gradient">Independently Verified.</span>
              </h1>

              <p className="text-lg text-slate-300/80 leading-relaxed mb-8 max-w-lg">
                Every compound ships with a full Certificate of Analysis and is
                third-party tested in accredited U.S. labs — 99%+ identity
                purity, batch after batch.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/products" className="inline-flex items-center justify-center gap-2 bg-mint-400 text-deep-900 px-8 py-4 rounded-full font-semibold hover:bg-mint-300 hover:shadow-lg hover:shadow-mint-400/30 transition-all">
                  Browse Catalog
                  <Arrow />
                </Link>
                <Link href="/about" className="inline-flex items-center justify-center gap-2 border border-white/15 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/5 transition-all">
                  Our Quality Process
                </Link>
              </div>
            </div>

            {/* Vial cluster */}
            <div className="relative h-[460px] hidden lg:flex items-center justify-center">
              <div className="absolute w-80 h-80 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(111,224,205,0.18), transparent 70%)" }} />
              <div className="relative w-[440px] h-[330px]">
                <div className="absolute left-1/2 -translate-x-1/2 bottom-1 w-72 h-9 rounded-[50%] bg-black/40 blur-lg" />
                <div className="absolute left-3 top-12 -rotate-[14deg] animate-float-slow z-10">
                  <Vial name="TB-500" tint="sky" size="md" />
                </div>
                <div className="absolute right-2 top-8 rotate-[14deg] animate-float-slow z-10" style={{ animationDelay: "0.5s" }}>
                  <Vial name="GHK-Cu" tint="rose" size="md" />
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 top-0 animate-float z-20">
                  <Vial name="BPC-157" tint="mint" size="lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-deep border-y border-white/5">
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
      <section className="py-20 sm:py-28 bg-deep relative overflow-hidden">
        <div className="absolute inset-0 starfield opacity-15 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
              Our Quality Commitment
            </h2>
            <p className="text-slate-400 text-lg">
              Verifiable quality at every step — from synthesis to shipment,
              each batch clears our internal standards before it reaches your
              bench.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((p) => (
              <div key={p.title} className="group p-8 rounded-3xl glass-card hover:border-mint-400/30 hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-mint-400/10 text-mint-400 flex items-center justify-center mb-5 group-hover:bg-mint-400/20 transition-colors">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={p.icon} />
                  </svg>
                </div>
                <h3 className="text-white font-display font-bold text-xl mb-2">{p.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="py-20 sm:py-28 bg-deep-hero relative overflow-hidden">
        <div className="absolute inset-0 starfield opacity-20 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-2">
                Featured Compounds
              </h2>
              <p className="text-slate-400 text-lg">Lab-tested and ready for your research</p>
            </div>
            <Link href="/products" className="hidden sm:inline-flex items-center gap-2 text-mint-400 font-semibold text-sm hover:text-mint-300 transition-colors">
              View all
              <Arrow />
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
      <section className="py-16 sm:py-20 bg-deep">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] glass-card p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-mint-400 font-semibold text-sm uppercase tracking-wider">
                Affiliate Program
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mt-2 mb-2">
                Refer researchers. Earn commission.
              </h2>
              <p className="text-slate-400 max-w-lg">
                Share KJD BioLabs with your audience and get paid on every
                qualifying order you send our way.
              </p>
            </div>
            <Link href="/affiliate" className="shrink-0 inline-flex items-center gap-2 bg-mint-400 text-deep-900 px-7 py-3.5 rounded-full font-semibold hover:bg-mint-300 transition-all">
              Become a Partner
              <Arrow />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 bg-deep">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2rem] bg-deep-hero border border-white/10 px-8 py-16 sm:px-16 text-center">
            <div className="absolute inset-0 starfield opacity-25 pointer-events-none" />
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 0%, rgba(111,224,205,0.16), transparent 55%)" }} />
            <div className="relative">
              <h2 className="text-3xl sm:text-5xl font-display font-bold text-white mb-4">
                Ready to Start Your Research?
              </h2>
              <p className="text-slate-300/80 text-lg mb-8 max-w-xl mx-auto">
                Browse our catalog of 28+ research-grade peptides — every
                compound backed by third-party testing and full documentation.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/products" className="inline-flex items-center gap-2 bg-mint-400 text-deep-900 px-8 py-4 rounded-full font-semibold hover:bg-mint-300 transition-all">
                  Browse Catalog
                  <Arrow />
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 border border-white/15 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/5 transition-all">
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
