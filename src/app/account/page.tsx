import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import LogoutButton from "@/components/auth/LogoutButton";
import { formatPrice } from "@/data/products";

interface OrderItem {
  product_name: string;
  quantity: number;
  unit_price: number;
}
interface OrderRow {
  id: string;
  order_number: string | null;
  status: string;
  subtotal: number;
  created_at: string;
  order_items: OrderItem[];
}

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

  const { data: ordersData } = await supabase
    .from("orders")
    .select("id, order_number, status, subtotal, created_at, order_items(product_name, quantity, unit_price)")
    .order("created_at", { ascending: false });
  const orders = (ordersData ?? []) as OrderRow[];

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
              <div className="absolute inset-0 opacity-60" style={{ background: "radial-gradient(circle at 80% 20%, rgba(18,135,210,0.22), transparent 50%)" }} />
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

      <section className="pb-16 sm:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-soft p-7">
            <h2 className="text-ink-950 font-display font-bold text-lg mb-5">
              Order History
            </h2>
            {orders.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-slate-500 text-sm mb-4">
                  You haven&apos;t placed any orders yet.
                </p>
                <Link href="/products" className="text-teal-600 font-semibold text-sm hover:text-teal-700">
                  Browse products &rarr;
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((o) => (
                  <div key={o.id} className="border border-slate-200/70 rounded-2xl p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-ink-950 font-mono font-medium text-sm">
                          {o.order_number ?? "#" + o.id.slice(0, 8).toUpperCase()}
                        </span>
                        <span className="text-slate-400 text-xs">
                          {new Date(o.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 capitalize">
                          {o.status}
                        </span>
                        <span className="text-ink-950 font-semibold text-sm">
                          {formatPrice(Number(o.subtotal))}
                        </span>
                      </div>
                    </div>
                    <div className="text-slate-500 text-sm space-y-1">
                      {o.order_items?.map((it, idx) => (
                        <div key={idx} className="flex justify-between gap-4">
                          <span>{it.quantity}&times; {it.product_name}</span>
                          <span className="text-slate-400">{formatPrice(Number(it.unit_price) * it.quantity)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
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
