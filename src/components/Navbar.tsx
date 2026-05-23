"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-slate-200/70"
          : "bg-white/0 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-ink-950 flex items-center justify-center group-hover:bg-teal-600 transition-colors">
              <span className="text-white font-display font-bold text-base">
                K
              </span>
            </div>
            <span className="text-ink-950 font-display font-bold text-xl tracking-tight">
              KJD <span className="text-teal-600">BioLabs</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <NavLink href="/products">Products</NavLink>
            <NavLink href="/about">Quality</NavLink>
            <NavLink href="/contact">Contact</NavLink>
            <Link
              href="/products"
              className="ml-3 inline-flex items-center gap-2 bg-ink-950 hover:bg-teal-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:shadow-lg hover:shadow-ink-950/20"
            >
              Browse Catalog
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-ink-950 p-2"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-100">
          <div className="px-4 py-4 space-y-1">
            <Link href="/products" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-slate-700 hover:text-teal-600 text-sm font-medium rounded-lg hover:bg-slate-50">
              Products
            </Link>
            <Link href="/about" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-slate-700 hover:text-teal-600 text-sm font-medium rounded-lg hover:bg-slate-50">
              Quality
            </Link>
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-slate-700 hover:text-teal-600 text-sm font-medium rounded-lg hover:bg-slate-50">
              Contact
            </Link>
            <Link href="/products" onClick={() => setMobileOpen(false)} className="block bg-ink-950 text-white px-5 py-2.5 rounded-full text-sm font-semibold text-center mt-2">
              Browse Catalog
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="px-4 py-2 text-slate-600 hover:text-ink-950 transition-colors text-sm font-medium rounded-lg hover:bg-slate-100/70"
    >
      {children}
    </Link>
  );
}
