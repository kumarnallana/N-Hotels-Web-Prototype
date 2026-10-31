import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "between";
  onDark?: boolean;
  aside?: ReactNode;
  className?: string;
  id?: string;
  /** Two-digit section marker, set in tabular figures. */
  index?: string;
}

/**
 * The one heading shape used by every section.
 *
 * The prototype restated the same three facts (address, 24/7 desk, temple
 * distance) in a different voice in each section; here a section gets one
 * marker, one title and one sentence, and the facts live in exactly one place.
 *
 * The rule is a static 2px gold bar. It used to draw itself in on scroll, which
 * is the kind of motion that reads as a loading state on a phone.
 */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "between",
  onDark = false,
  aside,
  className,
  id,
  index,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-block flex flex-col gap-5 md:flex-row md:items-end",
        align === "between" ? "md:justify-between" : "md:justify-start",
        className,
      )}
    >
      <div className="min-w-0 max-w-[46ch]">
        <div className="mb-3 flex items-center gap-3">
          <span aria-hidden className={cn("rule-gold w-10 shrink-0 rounded-pill")} />
          {index && (
            <span
              className={cn(
                "num text-micro font-bold tracking-[0.16em]",
                onDark ? "text-gold-light" : "text-gold-ink",
              )}
            >
              {index}
            </span>
          )}
          {eyebrow && (
            <span className={cn("eyebrow truncate", onDark && "eyebrow-on-night")}>{eyebrow}</span>
          )}
        </div>

        <h2
          id={id}
          className={cn(
            "text-title font-display text-balance",
            onDark ? "text-on-night" : "text-ink",
          )}
        >
          {title}
        </h2>

        {lede && (
          <p
            className={cn(
              "mt-3 max-w-[52ch] text-reading leading-relaxed text-pretty",
              onDark ? "text-on-night-soft" : "text-ink-soft",
            )}
          >
            {lede}
          </p>
        )}
      </div>

      {aside && <div className="shrink-0 md:pb-1">{aside}</div>}
    </div>
  );
}
