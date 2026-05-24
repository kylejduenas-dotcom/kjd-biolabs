"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { count, setOpen: setCartOpen } = useCart();
  const pathname = usePathname();
  const onDark = pathname === "/";

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

  const navBg = scrolled
    ? onDark
      ? "bg-deep-900/85 backdrop-blur-xl border-b border-white/10"
      : "bg-white/80 backdrop-blur-xl border-b border-slate-200/70"
    : "bg-transparent border-b border-transparent";

  const linkCls = onDark
    ? "text-slate-200/90 hover:text-white hover:bg-white/10"
    : "text-slate-600 hover:text-ink-950 hover:bg-slate-100/70";

  const ctaCls = onDark
    ? "bg-mint-400 text-deep-900 hover:bg-mint-300 hover:shadow-lg hover:shadow-mint-400/25"
    : "bg-ink-950 text-white hover:bg-teal-600 hover:shadow-lg hover:shadow-ink-950/20";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
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
              style={{ width: "auto", height: "2.25rem", filter: onDark ? "brightness(0) invert(1)" : undefined }}
            />
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <NavLink href="/products" cls={linkCls}>Products</NavLink>
            <NavLink href="/about" cls={linkCls}>Quality</NavLink>
            <NavLink href="/affiliate" cls={linkCls}>Affiliate</NavLink>
            <NavLink href="/contact" cls={linkCls}>Contact</NavLink>
            {user ? (
              <Link href="/account" className={`ml-2 inline-flex items-center gap-2 transition-colors text-sm font-medium px-4 py-2 rounded-lg ${linkCls}`}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Account
              </Link>
            ) : (
              <NavLink href="/login" cls={linkCls}>Sign in</NavLink>
            )}
            <button
              onClick={() => setCartOpen(true)}
              aria-label="Open cart"
              className={`relative ml-1 p-2.5 rounded-full transition-colors ${linkCls}`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-mint-400 text-deep-900 text-[10px] font-bold flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
            <Link href="/products" className={`ml-1 inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${ctaCls}`}>
              Browse Catalog
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 ${onDark ? "text-white" : "text-ink-950"}`}
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
        <div className={onDark ? "md:hidden bg-deep-900 border-t border-white/10" : "md:hidden bg-white border-t border-slate-100"}>
          <div className="px-4 py-4 space-y-1">
            <MobileLink href="/products" dark={onDark} onClick={() => setMobileOpen(false)}>Products</MobileLink>
            <MobileLink href="/about" dark={onDark} onClick={() => setMobileOpen(false)}>Quality</MobileLink>
            <MobileLink href="/affiliate" dark={onDark} onClick={() => setMobileOpen(false)}>Affiliate</MobileLink>
            <MobileLink href="/contact" dark={onDark} onClick={() => setMobileOpen(false)}>Contact</MobileLink>
            <MobileLink href={user ? "/account" : "/login"} dark={onDark} onClick={() => setMobileOpen(false)}>
              {user ? "Account" : "Sign in"}
            </MobileLink>
            <button
              onClick={() => { setMobileOpen(false); setCartOpen(true); }}
              className={`w-full text-left block px-3 py-2.5 text-sm font-medium rounded-lg ${onDark ? "text-slate-200 hover:bg-white/10" : "text-slate-700 hover:bg-slate-50"}`}
            >
              Cart{count > 0 ? ` (${count})` : ""}
            </button>
            <Link href="/products" onClick={() => setMobileOpen(false)} className={`block px-5 py-2.5 rounded-full text-sm font-semibold text-center mt-2 ${onDark ? "bg-mint-400 text-deep-900" : "bg-ink-950 text-white"}`}>
              Browse Catalog
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, cls, children }: { href: string; cls: string; children: React.ReactNode }) {
  return (
    <Link href={href} className={`px-4 py-2 transition-colors text-sm font-medium rounded-lg ${cls}`}>
      {children}
    </Link>
  );
}

function MobileLink({ href, dark, onClick, children }: { href: string; dark: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link href={href} onClick={onClick} className={`block px-3 py-2.5 text-sm font-medium rounded-lg ${dark ? "text-slate-200 hover:bg-white/10" : "text-slate-700 hover:text-teal-600 hover:bg-slate-50"}`}>
      {children}
    </Link>
  );
}
