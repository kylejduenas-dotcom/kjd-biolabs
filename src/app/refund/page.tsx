export const metadata = {
  title: "Refund & Returns Policy | KJD BioLabs",
  description: "How cancellations, replacements, and returns work at KJD BioLabs.",
};

export default function RefundPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="bg-soft-cream border-b border-slate-200/70 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-ink-950">
            Refund &amp; Returns Policy
          </h1>
          <p className="text-slate-500 mt-3">Last updated: May 2026</p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            {/* Guarantee callout */}
            <div className="rounded-3xl bg-logo-gradient p-7 sm:p-9 relative overflow-hidden">
              <div className="absolute -right-12 -top-12 w-56 h-56 rounded-full border border-white/15" />
              <div className="relative flex items-start gap-4">
                <span className="w-12 h-12 rounded-2xl bg-white/15 ring-1 ring-white/30 backdrop-blur-sm flex items-center justify-center shrink-0 text-white">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </span>
                <div>
                  <h2 className="text-white font-display font-bold text-2xl mb-1.5">30-Day Money-Back Guarantee</h2>
                  <p className="text-white/85 text-sm leading-relaxed">
                    Order with confidence. If you&rsquo;re not satisfied, return any unopened product in its original
                    sealed condition within 30 days of delivery for a full refund. Every batch is also backed by our
                    quality guarantee — if a product doesn&rsquo;t match its Certificate of Analysis, we&rsquo;ll
                    replace it or refund you.
                  </p>
                </div>
              </div>
            </div>

            <Section title="Overview">
              <p>
                We want you to be confident ordering from KJD BioLabs. Because our products are research reagents
                whose integrity depends on careful handling and an unbroken seal, this policy explains exactly when an
                order can be cancelled, replaced, returned, or refunded.
              </p>
            </Section>

            <Section title="Order cancellations">
              <p>
                You may request cancellation of an order at any time <strong>before it ships</strong> for a full
                refund. Once an order has been handed to the carrier, it can no longer be cancelled, but it may be
                eligible for the protections below. To cancel, contact us as soon as possible with your order number.
              </p>
            </Section>

            <Section title="Damaged, lost, or stolen shipments">
              <p>
                Every order includes <strong>shipment protection at no extra cost</strong>. If your package arrives
                damaged, or is lost or stolen in transit, we will replace it at no charge or, where a replacement is
                unavailable, issue a refund. Report any issue within <strong>7 days</strong> of the delivery (or
                expected delivery) date and include your order number and, for damage, a photo of the package and
                product.
              </p>
            </Section>

            <Section title="Returns of unopened products">
              <p>
                Unopened products in their original, sealed condition may be eligible for return within{" "}
                <strong>30 days</strong> of delivery. Returns require advance authorization — contact us for a return
                authorization before sending anything back. Approved returns are refunded once we receive and inspect
                the product. Return shipping costs are the buyer&rsquo;s responsibility unless the return is due to our
                error.
              </p>
            </Section>

            <Section title="Non-returnable items">
              <p>
                For safety and to protect research integrity, we <strong>cannot accept returns</strong> of products
                that have been opened, reconstituted, or otherwise had their seal broken, nor of custom or
                special-order items. Such products are non-refundable except under the shipment-protection terms above.
              </p>
            </Section>

            <Section title="Refunds">
              <p>
                Approved refunds are issued to the <strong>original payment method</strong> and typically post within
                5–10 business days after approval, depending on your card issuer or bank. For orders paid by
                cryptocurrency, refunds are issued in the U.S.-dollar equivalent, either to a payment method you
                provide or as store credit, since crypto transactions cannot be reversed.
              </p>
            </Section>

            <Section title="How to request">
              <p>
                To request a cancellation, replacement, return authorization, or refund, reach our support team
                through our <a href="/contact" className="text-teal-600 hover:underline">contact page</a> with your
                order number and a brief description. We aim to respond within one business day.
              </p>
            </Section>
          </div>
        </div>
      </section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-ink-950 mb-4">{title}</h2>
      <div className="text-slate-600 text-sm leading-relaxed space-y-3">{children}</div>
    </div>
  );
}
