// Animated crystal-water caustics, generated with an SVG turbulence filter.
// No external image / no license issue — gently moves like sunlit water.
// Tuned for clean, high-tech caustic veins (smoothed, high-contrast).
export default function WaterCaustics({
  id,
  tint = "light",
  opacity = 0.5,
  animate = true,
  className = "",
}: {
  id: string;
  tint?: "blue" | "light";
  opacity?: number;
  animate?: boolean;
  className?: string;
}) {
  // feColorMatrix recolors the noise: near-white veins (sunlit water) or
  // ocean-cyan veins for light sections.
  const matrix =
    tint === "light"
      ? "0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0"
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
              type="turbulence"
              baseFrequency="0.006 0.01"
              numOctaves="2"
              seed="14"
              stitchTiles="stitch"
              result="noise"
            >
              {animate && (
                <animate
                  attributeName="baseFrequency"
                  dur="22s"
                  values="0.006 0.01; 0.009 0.007; 0.006 0.01"
                  repeatCount="indefinite"
                />
              )}
            </feTurbulence>
            <feGaussianBlur in="noise" stdDeviation="0.7" result="soft" />
            <feColorMatrix in="soft" type="matrix" values={matrix} result="tinted" />
            <feComponentTransfer in="tinted">
              <feFuncA type="gamma" amplitude="1.7" exponent="5" offset="-0.04" />
            </feComponentTransfer>
          </filter>
        </defs>
        <rect width="100%" height="100%" filter={`url(#caustics-${id})`} />
      </svg>
    </div>
  );
}
