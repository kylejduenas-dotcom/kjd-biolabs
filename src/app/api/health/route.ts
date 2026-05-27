import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Reports which environment variables are PRESENT (booleans only — never the
// values). Visit /api/health after deploying to confirm your config. Safe to
// delete this route once everything is verified.
const has = (key: string) => Boolean(process.env[key] && String(process.env[key]).trim());

export async function GET() {
  const env = {
    NEXT_PUBLIC_SUPABASE_URL: has("NEXT_PUBLIC_SUPABASE_URL"),
    SUPABASE_SERVICE_ROLE_KEY: has("SUPABASE_SERVICE_ROLE_KEY"),
    NMI_SECURITY_KEY: has("NMI_SECURITY_KEY"),
    NEXT_PUBLIC_NMI_TOKENIZATION_KEY: has("NEXT_PUBLIC_NMI_TOKENIZATION_KEY"),
    COINBASE_API_KEY_ID: has("COINBASE_API_KEY_ID"),
    COINBASE_PRIVATE_KEY: has("COINBASE_PRIVATE_KEY"),
    SHIPPO_API_KEY: has("SHIPPO_API_KEY"),
    SHIP_FROM_NAME: has("SHIP_FROM_NAME"),
    SHIP_FROM_STREET1: has("SHIP_FROM_STREET1"),
    SHIP_FROM_CITY: has("SHIP_FROM_CITY"),
    SHIP_FROM_STATE: has("SHIP_FROM_STATE"),
    SHIP_FROM_ZIP: has("SHIP_FROM_ZIP"),
    RESEND_API_KEY: has("RESEND_API_KEY"),
    RESEND_FROM: has("RESEND_FROM"),
  };

  const ready = {
    supabase: env.NEXT_PUBLIC_SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY,
    cardPayments: env.NMI_SECURITY_KEY && env.NEXT_PUBLIC_NMI_TOKENIZATION_KEY,
    cryptoPayments: env.COINBASE_API_KEY_ID && env.COINBASE_PRIVATE_KEY,
    shippingLabels:
      env.SHIPPO_API_KEY &&
      env.SHIP_FROM_NAME &&
      env.SHIP_FROM_STREET1 &&
      env.SHIP_FROM_CITY &&
      env.SHIP_FROM_STATE &&
      env.SHIP_FROM_ZIP,
    emails: env.RESEND_API_KEY && env.RESEND_FROM,
  };

  return NextResponse.json({ ok: true, ready, env });
}
