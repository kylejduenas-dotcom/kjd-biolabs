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
      <section className="bg-navy-950 py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-6 tracking-tight">
            Quality You Can Verify,{" "}
            <span className="gradient-text">Not Just Trust</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Every batch is independently tested by accredited U.S. laboratories.
            We don&apos;t ask you to take our word for it — we give you the
            proof.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-navy-900 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold gradient-text mb-1">
                99%+
              </p>
              <p className="text-slate-400 text-sm">Purity Guaranteed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold gradient-text mb-1">
                5
              </p>
              <p className="text-slate-400 text-sm">Quality Checks</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold gradient-text mb-1">
                100%
              </p>
              <p className="text-slate-400 text-sm">U.S. Verified</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quality checks */}
      <section className="py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy-950 mb-4 tracking-tight">
            Five-Point Quality Protocol
          </h2>
          <p className="text-slate-500 text-lg mb-12 max-w-2xl">
            Each compound in our catalog undergoes a rigorous multi-step
            verification process before it reaches your lab.
          </p>

          <div className="space-y-6">
            {checks.map((check, i) => (
              <div
                key={check.title}
                className="group flex gap-6 p-6 rounded-2xl border border-slate-200 hover:border-teal-300 hover:shadow-lg hover:shadow-teal-500/5 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-navy-950 text-teal-400 flex items-center justify-center shrink-0 text-lg font-bold group-hover:bg-teal-500 group-hover:text-white transition-colors">
                  {i + 1}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-navy-950 font-semibold text-lg">
                      {check.title}
                    </h3>
                    <span className="text-xs font-medium text-teal-600 bg-teal-50 px-2.5 py-0.5 rounded-md">
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

      {/* About KJD */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy-950 mb-6 tracking-tight">
            About KJD BioLabs
          </h2>
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
            <p>
              KJD BioLabs is a U.S.-based provider of research-grade peptides
              for qualified researchers and accredited laboratories. We
              specialize in high-purity lyophilized compounds with full
              analytical documentation.
            </p>
            <p>
              Every product in our catalog undergoes rigorous third-party
              identity and content testing with full documentation. Our quality
              procedures ensure that researchers receive compounds with verified
              identity purity of 99% or greater.
            </p>
            <p>
              We maintain documented quality procedures combined with
              competitive research-grade pricing — keeping high identity purity
              research supply accessible to laboratories of all sizes.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-navy-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to explore our catalog?
          </h2>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-teal-400 text-navy-950 px-8 py-3.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-teal-500/25 transition-all"
          >
            Browse Products &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
