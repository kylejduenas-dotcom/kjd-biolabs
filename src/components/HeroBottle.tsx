import { tintStyles, type Tint } from "@/data/products";

/**
 * Premium product vial for the homepage hero — Peptora-style:
 * tall sleek dark-glass body, metallic crimp cap, glowing liquid,
 * a printed label band, and vertical brand text down the side.
 * Kept separate from <Vial> so product cards / thumbnails are untouched.
 */
export default function HeroBottle({
  name,
  tint,
  size = "md",
}: {
  name: string;
  tint: Tint;
  size?: "sm" | "md" | "lg";
}) {
  const style = tintStyles[tint];
  const dims =
    size === "lg"
      ? { w: 170, h: 425 }
      : size === "sm"
        ? { w: 98, h: 245 }
        : { w: 132, h: 330 };
  const uid = `hb-${tint}-${name.replace(/[^a-z0-9]/gi, "")}`;
  const label = name.length > 12 ? name.slice(0, 11) + "…" : name;

  return (
    <svg
      width={dims.w}
      height={dims.h}
      viewBox="0 0 120 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`${name} vial`}
    >
      <defs>
        {/* Dark glass body */}
        <linearGradient id={`glass-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2b3a57" />
          <stop offset="20%" stopColor="#1a2438" />
          <stop offset="100%" stopColor="#0b1120" />
        </linearGradient>
        {/* Liquid */}
        <linearGradient id={`liq-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={style.vialBody} stopOpacity="0.95" />
          <stop offset="100%" stopColor={style.vialLiquid} />
        </linearGradient>
        {/* Cylinder roundness (left-dark / center-light / right-dark) */}
        <linearGradient id={`cyl-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.5" />
          <stop offset="13%" stopColor="#000000" stopOpacity="0.06" />
          <stop offset="33%" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="73%" stopColor="#000000" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.55" />
        </linearGradient>
        {/* Metallic cap */}
        <linearGradient id={`cap-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#646e7d" />
          <stop offset="22%" stopColor="#e2e8f0" />
          <stop offset="46%" stopColor="#a7b2c1" />
          <stop offset="64%" stopColor="#eef2f7" />
          <stop offset="84%" stopColor="#959fae" />
          <stop offset="100%" stopColor="#5b6573" />
        </linearGradient>
        <clipPath id={`clip-${uid}`}>
          <rect x="26" y="58" width="68" height="232" rx="24" />
        </clipPath>
      </defs>

      {/* Glass body */}
      <rect x="26" y="58" width="68" height="232" rx="24" fill={`url(#glass-${uid})`} />

      <g clipPath={`url(#clip-${uid})`}>
        {/* Liquid + meniscus */}
        <rect x="26" y="172" width="68" height="118" fill={`url(#liq-${uid})`} opacity="0.95" />
        <ellipse cx="60" cy="172" rx="34" ry="6" fill={style.vialBody} opacity="0.85" />
        {/* Soft glow above the liquid line */}
        <rect x="26" y="150" width="68" height="40" fill={style.vialLiquid} opacity="0.16" />
        {/* Cylinder shading */}
        <rect x="26" y="58" width="68" height="232" fill={`url(#cyl-${uid})`} />
        {/* Specular highlights */}
        <rect x="36" y="74" width="7" height="184" rx="3.5" fill="#ffffff" opacity="0.5" />
        <rect x="80" y="86" width="3.5" height="150" rx="1.75" fill="#ffffff" opacity="0.15" />
        {/* Vertical brand text */}
        <text
          x="86"
          y="116"
          fill={style.vialLiquid}
          fillOpacity="0.95"
          fontFamily="var(--font-display), sans-serif"
          fontSize="8.5"
          fontWeight="800"
          letterSpacing="2.4"
          transform="rotate(90 86 116)"
        >
          KJD BIOLABS
        </text>
      </g>

      {/* Label band */}
      <rect x="26" y="190" width="68" height="62" fill="#070c17" opacity="0.5" />
      <rect x="26" y="190" width="68" height="62" fill={`url(#cyl-${uid})`} opacity="0.35" />
      <line x1="26" y1="190" x2="94" y2="190" stroke={style.vialLiquid} strokeOpacity="0.55" strokeWidth="1" />
      <line x1="26" y1="252" x2="94" y2="252" stroke={style.vialLiquid} strokeOpacity="0.55" strokeWidth="1" />
      <text
        x="60"
        y="218"
        textAnchor="middle"
        fill="#ffffff"
        fontFamily="var(--font-display), sans-serif"
        fontSize="13"
        fontWeight="800"
        letterSpacing="-0.3"
      >
        {label}
      </text>
      <text
        x="60"
        y="235"
        textAnchor="middle"
        fill="#9fb3c8"
        fontFamily="var(--font-sans), sans-serif"
        fontSize="6.5"
        letterSpacing="1.2"
      >
        RESEARCH USE ONLY
      </text>

      {/* Glass rim */}
      <rect x="26" y="58" width="68" height="232" rx="24" fill="none" stroke="#ffffff" strokeOpacity="0.16" strokeWidth="1.2" />
      <rect x="27.6" y="59.6" width="64.8" height="228.8" rx="22" fill="none" stroke={style.vialLiquid} strokeOpacity="0.22" strokeWidth="1" />

      {/* Neck */}
      <rect x="44" y="44" width="32" height="16" fill="#161f30" />
      <rect x="44" y="44" width="32" height="16" fill={`url(#cyl-${uid})`} opacity="0.6" />

      {/* Metallic crimp cap */}
      <rect x="38" y="16" width="44" height="30" rx="3" fill={`url(#cap-${uid})`} />
      <g stroke="#5b6573" strokeOpacity="0.5" strokeWidth="0.7">
        <line x1="46" y1="20" x2="46" y2="44" />
        <line x1="53" y1="20" x2="53" y2="44" />
        <line x1="60" y1="20" x2="60" y2="44" />
        <line x1="67" y1="20" x2="67" y2="44" />
        <line x1="74" y1="20" x2="74" y2="44" />
      </g>
      <ellipse cx="60" cy="16" rx="22" ry="6" fill={`url(#cap-${uid})`} />
      <ellipse cx="60" cy="14.5" rx="11" ry="3.2" fill="#cdd5df" />
      <ellipse cx="60" cy="13.6" rx="5.5" ry="1.8" fill="#eef2f7" />
    </svg>
  );
}
