# KJD BioLabs — Design System

Tailwind v4 with `@theme inline` tokens in `src/app/globals.css`. Utilities are
remapped, so use the named classes (`bg-ink-950`, `text-teal-600`) rather than
raw hex in components.

## Token architecture (3-layer)

`globals.css` holds the source of truth in a primitive → semantic → component
structure. Important Tailwind v4 quirk: `@theme inline` **inlines color literals
into utilities and does NOT expose them as `:root` variables**, so colors are
re-declared once as named primitives in a `:root` block for the file's custom
CSS. Font tokens (`--font-sans/-display/-serif`) DO reach `:root` (they reference
the next/font runtime vars) and are used directly.

- **Layer 1 · Primitives** — raw values. Two homes: the `@theme` block (generates
  `bg-*`/`text-*` utilities) and `:root` `--p-*` vars (mirror the same hex for
  custom CSS). Examples: `--p-ink-950`, `--p-teal-500`, `--p-cream-100`.
- **Layer 2 · Semantic** — purpose aliases mapped onto primitives. **Theme by
  overriding only this layer.** `--color-primary` (ink-950), `--color-accent`
  (teal-500), `--color-surface`, `--color-on-surface`, `--color-border`,
  `--color-danger`, `--gradient-brand`, `--surface-cream`, `--focus-ring`.
- **Layer 3 · Component** — component-scoped: `--field-bg/-fg/-border/-border-focus/
  -radius`, `--shadow-soft`, `--shadow-soft-lg`.

In React components keep using the Tailwind utility classes (they read Layer 1
via `@theme`). The custom CSS classes in `globals.css` (`.field-input`,
`.bg-soft-cream`, `.bg-logo-gradient`, `.shadow-soft`, `body`, `::selection`, …)
consume the token layers. To add dark mode later: set `--color-surface`,
`--color-on-surface`, etc. inside a `[data-theme="dark"]` block — nothing else
needs to change.

## Color

Strategy: **committed**. Deep navy carries dark surfaces (hero, panels, CTAs);
an ocean-cyan accent does the highlighting. Warm off-white grounds the rest.
Never pure `#000`/`#fff`.

- **Navy (ink):** `ink-950 #0c2348` (primary dark / CTAs / hero), `ink-900 #123059`, `ink-800 #1b3d6b`.
- **Accent (named teal-\*, actually ocean-cyan):** `teal-300 #36cdee`, `teal-500 #0499cc`, `teal-600 #0a7ba6` (link/hover), `teal-50 #e3faff`. Cyan-forward on purpose, to stay distinct from competitors. Not royal blue.
- **Neutrals:** `bg-soft-cream` = warm off-white for alternating sections; white for cards. Body copy is dark navy, never light grey: the `slate-400/500/600` utilities are deliberately overridden to a near-black navy ramp (`#2e3d57 / #1f2f49 / #14233c`). Use `slate-400` for the lightest captions only.
- Section rhythm: white → soft-cream → navy, alternating for pace. Hero and closing CTA bands are navy with white text.

## Typography

- **Sans / display:** Nacelle (`--font-nacelle`, self-hosted, weights 300–900).
- **Serif (editorial accent):** Newsreader (`font-serif`, `--font-newsreader`).
- **Heading role convention (keep consistent):**
  - **Page-title H1** (the main title at the top of a route, and the home hero): Nacelle, `font-display font-extrabold`, `tracking-[-0.02em]`.
  - **Section / subsection headings (H2/H3) and editorial accents:** Newsreader, `font-serif font-semibold`, `tracking-[-0.02em]`. Also the italic emphasis words ("certainty.", "every vial.") and the big serif step numbers.
  - Do not mix: never make a page-title H1 serif or a section H2 Nacelle-bold.
- Eyebrow pattern: `text-teal-700 text-xs font-semibold uppercase tracking-[0.18em]`.
- Cap body line length ~65–75ch.

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
