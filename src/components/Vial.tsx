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
      ? { w: 156, h: 260 }
      : size === "sm"
        ? { w: 84, h: 140 }
        : { w: 114, h: 190 };
  const uid = `${tint}-${name.replace(/[^a-z0-9]/gi, "")}`;
  const label = name.length > 11 ? name.slice(0, 10) + "…" : name;

  return (
    <svg
      width={dims.w}
      height={dims.h}
      viewBox="0 0 120 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`${name} vial`}
    >
      <defs>
        {/* Glass body — vertical tint */}
        <linearGradient id={`body-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.92" />
          <stop offset="16%" stopColor={style.vialBody} stopOpacity="0.4" />
          <stop offset="100%" stopColor={style.vialLiquid} stopOpacity="0.6" />
        </linearGradient>
        {/* Liquid — vertical tint */}
        <linearGradient id={`liq-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={style.vialBody} stopOpacity="0.9" />
          <stop offset="100%" stopColor={style.vialLiquid} />
        </linearGradient>
        {/* Cylinder roundness — horizontal dark/light/dark */}
        <linearGradient id={`cyl-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#04121b" stopOpacity="0.3" />
          <stop offset="13%" stopColor="#04121b" stopOpacity="0.05" />
          <stop offset="30%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="46%" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="72%" stopColor="#04121b" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#04121b" stopOpacity="0.36" />
        </linearGradient>
        {/* Metallic cap — horizontal silver */}
        <linearGradient id={`cap-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7e8a95" />
          <stop offset="20%" stopColor="#eef2f5" />
          <stop offset="42%" stopColor="#bcc6cf" />
          <stop offset="60%" stopColor="#f3f6f9" />
          <stop offset="82%" stopColor="#a6b0ba" />
          <stop offset="100%" stopColor="#737f8a" />
        </linearGradient>
        <clipPath id={`clip-${uid}`}>
          <rect x="28" y="40" width="64" height="150" rx="18" />
        </clipPath>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="60" cy="195" rx="35" ry="5.5" fill="#0a0e1a" opacity="0.16" />

      {/* Glass body */}
      <rect x="28" y="40" width="64" height="150" rx="18" fill={`url(#body-${uid})`} />

      <g clipPath={`url(#clip-${uid})`}>
        {/* Liquid + curved meniscus */}
        <rect x="28" y="116" width="64" height="74" fill={`url(#liq-${uid})`} />
        <ellipse cx="60" cy="116" rx="32" ry="5" fill={style.vialBody} opacity="0.75" />
        {/* Cylinder roundness shading over the whole body */}
        <rect x="28" y="40" width="64" height="150" fill={`url(#cyl-${uid})`} />
        {/* Specular highlights */}
        <rect x="37" y="50" width="6" height="124" rx="3" fill="#ffffff" opacity="0.55" />
        <rect x="79" y="56" width="3" height="104" rx="1.5" fill="#ffffff" opacity="0.22" />
      </g>

      {/* Glass rim */}
      <rect x="28" y="40" width="64" height="150" rx="18" fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="1.2" />

      {/* Label */}
      <rect x="28" y="88" width="64" height="40" fill="#ffffff" opacity="0.95" />
      <rect x="28" y="88" width="64" height="40" fill={`url(#cyl-${uid})`} opacity="0.4" />
      <text
        x="60"
        y="107"
        textAnchor="middle"
        fontFamily="var(--font-display), sans-serif"
        fontSize="11"
        fontWeight="700"
        fill="#0a0e1a"
        letterSpacing="-0.3"
      >
        {label}
      </text>
      <text
        x="60"
        y="120"
        textAnchor="middle"
        fontFamily="var(--font-sans), sans-serif"
        fontSize="6"
        fill="#64748b"
        letterSpacing="0.5"
      >
        RESEARCH USE ONLY
      </text>

      {/* Neck */}
      <rect x="47" y="30" width="26" height="12" fill="#ffffff" fillOpacity="0.5" />

      {/* Metallic crimp cap */}
      <rect x="42" y="12" width="36" height="21" rx="2.5" fill={`url(#cap-${uid})`} />
      <g stroke="#6b7681" strokeOpacity="0.45" strokeWidth="0.6">
        <line x1="49" y1="15" x2="49" y2="31" />
        <line x1="55" y1="15" x2="55" y2="31" />
        <line x1="61" y1="15" x2="61" y2="31" />
        <line x1="67" y1="15" x2="67" y2="31" />
        <line x1="73" y1="15" x2="73" y2="31" />
      </g>
      {/* Cap top + flip button */}
      <ellipse cx="60" cy="12" rx="18" ry="5" fill={`url(#cap-${uid})`} />
      <ellipse cx="60" cy="11" rx="8.5" ry="3" fill="#e2e8f0" />
      <ellipse cx="60" cy="10.4" rx="4.5" ry="1.6" fill="#f5f8fa" />
    </svg>
  );
}
