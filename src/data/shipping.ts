// Single source of truth for shipping rates — imported by the checkout form
// AND the server payment routes, so the amount charged can never disagree
// with what the customer saw (and can't be tampered client-side).

export const FREE_SHIPPING_THRESHOLD = 150;

export interface ShippingOption {
  id: string;
  label: string;
  eta: string;
  cost: number;
  transitMin: number;
  transitMax: number;
}

export const SHIPPING_OPTIONS: ShippingOption[] = [
  { id: "standard", label: "Standard", eta: "3–5 business days", cost: 4.99, transitMin: 3, transitMax: 5 },
  { id: "express", label: "Express", eta: "1–2 business days", cost: 19.99, transitMin: 1, transitMax: 2 },
  { id: "overnight", label: "Overnight", eta: "Next business day", cost: 39.99, transitMin: 1, transitMax: 1 },
];

// Authoritative shipping cost for a stored order's method label + its subtotal.
// Mirrors the checkout UI exactly: free only on Standard at/above the threshold.
// Unknown/blank labels fall back to Standard (never undercharge silently).
export function shippingCostFor(methodLabel: string | null | undefined, subtotal: number): number {
  const opt = SHIPPING_OPTIONS.find((o) => o.label === methodLabel) ?? SHIPPING_OPTIONS[0];
  if (opt.label === "Standard" && subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  return opt.cost;
}
