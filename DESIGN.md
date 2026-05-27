# KJD BioLabs — Design System

Tailwind v4 with `@theme inline` tokens in `src/app/globals.css`. Utilities are
remapped, so use the named classes (`bg-ink-950`, `text-teal-600`) rather than
raw hex in components.

## Color

Strategy: **committed**. Deep navy carries dark surfaces (hero, panels, CTAs);
an ocean-cyan accent does the highlighting. Warm off-white grounds the rest.
Never pure `#000`/`#fff`.

- **Navy (ink):** `ink-950 #0c2348` (primary dark / CTAs / hero), `ink-900 #123059`, `ink-800 #1b3d6b`.
- **Accent (named teal-\*, actually ocean-cyan):** `teal-300 #36cdee`, `teal-500 #0499cc`, `teal-600 #0a7ba6` (link/hover), `teal-50 #e3faff`. Cyan-forward on purpose, to stay distinct from competitors. Not royal blue.
- **Neutrals:** `bg-soft-cream` = warm off-white for alternating sections; white for cards. Body copy is dark navy, never light grey: the `slate-400/500/600` utilities are deliberately overridden to a near-black navy ramp (`#2e3d57 / #1f2f49 / #14233c`). Use `slate-400` for the lightest captions only.
- Section rhythm: white → soft-cream → navy, alternating for pace. Hero and closing CTA bands are navy with white text.

## Typography

- **Sans / display:** Nacelle (`--font-nacelle`, self-hosted, weights 300–900). Headings: `font-display`, tracking `-0.03em`, weight 700+.
- **Serif (editorial accent):** Newsreader (`font-serif`, `--font-newsreader`). Used for large editorial headlines and italic emphasis words ("certainty."). Pair Nacelle eyebrows + Newsreader headline for the premium register.
- Eyebrow pattern: `text-teal-700 text-xs font-semibold uppercase tracking-[0.18em]`.
- Hero headlines: serif, `tracking-[-0.025em]`, leading ~1.05. Cap body line length ~65–75ch.

## Elevation & shape

- Radii are generous: `rounded-2xl` (inputs, small tiles), `rounded-3xl` / `rounded-[1.75rem]` (cards, panels).
- Shadows: `shadow-soft`, `shadow-soft-lg` (diffuse, low-contrast). Avoid hard drop shadows.
- Borders: `border-slate-200/80` hairlines. No colored side-stripe borders.
- Buttons: full pill. Primary = `bg-ink-950 text-white` → hover `bg-teal-600`. Secondary = `border border-slate-300 text-ink-950` → hover `bg-white`/`bg-slate-50`.

## Motion

- `animate-fade-in` (ease-out-quart `cubic-bezier(0.16,1,0.3,1)`), `animate-ping-once` for success confirmations, slow `aurora`/`float`/`vial` drifts (transform-only, GPU-composited).
- Ease out, no bounce/elastic. Never animate layout properties.

## Components & conventions

- **Cards:** white or soft-cream, rounded-3xl, hairline border, soft shadow. Never nest a card inside a card. Split panels (e.g. contact) = one rounded container divided by color region, not two stacked cards.
- **Vials:** product imagery lives at `/products/vialimg/<slug>.png`, shown `object-contain` on pastel tiles. Subtle vertical drift animation only.
- **Forms:** `.form-input` (white, `border-slate-200`, rounded, cyan focus ring `rgba(18,135,210,0.16)`). Label above field, `text-ink-950 font-medium`.
- **Disclaimer:** research-use-only line in footer + checkout; honest, never hidden.

## Bans (house rules, on top of impeccable's)

- No gradient text. No glassmorphism as default (one soft radial glow for depth is fine).
- No light-grey body copy. No em dashes in UI copy.
- No identical 3-up icon-card grids; vary the layout.
