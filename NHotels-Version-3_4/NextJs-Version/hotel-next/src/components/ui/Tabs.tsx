"use client";

import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  hint?: string;
}

/**
 * Static replacement for the sliding-pill tabs.
 *
 * The pill used a shared layout animation to travel between labels. Selected
 * state is now a gold ground and a ring, which is legible at a glance on a
 * phone and needs no JavaScript beyond the click handler the parent already
 * owns. The strip scrolls horizontally under the thumb instead of wrapping
 * into a second row, so the section never jumps as tabs change.
 */
export function Tabs({
  items,
  value,
  onChange,
  ariaLabel,
  className,
}: {
  items: TabItem[];
  value: string;
  onChange: (id: string) => void;
  ariaLabel: string;
  className?: string;
}) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        "mask-fade-r -mx-[var(--spacing-gutter)] flex gap-2 overflow-x-auto px-[var(--spacing-gutter)] pb-1",
        className,
      )}
    >
      {items.map((item) => {
        const selected = item.id === value;
        return (
          <button
            key={item.id}
            role="tab"
            type="button"
            aria-selected={selected}
            onClick={() => onChange(item.id)}
            className={cn(
              "tap shrink-0 rounded-pill border px-4 text-small font-bold uppercase tracking-[0.08em]",
              selected
                ? "border-gold-deep bg-gold text-ink"
                : "border-line-strong bg-card text-ink-soft hover:border-gold hover:text-gold-ink",
            )}
          >
            {item.label}
            {item.hint && <span className="num ml-1.5 opacity-70">{item.hint}</span>}
          </button>
        );
      })}
    </div>
  );
}
