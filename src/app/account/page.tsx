import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import LogoutButton from "@/components/auth/LogoutButton";

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, organization, email, created_at")
    .eq("id", user.id)
    .single();

  const name = profile?.full_name || user.email?.split("@")[0] || "Researcher";
  const memberSince = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-soft-cream border-b border-slate-200/70 py-14 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-teal-600 font-semibold text-sm mb-1">My Account</p>
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-ink-950">
              Welcome back, {name.split(" ")[0]}
            </h1>
          </div>
          <LogoutButton />
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-6">
          {/* Profile */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-soft p-7">
            <h2 className="text-ink-950 font-display font-bold text-lg mb-5">
              Profile
            </h2>
            <dl className="space-y-4">
              <Row label="Full name" value={profile?.full_name || "—"} />
              <Row label="Email" value={user.email || "—"} />
              <Row label="Organization" value={profile?.organization || "—"} />
              <Row label="Member since" value={memberSince} />
            </dl>
          </div>

          {/* Security & actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-soft p-7">
              <h2 className="text-ink-950 font-display font-bold text-lg mb-2">
                Security
              </h2>
              <p className="text-slate-500 text-sm mb-5">
                Update your password to keep your account secure.
              </p>
              <Link
                href="/forgot-password"
                className="inline-flex items-center gap-2 text-sm font-semibold text-teal-600 hover:text-teal-700"
              >
                Change password
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="rounded-3xl bg-ink-950 p-7 relative overflow-hidden">
              <div className="absolute inset-0 opacity-60" style={{ background: "radial-gradient(circle at 80% 20%, rgba(45,212,191,0.18), transparent 50%)" }} />
              <div className="relative">
                <h2 className="text-white font-display font-bold text-lg mb-2">
                  Browse the catalog
                </h2>
                <p className="text-slate-400 text-sm mb-5">
                  Explore our full range of research-grade peptides.
                </p>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 bg-teal-500 text-ink-950 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-teal-400 transition-all"
                >
                  View Products
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5 border-b border-slate-100 last:border-0">
      <dt className="text-slate-500 text-sm">{label}</dt>
      <dd className="text-ink-950 text-sm font-medium text-right">{value}</dd>
    </div>
  );
}
