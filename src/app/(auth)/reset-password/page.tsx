"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import AuthCard, { AuthError, SubmitButton, FieldLabel } from "@/components/auth/AuthCard";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    setDone(true);
    setLoading(false);
    setTimeout(() => {
      router.push("/account");
      router.refresh();
    }, 1500);
  };

  if (done) {
    return (
      <AuthCard title="Password updated">
        <div className="text-center py-2">
          <div className="w-14 h-14 rounded-2xl bg-teal-500 flex items-center justify-center mx-auto mb-5">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-slate-600 text-sm">
            Your password has been updated. Redirecting to your account…
          </p>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Set a new password"
      subtitle="Choose a strong password for your account."
      footer={
        <Link href="/login" className="text-teal-600 font-semibold hover:text-teal-700">
          Back to sign in
        </Link>
      }
    >
      {error && <AuthError message={error} />}
      <form onSubmit={handleUpdate} className="space-y-4">
        <FieldLabel label="New password">
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
            className="field-input"
          />
        </FieldLabel>
        <FieldLabel label="Confirm password">
          <input
            type="password"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Re-enter your password"
            className="field-input"
          />
        </FieldLabel>
        <SubmitButton loading={loading}>Update Password</SubmitButton>
      </form>
    </AuthCard>
  );
}
