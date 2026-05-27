import Link from "next/link";

export default function AuthCard({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-md animate-fade-in">
      <Link href="/" className="flex flex-col items-center mb-7 group">
        <div className="w-14 h-14 rounded-2xl bg-ink-950 flex items-center justify-center mb-4 group-hover:bg-teal-600 transition-colors">
          <span className="text-white font-display font-bold text-2xl">K</span>
        </div>
        <span className="text-ink-950 text-2xl font-display font-bold tracking-tight">
          KJD <span className="text-teal-600">BioLabs</span>
        </span>
      </Link>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-soft-lg p-8">
        <h1 className="text-ink-950 text-2xl font-display font-bold mb-1">
          {title}
        </h1>
        {subtitle && (
          <p className="text-slate-500 text-sm mb-6 leading-relaxed">{subtitle}</p>
        )}
        {!subtitle && <div className="mb-6" />}
        {children}
      </div>

      {footer && (
        <p className="text-center text-sm text-slate-500 mt-6">{footer}</p>
      )}
    </div>
  );
}

export function AuthError({ message }: { message: string }) {
  return (
    <div className="mb-5 flex items-start gap-2.5 rounded-xl bg-red-50 border border-red-200 px-3.5 py-3">
      <svg className="w-4 h-4 text-red-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
      <p className="text-red-700 text-sm leading-snug">{message}</p>
    </div>
  );
}

export function SubmitButton({
  loading,
  children,
}: {
  loading: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full py-3.5 rounded-full font-semibold text-sm transition-all bg-ink-950 text-white hover:bg-teal-600 hover:shadow-lg hover:shadow-ink-950/20 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
}

// Wraps its control so the label is implicitly associated (a11y) with no id wiring.
export function FieldLabel({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-ink-950 text-sm font-medium mb-1.5">{label}</span>
      {children}
    </label>
  );
}
