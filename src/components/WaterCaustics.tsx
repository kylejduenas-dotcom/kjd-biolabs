// Animated crystal-water caustics, generated with an SVG turbulence filter.
// No external image / no license issue — and it gently moves like sunlit water.
export default function WaterCaustics({
  id,
  tint = "blue",
  opacity = 0.4,
  animate = true,
  className = "",
}: {
  id: string;
  tint?: "blue" | "light";
  opacity?: number;
  animate?: boolean;
  className?: string;
}) {
  // feColorMatrix recolors the noise: ocean-cyan veins on light sections,
  // near-white veins on the deep ocean bands (sun-on-water).
  const matrix =
    tint === "light"
      ? "0 0 0 0 0.85  0 0 0 0 0.96  0 0 0 0 1  0 0 0 1 0"
      : "0 0 0 0 0.07  0 0 0 0 0.62  0 0 0 0 0.85  0 0 0 1 0";

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity }}
      aria-hidden
    >
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id={`caustics-${id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.008 0.013"
              numOctaves="2"
              seed="7"
              stitchTiles="stitch"
              result="noise"
            >
              {animate && (
                <animate
                  attributeName="baseFrequency"
                  dur="26s"
                  values="0.008 0.013; 0.012 0.009; 0.008 0.013"
                  repeatCount="indefinite"
                />
              )}
            </feTurbulence>
            <feColorMatrix in="noise" type="matrix" values={matrix} result="tinted" />
            <feComponentTransfer in="tinted">
              <feFuncA type="gamma" amplitude="1.4" exponent="4" offset="0" />
            </feComponentTransfer>
          </filter>
        </defs>
        <rect width="100%" height="100%" filter={`url(#caustics-${id})`} />
      </svg>
    </div>
  );
}
