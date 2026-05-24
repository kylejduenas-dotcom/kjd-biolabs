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

const processSteps = [
  {
    icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
    title: "Synthesis",
    desc: "Solid-phase synthesis builds each peptide sequence one amino acid at a time.",
  },
  {
    icon: "M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z",
    title: "Purification",
    desc: "Reverse-phase HPLC purifies every batch to 99%+ identity purity.",
  },
  {
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    title: "Analysis",
    desc: "HPLC and mass spectrometry confirm identity, purity, and molecular weight.",
  },
  {
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    title: "Certification",
    desc: "An independent, accredited U.S. lab issues a Certificate of Analysis per batch.",
  },
  {
    icon: "M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M9 17a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0z",
    title: "Cold-pack shipping",
    desc: "Lyophilized, sealed, and dispatched same-day with protected, insured shipping.",
  },
];

const applications = [
  { icon: "M13 10V3L4 14h7v7l9-11h-7z", title: "Metabolic research", desc: "GLP-1, GIP & glucagon-pathway models studied in vitro." },
  { icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", title: "Tissue & repair", desc: "BPC-157, TB-500 & regeneration-pathway research." },
  { icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15", title: "Cellular & longevity", desc: "NAD+, epitalon & senescence-related investigation." },
  { icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z", title: "Cognitive & neuro", desc: "Semax, selank & neuropeptide signaling assays." },
  { icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z", title: "Cosmetic & skin", desc: "GHK-Cu & collagen-pathway studies in vitro." },
  { icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6", title: "Growth factors", desc: "Secretagogues & signaling-peptide research." },
];

const comparison = [
  "99%+ identity purity",
  "Per-batch third-party Certificate of Analysis",
  "HPLC + mass-spectrometry verified",
  "Cold-pack, insured shipping",
  "Free shipment protection",
  "U.S.-based researcher support",
];

function PeptideDiagram() {
  const nodes = [
    { x: 50, y: 170, aa: "G" },
    { x: 118, y: 100, aa: "L" },
    { x: 186, y: 170, aa: "P" },
    { x: 254, y: 100, aa: "R" },
    { x: 322, y: 170, aa: "K" },
    { x: 390, y: 100, aa: "Y" },
  ];
  const backbone = "M " + nodes.map((n) => `${n.x} ${n.y}`).join(" L ");
  return (
    <svg viewBox="0 0 440 270" className="w-full h-auto" role="img" aria-label="Peptide chain structure">
      <defs>
        <linearGradient id="pepgrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0c3a6b" />
          <stop offset="50%" stopColor="#1287d2" />
          <stop offset="100%" stopColor="#2bc4e6" />
        </linearGradient>
      </defs>
      <ellipse cx="220" cy="135" rx="205" ry="115" fill="url(#pepgrad)" opacity="0.07" />
      {nodes.map((n) => {
        const dy = n.y > 135 ? 42 : -42;
        return (
          <g key={`side-${n.x}`}>
            <line x1={n.x} y1={n.y} x2={n.x} y2={n.y + dy} stroke="#cbd5e1" strokeWidth="2" />
            <circle cx={n.x} cy={n.y + dy} r="7" fill="#eef2f7" stroke="#cbd5e1" strokeWidth="1.5" />
          </g>
        );
      })}
      <path d={backbone} fill="none" stroke="url(#pepgrad)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      {nodes.map((n) => (
        <g key={`node-${n.x}`}>
          <circle cx={n.x} cy={n.y} r="17" fill="url(#pepgrad)" />
          <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill="#ffffff">{n.aa}</text>
        </g>
      ))}
      <text x="50" y="150" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0c3a6b">H&#8322;N</text>
      <text x="402" y="84" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1287d2">COOH</text>
    </svg>
  );
}

export default function Home() {
  return (
    <AgeGate>
      {/* ===== Hero ===== */}
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

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5 mt-8">
                {["99%+ identity purity", "Third-party tested", "Same-day dispatch", "Free shipment protection"].map((t) => (
                  <span key={t} className="inline-flex items-center gap-1.5 text-slate-500 text-sm font-medium">
                    <svg className="w-4 h-4 text-teal-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    {t}
                  </span>
                ))}
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

              {/* Floating verification badge — top right */}
              <div className="absolute top-6 -right-2 z-30">
                <div className="flex items-center gap-3 bg-white/95 backdrop-blur-md border border-slate-200/70 shadow-soft-lg rounded-2xl pl-3 pr-4 py-2.5">
                  <span className="w-9 h-9 rounded-xl bg-logo-gradient text-white flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  </span>
                  <div className="leading-tight">
                    <p className="text-ink-950 font-display font-bold text-sm">99%+ Purity</p>
                    <p className="text-slate-500 text-[11px] font-medium">Verified by HPLC</p>
                  </div>
                </div>
              </div>

              {/* Floating CoA badge — bottom left */}
              <div className="absolute bottom-8 -left-2 z-30">
                <div className="flex items-center gap-3 bg-white/95 backdrop-blur-md border border-slate-200/70 shadow-soft-lg rounded-2xl pl-3 pr-4 py-2.5">
                  <span className="w-9 h-9 rounded-xl bg-ink-950 text-teal-300 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  </span>
                  <div className="leading-tight">
                    <p className="text-ink-950 font-display font-bold text-sm">Certificate of Analysis</p>
                    <p className="text-slate-500 text-[11px] font-medium">Included with every batch</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Stats band ===== */}
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

      {/* ===== Featured products (moved up — product-forward) ===== */}
      <section className="py-20 sm:py-28 bg-soft-lavender">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-teal-700 font-semibold text-sm uppercase tracking-wider">The Catalog</span>
              <h2 className="text-4xl sm:text-5xl font-display font-bold text-ink-950 mt-2 mb-2">
                Featured Compounds
              </h2>
              <p className="text-slate-500 text-lg">
                Research-grade, lab-tested, and ready to ship — every vial with a Certificate of Analysis.
              </p>
            </div>
            <Link
              href="/products"
              className="hidden sm:inline-flex items-center gap-2 bg-ink-950 text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-teal-600 transition-all shrink-0"
            >
              View all 28+
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

          <div className="sm:hidden mt-8">
            <Link
              href="/products"
              className="inline-flex w-full items-center justify-center gap-2 bg-ink-950 text-white px-6 py-3.5 rounded-full font-semibold text-sm"
            >
              View all 28+ compounds
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== The Science — molecular ===== */}
      <section className="py-20 sm:py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-teal-700 font-semibold text-sm uppercase tracking-wider">The Science</span>
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-ink-950 mt-2 mb-5">
              Sequence-defined peptides, built for the bench
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-6">
              Peptides are short chains of amino acids — the precise building blocks behind
              countless biological pathways. We supply them research-grade and
              sequence-verified, so every experiment starts from a known, reproducible standard.
            </p>
            <ul className="space-y-3">
              {[
                "Identity confirmed by mass spectrometry to the exact molecular weight",
                "99%+ chromatographic purity, lot after lot",
                "Lyophilized for stability and shipped cold-pack",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-slate-600">
                  <svg className="w-5 h-5 text-teal-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative rounded-3xl bg-soft-cream border border-slate-200/80 shadow-soft p-6 sm:p-8">
            {/* decorative floating vial */}
            <div className="hidden sm:block absolute -right-6 -top-10 rotate-[10deg] animate-float-slow z-10">
              <Vial name="Epitalon" tint="violet" size="sm" />
            </div>
            <PeptideDiagram />
            <p className="text-center text-xs text-slate-400 mt-2">Illustrative peptide sequence (H&#8322;N &rarr; COOH backbone with residue side chains)</p>
          </div>
        </div>
      </section>

      {/* ===== Quality (commitment bento + interactive proof, grouped) ===== */}
      <section className="py-20 sm:py-28 bg-soft-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <span className="text-teal-700 font-semibold text-sm uppercase tracking-wider">Quality</span>
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-ink-950 mt-2 mb-4">
              Quality you can verify, not just trust
            </h2>
            <p className="text-slate-500 text-lg">
              Every batch clears a five-point protocol — and we hand you the proof, from the
              Certificate of Analysis down to the chromatogram.
            </p>
          </div>

          {/* Bento */}
          <div className="grid lg:grid-cols-3 gap-5">
            {/* Feature tile — gradient, spans 2 cols & 2 rows */}
            <div className="lg:col-span-2 lg:row-span-2 relative overflow-hidden rounded-3xl bg-logo-gradient p-8 sm:p-10 flex flex-col justify-between min-h-[20rem]">
              <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full border border-white/15" />
              <div className="absolute -right-8 -top-8 w-64 h-64 rounded-full border border-white/10" />
              <div className="relative">
                <span className="text-white/70 font-semibold text-xs uppercase tracking-wider">The standard</span>
                <div className="flex items-end gap-3 mt-3 mb-1">
                  <span className="text-white font-display font-extrabold text-6xl sm:text-7xl leading-none">99%+</span>
                  <span className="text-white/80 font-medium pb-2">identity purity</span>
                </div>
                <h3 className="text-white font-display font-bold text-2xl mb-2">Verified before it ships</h3>
                <p className="text-white/80 text-sm leading-relaxed max-w-md">
                  Every batch is confirmed by reverse-phase HPLC and mass spectrometry — matched to the
                  exact molecular weight — before a single vial is released.
                </p>
              </div>
              <div className="relative flex flex-wrap gap-2 mt-6">
                {["HPLC", "Mass spectrometry", "5-point QC"].map((t) => (
                  <span key={t} className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Supporting tiles */}
            {[pillars[1], pillars[2]].map((p) => (
              <div
                key={p.title}
                className="group p-7 rounded-3xl bg-white border border-slate-200/70 hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="w-12 h-12 rounded-2xl bg-ink-950 text-teal-400 flex items-center justify-center mb-5 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={p.icon} />
                  </svg>
                </div>
                <h3 className="text-ink-950 font-display font-bold text-lg mb-2">
                  {p.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          {/* Interactive proof */}
          <div className="mt-16">
            <QualityProof />
          </div>
        </div>
      </section>

      {/* ===== Our Process — pipeline diagram ===== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <span className="text-teal-700 font-semibold text-sm uppercase tracking-wider">Our Process</span>
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-ink-950 mt-2 mb-4">
              From synthesis to your bench
            </h2>
            <p className="text-slate-500 text-lg">
              Every vial moves through a controlled five-stage pipeline before it reaches you —
              synthesized, purified, analyzed, independently certified, and cold-packed.
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-7 left-[10%] right-[10%] h-0.5 bg-logo-gradient opacity-40" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-5 relative">
              {processSteps.map((p, i) => (
                <div key={p.title} className="relative text-center">
                  <div className="w-14 h-14 rounded-2xl bg-logo-gradient text-white flex items-center justify-center mb-4 mx-auto shadow-soft relative z-10">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d={p.icon} />
                    </svg>
                  </div>
                  <span className="text-teal-600 text-xs font-bold uppercase tracking-wider">Step {i + 1}</span>
                  <h3 className="text-ink-950 font-display font-bold text-lg mt-1 mb-1.5">{p.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Why KJD — comparison ===== */}
      <section className="py-20 sm:py-28 bg-soft-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-teal-700 font-semibold text-sm uppercase tracking-wider">The difference</span>
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-ink-950 mt-2 mb-4">
              Why researchers choose KJD
            </h2>
            <p className="text-slate-500 text-lg">How we stack up against a typical research-chemical supplier.</p>
          </div>
          <div className="rounded-3xl border border-slate-200/80 overflow-hidden shadow-soft-lg bg-white">
            <div className="grid grid-cols-3 bg-white border-b border-slate-200/70">
              <div className="p-4 sm:p-5" />
              <div className="p-4 sm:p-5 text-center">
                <span className="block font-display font-bold text-ink-950 text-sm sm:text-base">KJD BioLabs</span>
              </div>
              <div className="p-4 sm:p-5 text-center">
                <span className="block text-slate-500 font-semibold text-sm sm:text-base">Typical supplier</span>
              </div>
            </div>
            {comparison.map((label, i) => (
              <div key={label} className={`grid grid-cols-3 items-center ${i % 2 ? "bg-white" : "bg-slate-50/40"}`}>
                <div className="p-4 sm:p-5 text-sm text-ink-950 font-medium">{label}</div>
                <div className="p-4 sm:p-5 flex justify-center">
                  <span className="w-7 h-7 rounded-full bg-teal-500 text-white flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </span>
                </div>
                <div className="p-4 sm:p-5 flex justify-center">
                  <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Research applications ===== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <span className="text-teal-700 font-semibold text-sm uppercase tracking-wider">Applications</span>
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-ink-950 mt-2 mb-4">
              Studied across the life sciences
            </h2>
            <p className="text-slate-500 text-lg">
              Researchers use our compounds across a broad range of in-vitro and
              pre-clinical investigation — for laboratory research use only.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {applications.map((a) => (
              <div key={a.title} className="flex items-start gap-4 p-6 rounded-2xl bg-soft-cream hover:bg-white border border-transparent hover:border-slate-200/70 hover:shadow-soft transition-all">
                <div className="w-11 h-11 rounded-xl bg-logo-gradient text-white flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d={a.icon} /></svg>
                </div>
                <div>
                  <h3 className="text-ink-950 font-display font-bold text-base mb-1">{a.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Affiliate (slim band) ===== */}
      <section className="pb-4 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-slate-200/80 bg-soft-cream p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">
                Affiliate Program
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-ink-950 mt-2 mb-2">
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

      {/* ===== CTA (with flanking vials) ===== */}
      <section className="relative py-20 sm:py-28 bg-white overflow-hidden">
        {/* decorative vials */}
        <div className="hidden lg:block absolute left-6 xl:left-16 top-1/2 -translate-y-1/2 -rotate-[12deg] animate-float-slow">
          <Vial name="CJC-1295" tint="peach" size="md" />
        </div>
        <div className="hidden lg:block absolute right-6 xl:right-16 top-1/2 -translate-y-1/2 rotate-[12deg] animate-float">
          <Vial name="NAD+" tint="aqua" size="md" />
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
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
