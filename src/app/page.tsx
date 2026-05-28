import Link from "next/link";
import Image from "next/image";
import { products, type Product } from "@/data/products";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import TrustedByResearchers from "@/components/TrustedByResearchers";

const featuredSlugs = [
  "bpc-157", "tb-500", "ghk-cu", "glp-3-rt", "tesamorelin",
  "cjc-1295-ipamorelin", "nad-plus", "mots-c",
];
const featured: Product[] = featuredSlugs
  .map((slug) => products.find((p) => p.slug === slug))
  .filter((p): p is Product => p !== undefined);

const standards = [
  {
    num: "01",
    title: "Accredited Lab Verification",
    desc: "No in-house testing. Every batch goes to an independent, accredited U.S. lab for HPLC and mass spectrometry confirmation.",
  },
  {
    num: "02",
    title: "Full Documentation",
    desc: "Certificate of Analysis with identity, purity, and molecular weight data — available for every batch you order.",
  },
  {
    num: "03",
    title: "Protected Delivery",
    desc: "Lyophilized, sealed, and shipped with insured packaging. If anything arrives damaged or goes missing, we replace it free.",
  },
  {
    num: "04",
    title: "Shipped Within 24 Hours",
    desc: "Every order is processed and shipped within 24 hours, with tracking sent the moment it leaves our facility.",
  },
];

