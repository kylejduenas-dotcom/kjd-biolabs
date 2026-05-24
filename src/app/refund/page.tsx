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
