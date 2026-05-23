import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import CheckoutForm from "@/components/CheckoutForm";

export default async function CheckoutPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?redirect=/checkout");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-soft-cream border-b border-slate-200/70 py-12 sm:py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-ink-950">
            Checkout
          </h1>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <CheckoutForm
            userId={user.id}
            email={user.email ?? ""}
            defaultName={profile?.full_name ?? ""}
          />
        </div>
      </section>
    </div>
  );
}
