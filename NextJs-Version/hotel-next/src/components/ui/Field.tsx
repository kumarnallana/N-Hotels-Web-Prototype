import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * 44px minimum height on every control: below that a date field or a select
 * becomes a mis-tap on a phone, which is the single most common reason a
 * booking form is abandoned.
 */
const CONTROL =
  "w-full rounded-lg border border-line bg-card px-3.5 py-2.5 text-reading text-ink " +
  "placeholder:text-ink-soft/70 focus:border-gold-deep focus:outline-none " +
  "disabled:bg-sand disabled:text-ink-soft";

interface FieldProps {
  id: string;
  label: string;
  children: ReactNode;
  hint?: string;
  error?: string;
  className?: string;
  required?: boolean;
}

/**
 * Label is always visible — a placeholder-only field loses its label the
 * moment someone types, which is exactly when a form gets stressful.
 */
export function Field({ id, label, children, hint, error, className, required }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label
        htmlFor={id}
        className="text-micro font-bold uppercase tracking-[0.12em] text-ink-soft"
      >
        {label}
        {required && (
          <span className="ml-1 text-danger" aria-hidden>
            *
          </span>
        )}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-small font-semibold text-danger">
          {error}
        </p>
      ) : hint ? (
        <p className="text-small text-ink-soft">{hint}</p>
      ) : null}
    </div>
  );
}

export function TextInput({
  className,
  invalid,
  ...props
}: React.ComponentProps<"input"> & { invalid?: boolean }) {
  return (
    <input
      {...props}
      aria-invalid={invalid || undefined}
      className={cn(CONTROL, "min-h-[2.75rem]", invalid && "border-line-danger", className)}
    />
  );
}

export function TextArea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      {...props}
      className={cn(CONTROL, "min-h-[5.5rem] py-2.5 leading-relaxed", className)}
    />
  );
}

/**
 * Native select on purpose. A custom listbox costs 200 lines of keyboard
 * handling and, on the low-end Android devices this audience actually uses,
 * the native picker is both faster and more familiar.
 */
export function Select({ className, children, ...props }: React.ComponentProps<"select">) {
  return (
    <div className="relative">
      <select
        {...props}
        className={cn(CONTROL, "min-h-[2.75rem] cursor-pointer appearance-none pr-9", className)}
      >
        {children}
      </select>
      <svg
        aria-hidden
        viewBox="0 0 20 20"
        className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-soft"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 8l4 4 4-4" />
      </svg>
    </div>
  );
}
