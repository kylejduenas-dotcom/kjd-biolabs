"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import AuthCard, { AuthError, SubmitButton, FieldLabel } from "@/components/auth/AuthCard";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const signUpWithGoogle = async () => {
    setOauthLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback?next=/account` },
    });
    if (error) {
      setError(
        /not enabled|provider/i.test(error.message)
          ? "Google sign-up isn't enabled yet. Enable it in Supabase → Authentication → Providers."
          : error.message,
      );
      setOauthLoading(false);
    }
    // On success the browser is redirected to Google.
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: { full_name: fullName, organization },
      },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    // If confirmation is required, no session is returned yet.
    if (data.session) {
      window.location.href = "/account";
      return;
    }
    setSent(true);
    setLoading(false);
  };

  if (sent) {
    return (
      <AuthCard title="Check your email">
        <div className="text-center py-2">
          <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center mx-auto mb-5">
            <svg className="w-7 h-7 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">
            We sent a confirmation link to{" "}
            <strong className="text-ink-950">{email}</strong>. Click the link to
            activate your researcher account.
          </p>
          <Link
            href="/login"
            className="inline-block mt-6 text-teal-600 font-semibold text-sm hover:text-teal-700"
          >
            Back to sign in
          </Link>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Create your account"
      subtitle="Join as a qualified researcher to access our catalog."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="text-teal-600 font-semibold hover:text-teal-700">
            Sign in
          </Link>
        </>
      }
    >
      {error && <AuthError message={error} />}
      <form onSubmit={handleSignup} className="space-y-4">
        <FieldLabel label="Full name">
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Dr. Jane Doe"
            className="field-input"
          />
        </FieldLabel>
        <FieldLabel label="Organization / Laboratory">
          <input
            type="text"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            placeholder="Optional"
            className="field-input"
          />
        </FieldLabel>
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
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
            className="field-input"
          />
        </FieldLabel>
        <SubmitButton loading={loading}>Create Account</SubmitButton>
      </form>

      <div className="flex items-center gap-3 my-5">
        <span className="h-px bg-slate-200 flex-1" />
        <span className="text-slate-400 text-xs">or</span>
        <span className="h-px bg-slate-200 flex-1" />
      </div>
      <button
        type="button"
        onClick={signUpWithGoogle}
        disabled={oauthLoading || loading}
        className="w-full py-3 rounded-full border border-slate-200 font-semibold text-sm text-ink-950 hover:bg-slate-50 transition-all inline-flex items-center justify-center gap-2.5 disabled:opacity-50"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
        {oauthLoading ? "Redirecting…" : "Sign up with Google"}
      </button>

      <p className="text-slate-400 text-xs mt-4 leading-relaxed">
        By creating an account you confirm you are a qualified researcher
        purchasing for in vitro / laboratory research only.
      </p>
    </AuthCard>
  );
}
