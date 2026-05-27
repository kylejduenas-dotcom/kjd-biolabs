import { shell, esc, infoCard, type LineItem } from "@/lib/fulfillment";
import { formatPrice } from "@/data/products";

const SITE = "https://kjdbiolabs.com";
const PROMO = "KJD20";

function itemRows(items: LineItem[]): string {
  return items
    .map(
      (i) =>
        `<tr>
          <td style="padding:11px 0;border-bottom:1px solid #f1f5f9;color:#0a0e1a;font-size:14px;">${esc(
            i.product_name,
          )}<span style="color:#94a3b8;"> &times; ${i.quantity}</span></td>
          <td style="padding:11px 0;border-bottom:1px solid #f1f5f9;text-align:right;color:#0a0e1a;font-size:14px;font-weight:bold;white-space:nowrap;">${formatPrice(
            Number(i.unit_price) * Number(i.quantity),
          )}</td>
        </tr>`,
    )
    .join("");
}

function ctaButton(label: string, href: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:6px 0 0;"><tr><td style="background-color:#0c3a6b;background-image:linear-gradient(120deg,#0c3a6b,#1287d2,#2bc4e6);border-radius:9999px;">
    <a href="${esc(href)}" style="display:inline-block;padding:14px 34px;color:#ffffff;text-decoration:none;font-size:15px;font-weight:bold;">${esc(label)} &rarr;</a>
  </td></tr></table>`;
}

function promoCard(): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px;"><tr><td style="background:#ecfdf5;border:1px dashed #6ee7b7;border-radius:12px;padding:16px 18px;text-align:center;">
    <span style="color:#047857;font-size:12px;text-transform:uppercase;letter-spacing:0.6px;font-weight:bold;">20% off &mdash; use code</span><br>
    <span style="display:inline-block;margin-top:6px;font-family:'Courier New',monospace;font-size:22px;font-weight:bold;color:#065f46;letter-spacing:2px;">${PROMO}</span>
  </td></tr></table>`;
}

/** Sent when a started order is left unpaid. */
export function abandonedCartHtml(orderRef: string, items: LineItem[], firstName?: string | null): string {
  const greeting = firstName ? `, ${esc(firstName)}` : "";
  return shell(`Your order is still waiting${greeting}`, `
    <p style="margin:0 0 20px;color:#475569;font-size:15px;line-height:1.6;">You started an order with KJD BioLabs but didn't finish checking out. Your selection is below &mdash; complete it whenever you're ready.</p>
    ${items.length ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:0 0 22px;">${itemRows(items)}</table>` : ""}
    ${promoCard()}
    ${ctaButton("Complete your order", `${SITE}/products`)}
    <p style="margin:22px 0 0;color:#64748b;font-size:13px;line-height:1.6;">Every batch is third-party tested to 99%+ purity and ships within 24 hours. Questions before you order? Just reply to this email.</p>`);
}

/** Sent to a past customer whose most recent order is aging, to prompt a reorder. */
export function winbackHtml(items: LineItem[], firstName?: string | null): string {
  const greeting = firstName ? ` ${esc(firstName)}` : "";
  return shell(`Time to restock${greeting}?`, `
    <p style="margin:0 0 20px;color:#475569;font-size:15px;line-height:1.6;">It's been a little while since your last order. Research supplies run down &mdash; here's a quick way to top up the compounds you've used before.</p>
    ${items.length ? `${infoCard("Last ordered", items.map((i) => `${esc(i.product_name)} &times; ${i.quantity}`).join("<br>"))}` : ""}
    ${promoCard()}
    ${ctaButton("Reorder now", `${SITE}/products`)}
    <p style="margin:22px 0 0;color:#64748b;font-size:13px;line-height:1.6;">Same independent testing, same Certificate of Analysis on every batch, shipped within 24 hours. A COA for any product is available on request.</p>`);
}
