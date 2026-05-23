export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-soft-cream flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-24 -left-24 w-[26rem] h-[26rem] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(167,243,208,0.4), transparent 70%)" }}
        />
        <div
          className="absolute -bottom-24 -right-24 w-[26rem] h-[26rem] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(196,181,253,0.35), transparent 70%)" }}
        />
      </div>
      <div className="relative w-full flex justify-center">{children}</div>
    </div>
  );
}
