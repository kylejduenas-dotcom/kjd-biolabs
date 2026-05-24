"use client";

import { useState } from "react";

type ProofType = "peak" | "trend" | "flat";

interface Dim {
  key: string;
  method: string;
  result: string;
  metric: string;
  desc: string;
  proof: ProofType;
}

const dims: Dim[] = [
  {
    key: "Potency",
    method: "HPLC Assay",
    result: "Confirmed label claim",
    metric: "10.0 mg ± 0.2",
    desc: "Every vial is assayed to confirm it contains exactly what the label states — down to the microgram. No guesswork on concentration.",
    proof: "peak",
  },
  {
    key: "Purity",
    method: "HPLC / Mass Spec",
    result: "≥99% — single dominant peak",
    metric: "99.7%",
    desc: "We confirm each compound is free of impurities, fragments, and synthesis byproducts. One clean peak, not a crowd.",
    proof: "peak",
  },
  {
    key: "Stability",
    method: "Forced Degradation",
    result: "Stable under stress",
    metric: "No significant change",
    desc: "Compounds are pushed under heat, light, and time to confirm they hold their integrity through storage and shipping.",
    proof: "trend",
  },
  {
    key: "Safety",
    method: "Endotoxin & Sterility",
    result: "Below detection limit",
    metric: "< 0.05 EU/mg",
    desc: "Each batch is screened for endotoxins and sterility so it meets the safety bar for laboratory research.",
    proof: "flat",
  },
  {
    key: "Consistency",
    method: "Batch-to-Batch",
    result: "Matches reference standard",
    metric: "100% overlay",
    desc: "Every production run is compared against our reference standard, so what you order matches what you reorder.",
    proof: "peak",
  },
];

function ProofChart({ type }: { type: ProofType }) {
  return (
    <svg viewBox="0 0 460 240" className="w-full h-auto" role="img" aria-label="Analysis proof">
      <defs>
        <linearGradient id="qp-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38bdee" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#38bdee" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {/* gridlines */}
      {[60, 100, 140, 180].map((y) => (
        <line key={y} x1="30" y1={y} x2="440" y2={y} stroke="#e2e8f0" strokeWidth="1" />
      ))}
      {/* axes */}
      <line x1="30" y1="200" x2="440" y2="200" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="30" y1="30" x2="30" y2="200" stroke="#94a3b8" strokeWidth="1.5" />

      {type === "peak" && (
        <>
          <path
            d="M30 198 L120 196 L150 194 L168 70 L186 194 L210 196 L300 195 L330 192 L360 196 L440 197 L440 200 L30 200 Z"
            fill="url(#qp-area)"
          />
          <path
            d="M30 198 L120 196 L150 194 L168 70 L186 194 L210 196 L300 195 L330 192 L360 196 L440 197"
            fill="none"
            stroke="#119fd9"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <circle cx="168" cy="70" r="3.5" fill="#0a7fb8" />
        </>
      )}
      {type === "trend" && (
        <>
          <path d="M30 120 L130 118 L230 122 L330 119 L440 121 L440 200 L30 200 Z" fill="url(#qp-area)" />
          <path d="M30 120 L130 118 L230 122 L330 119 L440 121" fill="none" stroke="#119fd9" strokeWidth="2.5" />
          {[30, 130, 230, 330, 440].map((x, i) => (
            <circle key={i} cx={x} cy={[120, 118, 122, 119, 121][i]} r="3.5" fill="#0a7fb8" />
          ))}
        </>
      )}
      {type === "flat" && (
        <>
          <line x1="30" y1="90" x2="440" y2="90" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="5 5" />
          <text x="436" y="84" textAnchor="end" fontSize="11" fill="#94a3b8">limit</text>
          <path d="M30 186 L120 184 L210 187 L300 185 L390 186 L440 185 L440 200 L30 200 Z" fill="url(#qp-area)" />
          <path d="M30 186 L120 184 L210 187 L300 185 L390 186 L440 185" fill="none" stroke="#119fd9" strokeWidth="2.5" />
        </>
      )}
    </svg>
  );
}

export default function QualityProof() {
  const [active, setActive] = useState(0);
  const d = dims[active];

  return (
    <div className="grid lg:grid-cols-5 gap-6 lg:gap-10 items-stretch">
      {/* Tabs */}
      <div className="lg:col-span-2 flex flex-col gap-2.5">
        {dims.map((dim, i) => (
          <button
            key={dim.key}
            onClick={() => setActive(i)}
            className={`text-left p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
              i === active
                ? "bg-ink-950 border-ink-950 text-white shadow-soft"
                : "bg-white border-slate-200 text-ink-950 hover:border-teal-300"
            }`}
          >
            <span>
              <span className="font-display font-bold block">{dim.key}</span>
              <span className={`text-xs ${i === active ? "text-slate-300" : "text-slate-400"}`}>{dim.method}</span>
            </span>
            <svg className={`w-4 h-4 shrink-0 transition-transform ${i === active ? "text-teal-400 translate-x-0" : "text-slate-300"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ))}
      </div>

      {/* Proof panel */}
      <div className="lg:col-span-3">
        <div className="h-full bg-white rounded-3xl border border-slate-200/80 shadow-soft p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="text-2xl font-display font-bold text-ink-950">{d.key}</h3>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                {d.method}
              </span>
            </div>
            <div className="text-right">
              <p className="text-2xl font-display font-extrabold text-water">{d.metric}</p>
              <p className="text-xs text-slate-400">{d.result}</p>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4 mb-4">
            <ProofChart type={d.proof} />
          </div>

          <p className="text-slate-500 text-sm leading-relaxed mb-4">{d.desc}</p>
          <div className="flex items-center gap-2 text-sm font-semibold text-teal-700">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Documented on the Certificate of Analysis for every batch
          </div>
        </div>
      </div>
    </div>
  );
}
