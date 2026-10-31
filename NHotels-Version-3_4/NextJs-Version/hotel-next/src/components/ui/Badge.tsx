import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "gold" | "ink" | "quiet" | "onImage" | "success" | "warning" | "onNight";

/**
 * Measured against its own ground (WCAG 2.1, all pass AA for small text):
 *   gold    #7a5f28 on gold-tint          5.04:1
 *   quiet   #5c534c on card               7.51:1
 *   success #2f6b4f on success-tint       5.41:1
 *   warning #8a5a12 on warning-tint       5.10:1
 *   ink     #f5f3f1 on night             16.79:1
 *   onNight #e6c98a on 10% white/night    8.86:1
 *
 * `plum` is gone: it was a second brand hue carrying no meaning, and it is why
 * the palette read as two designs fighting.
 */
const TONES: Record<Tone, string> = {
  gold: "bg-gold-tint text-gold-ink border-gold/40",
  ink: "bg-night text-on-night border-night",
  quiet: "bg-card text-ink-soft border-line",
  onImage: "bg-card/95 text-ink border-card/70",
  success: "bg-success-tint text-success border-success/25",
  warning: "bg-warning-tint text-warning border-warning/25",
  onNight: "bg-card/10 text-gold-light border-card/25",
};

export function Badge({
  children,
  tone = "gold",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-pill border px-2.5 py-1",
        "text-micro font-bold uppercase leading-none tracking-[0.1em] whitespace-nowrap",
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
