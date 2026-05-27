"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "Product inquiry",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.from("contact_submissions").insert({
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
    });
    if (error) {
      setError("Something went wrong. Please try again, or email support@kjdbiolabs.com directly.");
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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-teal-700 font-semibold text-xs uppercase tracking-[0.18em] mb-4">Contact</p>
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-ink-950 tracking-[-0.02em] leading-[1.05] max-w-2xl">
            Talk to our research team.
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed max-w-xl mt-6">
            Questions about a compound, a Certificate of Analysis, or a bulk research order? Send a note and a specialist replies within one business day.
          </p>
        </div>
      </section>

      {/* Split panel */}
      <section className="py-14 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[0.82fr_1.18fr] rounded-[1.75rem] overflow-hidden border border-slate-200/80 shadow-soft-lg">
            {/* Direct contact — navy */}
            <div className="relative bg-ink-950 p-8 sm:p-10 lg:p-11 order-2 lg:order-1 overflow-hidden">
              <div
                className="absolute -top-16 -right-16 w-64 h-64 rounded-full blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(43,196,230,0.25), transparent 70%)" }}
                aria-hidden
              />
              <div className="relative">
                <h2 className="text-white font-serif font-semibold text-2xl tracking-[-0.01em] mb-8">
                  Reach us directly
                </h2>
                <div className="space-y-7">
                  <ContactItem
                    label="Email"
                    icon="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  >
                    <a href="mailto:support@kjdbiolabs.com" className="text-white font-medium hover:text-teal-300 transition-colors">
                      support@kjdbiolabs.com
                    </a>
                  </ContactItem>
                  <ContactItem
                    label="Response time"
                    icon="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  >
                    <span className="text-white font-medium">Within 24 business hours</span>
                  </ContactItem>
                  <ContactItem
                    label="Mailing address"
                    icon="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  >
                    <span className="text-white/90 leading-relaxed not-italic block">
                      KJD Capital LLC<br />
                      180 Talmadge Road, IGO Bldg Suite #545<br />
                      Edison, NJ 08817, United States
                    </span>
                  </ContactItem>
                </div>

                <div className="mt-10 pt-7 border-t border-white/10">
                  <p className="text-white/70 text-sm leading-relaxed">
                    Every batch ships with independent third-party testing. Ask us for the Certificate of Analysis on any product.
                  </p>
                </div>
              </div>
            </div>

            {/* Form — white */}
            <div className="bg-white p-8 sm:p-10 lg:p-11 order-1 lg:order-2">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-10">
                  <div className="relative w-16 h-16 mb-6">
                    <span className="absolute inset-0 rounded-full bg-teal-400/25 animate-ping-once" aria-hidden />
                    <span className="relative w-16 h-16 rounded-full bg-teal-500 flex items-center justify-center shadow-lg shadow-teal-500/30">
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  </div>
                  <h3 className="text-ink-950 font-serif font-semibold text-2xl tracking-[-0.01em] mb-2">
                    Message sent
                  </h3>
                  <p className="text-slate-500 text-[15px] max-w-xs">
                    Thanks for reaching out. A specialist will reply within one business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {error && (
                    <div className="mb-5 rounded-xl bg-red-50 border border-red-200 px-3.5 py-3 text-red-700 text-sm">
                      {error}
                    </div>
                  )}
                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    <Field label="Name">
                      <input
                        type="text"
                        required
                        placeholder="Your name"
                        className="form-input"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </Field>
                    <Field label="Email">
                      <input
                        type="email"
                        required
                        placeholder="you@laboratory.com"
                        className="form-input"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </Field>
                  </div>

                  <div className="mb-5">
                    <Field label="Subject">
                      <select
                        className="form-input"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      >
                        <option>Product inquiry</option>
                        <option>Bulk order</option>
                        <option>Technical support</option>
                        <option>Certificate of Analysis request</option>
                        <option>Other</option>
                      </select>
                    </Field>
                  </div>

                  <div className="mb-7">
                    <Field label="Message">
                      <textarea
                        required
                        rows={5}
                        placeholder="How can we help?"
                        className="form-input resize-none"
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                      />
                    </Field>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-ink-950 text-white py-3.5 rounded-full font-semibold text-[15px] hover:bg-teal-600 transition-all disabled:opacity-50 inline-flex items-center justify-center gap-2"
                  >
                    {loading && <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
                    {loading ? "Sending…" : "Send message"}
                  </button>
                  <p className="text-slate-400 text-xs text-center mt-4">
                    For laboratory research use only. We never share your details.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .form-input {
          width: 100%;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 0.85rem;
          padding: 0.75rem 1rem;
          font-size: 0.9375rem;
          color: #0a0e1a;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .form-input::placeholder { color: #94a3b8; }
        .form-input:focus {
          outline: none;
          border-color: #33a3e1;
          box-shadow: 0 0 0 3px rgba(18,135,210,0.16);
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  // Label wraps the control for implicit association (no id juggling needed).
  return (
    <label className="block">
      <span className="block text-ink-950 text-sm font-medium mb-2">{label}</span>
      {children}
    </label>
  );
}

function ContactItem({ label, icon, children }: { label: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
        <svg className="w-5 h-5 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icon} />
        </svg>
      </div>
      <div className="pt-0.5">
        <p className="text-white/50 text-[11px] font-semibold uppercase tracking-[0.14em] mb-1.5">{label}</p>
        <div className="text-sm">{children}</div>
      </div>
    </div>
  );
}
