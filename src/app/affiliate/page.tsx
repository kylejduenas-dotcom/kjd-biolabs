"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const steps = [
  {
    n: "1",
    title: "Apply & get approved",
    desc: "Tell us about your audience. Approved partners get a unique referral link and a dashboard.",
  },
  {
    n: "2",
    title: "Share your link",
    desc: "Promote KJD BioLabs to fellow researchers, labs, and your community with your tracked link.",
  },
  {
    n: "3",
    title: "Earn on every order",
    desc: "Earn commission on every qualifying order placed through your link — paid out on a reliable schedule.",
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
      <section className="bg-soft-cream border-b border-slate-200/70 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200/60 rounded-full px-4 py-1.5 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
            <span className="text-teal-700 text-xs font-semibold uppercase tracking-wider">
              Affiliate Program
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-ink-950 mb-5 leading-[0.97]">
            Earn with <span className="text-teal-600">KJD BioLabs</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Refer researchers and labs to premium, independently verified
            peptides — and earn commission on every order you send our way.
          </p>
          <a
            href="#apply"
            className="inline-flex items-center gap-2 bg-ink-950 text-white px-8 py-4 rounded-full font-semibold hover:bg-teal-600 transition-all mt-8"
          >
            Become a Partner
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-ink-950 mb-12 text-center">
            How it works
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((s) => (
              <div key={s.n} className="p-8 rounded-3xl bg-soft-cream border border-slate-200/70">
                <div className="w-12 h-12 rounded-2xl bg-ink-950 text-teal-400 flex items-center justify-center mb-5 text-lg font-display font-bold">
                  {s.n}
                </div>
                <h3 className="text-ink-950 font-display font-bold text-xl mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 sm:py-24 bg-soft-lavender">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-ink-950 mb-12 text-center">
            Why partner with us
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="bg-white rounded-3xl border border-slate-200/70 p-6">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-ink-950 font-semibold mb-1.5">{b.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply */}
      <section id="apply" className="py-20 sm:py-24">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-ink-950 mb-3 text-center">
            Apply to the program
          </h2>
          <p className="text-slate-500 text-center mb-8">
            Tell us a bit about you. We review every application and respond within 24 business hours.
          </p>

          {submitted ? (
            <div className="bg-soft-cream rounded-3xl border border-teal-200 p-10 text-center">
              <div className="w-16 h-16 rounded-2xl bg-teal-500 flex items-center justify-center mx-auto mb-5">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-ink-950 font-display font-bold text-xl mb-2">Application received</h3>
              <p className="text-slate-500 text-sm">
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
