import React from "react";

export function PrimaryButton({ children, className = "", loading = false, ...props }) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center rounded-full bg-gradient-to-r from-brand-400 to-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && (
        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
      )}
      {children}
    </button>
  );
}

export function SecondaryButton({ children, className = "", ...props }) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function TextInput({ label, error, className = "", ...props }) {
  return (
    <label className={`block text-sm ${className}`}>
      <span className="mb-1 inline-block text-xs font-medium uppercase tracking-wide text-slate-300">
        {label}
      </span>
      <input
        className={`mt-0.5 w-full rounded-xl border border-white/10 bg-slate-900/60 px-3.5 py-2.5 text-sm text-slate-50 shadow-[0_0_0_1px_rgba(15,23,42,0.3)] outline-none transition placeholder:text-slate-500 focus:border-brand-400 focus:bg-slate-900 focus:shadow-soft ${
          error ? "border-red-500/80 focus:border-red-400" : ""
        }`}
        {...props}
      />
      {error && (
        <span className="mt-1 block text-xs text-red-400">
          {error}
        </span>
      )}
    </label>
  );
}

export function NumberInput(props) {
  return <TextInput inputMode="numeric" type="number" min="1" {...props} />;
}

export function Alert({ type = "info", title, message, className = "" }) {
  const styles = {
    info: "bg-sky-900/60 border-sky-500/50 text-sky-100",
    success: "bg-emerald-900/60 border-emerald-500/60 text-emerald-100",
    error: "bg-red-900/60 border-red-500/60 text-red-100",
    warning: "bg-amber-900/60 border-amber-500/60 text-amber-100",
  }[type];

  return (
    <div className={`flex gap-3 rounded-2xl border px-3.5 py-2.5 text-sm ${styles} ${className}`}>
      <div className="mt-0.5 h-2.5 w-2.5 rounded-full bg-current" />
      <div>
        {title && <div className="font-semibold">{title}</div>}
        {message && <div className="text-xs opacity-90">{message}</div>}
      </div>
    </div>
  );
}

export function EmptyState({ title, message, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-700/80 bg-slate-900/60 px-6 py-10 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800 text-brand-200 shadow-soft">
        <span className="text-xl">✈️</span>
      </div>
      <h3 className="text-base font-semibold text-slate-50">{title}</h3>
      {message && (
        <p className="mt-1.5 max-w-md text-xs text-slate-400">
          {message}
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function PageHeading({ eyebrow, title, description, align = "left" }) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <div className={`flex flex-col gap-2 ${alignment}`}>
      {eyebrow && (
        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-300">
          {eyebrow}
        </span>
      )}
      <h1 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
        {title}
      </h1>
      {description && (
        <p className="max-w-xl text-xs text-slate-400 sm:text-sm">
          {description}
        </p>
      )}
    </div>
  );
}

