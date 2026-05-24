"use client";

import AgeGate from "@/components/AgeGate";
import Link from "next/link";
import { products } from "@/data/products";
import Vial from "@/components/Vial";
import ProductCard from "@/components/ProductCard";
import QualityProof from "@/components/QualityProof";
import WaterCaustics from "@/components/WaterCaustics";

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

function Wave({ color, position }: { color: string; position: "top" | "bottom" }) {
  return (
    <svg
      className={`absolute left-0 w-full h-[48px] sm:h-[68px] ${position === "top" ? "-top-[47px] sm:-top-[67px]" : "-bottom-[47px] sm:-bottom-[67px] rotate-180"}`}
      viewBox="0 0 1440 68"
      preserveAspectRatio="none"
      fill={color}
      aria-hidden
    >
      <path d="M0,68 C240,8 480,58 720,32 C960,6 1200,54 1440,18 L1440,68 Z" />
    </svg>
  );
}

export default function Home() {
  return (
    <AgeGate>
      {/* Hero */}
      <section className="relative -mt-16 pt-16 overflow-hidden bg-water-soft">
        <WaterCaustics id="hero" tint="blue" opacity={0.4} />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-0 w-[640px] h-[640px] rounded-full blur-3xl animate-ripple" style={{ background: "radial-gradient(circle, rgba(56,189,238,0.22), transparent 70%)" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center py-20 lg:py-24 lg:min-h-[620px]">
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200/70 rounded-full px-4 py-1.5 mb-7">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                <span className="text-teal-700 text-xs font-semibold uppercase tracking-wider">
                  Research-Grade Peptides
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-display font-extrabold text-ink-950 leading-[1.02] mb-6 text-balance">
                Research Peptides,
                <br className="hidden sm:block" />{" "}
                <span className="text-water">Independently Verified.</span>
              </h1>
              <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-lg">
                Every compound ships with a full Certificate of Analysis and is
                third-party tested in accredited U.S. labs — 99%+ identity
                purity, batch after batch.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/products" className="inline-flex items-center justify-center gap-2 bg-ink-950 text-white px-8 py-4 rounded-full font-semibold hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-500/25 transition-all">
                  Browse Catalog
                  <Arrow />
                </Link>
                <Link href="/about" className="inline-flex items-center justify-center gap-2 border border-slate-300 text-ink-950 px-8 py-4 rounded-full font-semibold hover:bg-white transition-all">
                  Our Quality Process
                </Link>
              </div>
            </div>

            {/* Vial cluster */}
            <div className="relative h-[460px] hidden lg:flex items-center justify-center">
              <div className="absolute w-80 h-80 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(17,159,217,0.16), transparent 70%)" }} />
              <div className="relative w-[440px] h-[330px]">
                <div className="absolute left-1/2 -translate-x-1/2 bottom-1 w-72 h-9 rounded-[50%] bg-ink-950/10 blur-lg" />
                <div className="absolute left-3 top-12 -rotate-[14deg] animate-float-slow z-10">
                  <Vial name="TB-500" tint="sky" size="md" />
                </div>
                <div className="absolute right-2 top-8 rotate-[14deg] animate-float-slow z-10" style={{ animationDelay: "0.5s" }}>
                  <Vial name="NAD+" tint="lavender" size="md" />
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 top-0 animate-float z-20">
                  <Vial name="BPC-157" tint="aqua" size="lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats — the "water blue" band, bracketed by waves */}
      <section className="relative text-white overflow-hidden" style={{ background: "linear-gradient(180deg, #0c7fb8 0%, #0a6a9c 100%)" }}>
        <Wave color="#0c7fb8" position="top" />
        <Wave color="#ffffff" position="bottom" />
        <WaterCaustics id="stats" tint="light" opacity={0.28} animate={false} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-4xl sm:text-5xl font-display font-extrabold mb-1">{s.value}</p>
                <p className="text-white/70 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust pillars */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((p) => (
              <div key={p.title} className="group p-8 rounded-3xl border border-slate-200/70 hover:border-teal-300 hover:shadow-soft-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-5 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={p.icon} />
                  </svg>
                </div>
                <h3 className="text-ink-950 font-display font-bold text-xl mb-2">{p.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive quality proof */}
      <section className="relative py-20 sm:py-28 bg-aqua-band overflow-hidden">
        <WaterCaustics id="quality" tint="blue" opacity={0.16} animate={false} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-teal-700 font-semibold text-sm uppercase tracking-wider">See the proof</span>
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-ink-950 mt-2 mb-4">
              Quality you can actually check
            </h2>
            <p className="text-slate-500 text-lg">
              Click through each test below to see how we verify every batch — potency, purity, stability, safety, and consistency. Real analysis, not just claims.
            </p>
          </div>
          <QualityProof />
        </div>
      </section>

      {/* Featured products */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-4xl sm:text-5xl font-display font-bold text-ink-950 mb-2">
                Featured Compounds
              </h2>
              <p className="text-slate-500 text-lg">Lab-tested and ready for your research</p>
            </div>
            <Link href="/products" className="hidden sm:inline-flex items-center gap-2 text-teal-600 font-semibold text-sm hover:text-teal-700 transition-colors">
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
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-slate-200/80 bg-aqua-band p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-teal-700 font-semibold text-sm uppercase tracking-wider">Affiliate Program</span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-ink-950 mt-2 mb-2">
                Refer researchers. Earn commission.
              </h2>
              <p className="text-slate-500 max-w-lg">
                Share KJD BioLabs with your audience and get paid on every qualifying order you send our way.
              </p>
            </div>
            <Link href="/affiliate" className="shrink-0 inline-flex items-center gap-2 bg-ink-950 text-white px-7 py-3.5 rounded-full font-semibold hover:bg-teal-600 transition-all">
              Become a Partner
              <Arrow />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA — water band */}
      <section className="relative text-white overflow-hidden" style={{ background: "linear-gradient(180deg, #0c7fb8 0%, #0a6a9c 100%)" }}>
        <Wave color="#0c7fb8" position="top" />
        <WaterCaustics id="cta" tint="light" opacity={0.28} animate={false} />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h2 className="text-3xl sm:text-5xl font-display font-bold mb-4">
            Ready to Start Your Research?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Browse our catalog of 28+ research-grade peptides — every compound backed by third-party testing and full documentation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/products" className="inline-flex items-center gap-2 bg-white text-ink-950 px-8 py-4 rounded-full font-semibold hover:bg-teal-50 transition-all">
              Browse Catalog
              <Arrow />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 border border-white/40 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </AgeGate>
  );
}
