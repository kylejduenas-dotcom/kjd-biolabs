"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import AuthCard, { AuthError, SubmitButton, FieldLabel } from "@/components/auth/AuthCard";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    params.get("error") ? "Authentication failed. Please sign in again." : null
  );

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
    router.push(params.get("redirect") || "/account");
    router.refresh();
  };

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to your KJD BioLabs researcher account."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-teal-600 font-semibold hover:text-teal-700">
            Create one
          </Link>
        </>
      }
    >
      {error && <AuthError message={error} />}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <FieldLabel>Email</FieldLabel>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@laboratory.com"
            className="field-input"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <FieldLabel>Password</FieldLabel>
            <Link href="/forgot-password" className="text-xs text-teal-600 font-medium hover:text-teal-700">
              Forgot password?
            </Link>
          </div>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="field-input"
          />
        </div>
        <SubmitButton loading={loading}>Sign In</SubmitButton>
      </form>
    </AuthCard>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
