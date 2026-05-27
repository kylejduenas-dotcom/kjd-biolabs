// Homepage social-proof band.
//
// IMPORTANT: the quotes below are PLACEHOLDERS. Replace them with real,
// verifiable customer testimonials (with permission) before relying on this
// section — publishing fabricated reviews violates FTC rules. Keep quotes about
// quality, documentation, purity, and service. Never about research outcomes,
// effects, or anything that reads as a health/efficacy claim.

interface Testimonial {
  quote: string;
  name: string;
  detail: string;
  initials: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Every batch arrives with a Certificate of Analysis that matches. That consistency is why we standardized on KJD for our reference materials.",
    name: "Lab Manager",
    detail: "Academic research group",
    initials: "LM",
  },
  {
    quote:
      "Ordered Friday, on the bench Tuesday. The lyophilized vials are sealed properly and the paperwork is always complete.",
    name: "Independent Researcher",
    detail: "Private laboratory",
    initials: "IR",
  },
  {
    quote:
      "Identity and purity figures line up with the certificate every time. Documentation this clean saves us real validation work.",
    name: "Principal Investigator",
    detail: "Biotech laboratory",
    initials: "PI",
  },
];

export default function TrustedByResearchers() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal mb-12 max-w-2xl sm:mb-16">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
            Trusted by researchers
          </p>
          <h2 className="font-serif text-3xl font-semibold leading-tight tracking-[-0.02em] text-ink-950 sm:text-4xl">
            Reliability you can build a protocol on.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-500">
            From purity verification to complete documentation and fast turnaround,
            KJD BioLabs is built to be a dependable bench partner.
          </p>
        </div>

        <div className="reveal grid grid-cols-1 gap-5 md:grid-cols-3 sm:gap-6">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-3xl border border-slate-200/70 bg-soft-cream p-7 sm:p-8"
            >
              <div className="mb-4 flex items-center gap-0.5" role="img" aria-label="Rated 5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="h-4 w-4 text-amber-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <blockquote className="flex-1 text-[15px] leading-relaxed text-ink-950">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink-950 text-sm font-bold text-white">
                  {t.initials}
                </span>
                <span className="leading-tight">
                  <span className="block text-sm font-semibold text-ink-950">{t.name}</span>
                  <span className="block text-xs text-slate-500">{t.detail}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
