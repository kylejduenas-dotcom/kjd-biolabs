"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import AuthCard, { AuthError, SubmitButton, FieldLabel } from "@/components/auth/AuthCard";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
    });
    if (error) {
      setError(error.message);
      setLoading(false);
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
            If an account exists for{" "}
            <strong className="text-ink-950">{email}</strong>, we&apos;ve sent a
            password reset link. Check your inbox.
          </p>
          <Link href="/login" className="inline-block mt-6 text-teal-600 font-semibold text-sm hover:text-teal-700">
            Back to sign in
          </Link>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Reset your password"
      subtitle="Enter your email and we'll send you a link to reset your password."
      footer={
        <Link href="/login" className="text-teal-600 font-semibold hover:text-teal-700">
          Back to sign in
        </Link>
      }
    >
      {error && <AuthError message={error} />}
      <form onSubmit={handleReset} className="space-y-4">
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
        <SubmitButton loading={loading}>Send Reset Link</SubmitButton>
      </form>
    </AuthCard>
  );
}
