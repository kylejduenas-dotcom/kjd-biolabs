"use client";

import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

const steps = [
  {
    n: "01",
    title: "Apply & get approved",
    desc: "Tell us about your audience. Approved partners get a unique referral link and a live dashboard.",
  },
  {
    n: "02",
    title: "Share your link",
    desc: "Promote KJD BioLabs to fellow researchers, labs, and your community with your tracked link.",
  },
  {
    n: "03",
    title: "Earn on every order",
    desc: "Earn commission on every qualifying order placed through your link — paid on a reliable schedule.",
  },
];

const benefits = [
  { title: "Competitive commission", desc: "Industry-leading rates on every qualifying sale you refer." },
  { title: "Reliable payouts", desc: "Get paid on a clear, predictable schedule — no surprises." },
  { title: "Marketing assets", desc: "Product imagery, copy, and Certificates of Analysis ready to share." },
  { title: "Dedicated support", desc: "A real person to help you grow your referrals and answer questions." },
];

export default function AffiliatePage() {
  const [form, setForm] = useState({ name: "", email: "", platform: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.from("contact_submissions").insert({
      name: form.name,
      email: form.email,
      subject: "Affiliate Application",
      message: `Platform/Audience: ${form.platform}\n\n${form.message}`,
    });
    if (error) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
      return;
    }
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200/60 bg-white">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="hidden lg:block absolute top-1/2 right-[12%] -translate-y-1/2 w-[30rem] h-[30rem] rounded-full" style={{ background: "radial-gradient(circle, rgba(43,196,230,0.10), transparent 70%)" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center py-16 sm:py-20">
          <div>
            <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-ink-950 leading-[0.98] mb-5">
              Earn with{" "}
              <em className="font-serif italic font-semibold text-ink-950">KJD BioLabs.</em>
            </h1>
            <p className="text-lg text-slate-600 max-w-lg leading-relaxed mb-8">
              Refer researchers and labs to premium, independently verified
              peptides — and earn commission on every order you send our way.
            </p>
            <a
              href="#apply"
              className="inline-flex items-center gap-2 bg-ink-950 text-white px-8 py-4 rounded-full font-semibold hover:bg-teal-600 transition-all"
            >
              Become a Partner
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </div>

          {/* Floating bottles */}
          <div className="relative hidden lg:block h-[360px]">
            <div className="absolute left-[12%] top-[14%] rotate-[-9deg] animate-float-slow vial-3d">
              <Image src="/products/vialimg/ghk-cu.png" alt="" width={150} height={188} className="w-[150px] h-auto" />
            </div>
            <div className="absolute right-[14%] bottom-[6%] rotate-[9deg] animate-float vial-3d" style={{ animationDelay: "0.9s" }}>
              <Image src="/products/vialimg/tb-500.png" alt="" width={142} height={178} className="w-[142px] h-auto" />
            </div>
            <div className="absolute left-[36%] top-[0%] rotate-[3deg] animate-float vial-3d z-10" style={{ animationDelay: "0.35s" }}>
              <Image src="/products/vialimg/bpc-157.png" alt="" width={188} height={235} className="w-[188px] h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 sm:py-24 bg-soft-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-ink-950 mb-12 text-center tracking-[-0.02em]">
            How it works
          </h2>
          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {steps.map((s) => (
              <div key={s.n}>
                <span className="font-serif text-4xl sm:text-5xl text-teal-600 font-medium leading-none">{s.n}</span>
                <h3 className="text-ink-950 font-display font-bold text-xl mt-4 mb-2">{s.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-ink-950 mb-12 text-center tracking-[-0.02em]">
            Why partner with us
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-3xl border border-slate-200/70 bg-soft-cream p-6">
                <svg className="w-6 h-6 text-teal-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-ink-950 font-display font-bold mb-1.5">{b.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply */}
      <section id="apply" className="py-20 sm:py-24 bg-soft-cream">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-ink-950 mb-3 text-center tracking-[-0.02em]">
            Apply to the program
          </h2>
          <p className="text-slate-600 text-center mb-8">
            Tell us a bit about you. We review every application and respond within 24 business hours.
          </p>

          {submitted ? (
            <div className="bg-white rounded-3xl border border-teal-200 p-10 text-center shadow-soft">
              <div className="w-16 h-16 rounded-2xl bg-teal-500 flex items-center justify-center mx-auto mb-5">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-ink-950 font-display font-bold text-xl mb-2">Application received</h3>
              <p className="text-slate-600 text-sm">
                Thanks for your interest — we&apos;ll review it and get back to you within 24 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200/80 shadow-soft p-8 space-y-5">
              {error && (
                <div className="rounded-xl bg-red-50 border border-red-200 px-3.5 py-3 text-red-700 text-sm">{error}</div>
              )}
              <div>
                <label className="block text-ink-950 text-sm font-medium mb-1.5">Name</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="field-input" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-ink-950 text-sm font-medium mb-1.5">Email</label>
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="field-input" placeholder="you@email.com" />
              </div>
              <div>
                <label className="block text-ink-950 text-sm font-medium mb-1.5">Your platform / audience</label>
                <input required value={form.platform} onChange={(e) => setForm({ ...form, platform: e.target.value })} className="field-input" placeholder="e.g. YouTube channel, lab network, newsletter" />
              </div>
              <div>
                <label className="block text-ink-950 text-sm font-medium mb-1.5">Tell us more</label>
                <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="field-input resize-none" placeholder="How do you plan to promote KJD BioLabs?" />
              </div>
              <button type="submit" disabled={loading} className="w-full bg-ink-950 text-white py-3.5 rounded-full font-semibold hover:bg-teal-600 transition-all disabled:opacity-50 inline-flex items-center justify-center gap-2">
                {loading && <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
                {loading ? "Submitting…" : "Submit Application"}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