const trustBadges = [
  { label: "99%+ Identity Purity", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
  { label: "HPLC & Mass Spec", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
  { label: "Ships Within 24 Hours", icon: "M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M9 17a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0z" },
  { label: "Full Batch Documentation", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
  { label: "Insured Shipping", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
  { label: "Secure Checkout", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
];

const homeFaqs = [
  {
    q: "Are these compounds for human use?",
    a: "No. Every KJD BioLabs compound is sold strictly for in vitro laboratory and research use only — not for human or veterinary use, not for food or cosmetic purposes, and not for use in diagnostic procedures. By ordering, you confirm you are a qualified researcher.",
  },
  {
    q: "What is a Certificate of Analysis?",
    a: "A Certificate of Analysis (CoA) is the lab document reporting a specific batch's identity and purity, confirmed by HPLC and mass spectrometry at an independent, accredited U.S. laboratory. A CoA is available for every batch — request one for any product through our contact page.",
  },
  {
    q: "What purity do you guarantee?",
    a: "Every research compound in our catalog is guaranteed to 99%+ identity purity, verified by HPLC and mass spectrometry as part of our five-point, per-batch quality protocol.",
  },
  {
    q: "How should I store the lyophilized product?",
    a: "Store lyophilized (freeze-dried) peptides at -20°C for long-term stability, protected from light and moisture. Once reconstituted, most peptides are best kept at 2–8°C and used within the window noted on each product page.",
  },
  {
    q: "How long is the lyophilized product stable?",
    a: "Stored sealed at -20°C, lyophilized peptides typically remain stable for 2+ years. Brief exposure to ambient temperature in transit won't compromise a properly freeze-dried product — refer to each product's storage notes for specifics.",
  },
  {
    q: "How fast do you ship, and is cold shipping required?",
    a: "Orders are processed and dispatched within 24 hours, with tracking sent the moment they leave our facility. Because compounds ship as a stable lyophilized powder, cold shipping isn't required — every order is sealed and protected, and you should store it at -20°C once it arrives.",
  },
  {
    q: "How does shipment protection work?",
    a: "Every order includes free shipment protection. If a package is lost, stolen, or damaged in transit, we'll replace it at no cost to you — just reach out to support.",
  },
  {
    q: "Do you ship internationally?",
    a: "Currently, we ship to all 50 U.S. states. International shipping varies by country due to customs regulations on research materials. Contact our support team for specific country availability. All international orders may be subject to local customs fees and import duties.",
  },
];

export default function Home() {
  return (
    <>
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden bg-ink-950">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-2 lg:grid-cols-2 lg:gap-8 lg:min-h-[640px]">
            {/* LEFT — text */}
            <div className="pt-14 pb-2 lg:py-16">
              <h1 className="fade-up stagger-1 text-4xl sm:text-5xl lg:text-[4.6rem] font-display font-extrabold text-white leading-[1.04] sm:leading-[1.02] tracking-[-0.03em] mb-6 text-balance">
                Research begins with{" "}
                <em className="font-serif italic font-semibold text-white">certainty.</em>
              </h1>

              <p className="fade-up stagger-2 text-lg text-white/80 leading-relaxed mb-8 max-w-lg">
                99%+ purity, third-party verified. Every compound backed by
                independent lab testing and a Certificate of Analysis — so your
                research starts from a known standard.
              </p>

              <div className="fade-up stagger-3 flex flex-col sm:flex-row gap-3 mb-8">
                <Link
                  href="/products"
                  className="group inline-flex items-center justify-center gap-2.5 bg-white text-ink-950 px-9 py-4 rounded-full font-semibold hover:bg-teal-50 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20 transition-all duration-300"
                >
                  Shop Compounds
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              <div className="fade-up stagger-4 flex flex-wrap gap-2.5">
                {[
                  { d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", t: "Independent Lab Testing" },
                  { d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", t: "CoA on Request" },
                  { d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", t: "Ships Within 24h" },
                ].map((p) => (
                  <span
                    key={p.t}
                    className="inline-flex items-center gap-2.5 rounded-full bg-white/[0.06] py-1.5 pl-1.5 pr-4 text-sm font-medium text-white/95 ring-1 ring-inset ring-white/15 transition-colors hover:bg-white/[0.12]"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-400/15 text-teal-300 ring-1 ring-inset ring-teal-300/20">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={p.d} /></svg>
                    </span>
                    {p.t}
                  </span>
                ))}
              </div>
            </div>

            {/* RIGHT — AI stage (DNA + glare + glass pedestal) with our real vials placed on it */}
            <div className="relative">
              <div className="relative mx-auto w-full max-w-[680px]">
                <Image
                  src="/hero-stage.png"
                  alt="Research peptide vials on a laboratory pedestal with a DNA helix backdrop"
                  width={1376}
                  height={768}
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="h-auto w-full"
                />
                {/* real vials standing on the pedestal */}
                <div className="absolute bottom-[15%] left-[42%] right-[2%] flex items-end justify-center gap-0.5">
                  <Image src="/products/vialimg/bacteriostatic-water.png" alt="Bacteriostatic Water vial" width={300} height={375} className="h-auto w-[29%] vial-3d-dark animate-vial-b" />
                  <Image src="/products/vialimg/bpc-157-tb-500-wolverine.png" alt="BPC-157 / TB-500 vial" width={340} height={425} className="relative z-10 h-auto w-[41%] vial-3d-dark animate-vial-a" />
                  <Image src="/products/vialimg/ghk-cu.png" alt="GHK-Cu vial" width={300} height={375} className="h-auto w-[32%] vial-3d-dark animate-vial-a" style={{ animationDelay: "0.6s" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Stats / credibility band ===== */}
      <section className="relative overflow-hidden bg-ink-950 border-t border-white/10">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-10 left-1/3 w-80 h-80 rounded-full blur-3xl" style={{ background: "rgba(43,196,230,0.12)" }} />
          <div className="absolute -bottom-10 right-1/4 w-72 h-72 rounded-full blur-3xl" style={{ background: "rgba(18,135,210,0.10)" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4 divide-x divide-white/10">
            {[
              { v: "99.7%", l: "Average identity purity", d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
              { v: "28+", l: "Research compounds", d: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" },
              { v: "24h", l: "Shipped within 24 hours", d: "M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M9 17a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0z" },
              { v: "50", l: "U.S. states served", d: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" },
            ].map((s) => (
              <div key={s.l} className="flex items-center justify-center gap-3 sm:gap-4 px-2">
                <svg className="w-9 h-9 sm:w-10 sm:h-10 text-teal-300/90 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={s.d} />
                </svg>
                <div className="text-left">
                  <p className="font-display font-extrabold text-white text-3xl sm:text-4xl lg:text-[2.7rem] tracking-tight leading-none">
                    {s.v}
                  </p>
                  <p className="text-teal-200/80 text-xs sm:text-sm mt-1.5 font-medium">{s.l}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Featured Compounds ===== */}
      <section className="py-20 sm:py-28 bg-soft-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-ink-950 mb-2 tracking-[-0.02em]">
                Popular in the Lab
              </h2>
              <p className="text-slate-600 text-lg max-w-xl">
                Our most-requested compounds — independently tested, fully documented, and shipped within 24 hours.
              </p>
            </div>
            <Link
              href="/products"
              className="hidden sm:inline-flex items-center gap-2 text-teal-600 font-semibold text-sm hover:text-teal-700 transition-colors shrink-0"
            >
              View all compounds
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <FeaturedCarousel products={featured} />

          <div className="sm:hidden mt-8">
            <Link
              href="/products"
              className="inline-flex w-full items-center justify-center gap-2 bg-ink-950 text-white px-6 py-3.5 rounded-full font-semibold text-sm"
            >
              View all compounds
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Our Standard ===== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-ink-950 mb-3 tracking-[-0.02em]">
                Built Into Every Batch
              </h2>
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-5xl sm:text-6xl font-display font-extrabold text-teal-600">99.7%</span>
                <span className="text-slate-500 text-lg font-medium">Average purity</span>
              </div>
              <div className="space-y-8">
                {standards.map((s) => (
                  <div key={s.num} className="flex gap-5">
                    <span className="shrink-0 w-11 text-center font-serif text-3xl sm:text-4xl text-teal-600 font-medium leading-none pt-0.5">
                      {s.num}
                    </span>
                    <div>
                      <h3 className="text-ink-950 font-display font-bold text-lg mb-1">{s.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured vial — boxed proof card */}
            <div className="relative hidden lg:flex flex-col rounded-[2rem] bg-gradient-to-br from-slate-50 via-white to-sky-50/70 ring-1 ring-slate-200/70 p-6 min-h-[520px] overflow-hidden">
              {/* faint concentric ring behind the vial */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
                <div className="w-72 h-72 rounded-full ring-1 ring-slate-200/70" />
                <div className="absolute w-96 h-96 rounded-full ring-1 ring-slate-200/40" />
              </div>

              {/* Purity badge — floats top-right */}
              <div className="relative z-10 flex justify-end">
                <div className="flex items-center gap-3 rounded-2xl bg-white shadow-soft-lg px-4 py-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  </span>
                  <span className="leading-tight">
                    <span className="block text-ink-950 text-sm font-bold">99%+ Purity</span>
                    <span className="block text-slate-500 text-xs">Verified by HPLC</span>
                  </span>
                </div>
              </div>

              {/* Vial */}
              <div className="relative z-10 flex flex-1 items-center justify-center py-6">
                <Image
                  src="/products/vialimg/glp-3-rt.png"
                  alt="GLP-3 (RT) research peptide vial"
                  width={260}
                  height={325}
                  className="w-[210px] h-auto vial-3d animate-vial-a"
                  style={{ "--r": "-12deg" } as React.CSSProperties}
                />
              </div>

              {/* See the Proof — bottom card */}
              <Link
                href="/about"
                className="group relative z-10 flex items-center gap-3.5 rounded-2xl bg-white shadow-soft px-4 py-3.5 transition-shadow hover:shadow-soft-lg"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-ink-950">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </span>
                <span className="flex-1 leading-tight">
                  <span className="block text-ink-950 text-sm font-semibold">See the Proof</span>
                  <span className="block text-slate-500 text-xs">View our quality procedures</span>
                </span>
                <svg className="w-5 h-5 text-slate-400 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Trust Badges Bar ===== */}
      <section className="bg-soft-cream border-y border-slate-200/60 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {trustBadges.map((b) => (
              <span key={b.label} className="inline-flex items-center gap-2 text-sm font-medium text-slate-600">
                <svg className="w-5 h-5 text-teal-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={b.icon} />
                </svg>
                {b.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Trusted by researchers (social proof) ===== */}
      <TrustedByResearchers />

      {/* ===== Closing CTA (navy) ===== */}
      <section className="relative overflow-hidden bg-ink-950 py-24 sm:py-32">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-10 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: "rgba(43,196,230,0.12)" }} />
          <div className="absolute -bottom-16 right-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: "rgba(18,135,210,0.10)" }} />
        </div>
        {/* Floating vials */}
        <div className="hidden md:block absolute left-4 lg:left-16 top-1/2 -translate-y-1/2 rotate-[-10deg] vial-3d-dark">
          <Image src="/products/vialimg/glutathione.png" alt="" width={224} height={280} sizes="240px" className="w-36 lg:w-56 h-auto" />
        </div>
        <div className="hidden md:block absolute right-4 lg:right-16 top-1/2 -translate-y-1/2 rotate-[10deg] vial-3d-dark">
          <Image src="/products/vialimg/5-amino-1mq.png" alt="" width={224} height={280} sizes="240px" className="w-36 lg:w-56 h-auto" />
        </div>
        <div className="reveal relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-[2.2rem] text-white font-medium leading-snug mb-4 tracking-[-0.01em]">
            Built for research you can trust.
          </h2>
          <p className="text-white/90 text-base sm:text-lg mb-8 max-w-xl mx-auto">
            Browse 28+ research-grade peptides — independently tested, fully
            documented, and shipped within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/products" className="inline-flex items-center gap-2 bg-white text-ink-950 px-8 py-4 rounded-full font-semibold hover:bg-teal-50 transition-all">
              Browse Compounds
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 border border-white/40 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-20 sm:py-28 bg-soft-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-ink-950 tracking-[-0.02em]">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 mt-3 text-lg">Everything you need to know about our research compounds.</p>
          </div>
          <div className="divide-y divide-slate-200">
            {homeFaqs.map((f) => (
              <details key={f.q} className="group">
                <summary className="flex items-center justify-between gap-5 cursor-pointer list-none py-5 sm:py-6">
                  <span className="text-ink-950 font-display font-semibold text-base sm:text-lg">{f.q}</span>
                  <span className="shrink-0 text-teal-600 transition-transform duration-300 group-open:rotate-45">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <div className="pb-6 -mt-1 pr-9">
                  <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed">{f.a}</p>
                </div>
              </details>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/faq" className="inline-flex items-center gap-2 text-teal-600 font-semibold text-sm hover:text-teal-700">
              See all FAQs
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Affiliate band ===== */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2rem] bg-logo-gradient px-8 sm:px-12 py-10 sm:py-12 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-soft-lg">
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              <div className="absolute -top-16 -left-10 w-72 h-72 rounded-full blur-3xl" style={{ background: "rgba(255,255,255,0.16)" }} />
              <div className="absolute -bottom-20 right-0 w-72 h-72 rounded-full blur-3xl" style={{ background: "rgba(8,30,60,0.22)" }} />
            </div>
            <div className="relative text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-white mb-2 tracking-[-0.02em]">
                Refer researchers. Earn commission.
              </h2>
              <p className="text-white/90 max-w-lg">
                Share KJD BioLabs with your audience and earn on every
                qualifying order you send our way.
              </p>
            </div>
            <Link
              href="/affiliate"
              className="relative shrink-0 inline-flex items-center gap-2 bg-white text-ink-950 px-7 py-3.5 rounded-full font-semibold hover:bg-teal-50 hover:shadow-lg transition-all"
            >
              Become a Partner
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
