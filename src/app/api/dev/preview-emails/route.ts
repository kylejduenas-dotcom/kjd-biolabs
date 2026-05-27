import { NextResponse } from "next/server";
import { confirmationHtml, shippedHtml, type OrderRow, type LineItem, type LabelResult } from "@/lib/fulfillment";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// DEV-ONLY: renders the transactional emails with sample data so they can be
// visually reviewed, and optionally sends real copies via Resend (?send=addr).
// 404s in production so it can never be hit on the live site.

const sampleOrder: OrderRow = {
  id: "9f8b7c6d-1234-5678-9abc-def012345678",
  order_number: "KJD-2026-0428",
  email: "researcher@example.com",
  subtotal: 312.0, // discounted (bundle) subtotal stored on the order
  shipping_cost: 0,
  shipping_method: "Standard (USPS)",
  ships_by: "Wed, Apr 29 – Thu, Apr 30",
  delivery_estimate: "Mon, May 4 – Wed, May 6",
  shipping_name: "Dr. Jane Doe",
  shipping_address: "350 Fifth Avenue, Suite 400",
  shipping_city: "New York",
  shipping_state: "NY",
  shipping_zip: "10118",
  shipping_country: "United States",
  discount: 78.0, // KJD20 (20% off) applied — shows the promo line on the receipt
  coupon_code: "KJD20",
  confirmation_emailed_at: null,
  tracking_number: null,
  fulfilled_at: null,
};

// List prices higher than the stored subtotal so the "Bundle savings" line shows.
const sampleItems: LineItem[] = [
  { product_name: "BPC-157 — 5mg", unit_price: 79.0, quantity: 2 },
  { product_name: "TB-500 — 5mg", unit_price: 95.0, quantity: 1 },
  { product_name: "GHK-Cu — 50mg", unit_price: 89.0, quantity: 1 },
];

const sampleLabel: LabelResult = {
  tracking_number: "9405511899223197428490",
  tracking_url: "https://tools.usps.com/go/TrackConfirmAction?tLabels=9405511899223197428490",
  carrier: "USPS",
  label_url: "https://example.com/label.pdf",
};

function buildEmails() {
  const total = Number(sampleOrder.subtotal) + Number(sampleOrder.shipping_cost ?? 0);
  const orderRef = sampleOrder.order_number ?? sampleOrder.id.slice(0, 8).toUpperCase();
  return {
    confirmation: {
      subject: `Your KJD BioLabs order ${orderRef} is confirmed`,
      html: confirmationHtml(orderRef, sampleItems, total, sampleOrder),
    },
    shipped: {
      subject: `Your KJD BioLabs order ${orderRef} has shipped`,
      html: shippedHtml(orderRef, sampleLabel),
    },
  };
}

async function sendViaResend(to: string, subject: string, html: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  if (!apiKey || !from) return { ok: false, error: "RESEND_API_KEY / RESEND_FROM not set" };
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, subject, html }),
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

export async function GET(req: Request) {
  if (process.env.NODE_ENV === "production") {
    return new NextResponse("Not found", { status: 404 });
  }

  const url = new URL(req.url);
  const send = url.searchParams.get("send");
  const emails = buildEmails();

  if (send) {
    const results = {
      confirmation: await sendViaResend(send, emails.confirmation.subject, emails.confirmation.html),
      shipped: await sendViaResend(send, emails.shipped.subject, emails.shipped.html),
    };
    return NextResponse.json({ ok: true, sentTo: send, results });
  }

  // Visual preview: both emails stacked with labels.
  const page = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>KJD BioLabs — Email Preview</title>
<style>body{margin:0;background:#cbd5e1;font-family:Arial,sans-serif}.bar{position:sticky;top:0;background:#0a0e1a;color:#fff;padding:12px 20px;font-size:14px;z-index:10}.bar b{color:#2bc4e6}.section{padding:18px}.tag{max-width:600px;margin:0 auto 10px;color:#0a0e1a;font-weight:bold;font-size:13px;text-transform:uppercase;letter-spacing:.5px}</style>
</head><body>
<div class="bar">KJD BioLabs — email preview · <b>Order confirmation</b> + <b>Shipped</b> notification · sample data</div>
<div class="section"><div class="tag">1 · Order confirmation email</div>${emails.confirmation.html}</div>
<div class="section"><div class="tag">2 · Shipped / tracking email</div>${emails.shipped.html}</div>
</body></html>`;
  return new NextResponse(page, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
