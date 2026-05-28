"use client";

import dynamic from "next/dynamic";

/** R3F canvas is client-only (WebGL). Load it lazily, skip SSR. */
const HeroVials3D = dynamic(() => import("@/components/ui/hero-vials-3d"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <span className="loader" />
    </div>
  ),
});

export default function HeroVialsScene() {
  return (
    <div className="relative h-[420px] w-full sm:h-[500px] lg:h-[600px] lg:-mr-6 xl:-mr-12">
      <HeroVials3D />
    </div>
  );
}
