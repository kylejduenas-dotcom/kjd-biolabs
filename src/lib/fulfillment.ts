import type { SupabaseClient } from "@supabase/supabase-js";
import { formatPrice } from "@/data/products";

// Default parcel for research-peptide vials (small + light). Tune via env if needed.
const PARCEL = { length: "6", width: "4", height: "2", distance_unit: "in", mass_unit: "lb" };

function esc(s: string | null | undefined): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

interface OrderRow {
  id: string;
  order_number: string | null;
  email: string | null;
  subtotal: number;
  shipping_cost: number | null;
  shipping_method: string | null;
  ships_by: string | null;
  delivery_estimate: string | null;
  shipping_name: string | null;
  shipping_address: string | null;
  shipping_city: string | null;
  shipping_state: string | null;
  shipping_zip: string | null;
  shipping_country: string | null;
  confirmation_emailed_at: string | null;
  tracking_number: string | null;
  fulfilled_at: string | null;
}

interface LineItem {
  product_name: string;
  unit_price: number;
  quantity: number;
}

// --- Resend transactional email -------------------------------------------
async function sendEmail(to: string, subject: string, html: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM; // e.g. "KJD BioLabs <orders@kjdbiolabs.com>" (verified domain)
  if (!apiKey || !from || !to) return false;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to, subject, html }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

// --- Shippo label purchase --------------------------------------------------
interface LabelResult {
  tracking_number: string | null;
  tracking_url: string | null;
  carrier: string | null;
  label_url: string | null;
}

async function buyShippingLabel(order: OrderRow, totalQty: number): Promise<LabelResult | null> {
  const token = process.env.SHIPPO_API_KEY;
  if (!token) return null;

  const addressFrom = {
    name: process.env.SHIP_FROM_NAME,
    street1: process.env.SHIP_FROM_STREET1,
    city: process.env.SHIP_FROM_CITY,
    state: process.env.SHIP_FROM_STATE,
    zip: process.env.SHIP_FROM_ZIP,
    country: process.env.SHIP_FROM_COUNTRY || "US",
    // Carriers (USPS via Shippo) require a sender email + phone on the label.
    email: process.env.SHIP_FROM_EMAIL || "orders@kjdbiolabs.com",
    phone: process.env.SHIP_FROM_PHONE || "",
  };
  // Require a complete ship-from address before attempting a label.
  if (!addressFrom.name || !addressFrom.street1 || !addressFrom.city || !addressFrom.state || !addressFrom.zip) {
    return null;
  }

  const addressTo = {
    name: order.shipping_name ?? "",
    street1: order.shipping_address ?? "",
    city: order.shipping_city ?? "",
    state: order.shipping_state ?? "",
    zip: order.shipping_zip ?? "",
    country: order.shipping_country === "United States" ? "US" : order.shipping_country || "US",
    email: order.email ?? "",
  };
  const weight = Math.max(0.5, 0.25 * Math.max(1, totalQty)).toFixed(2);

  try {
    const shipRes = await fetch("https://api.goshippo.com/shipments", {
      method: "POST",
      headers: { Authorization: `ShippoToken ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ address_from: addressFrom, address_to: addressTo, parcels: [{ ...PARCEL, weight }], async: false }),
    });
    if (!shipRes.ok) return null;
    const shipment = await shipRes.json();
    const rates: Array<{ object_id: string; amount: string; provider: string }> = Array.isArray(shipment.rates) ? shipment.rates : [];
    if (rates.length === 0) return null;
    const cheapest = rates.reduce((a, b) => (parseFloat(b.amount) < parseFloat(a.amount) ? b : a));

    const txRes = await fetch("https://api.goshippo.com/transactions", {
      method: "POST",
      headers: { Authorization: `ShippoToken ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ rate: cheapest.object_id, label_file_type: "PDF", async: false }),
    });
    if (!txRes.ok) return null;
    const tx = await txRes.json();
    if (tx.status !== "SUCCESS") return null;

    return {
      tracking_number: tx.tracking_number ?? null,
      tracking_url: tx.tracking_url_provider ?? null,
      carrier: cheapest.provider ?? null,
      label_url: tx.label_url ?? null,
    };
  } catch {
    return null;
  }
}

