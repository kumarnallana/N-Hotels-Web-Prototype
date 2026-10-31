import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "card" | "sand" | "night";

const TONES: Record<Tone, string> = {
  card: "bg-card border-line text-ink",
  sand: "bg-sand border-line text-ink",
  night: "bg-night border-line-night text-on-night",
};

/**
 * The only container shape on the site.
 *
 * It replaced two overlapping primitives (a glass panel and a glass card) that
 * differed only in blur radius. Both relied on `backdrop-filter`, which costs
 * real frames on a mid-range Android for no benefit once nothing moves behind
 * it — so the surface is now simply opaque, and depth comes from the border
 * and a short shadow.
 */
export function Card({
  children,
  tone = "card",
  as: Tag = "div",
  padded = true,
  className,
}: {
  children?: ReactNode;
  tone?: Tone;
  as?: ElementType;
  padded?: boolean;
  className?: string;
}) {
  return (
    <Tag
      className={cn(
        "rounded-card border",
        padded && "p-5 sm:p-6",
        TONES[tone],
        tone === "card" && "shadow-[var(--shadow-card)]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
