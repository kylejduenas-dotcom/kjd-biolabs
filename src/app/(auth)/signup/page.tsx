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
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

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
      <p className="text-slate-400 text-xs mt-4 leading-relaxed">
        By creating an account you confirm you are a qualified researcher
        purchasing for in vitro / laboratory research only.
      </p>
    </AuthCard>
  );
}