// --- Email templates (premium, branded, email-client-safe tables) -----------
function shell(heading: string, body: string): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#eef3fa;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef3fa;padding:28px 12px;font-family:Arial,Helvetica,sans-serif;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #e2e8f0;">
        <tr><td style="background-color:#0c3a6b;background-image:linear-gradient(120deg,#0c3a6b 0%,#1287d2 50%,#2bc4e6 100%);padding:26px 32px;">
          <span style="color:#ffffff;font-size:23px;font-weight:bold;letter-spacing:-0.5px;">KJD&nbsp;<span style="font-weight:normal;color:#cdeafb;">BioLabs</span></span>
        </td></tr>
        <tr><td style="padding:32px;">
          <h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;color:#0a0e1a;font-weight:bold;">${esc(heading)}</h1>
          ${body}
        </td></tr>
        <tr><td style="background:#f1f6fc;padding:22px 32px;border-top:1px solid #e8eef6;">
          <p style="margin:0 0 6px;color:#64748b;font-size:12px;line-height:1.6;">KJD BioLabs — a KJD Capital LLC company.</p>
          <p style="margin:0;color:#94a3b8;font-size:11px;line-height:1.6;">For laboratory research use only. Not for human or veterinary use, not for use in diagnostic procedures, and not evaluated by the U.S. Food and Drug Administration.</p>
        </td></tr>
      </table>
      <p style="margin:16px 0 0;color:#94a3b8;font-size:11px;">© KJD BioLabs · research-grade peptides</p>
    </td></tr>
  </table>
</body></html>`;
}

function infoCard(label: string, value: string, accent = false): string {
  const bg = accent ? "#ecfdf5" : "#f1f6fc";
  const border = accent ? "#a7f3d0" : "#e2e8f0";
  const labelColor = accent ? "#047857" : "#64748b";
  const valueColor = accent ? "#065f46" : "#0a0e1a";
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 16px;"><tr><td style="background:${bg};border:1px solid ${border};border-radius:12px;padding:14px 16px;">
    <span style="color:${labelColor};font-size:11px;text-transform:uppercase;letter-spacing:0.6px;font-weight:bold;">${esc(label)}</span><br>
    <span style="color:${valueColor};font-size:16px;font-weight:bold;">${value}</span>
  </td></tr></table>`;
}

function confirmationHtml(orderRef: string, items: LineItem[], total: number, order: OrderRow): string {
  const rows = items
    .map(
      (i) =>
        `<tr>
          <td style="padding:11px 0;border-bottom:1px solid #f1f5f9;color:#0a0e1a;font-size:14px;">${esc(i.product_name)}<span style="color:#94a3b8;"> &times; ${i.quantity}</span></td>
          <td style="padding:11px 0;border-bottom:1px solid #f1f5f9;text-align:right;color:#0a0e1a;font-size:14px;font-weight:bold;white-space:nowrap;">${formatPrice(i.unit_price * i.quantity)}</td>
        </tr>`,
    )
    .join("");
  const ship = [order.shipping_address, order.shipping_city, order.shipping_state, order.shipping_zip].filter(Boolean).map(esc).join(", ");
  return shell(`Order confirmed — thank you${order.shipping_name ? ", " + esc(order.shipping_name.split(" ")[0]) : ""}!`, `
    <p style="margin:0 0 20px;color:#475569;font-size:15px;line-height:1.6;">We've received your order and payment. Here's your summary:</p>
    ${infoCard("Order number", `<span style="font-family:'Courier New',monospace;">${esc(orderRef)}</span>`)}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:4px 0 0;">
      ${rows}
      <tr>
        <td style="padding:16px 0 0;color:#0a0e1a;font-size:16px;font-weight:bold;">Total paid</td>
        <td style="padding:16px 0 0;text-align:right;color:#0a0e1a;font-size:20px;font-weight:bold;">${formatPrice(total)}</td>
      </tr>
    </table>
    <div style="height:22px;"></div>
    ${order.delivery_estimate ? infoCard("Estimated delivery", esc(order.delivery_estimate), true) : ""}
    ${ship ? `<p style="margin:14px 0 0;color:#64748b;font-size:13px;line-height:1.6;"><strong style="color:#0a0e1a;">Shipping to:</strong> ${ship}</p>` : ""}
    <p style="margin:18px 0 0;color:#475569;font-size:14px;line-height:1.6;">We'll email you tracking the moment your order ships. Every compound ships with its Certificate of Analysis.</p>`);
}

