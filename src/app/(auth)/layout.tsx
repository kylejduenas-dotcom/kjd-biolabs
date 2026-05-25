"use client";

import { usePathname } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Login uses a full-bleed split layout (brand panel + form).
  if (pathname === "/login") {
    return <div className="min-h-[calc(100vh-4rem)]">{children}</div>;
  }

  // Signup / forgot / reset keep the centered card layout.
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-soft-cream flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-24 -left-24 w-[26rem] h-[26rem] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(112,196,239,0.45), transparent 70%)" }}
        />
        <div
          className="absolute -bottom-24 -right-24 w-[26rem] h-[26rem] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(51,163,225,0.32), transparent 70%)" }}
        />
      </div>
      <div className="relative w-full flex justify-center">{children}</div>
    </div>
  );
}
