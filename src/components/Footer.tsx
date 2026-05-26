import Link from "next/link";
import Image from "next/image";

const sitemap = [
  { label: "Products", href: "/products" },
  { label: "Quality", href: "/about" },
  { label: "Affiliate", href: "/affiliate" },
  { label: "Contact Us", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];

const legal = [
  { label: "Terms of Sale", href: "/terms" },
  { label: "Refund & Returns", href: "/refund" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Research Disclaimer", href: "/disclaimer" },
];

export default function Footer() {
  return (
    <footer className="bg-soft-cream text-slate-600 mt-auto border-t border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr] gap-12 lg:gap-10">
          {/* Brand block */}
          <div className="sm:col-span-2 lg:col-span-1 max-w-sm">
            <Image
              src="/kjd-logo-horizontal.png"
              alt="KJD BioLabs"
              width={190}
              height={62}
              className="mb-7"
              style={{ width: "auto", height: "2.75rem" }}
            />
            <p className="text-ink-950 font-display font-bold text-2xl sm:text-[1.7rem] leading-[1.18] tracking-tight">
              Research-grade peptides, third-party tested to 99%+ purity.
            </p>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 leading-relaxed mt-8">
              Part of the KJD Capital, LLC family of brands
            </p>
          </div>

          <FooterCol title="Sitemap" links={sitemap} />
          <FooterCol title="Legal" links={legal} />
        </div>
      </div>

      <div className="border-t border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} KJD BioLabs. All rights reserved.
          </p>
          <p className="text-xs text-slate-500 sm:text-right sm:max-w-2xl leading-relaxed">
            For laboratory research use only &mdash; not for human or veterinary use, and not evaluated by the U.S. Food &amp; Drug Administration.{" "}
            <Link href="/disclaimer" className="text-teal-600 hover:text-teal-700 underline">
              Full disclaimer
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-slate-500 font-semibold text-[11px] mb-5 uppercase tracking-[0.2em]">
        {title}
      </h3>
      <ul className="space-y-3.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="text-sm text-slate-600 hover:text-teal-600 transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
