import Image from "next/image";
import { HERO_FACTS, HERO_SLIDES, HOTEL, STAY_CYCLE } from "@/lib/hotel";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

/**
 * The room photograph is the hero; the words sit on top of it.
 *
 * The previous version put the photo in a 2-of-5 column beside the copy, which
 * made the image 583px wide on a laptop — a thumbnail of a room, not a hotel.
 * Edge-to-edge with the headline overlaid is both the direction the property
 * asked for and the only arrangement where a 1600x1066 interior reads as an
 * interior.
 *
 * The crop is the number to control, so the band heights are chosen from it.
 * `object-cover` on a 1.5005-aspect source discards the smaller dimension:
 *   · 768 x 512 is aspect 1.5 — the whole frame, nothing lost.
 *   · 1440 x 702 (the fold minus chrome and the facts strip) discards 27% of the
 *     height, 13.5% top and bottom, so the ceiling cove and the foot of the bed
 *     go and the dressed bed with its towel art stays.
 * Below `lg` the band is content-driven instead of viewport-driven, which is
 * what keeps a phone honest: forcing `100svh` there is a 390x724 box, aspect
 * 0.54, and would throw away 64% of the room's width. The facts strip is a
 * sibling under the band rather than inside it, so the strip never stretches the
 * image box. `min-height`, not `height`, above `lg` because a 1024x600 window
 * cannot fit 32rem of band plus the strip, and a clipped hero is worse than a
 * hero that runs past the fold.
 *
 * Contrast is measured through the scrim, not assumed. The gradient is 100%
 * night below 35% of the band and 25% at the top; the lede sits where the alpha
 * is 0.8-1.0, which composited over the brightest curtain in the frame is
 * #c9bcac on a ground of about L 0.05 — 5.6:1. The display line sits where the
 * alpha drops to 0.5 (ground L 0.223) and clears 3:1 for text at 32px+ with
 * 3.5:1. The identity line is the one element small enough to need 4.5:1 and
 * high enough to sit on a thin scrim, so it is a solid-night chip and does not
 * depend on the photograph at all.
 *
 * Two things the old hero repeated elsewhere are gone: the "Real room photos"
 * badge (the gallery's eyebrow, lede and closing line own that claim) and the
 * address `figcaption` (this chip, the location section and the footer already
 * state it).
 */
export function Hero() {
  const frame = HERO_SLIDES[0];

  return (
    <section
      id="top"
      aria-label={`${HOTEL.name} — overview`}
      className="flex flex-col bg-night lg:min-h-[calc(100svh-var(--hero-chrome))]"
    >
      <div className="relative isolate flex min-h-[26rem] flex-1 flex-col overflow-hidden sm:min-h-[32rem]">
        <Image
          src={frame.src}
          alt={frame.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-night from-35% via-night/80 to-night/25"
        />

        <div className="wrap relative z-10 mt-auto flex flex-col gap-5 py-block sm:gap-6">
          <Badge tone="ink" className="self-start">
            {`${HOTEL.building} · ${HOTEL.floor}`}
          </Badge>

          <h1 className="max-w-[26ch] text-display font-display text-balance text-on-night">
            A full 24 hours,
            <span className="block italic text-gold-light">250 m from the temple.</span>
          </h1>

          <p className="lede text-on-night-soft">{STAY_CYCLE.blurb}</p>

          <div className="flex flex-wrap items-center gap-3">
            <Button href="#enquiry" size="lg">
              Check my dates
            </Button>
            <Button href="#rooms" variant="onNight" size="lg">
              See the rooms
            </Button>
          </div>
        </div>
      </div>

      <ul className="grid grid-cols-1 border-t border-line-night bg-night sm:grid-cols-3">
        {HERO_FACTS.map((fact) => (
          <li
            key={fact.key}
            className="flex items-baseline justify-between gap-3 border-t border-line-night px-[var(--spacing-gutter)] py-2.5 first:border-t-0 sm:border-t-0 sm:border-l sm:py-4 sm:first:border-l-0"
          >
            <p className="num font-display text-[1.25rem] leading-none text-on-night sm:text-[1.5rem]">
              {fact.value}
            </p>
            <p className="text-micro uppercase leading-snug tracking-[0.1em] text-on-night-soft sm:mt-1.5">
              {fact.key}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
