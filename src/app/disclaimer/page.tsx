export default function DisclaimerPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="bg-soft-cream border-b border-slate-200/70 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-ink-950">
            Legal &amp; Disclaimers
          </h1>
          <p className="text-slate-500 mt-3">
            Last updated: May 2026
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-slate max-w-none space-y-12">
            {/* FDA Disclaimer */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-ink-950 mb-4 flex items-center gap-3">
                <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                FDA Disclaimer
              </h2>
              <div className="text-slate-700 text-sm leading-relaxed space-y-3">
                <p>
                  Statements made regarding our products have <strong>not been evaluated by the U.S. Food and Drug Administration</strong>. The efficacy of these products has not been confirmed by FDA-approved research. Products are <strong>not intended to diagnose, treat, cure, or prevent any disease</strong>.
                </p>
                <p>
                  Information presented on this website is not a substitute for, or alternative to, information from a qualified health care practitioner. Please consult a licensed health care professional regarding any potential interactions or complications before using any product.
                </p>
                <p>
                  This notice is required under the Federal Food, Drug, and Cosmetic Act.
                </p>
              </div>
            </div>

            {/* Research Use Only */}
            <div id="research-use">
              <h2 className="text-xl font-bold text-ink-950 mb-4">
                Research Use Only
              </h2>
              <div className="text-slate-600 text-sm leading-relaxed space-y-3">
                <p>
                  All products sold by KJD BioLabs are intended <strong>strictly for in vitro laboratory research use only</strong>. These products are:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>NOT intended for human consumption or use</li>
                  <li>NOT intended for veterinary use</li>
                  <li>NOT intended for use in food products or cosmetics</li>
                  <li>NOT intended for diagnostic procedures</li>
                  <li>NOT dietary supplements</li>
                  <li>NOT drugs and should not be treated as such</li>
                </ul>
                <p>
                  By purchasing any product from KJD BioLabs, the buyer acknowledges that they are a qualified researcher or represent a licensed laboratory, and that the products will be used exclusively for legitimate research purposes in accordance with all applicable local, state, and federal laws and regulations.
                </p>
                <p>
                  KJD BioLabs reserves the right to refuse sale to any individual or entity that we believe may use our products in a manner inconsistent with their intended research purpose.
                </p>
              </div>
            </div>

            {/* Product Information */}
            <div>
              <h2 className="text-xl font-bold text-ink-950 mb-4">
                Product Information Disclaimer
              </h2>
              <div className="text-slate-600 text-sm leading-relaxed space-y-3">
                <p>
                  Product descriptions, specifications, and research citations provided on this website are for informational purposes only. While we make every effort to ensure accuracy, KJD BioLabs does not guarantee the completeness or currentness of the information presented.
                </p>
                <p>
                  Certificates of Analysis (CoAs) are generated for each batch and reflect the results of testing performed by independent third-party laboratories. Results are specific to the batch tested and may vary between production runs within acceptable quality parameters.
                </p>
                <p>
                  Product images are for illustration purposes only and may not represent the exact appearance of the product received.
                </p>
              </div>
            </div>

            {/* Liability */}
            <div>
              <h2 className="text-xl font-bold text-ink-950 mb-4">
                Limitation of Liability
              </h2>
              <div className="text-slate-600 text-sm leading-relaxed space-y-3">
                <p>
                  KJD BioLabs shall not be held liable for any damages, injuries, or losses resulting from the misuse of any product purchased from our website. The buyer assumes full responsibility for the proper handling, storage, and use of all products in accordance with their intended research purpose and applicable safety guidelines.
                </p>
                <p>
                  In no event shall KJD BioLabs, its officers, directors, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to the use of our products or services.
                </p>
              </div>
            </div>

            {/* Privacy */}
            <div id="privacy">
              <h2 className="text-xl font-bold text-ink-950 mb-4">
                Privacy Policy
              </h2>
              <div className="text-slate-600 text-sm leading-relaxed space-y-3">
                <p>
                  KJD BioLabs respects your privacy and is committed to protecting your personal information. We collect only the information necessary to process orders, provide customer support, and improve our services.
                </p>
                <p>
                  We do not sell, trade, or otherwise transfer your personally identifiable information to third parties, except as required to fulfill orders (e.g., shipping carriers) or comply with legal obligations.
                </p>
                <p>
                  All payment processing is handled through secure, PCI-compliant third-party processors. KJD BioLabs does not store credit card information on our servers.
                </p>
                <p>
                  By using our website, you consent to our privacy practices as described herein.
                </p>
              </div>
            </div>

            {/* Terms */}
            <div id="terms">
              <h2 className="text-xl font-bold text-ink-950 mb-4">
                Terms of Service
              </h2>
              <div className="text-slate-600 text-sm leading-relaxed space-y-3">
                <p>
                  By accessing or using the KJD BioLabs website and purchasing our products, you agree to be bound by these Terms of Service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
                </p>
                <p>
                  KJD BioLabs reserves the right to modify, suspend, or discontinue any product or service at any time without prior notice. We also reserve the right to update these terms at any time, and it is your responsibility to review them periodically.
                </p>
                <p>
                  All orders are subject to acceptance by KJD BioLabs. We reserve the right to refuse or cancel any order at our sole discretion, including orders that appear to be placed by unauthorized resellers or for purposes inconsistent with legitimate research.
                </p>
              </div>
            </div>

            {/* Shipping & Returns */}
            <div>
              <h2 className="text-xl font-bold text-ink-950 mb-4">
                Shipping &amp; Returns
              </h2>
              <div className="text-slate-600 text-sm leading-relaxed space-y-3">
                <p>
                  All orders are shipped with shipment protection at no additional cost. If your product arrives damaged, lost, or stolen in transit, we will replace it at no cost to you.
                </p>
                <p>
                  Due to the nature of our products, returns of opened or reconstituted products are not accepted. Unopened products in their original sealed condition may be eligible for return within 30 days of delivery. Please contact our support team for return authorization.
                </p>
                <p>
                  KJD BioLabs ships to addresses within the United States. International shipping availability varies — please contact us for details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
