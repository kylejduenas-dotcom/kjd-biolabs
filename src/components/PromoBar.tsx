"use client";

import { useState, useEffect } from "react";

export default function PromoBar() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(sessionStorage.getItem("kjd-promo-dismissed") !== "1");
  }, []);

  if (!show) return null;

  return (
    <div className="relative bg-logo-gradient px-10 py-2.5 text-center text-white antialiased">
      <span className="inline-flex items-center gap-1.5 text-[13px] font-medium tracking-[0.005em]">
        <span><span className="font-semibold">20% off</span> your order. Use code</span>
        <span className="font-mono font-semibold text-[12px] tracking-[0.1em] rounded-md bg-white/20 px-1.5 py-0.5 leading-none">
          KJD20
        </span>
        <span className="hidden sm:inline">at checkout</span>
      </span>
      <button
        type="button"
        onClick={() => {
          sessionStorage.setItem("kjd-promo-dismissed", "1");
          setShow(false);
        }}
        aria-label="Dismiss promo"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 transition-colors hover:text-white"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
