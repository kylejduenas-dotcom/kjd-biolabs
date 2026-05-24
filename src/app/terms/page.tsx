export const metadata = {
  title: "Terms of Sale & Service | KJD BioLabs",
  description: "The terms governing purchases from KJD BioLabs research-grade peptides.",
};

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="bg-soft-cream border-b border-slate-200/70 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-ink-950">
            Terms of Sale &amp; Service
          </h1>
          <p className="text-slate-500 mt-3">Last updated: May 2026</p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            <Section title="1. Agreement to these terms">
              <p>
                These Terms of Sale &amp; Service (the &ldquo;Terms&rdquo;) govern your access to and use of the
                KJD BioLabs website and your purchase of any products offered through it. By browsing the site,
                creating an account, or placing an order, you agree to be bound by these Terms. If you do not
                agree, please do not use the site or purchase our products. KJD BioLabs is a brand operated by
                KJD Capital LLC.
              </p>
            </Section>

            <Section title="2. Eligibility — qualified researchers only">
              <p>
                You must be at least <strong>21 years of age</strong> and a qualified researcher, or an authorized
                representative of a licensed laboratory or research institution, to purchase from KJD BioLabs. By
                placing an order you represent and warrant that you meet these requirements and that all information
                you provide is accurate. We may decline or cancel any order where eligibility cannot be reasonably
                established.
              </p>
            </Section>

            <Section title="3. Research use only">
              <p>
                All products are sold <strong>strictly for in&nbsp;vitro laboratory research use only</strong>. They
                are <strong>not for human or animal consumption</strong>, not drugs, supplements, or food, and are
                not intended for clinical, therapeutic, diagnostic, or cosmetic use. You assume full responsibility
                for handling, storing, and using all products lawfully, safely, and in accordance with their intended
                research purpose and all applicable laws. Reselling or redistributing products for non-research use is
                strictly prohibited.
              </p>
            </Section>

            <Section title="4. Products, pricing & availability">
              <p>
                Prices are listed in U.S. dollars and may change at any time without notice. We strive for accuracy,
                but product descriptions, specifications, images, and research citations are provided for informational
                purposes only and may contain errors; product images are illustrative. Each batch ships with a
                Certificate of Analysis reflecting independent third-party testing for that batch. We may limit,
                discontinue, or modify any product or quantity at our discretion.
              </p>
            </Section>

            <Section title="5. Orders & acceptance">
              <p>
                Your submission of an order is an offer to purchase. All orders are subject to acceptance by KJD
                BioLabs, and we reserve the right to refuse or cancel any order at our sole discretion — including
                orders that appear to be for unauthorized resale or for any use inconsistent with legitimate research.
                An order is not confirmed until payment has been successfully received and verified.
              </p>
            </Section>

            <Section title="6. Payment">
              <p>
                We accept payment by credit/debit card and, where available, cryptocurrency. Card payments are
                processed by PCI-compliant third-party payment providers; KJD BioLabs does not store your full card
                details on our servers. Cryptocurrency payments are processed through a third-party provider and are
                considered complete once confirmed on the relevant network. You agree to provide current, complete,
                and accurate billing information.
              </p>
            </Section>

            <Section title="7. Shipping">
              <p>
                We ship to addresses within the United States; international availability varies — contact us for
                details. Estimated ship and delivery dates shown at checkout are good-faith estimates, not guarantees.
                Orders include shipment protection at no additional cost. See our{" "}
                <a href="/refund" className="text-teal-600 hover:underline">Refund &amp; Returns Policy</a> for details
                on damaged, lost, or stolen shipments.
              </p>
            </Section>

            <Section title="8. Limitation of liability">
              <p>
                To the fullest extent permitted by law, KJD BioLabs and KJD Capital LLC shall not be liable for any
                damages, injuries, or losses resulting from the misuse of any product, nor for any indirect,
                incidental, special, consequential, or punitive damages arising out of or related to our products or
                services. Our total liability for any claim shall not exceed the amount you paid for the product giving
                rise to the claim.
              </p>
            </Section>

            <Section title="9. Indemnification">
              <p>
                You agree to indemnify and hold harmless KJD BioLabs, KJD Capital LLC, and their officers, directors,
                employees, and agents from any claims, damages, liabilities, or expenses arising from your misuse of
                our products or your breach of these Terms or any applicable law.
              </p>
            </Section>

            <Section title="10. Governing law & changes">
              <p>
                These Terms are governed by the laws of the state in which KJD Capital LLC is organized, without regard
                to conflict-of-law principles. We may update these Terms at any time; the &ldquo;Last updated&rdquo;
                date reflects the most recent revision, and continued use of the site constitutes acceptance of the
                current Terms.
              </p>
            </Section>

            <Section title="11. Contact">
              <p>
                Questions about these Terms? Reach us through our{" "}
                <a href="/contact" className="text-teal-600 hover:underline">contact page</a>.
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
