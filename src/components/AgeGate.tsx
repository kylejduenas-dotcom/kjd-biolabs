"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function AgeGate({ children }: { children: React.ReactNode }) {
  const [verified, setVerified] = useState<boolean | null>(null);
  const [checks, setChecks] = useState({ age: false, researcher: false });

  useEffect(() => {
    const stored = sessionStorage.getItem("kjd-verified");
    setVerified(stored === "true");
  }, []);

  const handleEnter = () => {
    if (checks.age && checks.researcher) {
      sessionStorage.setItem("kjd-verified", "true");
      setVerified(true);
    }
  };

  if (verified === null) {
    return (
      <div className="min-h-screen bg-deep flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-mint-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (verified) return <>{children}</>;

  return (
    <div className="min-h-screen -mt-16 pt-16 bg-deep-hero flex items-center justify-center px-4 relative overflow-hidden text-white">
      <div className="absolute inset-0 starfield opacity-40 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-[28rem] h-[28rem] rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(111,224,205,0.18), transparent 70%)" }} />
        <div className="absolute -bottom-24 -right-24 w-[28rem] h-[28rem] rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(47,116,199,0.16), transparent 70%)" }} />
      </div>

      <div className="relative max-w-md w-full animate-fade-in">
        <div className="text-center mb-7">
          <Image
            src="/kjd-logo-stacked.png"
            alt="KJD BioLabs"
            width={120}
            height={120}
            priority
            className="mx-auto"
            style={{ width: "7rem", height: "auto", filter: "brightness(0) invert(1)" }}
          />
        </div>

        <div className="glass-card rounded-3xl p-8">
          <h2 className="text-white text-xl font-display font-bold mb-2">
            Researcher Verification
          </h2>
          <p className="text-slate-400 text-sm mb-6 leading-relaxed">
            Access to KJD BioLabs is limited to qualified researchers purchasing
            for laboratory and in vitro use only. Please confirm the following
            before you continue.
          </p>

          <div className="space-y-3 mb-6">
            <Check checked={checks.age} onChange={(v) => setChecks({ ...checks, age: v })}>
              I am at least <strong className="text-white">21 years of age</strong>.
            </Check>
            <Check checked={checks.researcher} onChange={(v) => setChecks({ ...checks, researcher: v })}>
              I confirm I am a{" "}
              <strong className="text-white">qualified researcher</strong>{" "}
              purchasing for{" "}
              <strong className="text-white">in vitro / laboratory research</strong>{" "}
              only &mdash; not for human or veterinary use.
            </Check>
          </div>

          <button
            onClick={handleEnter}
            disabled={!checks.age || !checks.researcher}
            className="w-full py-3.5 rounded-full font-semibold text-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-mint-400 text-deep-900 hover:bg-mint-300 hover:shadow-lg hover:shadow-mint-400/25 inline-flex items-center justify-center gap-2"
          >
            Enter KJD BioLabs
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>

          <p className="text-slate-500 text-xs mt-4 leading-relaxed">
            By proceeding you affirm the statements above are true. Products are
            not for human or veterinary use, not for use in diagnostic
            procedures, and have not been evaluated by the U.S. Food and Drug
            Administration.
          </p>
        </div>
      </div>
    </div>
  );
}

function Check({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <label
      className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
        checked ? "border-mint-400/50 bg-mint-400/10" : "border-white/10 hover:border-white/20"
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 w-4 h-4 rounded border-white/30 bg-white/10 text-mint-500 focus:ring-mint-400/25"
      />
      <span className="text-slate-300 text-sm leading-relaxed">{children}</span>
    </label>
  );
}
