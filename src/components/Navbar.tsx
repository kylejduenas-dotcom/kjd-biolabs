"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { count, setOpen: setCartOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_e, session) => setUser(session?.user ?? null));
    return () => subscription.unsubscribe();
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-xl border-b border-slate-200/70"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center group" aria-label="KJD BioLabs home">
            <Image
              src="/kjd-logo-horizontal.png"
              alt="KJD BioLabs"
              width={150}
              height={49}
              priority
              className="h-9 w-auto"
              style={{ width: "auto", height: "2.25rem" }}
            />
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <NavLink href="/products">Products</NavLink>
            <NavLink href="/about">Quality</NavLink>
            <NavLink href="/affiliate">Affiliate</NavLink>
            <NavLink href="/contact">Contact</NavLink>
            {user ? (
              <Link href="/account" className="ml-2 inline-flex items-center gap-2 text-slate-600 hover:text-ink-950 transition-colors text-sm font-medium px-4 py-2 rounded-lg hover:bg-slate-100/70">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Account
              </Link>
            ) : (
              <NavLink href="/login">Sign in</NavLink>
            )}
            <button onClick={() => setCartOpen(true)} aria-label="Open cart" className="relative ml-1 p-2.5 rounded-full text-slate-600 hover:text-ink-950 hover:bg-slate-100/70 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-teal-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
            <Link href="/products" className="ml-1 inline-flex items-center gap-2 bg-ink-950 hover:bg-teal-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:shadow-lg hover:shadow-teal-500/25">
              Browse Catalog
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-ink-950 p-2" aria-label="Toggle menu">
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
            <MobileLink href="/products" onClick={() => setMobileOpen(false)}>Products</MobileLink>
            <MobileLink href="/about" onClick={() => setMobileOpen(false)}>Quality</MobileLink>
            <MobileLink href="/affiliate" onClick={() => setMobileOpen(false)}>Affiliate</MobileLink>
            <MobileLink href="/contact" onClick={() => setMobileOpen(false)}>Contact</MobileLink>
            <MobileLink href={user ? "/account" : "/login"} onClick={() => setMobileOpen(false)}>{user ? "Account" : "Sign in"}</MobileLink>
            <button onClick={() => { setMobileOpen(false); setCartOpen(true); }} className="w-full text-left block px-3 py-2.5 text-slate-700 hover:text-teal-600 text-sm font-medium rounded-lg hover:bg-slate-50">
              Cart{count > 0 ? ` (${count})` : ""}
            </button>
            <Link href="/products" onClick={() => setMobileOpen(false)} className="block bg-ink-950 text-white px-5 py-2.5 rounded-full text-sm font-semibold text-center mt-2">Browse Catalog</Link>
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="px-4 py-2 text-slate-600 hover:text-ink-950 transition-colors text-sm font-medium rounded-lg hover:bg-slate-100/70">
      {children}
    </Link>
  );
}

function MobileLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link href={href} onClick={onClick} className="block px-3 py-2.5 text-slate-700 hover:text-teal-600 text-sm font-medium rounded-lg hover:bg-slate-50">
      {children}
    </Link>
  );
}
