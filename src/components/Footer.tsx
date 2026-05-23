import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ink-950 text-slate-400 mt-auto">
      {/* FDA Disclaimer banner */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div>
                <p className="text-amber-400 font-semibold text-xs uppercase tracking-wider mb-1.5">
                  FDA Disclaimer
                </p>
                <p className="text-slate-400 text-xs leading-relaxed">
                  These products are intended for laboratory research use only.
                  They are not intended for human or veterinary use, for food or
                  cosmetic purposes, or for use in diagnostic procedures.
                  Statements made regarding these products have not been
                  evaluated by the U.S. Food and Drug Administration. These
                  products are not intended to diagnose, treat, cure, or prevent
                  any disease.{" "}
                  <Link href="/disclaimer" className="text-teal-400 hover:text-teal-300 underline">
                    Read the full disclaimer &rarr;
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center">
                <span className="text-white font-display font-bold text-base">K</span>
              </div>
              <span className="text-white font-display font-bold text-xl tracking-tight">
                KJD <span className="text-teal-400">BioLabs</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Premium research-grade peptides for qualified researchers and
              laboratories. Every batch third-party tested with Certificate of
              Analysis.
            </p>
          </div>

          <FooterCol title="Shop" links={[
            { label: "All Products", href: "/products" },
            { label: "Peptide Blends", href: "/products" },
          ]} />
          <FooterCol title="Support" links={[
            { label: "Contact Us", href: "/contact" },
            { label: "Quality Assurance", href: "/about" },
          ]} />
          <FooterCol title="Legal" links={[
            { label: "Disclaimer", href: "/disclaimer" },
            { label: "Research Use Only", href: "/disclaimer#research-use" },
            { label: "Privacy Policy", href: "/disclaimer#privacy" },
            { label: "Terms of Service", href: "/disclaimer#terms" },
          ]} />
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} KJD BioLabs. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-slate-500">
            <Badge label="SSL Secured" />
            <Badge label="99%+ Purity" />
            <Badge label="Shipment Protection" />
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-white font-semibold text-xs mb-4 uppercase tracking-wider">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="text-sm hover:text-teal-400 transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Badge({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <svg className="w-3.5 h-3.5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {label}
    </span>
  );
}
