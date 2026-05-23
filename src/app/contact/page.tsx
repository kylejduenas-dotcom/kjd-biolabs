"use client";

import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-navy-950 min-h-screen">
      <section className="py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Info */}
            <div className="lg:col-span-2">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
                Contact Us
              </h1>
              <p className="text-slate-400 leading-relaxed mb-8">
                Have questions about our products, need technical support, or
                want to discuss a bulk research order? Our team is here to help.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">Email</p>
                    <p className="text-slate-400 text-sm">
                      support@kjdbiolabs.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">
                      Response Time
                    </p>
                    <p className="text-slate-400 text-sm">
                      Within 24 business hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">Location</p>
                    <p className="text-slate-400 text-sm">United States</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="bg-navy-800/50 rounded-2xl border border-teal-500/20 p-12 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-teal-500/10 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-white font-semibold text-xl mb-2">
                    Message Sent
                  </h3>
                  <p className="text-slate-400 text-sm">
                    We&apos;ll get back to you within 24 business hours.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="bg-navy-800/50 rounded-2xl border border-white/5 p-8"
                >
                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full bg-navy-900 border border-white/5 rounded-xl py-2.5 px-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/25"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full bg-navy-900 border border-white/5 rounded-xl py-2.5 px-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/25"
                        placeholder="you@laboratory.com"
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className="block text-slate-300 text-sm font-medium mb-2">
                      Subject
                    </label>
                    <select className="w-full bg-navy-900 border border-white/5 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/25">
                      <option>Product Inquiry</option>
                      <option>Bulk Order</option>
                      <option>Technical Support</option>
                      <option>Certificate of Analysis Request</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="block text-slate-300 text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      className="w-full bg-navy-900 border border-white/5 rounded-xl py-2.5 px-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/25 resize-none"
                      placeholder="How can we help?"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-teal-500 to-teal-400 text-navy-950 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-teal-500/25 transition-all"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
