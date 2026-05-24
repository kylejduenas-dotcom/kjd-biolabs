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
    subject: "Product Inquiry",
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
      setError("Something went wrong. Please try again.");
      setLoading(false);
      return;
    }
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-soft-cream border-b border-slate-200/70 py-14 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-ink-950 mb-3">
            Contact Us
          </h1>
          <p className="text-slate-500 text-lg max-w-xl">
            Questions about our products, technical support, or a bulk research
            order? Our team is here to help.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Info */}
            <div className="lg:col-span-2 space-y-6">
              <InfoRow
                title="Email"
                value="support@kjdbiolabs.com"
                icon="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
              <InfoRow
                title="Response Time"
                value="Within 24 business hours"
                icon="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
              <InfoRow
                title="Location"
                value="United States"
                icon="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="bg-soft-cream rounded-3xl border border-teal-200 p-12 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-teal-500 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-ink-950 font-display font-bold text-xl mb-2">
                    Message Sent
                  </h3>
                  <p className="text-slate-500 text-sm">
                    We&apos;ll get back to you within 24 business hours.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-white rounded-3xl border border-slate-200/80 shadow-soft p-8"
                >
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
                        <option>Product Inquiry</option>
                        <option>Bulk Order</option>
                        <option>Technical Support</option>
                        <option>Certificate of Analysis Request</option>
                        <option>Other</option>
                      </select>
                    </Field>
                  </div>

                  <div className="mb-6">
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
                    className="w-full bg-ink-950 text-white py-3.5 rounded-full font-semibold hover:bg-teal-600 transition-all disabled:opacity-50 inline-flex items-center justify-center gap-2"
                  >
                    {loading && <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
                    {loading ? "Sending…" : "Send Message"}
                  </button>
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
          border-radius: 0.75rem;
          padding: 0.625rem 1rem;
          font-size: 0.875rem;
          color: #0a0e1a;
          transition: all 0.15s;
        }
        .form-input::placeholder { color: #94a3b8; }
        .form-input:focus {
          outline: none;
          border-color: #5a93d8;
          box-shadow: 0 0 0 2px rgba(47,116,199,0.15);
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-ink-950 text-sm font-medium mb-2">{label}</label>
      {children}
    </div>
  );
}

function InfoRow({ title, value, icon }: { title: string; value: string; icon: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-11 h-11 rounded-2xl bg-teal-50 flex items-center justify-center shrink-0">
        <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icon} />
        </svg>
      </div>
      <div>
        <p className="text-ink-950 font-semibold text-sm">{title}</p>
        <p className="text-slate-500 text-sm">{value}</p>
      </div>
    </div>
  );
}
