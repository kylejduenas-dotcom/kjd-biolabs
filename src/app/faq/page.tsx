import Link from "next/link";

const faqs = [
  {
    q: "Are these products safe for human or animal use?",
    a: "No. All KJD BioLabs products are sold strictly for in vitro laboratory and research use only. They are not intended for human or veterinary use, not for food or cosmetic purposes, and not for use in diagnostic procedures. By ordering, you confirm you are a qualified researcher.",
  },
  {
    q: "Do you provide a Certificate of Analysis (CoA)?",
    a: "Yes. Every batch is independently tested by accredited U.S. laboratories, and a Certificate of Analysis documenting identity and purity is available for each product. Request a CoA for a specific batch through our contact page.",
  },
  {
    q: "What purity can I expect?",
    a: "All research compounds in our catalog are guaranteed to 99%+ identity purity, verified via HPLC and mass spectrometry as part of our five-point quality protocol.",
  },
  {
    q: "How are products shipped and stored?",
    a: "Products ship as lyophilized (freeze-dried) powder with shipment protection on every order. For long-term stability, store lyophilized peptides at -20°C. Once reconstituted, most peptides are stable at 2–8°C for a limited period — refer to each product's storage notes.",
  },
  {
    q: "How do I reconstitute the peptides?",
    a: "Lyophilized peptides are typically reconstituted with bacteriostatic water, which we carry under Research Supplies. The exact volume depends on your research protocol and the desired concentration.",
  },
  {
    q: "How does payment work?",
    a: "After you place an order, we'll email you an order confirmation along with secure payment instructions. Orders are reviewed before fulfillment to confirm research eligibility.",
  },
  {
    q: "Do you ship internationally?",
    a: "We ship throughout the United States. International shipping availability varies by destination and compound — please contact us before ordering from outside the U.S.",
  },
  {
    q: "What is your return policy?",
    a: "Due to the nature of research materials, opened or reconstituted products cannot be returned. Unopened products in their original sealed condition may be eligible for return within 30 days of delivery — contact support for authorization.",
  },
];

export default function FAQPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="bg-soft-cream border-b border-slate-200/70 py-14 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-ink-950 mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-500 text-lg">
            Everything you need to know about ordering research-grade peptides
            from KJD BioLabs.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group bg-soft-cream border border-slate-200/70 rounded-2xl overflow-hidden"
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-6 py-5">
                <span className="text-ink-950 font-display font-semibold text-base sm:text-lg">
                  {faq.q}
                </span>
                <svg
                  className="w-5 h-5 text-slate-400 shrink-0 transition-transform group-open:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-5 -mt-1">
                <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-ink-950 p-8 sm:p-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-60" style={{ background: "radial-gradient(circle at 70% 30%, rgba(18,135,210,0.22), transparent 50%)" }} />
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-3">
                Still have questions?
              </h2>
              <p className="text-slate-400 mb-6">
                Our team responds within 24 business hours.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-teal-500 text-ink-950 px-7 py-3.5 rounded-full font-semibold hover:bg-teal-400 transition-all">
                Contact Us
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
