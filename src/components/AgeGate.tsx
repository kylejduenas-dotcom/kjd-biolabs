"use client";

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
      <div className="min-h-screen bg-navy-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (verified) return <>{children}</>;

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-md w-full animate-fade-in">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">K</span>
          </div>
          <h1 className="text-white text-2xl font-bold tracking-tight">
            KJD <span className="text-teal-400">BioLabs</span>
          </h1>
        </div>

        <div className="bg-navy-800/80 backdrop-blur-xl rounded-2xl border border-white/5 p-8">
          <h2 className="text-white text-xl font-bold mb-2">
            Researcher Verification
          </h2>
          <p className="text-slate-400 text-sm mb-6 leading-relaxed">
            KJD BioLabs supplies research peptides exclusively to qualified
            researchers and laboratories for in vitro and laboratory use. Please
            confirm before continuing.
          </p>

          <div className="space-y-3 mb-6">
            <label className="flex items-start gap-3 p-3.5 rounded-xl border border-white/5 hover:border-teal-500/30 transition-colors cursor-pointer group">
              <input
                type="checkbox"
                checked={checks.age}
                onChange={(e) =>
                  setChecks({ ...checks, age: e.target.checked })
                }
                className="mt-0.5 w-4 h-4 rounded border-slate-600 text-teal-500 focus:ring-teal-500/25 bg-navy-900"
              />
              <span className="text-slate-300 text-sm group-hover:text-white transition-colors">
                I am at least <strong className="text-white">21 years of age</strong>.
              </span>
            </label>

            <label className="flex items-start gap-3 p-3.5 rounded-xl border border-white/5 hover:border-teal-500/30 transition-colors cursor-pointer group">
              <input
                type="checkbox"
                checked={checks.researcher}
                onChange={(e) =>
                  setChecks({ ...checks, researcher: e.target.checked })
                }
                className="mt-0.5 w-4 h-4 rounded border-slate-600 text-teal-500 focus:ring-teal-500/25 bg-navy-900"
              />
              <span className="text-slate-300 text-sm group-hover:text-white transition-colors">
                I confirm I am a{" "}
                <strong className="text-white">qualified researcher</strong>{" "}
                purchasing for{" "}
                <strong className="text-white">
                  in vitro / laboratory research
                </strong>{" "}
                only &mdash; not for human or veterinary use.
              </span>
            </label>
          </div>

          <button
            onClick={handleEnter}
            disabled={!checks.age || !checks.researcher}
            className="w-full py-3 rounded-xl font-semibold text-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-gradient-to-r from-teal-500 to-teal-400 text-navy-950 hover:shadow-lg hover:shadow-teal-500/25 hover:-translate-y-0.5 active:translate-y-0"
          >
            Enter KJD BioLabs &rarr;
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
