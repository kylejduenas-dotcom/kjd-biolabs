"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

export interface NmiHandle {
  /** Tokenize the entered card and charge it against the given order. */
  startPayment: (orderId: string) => void;
}

interface NmiCardFieldsProps {
  onApproved: (orderId: string) => void;
  onError: (message: string) => void;
}

interface CollectJSResponse {
  token: string;
  tokenType?: string;
}
interface CollectJSStatic {
  configure: (config: Record<string, unknown>) => void;
  startPaymentRequest: () => void;
}
declare global {
  interface Window {
    CollectJS?: CollectJSStatic;
  }
}

const TOKENIZATION_KEY = process.env.NEXT_PUBLIC_NMI_TOKENIZATION_KEY;

/**
 * NMI Collect.js inline hosted card fields. The card data lives in
 * secure.nmi.com iframes (PCI SAQ-A); we only ever receive a one-time token,
 * which the parent forwards to /api/checkout/charge. Renders nothing unless
 * NEXT_PUBLIC_NMI_TOKENIZATION_KEY is set, so the live site is unaffected
 * until the merchant account + keys exist.
 */
const NmiCardFields = forwardRef<NmiHandle, NmiCardFieldsProps>(function NmiCardFields(
  { onApproved, onError },
  ref,
) {
  const [ready, setReady] = useState(false);
  const configuredRef = useRef(false);
  const orderIdRef = useRef<string | null>(null);

  // Keep latest callbacks reachable from the (once-configured) Collect.js closure.
  const onApprovedRef = useRef(onApproved);
  const onErrorRef = useRef(onError);
  onApprovedRef.current = onApproved;
  onErrorRef.current = onError;

  useEffect(() => {
    if (!TOKENIZATION_KEY) return;

    const configure = () => {
      if (configuredRef.current || !window.CollectJS) return;
      configuredRef.current = true;
      window.CollectJS.configure({
        variant: "inline",
        fields: {
          ccnumber: { selector: "#nmi-ccnumber", placeholder: "0000 0000 0000 0000" },
          ccexp: { selector: "#nmi-ccexp", placeholder: "MM / YY" },
          cvv: { selector: "#nmi-cvv", placeholder: "CVV" },
        },
        fieldsAvailableCallback: () => setReady(true),
        callback: async (response: CollectJSResponse) => {
          const orderId = orderIdRef.current;
          if (!orderId) {
            onErrorRef.current("Something went wrong starting payment. Please try again.");
            return;
          }
          try {
            const res = await fetch("/api/checkout/charge", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ orderId, paymentToken: response.token }),
            });
            const data = await res.json();
            if (res.ok && data.ok) onApprovedRef.current(orderId);
            else onErrorRef.current(data.error || "Your card could not be charged.");
          } catch {
            onErrorRef.current("Could not reach the payment server. Please try again.");
          }
        },
      });
    };

    // Inject Collect.js once; reuse if already present.
    const existing = document.querySelector<HTMLScriptElement>('script[data-nmi="1"]');
    if (existing) {
      if (window.CollectJS) configure();
      else existing.addEventListener("load", configure);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://secure.nmi.com/token/Collect.js";
    script.async = true;
    script.dataset.nmi = "1";
    script.setAttribute("data-tokenization-key", TOKENIZATION_KEY);
    script.setAttribute("data-variant", "inline");
    script.addEventListener("load", configure);
    document.head.appendChild(script);
    return () => script.removeEventListener("load", configure);
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      startPayment: (orderId: string) => {
        if (!window.CollectJS || !configuredRef.current) {
          onErrorRef.current("Payment form is still loading — please try again in a moment.");
          return;
        }
        orderIdRef.current = orderId;
        window.CollectJS.startPaymentRequest();
      },
    }),
    [],
  );

  if (!TOKENIZATION_KEY) return null;

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-7">
      <h2 className="font-display font-bold text-lg text-ink-950 mb-1">Payment</h2>
      <p className="text-slate-500 text-sm mb-5 inline-flex items-center gap-1.5">
        <svg className="w-3.5 h-3.5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0-1.105.895-2 2-2s2 .895 2 2m-8 0V7a4 4 0 118 0m-9 4h10a2 2 0 012 2v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6a2 2 0 012-2z" />
        </svg>
        Secure checkout · card details handled by NMI
      </p>
      <div className="space-y-4">
        <div>
          <label className="block text-ink-950 text-sm font-medium mb-1.5">Card number</label>
          <div id="nmi-ccnumber" className="nmi-field" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-ink-950 text-sm font-medium mb-1.5">Expiry</label>
            <div id="nmi-ccexp" className="nmi-field" />
          </div>
          <div>
            <label className="block text-ink-950 text-sm font-medium mb-1.5">CVV</label>
            <div id="nmi-cvv" className="nmi-field" />
          </div>
        </div>
      </div>
      {!ready && <p className="text-slate-400 text-xs mt-3">Loading secure payment fields…</p>}
      {/* Apple Pay / Google Pay: enabled during NMI merchant onboarding (requires
          Apple Pay domain verification + wallet settings in the NMI portal). The
          charge route already accepts wallet tokens, so this is a small add then. */}
    </div>
  );
});

export default NmiCardFields;
