import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "gold" | "night" | "outline" | "onNight" | "ghost";
type Size = "sm" | "md" | "lg";

/**
 * No transition property anywhere: hover and focus are state changes, not
 * movements. `active:` exists because on a touch screen there is no hover, and
 * a control that gives no feedback at the moment of press feels broken.
 */
const BASE =
  "relative inline-flex items-center justify-center gap-2 rounded-pill font-semibold " +
  "select-none tap min-w-0 text-center";

const VARIANTS: Record<Variant, string> = {
  gold:
    "bg-gold text-ink border border-gold-deep " +
    "hover:bg-gold-light active:bg-gold-deep active:text-ink",
  night: "bg-night text-on-night border border-night hover:bg-night-raise active:bg-night-raise",
  outline: "bg-card text-ink border border-line-strong hover:bg-gold-tint hover:border-gold",
  onNight:
    "bg-transparent text-on-night border border-card/35 hover:border-gold hover:text-gold-light",
  ghost: "bg-transparent text-ink border border-transparent hover:text-gold-ink",
};

const SIZES: Record<Size, string> = {
  sm: "text-micro tracking-[0.08em] uppercase px-3.5 py-2",
  md: "text-small tracking-[0.06em] uppercase px-5 py-2.5",
  lg: "text-small font-bold tracking-[0.06em] uppercase px-6 py-3.5",
};

interface ButtonProps {
  children?: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Full container width — used in the mobile drawer and stacked CTA rows. */
  block?: boolean;
  href?: string;
  /** Only meaningful with `href`, and only for `https://` links that leave the site. */
  external?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  id?: string;
  "aria-controls"?: string;
  "aria-expanded"?: boolean;
  "aria-label"?: string;
}

/**
 * One control, three renderings, chosen from the href:
 *   · `#anchor` or `/route` → Next `Link`, so in-app navigation stays client-side.
 *   · anything else (`tel:`, `https://` off-site) → plain `<a>`; `Link` would try
 *     to prefetch a phone number.
 *   · no href → `<button>` that defaults to `type="button"`, because a button
 *     left inside a form without a type silently becomes a submit control.
 */
export function Button({
  children,
  variant = "gold",
  size = "md",
  className,
  block,
  href,
  external,
  onClick,
  type = "button",
  id,
  ...aria
}: ButtonProps) {
  const classes = cn(BASE, VARIANTS[variant], SIZES[size], block && "w-full", className);
  const inner = <span className="inline-flex min-w-0 items-center gap-2">{children}</span>;

  if (typeof href === "string") {
    const internal = href.startsWith("#") || href.startsWith("/");

    if (internal && !external) {
      return (
        <Link href={href} className={classes} onClick={onClick} id={id} {...aria}>
          {inner}
        </Link>
      );
    }

    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        id={id}
        {...aria}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} id={id} {...aria}>
      {inner}
    </button>
  );
}
