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

// --- Email templates --------------------------------------------------------
function shell(title: string, body: string): string {
  return `<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#0a0e1a">
    <h1 style="font-size:20px;margin:0 0 16px">${esc(title)}</h1>${body}
    <p style="color:#94a3b8;font-size:12px;margin-top:28px;line-height:1.6">KJD BioLabs — a KJD Capital LLC company. Products are for laboratory research use only; not for human or veterinary use.</p>
  </div>`;
}

function confirmationHtml(orderRef: string, items: LineItem[], total: number, order: OrderRow): string {
  const rows = items
    .map(
      (i) =>
        `<tr><td style="padding:6px 0;color:#475569">${esc(i.product_name)} × ${i.quantity}</td><td style="padding:6px 0;text-align:right">${formatPrice(i.unit_price * i.quantity)}</td></tr>`,
    )
    .join("");
  const ship = [order.shipping_address, order.shipping_city, order.shipping_state, order.shipping_zip].filter(Boolean).map(esc).join(", ");
  return shell(`Order ${orderRef} confirmed`, `
    <p style="color:#475569;line-height:1.6">Thanks${order.shipping_name ? ", " + esc(order.shipping_name) : ""} — we've received your order and payment. Here's your summary:</p>
    <table style="width:100%;border-collapse:collapse;font-size:14px;margin:12px 0">${rows}
      <tr><td style="padding:8px 0;border-top:1px solid #e2e8f0;color:#475569">Total</td><td style="padding:8px 0;border-top:1px solid #e2e8f0;text-align:right;font-weight:700">${formatPrice(total)}</td></tr>
    </table>
    ${order.delivery_estimate ? `<p style="color:#475569;font-size:14px"><strong>Estimated delivery:</strong> ${esc(order.delivery_estimate)}</p>` : ""}
    ${ship ? `<p style="color:#475569;font-size:14px"><strong>Shipping to:</strong> ${ship}</p>` : ""}
    <p style="color:#475569;line-height:1.6">We'll email you tracking as soon as your order ships.</p>`);
}

function shippedHtml(orderRef: string, label: LabelResult): string {
  return shell(`Order ${orderRef} has shipped`, `
    <p style="color:#475569;line-height:1.6">Good news — your order is on its way${label.carrier ? " via " + esc(label.carrier) : ""}.</p>
    ${label.tracking_number ? `<p style="font-size:14px"><strong>Tracking #:</strong> ${esc(label.tracking_number)}</p>` : ""}
    ${label.tracking_url ? `<p><a href="${esc(label.tracking_url)}" style="display:inline-block;background:#0a0e1a;color:#fff;text-decoration:none;padding:10px 18px;border-radius:9999px;font-size:14px">Track your shipment</a></p>` : ""}`);
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
