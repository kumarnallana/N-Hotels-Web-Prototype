import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { HOTEL } from "@/lib/hotel";

/**
 * The supplied mark is an opaque square, so it is presented as a badge rather
 * than stretched: rounded, ringed in gold, and paired with the wordmark
 * typeset in the site's own display face. That keeps the artwork intact while
 * letting it sit on either the light header or the dark footer.
 */
export function BrandMark({
  size = 40,
  withWordmark = true,
  className,
  href = "#top",
  tone = "light",
  priority = true,
}: {
  size?: number;
  withWordmark?: boolean;
  className?: string;
  href?: string | null;
  tone?: "light" | "night";
  /** The header mark is above the fold; the footer copy of it is not, and
   *  `priority` there would compete with the hero image for bandwidth on a
   *  phone connection. */
  priority?: boolean;
}) {
  const inner = (
    <>
      <span
        className="relative grid shrink-0 place-items-center overflow-hidden rounded-lg ring-1 ring-gold/60"
        style={{ width: size, height: size }}
      >
        <Image
          src="/media/brand-mark.png"
          alt=""
          width={1080}
          height={1080}
          priority={priority}
          sizes={`${size}px`}
          className="h-full w-full object-cover object-center"
        />
      </span>
      {withWordmark && (
        <span className="min-w-0 leading-none">
          <span
            className={cn(
              "block truncate font-display text-[1.2rem] italic tracking-tight",
              tone === "night" ? "text-on-night" : "text-ink",
            )}
          >
            {HOTEL.wordmark}
          </span>
          <span
            className={cn(
              "mt-1 block truncate text-micro font-bold uppercase tracking-[0.18em]",
              tone === "night" ? "text-gold-light" : "text-gold-ink",
            )}
          >
            {HOTEL.tagline}
          </span>
        </span>
      )}
    </>
  );

  const classes = cn("tap flex min-w-0 items-center gap-2.5", className);

  if (!href) return <span className={classes}>{inner}</span>;

  return (
    <Link href={href} className={classes} aria-label={`${HOTEL.name} — home`}>
      {inner}
    </Link>
  );
}
