export const metadata = {
  title: "Privacy Policy | KJD BioLabs",
  description: "How KJD BioLabs collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="bg-ink-950 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white">
            Privacy Policy
          </h1>
          <p className="text-slate-400 mt-3">Last updated: May 2026</p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            <Section title="Information we collect">
              <p>We collect only what we need to operate the store and fulfill your orders:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Account information</strong> — name and email address when you register or check out.</li>
                <li><strong>Order &amp; shipping information</strong> — shipping address, order contents, and any notes you provide.</li>
                <li><strong>Communications</strong> — messages you send us through the contact form or support.</li>
                <li><strong>Automatically collected data</strong> — basic device, browser, and usage information needed to keep the site secure and working.</li>
              </ul>
            </Section>

            <Section title="How we use your information">
              <p>
                We use your information to process and ship orders, provide customer support, send order-related
                communications, prevent fraud and abuse, comply with legal obligations, and improve our products and
                services. We do not use your information for purposes unrelated to operating KJD BioLabs.
              </p>
            </Section>

            <Section title="Payment information">
              <p>
                Payments are handled by <strong>PCI-compliant third-party payment processors</strong> and, for
                cryptocurrency, by a third-party crypto-payment provider. KJD BioLabs <strong>does not store your full
                card number</strong> on our servers. Payment providers process your payment details under their own
                privacy and security practices.
              </p>
            </Section>

            <Section title="How we share information">
              <p>
                We <strong>do not sell or rent</strong> your personal information. We share it only as needed to run
                the business: with shipping carriers to deliver orders; with payment processors to complete
                transactions; with service providers (such as hosting and analytics) bound to protect it; when required
                by law or to protect our rights; and in connection with a business transfer such as a merger or
                acquisition.
              </p>
            </Section>

            <Section title="Cookies & analytics">
              <p>
                We use cookies and similar technologies to keep you signed in, remember your cart, and understand how
                the site is used so we can improve it. You can control cookies through your browser settings; disabling
                some cookies may affect site functionality.
              </p>
            </Section>

            <Section title="Data retention & security">
              <p>
                We retain personal information for as long as needed to provide our services and meet legal,
                accounting, or reporting requirements, then delete or anonymize it. We use reasonable administrative,
                technical, and physical safeguards to protect your information, though no method of transmission or
                storage is completely secure.
              </p>
            </Section>

            <Section title="Your choices & rights">
              <p>
                You may review or update your account information by signing in, and you may request access to,
                correction of, or deletion of your personal information by contacting us. Depending on where you live,
                you may have additional rights under applicable privacy laws.
              </p>
            </Section>

            <Section title="Age">
              <p>
                KJD BioLabs is intended for qualified researchers who are at least 21 years old. The site is not
                directed to minors, and we do not knowingly collect personal information from anyone under 18.
              </p>
            </Section>

            <Section title="Changes & contact">
              <p>
                We may update this Privacy Policy from time to time; the &ldquo;Last updated&rdquo; date reflects the
                most recent revision. Questions or requests? Reach us through our{" "}
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