function shippedHtml(orderRef: string, label: LabelResult): string {
  return shell("Your order is on its way 🚚", `
    <p style="margin:0 0 20px;color:#475569;font-size:15px;line-height:1.6;">Great news — order <strong style="color:#0a0e1a;">${esc(orderRef)}</strong> has shipped${label.carrier ? " via " + esc(label.carrier) : ""} and is heading your way.</p>
    ${label.tracking_number ? infoCard("Tracking number", `<span style="font-family:'Courier New',monospace;">${esc(label.tracking_number)}</span>`) : ""}
    ${label.tracking_url ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:6px 0 0;"><tr><td style="background-color:#0c3a6b;background-image:linear-gradient(120deg,#0c3a6b,#1287d2,#2bc4e6);border-radius:9999px;">
      <a href="${esc(label.tracking_url)}" style="display:inline-block;padding:13px 30px;color:#ffffff;text-decoration:none;font-size:14px;font-weight:bold;">Track your shipment &rarr;</a>
    </td></tr></table>` : ""}
    <p style="margin:22px 0 0;color:#475569;font-size:14px;line-height:1.6;">Store lyophilized peptides at -20°C until reconstitution.</p>`);
}

// --- Orchestration ----------------------------------------------------------
/**
 * Runs once a payment is confirmed (called from the card charge route and the
 * Coinbase webhook). Sends the confirmation email, buys a shipping label, and
 * sends a shipped email — each step env-gated and idempotent. Best-effort: any
 * failure is swallowed so it never blocks the payment response.
 */
export async function fulfillPaidOrder(orderId: string, admin: SupabaseClient): Promise<void> {
  const { data: order } = await admin
    .from("orders")
    .select(
      "id, order_number, email, subtotal, shipping_cost, shipping_method, ships_by, delivery_estimate, shipping_name, shipping_address, shipping_city, shipping_state, shipping_zip, shipping_country, confirmation_emailed_at, tracking_number, fulfilled_at",
    )
    .eq("id", orderId)
    .single();
  if (!order) return;
  const o = order as OrderRow;
  if (o.fulfilled_at) return; // already fully fulfilled

  const { data: itemRows } = await admin.from("order_items").select("product_name, unit_price, quantity").eq("order_id", orderId);
  const items: LineItem[] = (itemRows as LineItem[]) ?? [];
  const totalQty = items.reduce((s, i) => s + Number(i.quantity), 0);
  const total = Number(o.subtotal) + Number(o.shipping_cost ?? 0);
  const orderRef = o.order_number ?? o.id.slice(0, 8).toUpperCase();

  // 1) Confirmation email (once).
  if (o.email && !o.confirmation_emailed_at) {
    const sent = await sendEmail(o.email, `Your KJD BioLabs order ${orderRef} is confirmed`, confirmationHtml(orderRef, items, total, o));
    if (sent) {
      await admin.from("orders").update({ confirmation_emailed_at: new Date().toISOString() }).eq("id", orderId);
    }
  }

  // 2) Shipping label (once) + shipped email.
  if (!o.tracking_number) {
    const label = await buyShippingLabel(o, totalQty);
    if (label) {
      await admin
        .from("orders")
        .update({
          tracking_number: label.tracking_number,
          tracking_url: label.tracking_url,
          carrier: label.carrier,
          label_url: label.label_url,
          fulfilled_at: new Date().toISOString(),
        })
        .eq("id", orderId);
      if (o.email && label.tracking_number) {
        await sendEmail(o.email, `Your KJD BioLabs order ${orderRef} has shipped`, shippedHtml(orderRef, label));
      }
    }
  }
}
