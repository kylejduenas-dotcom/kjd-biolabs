// Promo codes. Each maps to a fraction off the subtotal (before shipping).
// The discount is ALWAYS resolved from this table server-side, so a client can
// never invent a bigger discount than what's defined here.
const COUPONS: Record<string, number> = {
  KJD20: 0.2, // 20% off
};

/** Normalised lookup of a code's discount rate (0 if unknown/empty). */
export function couponRate(code: string | null | undefined): number {
  if (!code) return 0;
  return COUPONS[code.trim().toUpperCase()] ?? 0;
}

export function isValidCoupon(code: string | null | undefined): boolean {
  return couponRate(code) > 0;
}

/** Dollar discount (rounded to cents) for a code applied to a subtotal. */
export function couponDiscount(code: string | null | undefined, subtotal: number): number {
  const rate = couponRate(code);
  if (rate <= 0) return 0;
  return Math.round(subtotal * rate * 100) / 100;
}

/** The canonical, upper-cased code if valid, else null. */
export function normalizeCoupon(code: string | null | undefined): string | null {
  if (!code) return null;
  const c = code.trim().toUpperCase();
  return COUPONS[c] !== undefined ? c : null;
}
