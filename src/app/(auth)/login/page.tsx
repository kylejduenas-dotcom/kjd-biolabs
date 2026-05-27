"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { AuthError, FieldLabel } from "@/components/auth/AuthCard";

type OAuthProvider = "google" | "apple";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [oauth, setOauth] = useState<OAuthProvider | null>(null);
  const [error, setError] = useState<string | null>(
    params.get("error") ? "Authentication failed. Please sign in again." : null
  );
  const redirect = params.get("redirect") || "/account";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    router.push(redirect);
    router.refresh();
  };

  const signInWith = async (provider: OAuthProvider) => {
    setOauth(provider);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirect)}` },
    });
    if (error) {
      // Most common cause: the provider isn't enabled yet in Supabase.
      setError(
        /not enabled|provider/i.test(error.message)
          ? `${provider === "google" ? "Google" : "Apple"} sign-in isn't enabled yet. Enable it in Supabase → Authentication → Providers.`
          : error.message
      );
      setOauth(null);
    }
    // On success the browser is redirected to the provider.
  };

  return (
    <div className="grid lg:grid-cols-2 min-h-[calc(100vh-4rem)]">
      {/* Brand panel */}
      <div className="hidden lg:flex relative bg-logo-gradient items-center justify-center overflow-hidden p-12">
        <div className="glow-blob -top-16 -left-10 w-96 h-96" style={{ background: "rgba(255,255,255,0.14)" }} />
        <div className="glow-blob -bottom-20 -right-10 w-96 h-96" style={{ background: "rgba(12,58,107,0.25)" }} />
        <div className="relative text-center">
          <div className="mb-10">
            <Image
              src="/products/vialimg/bpc-157.png"
              alt="BPC-157 research peptide vial"
              width={300}
              height={375}
              priority
              className="mx-auto h-auto w-[280px] vial-3d-dark"
            />
          </div>
          <h2 className="text-white font-display font-bold text-3xl leading-tight mb-3 max-w-sm mx-auto">
            Research-grade peptides,{" "}
            <em className="font-serif italic font-medium">independently verified.</em>
          </h2>
          <p className="text-white/90 text-sm">
            99%+ identity purity · third-party tested · CoA on request
          </p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center bg-white px-6 py-12 sm:px-12">
        <div className="w-full max-w-sm animate-fade-in">
          <Link href="/" className="inline-flex items-center mb-8" aria-label="KJD BioLabs home">
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

          <h1 className="text-ink-950 font-display font-extrabold text-3xl mb-1">Login</h1>
          <p className="text-slate-500 text-sm mb-6">Sign in to your KJD BioLabs researcher account.</p>

          {error && <AuthError message={error} />}

          <form onSubmit={handleLogin} className="space-y-4">
            <FieldLabel label="Email">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@laboratory.com"
                className="field-input"
              />
            </FieldLabel>
            <FieldLabel label="Password">
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="field-input pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  aria-label={showPw ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPw ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>
            </FieldLabel>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500/25" />
                Remember me
              </label>
              <Link href="/forgot-password" className="text-sm text-teal-600 font-medium hover:text-teal-700">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full font-semibold text-sm bg-logo-gradient text-white hover:shadow-lg hover:shadow-ink-950/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
            >
              {loading && <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
              Sign in
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <span className="h-px bg-slate-200 flex-1" />
            <span className="text-slate-400 text-xs">or</span>
            <span className="h-px bg-slate-200 flex-1" />
          </div>

          <div className="space-y-3">
            <button
              type="button"
              onClick={() => signInWith("google")}
              disabled={!!oauth}
              className="w-full py-3 rounded-full border border-slate-200 font-semibold text-sm text-ink-950 hover:bg-slate-50 transition-all inline-flex items-center justify-center gap-2.5 disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
              {oauth === "google" ? "Redirecting…" : "Sign in with Google"}
            </button>
          </div>

          <p className="text-center text-sm text-slate-500 mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-teal-600 font-semibold hover:text-teal-700">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
