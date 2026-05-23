"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <span className="text-white font-semibold text-lg tracking-tight">
              KJD <span className="text-teal-400">BioLabs</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/products"
              className="text-slate-300 hover:text-teal-400 transition-colors text-sm font-medium"
            >
              Products
            </Link>
            <Link
              href="/about"
              className="text-slate-300 hover:text-teal-400 transition-colors text-sm font-medium"
            >
              Quality
            </Link>
            <Link
              href="/contact"
              className="text-slate-300 hover:text-teal-400 transition-colors text-sm font-medium"
            >
              Contact
            </Link>
            <Link
              href="/products"
              className="bg-teal-500 hover:bg-teal-400 text-navy-950 px-5 py-2 rounded-lg text-sm font-semibold transition-all hover:shadow-lg hover:shadow-teal-500/25"
            >
              Browse Catalog
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-slate-300 hover:text-white"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden glass-dark border-t border-white/5">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/products"
              onClick={() => setMobileOpen(false)}
              className="block text-slate-300 hover:text-teal-400 text-sm font-medium"
            >
              Products
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              className="block text-slate-300 hover:text-teal-400 text-sm font-medium"
            >
              Quality
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="block text-slate-300 hover:text-teal-400 text-sm font-medium"
            >
              Contact
            </Link>
            <Link
              href="/products"
              onClick={() => setMobileOpen(false)}
              className="block bg-teal-500 text-navy-950 px-5 py-2 rounded-lg text-sm font-semibold text-center"
            >
              Browse Catalog
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
