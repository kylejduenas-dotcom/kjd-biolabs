import { tintStyles, type Tint } from "@/data/products";

export default function Vial({
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
      ? { w: 150, h: 250 }
      : size === "sm"
        ? { w: 78, h: 130 }
        : { w: 108, h: 180 };
  const uid = `${tint}-${name.replace(/[^a-z0-9]/gi, "")}`;

  return (
    <svg
      width={dims.w}
      height={dims.h}
      viewBox="0 0 120 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-xl"
      aria-label={`${name} vial`}
    >
      <defs>
        <linearGradient id={`body-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="45%" stopColor={style.vialBody} stopOpacity="0.55" />
          <stop offset="100%" stopColor={style.vialLiquid} stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id={`liquid-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={style.vialBody} stopOpacity="0.9" />
          <stop offset="100%" stopColor={style.vialLiquid} />
        </linearGradient>
        <linearGradient id={`cap-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="50%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
      </defs>

      {/* Cap */}
      <rect x="40" y="6" width="40" height="10" rx="3" fill={`url(#cap-${uid})`} />
      <rect x="42" y="14" width="36" height="20" rx="2" fill={`url(#cap-${uid})`} />
      {/* Neck */}
      <rect x="46" y="32" width="28" height="10" fill="#ffffff" fillOpacity="0.7" />

      {/* Body */}
      <rect
        x="28"
        y="40"
        width="64"
        height="150"
        rx="14"
        fill={`url(#body-${uid})`}
        stroke="#ffffff"
        strokeOpacity="0.6"
        strokeWidth="1.5"
      />
      {/* Liquid fill (lower portion) */}
      <path
        d="M28 120 Q28 120 28 120 L92 120 L92 176 Q92 190 78 190 L42 190 Q28 190 28 176 Z"
        fill={`url(#liquid-${uid})`}
        fillOpacity="0.85"
      />
      {/* Glass highlight */}
      <rect x="36" y="50" width="8" height="120" rx="4" fill="#ffffff" fillOpacity="0.4" />

      {/* Label band */}
      <rect x="28" y="92" width="64" height="40" fill="#ffffff" fillOpacity="0.92" />
      <text
        x="60"
        y="110"
        textAnchor="middle"
        fontFamily="var(--font-display), sans-serif"
        fontSize="11"
        fontWeight="700"
        fill="#0a0e1a"
        letterSpacing="-0.3"
      >
        {name.length > 10 ? name.slice(0, 9) + "…" : name}
      </text>
      <text
        x="60"
        y="124"
        textAnchor="middle"
        fontFamily="var(--font-sans), sans-serif"
        fontSize="6.5"
        fill="#64748b"
        letterSpacing="0.5"
      >
        RESEARCH USE ONLY
      </text>
    </svg>
  );
}
