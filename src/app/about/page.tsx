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
            Quality You Can Verify,{" "}
            <span className="text-teal-600">Not Just Trust.</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
            Every batch is independently tested by accredited U.S. laboratories.
            We don&apos;t ask you to take our word for it — we give you the
            proof.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-ink-950">
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
                <p className="text-slate-400 text-sm">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality checks */}
      <section className="py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-ink-950 mb-4">
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
                <div className="w-12 h-12 rounded-2xl bg-ink-950 text-teal-400 flex items-center justify-center shrink-0 text-lg font-display font-bold group-hover:bg-teal-600 group-hover:text-white transition-colors">
                  {i + 1}
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
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-ink-950 mb-6">
            About KJD BioLabs
          </h2>
          <div className="text-slate-600 leading-relaxed space-y-4 text-lg">
            <p>
              KJD BioLabs is a U.S.-based provider of research-grade peptides for
              qualified researchers and accredited laboratories. We specialize in
              high-purity lyophilized compounds with full analytical
              documentation.
            </p>
            <p>
              Every product in our catalog undergoes rigorous third-party
              identity and content testing with full documentation. Our quality
              procedures ensure that researchers receive compounds with verified
              identity purity of 99% or greater.
            </p>
            <p>
              We maintain documented quality procedures combined with competitive
              research-grade pricing — keeping high identity purity research
              supply accessible to laboratories of all sizes.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-ink-950 mb-6">
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
