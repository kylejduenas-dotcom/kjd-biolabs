import Link from "next/link";

const checks = [
  {
    title: "Potency",
    method: "HPLC Analysis",
    desc: "Every vial is tested to confirm it contains exactly what the label says — down to the microgram.",
  },
  {
    title: "Purity",
    method: "Mass Spectrometry",
    desc: "We verify that each compound is free from impurities, contaminants, and unwanted byproducts.",
  },
  {
    title: "Stability",
    method: "Accelerated Degradation Testing",
    desc: "Compounds are tested under stress conditions to ensure they maintain integrity during storage and transit.",
  },
  {
    title: "Safety",
    method: "Endotoxin & Sterility Screening",
    desc: "Every batch is screened to ensure it meets laboratory safety standards for research applications.",
  },
  {
    title: "Consistency",
    method: "Batch-to-Batch Comparison",
    desc: "We run comparative analysis across production runs to guarantee uniform quality.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-soft-cream border-b border-slate-200/70 py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-ink-950 mb-6 leading-[0.95]">
            Proof in{" "}
            <em className="font-serif italic font-semibold text-ink-950">every vial.</em>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
            We don&apos;t ask for blind trust. Every batch is independently
            tested by accredited U.S. labs, and the full results are yours to
            review.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-logo-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-3 gap-8">
            {[
              { v: "99%+", l: "Purity Guaranteed" },
              { v: "5", l: "Quality Checks" },
              { v: "100%", l: "U.S. Verified" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <p className="text-4xl sm:text-5xl font-display font-extrabold text-white mb-1">
                  {s.v}
                </p>
                <p className="text-white/70 text-sm">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality checks */}
      <section className="py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-serif font-semibold text-ink-950 mb-4 tracking-[-0.02em]">
            Five-Point Quality Protocol
          </h2>
          <p className="text-slate-500 text-lg mb-12 max-w-2xl">
            Each compound in our catalog undergoes a rigorous multi-step
            verification process before it reaches your lab.
          </p>

          <div className="space-y-4">
            {checks.map((check, i) => (
              <div
                key={check.title}
                className="group flex gap-6 p-6 rounded-3xl bg-soft-cream border border-slate-200/70 hover:shadow-soft hover:-translate-y-0.5 transition-all"
              >
                <div className="shrink-0 w-10 text-center pt-0.5">
                  <span className="font-serif text-3xl sm:text-4xl text-teal-600 font-medium leading-none">{i + 1}</span>
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-ink-950 font-display font-bold text-xl">
                      {check.title}
                    </h3>
                    <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full">
                      {check.method}
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {check.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 sm:py-28 bg-soft-lavender">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-serif font-semibold text-ink-950 mb-6 tracking-[-0.02em]">
            About KJD BioLabs
          </h2>
          <div className="text-slate-600 leading-relaxed space-y-4 text-lg">
            <p>
              KJD BioLabs supplies high-purity lyophilized peptides to qualified
              researchers and accredited labs across the United States. Our focus
              is narrow on purpose: do research-grade compounds, and do them
              right.
            </p>
            <p>
              Before any product reaches you, it passes independent identity and
              content testing — and the analytical results travel with it. No
              guesswork about what's in the vial.
            </p>
            <p>
              Rigorous documentation and fair, research-friendly pricing aren't a
              trade-off here. We built KJD BioLabs so labs of any size can get
              consistent, verified material without paying a premium for it.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-ink-950 mb-6 tracking-[-0.02em]">
            Ready to explore our catalog?
          </h2>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-ink-950 text-white px-8 py-4 rounded-full font-semibold hover:bg-teal-600 transition-all"
          >
            Browse Products
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
