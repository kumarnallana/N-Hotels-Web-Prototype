import Image from "next/image";
import { MapPin, Sparkles } from "lucide-react";
import { HERO_FACTS, HERO_SLIDES, HOTEL, STAY_CYCLE } from "@/lib/hotel";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

/**
 * The opening frame, and the image inside it is sized by the photograph rather
 * than by the column it happens to land in.
 *
 * The supplied rooms are 1600x1066 — a 3:2 landscape. The previous version
 * forced that into `aspect-[4/5]` above 1024px, which is a 0.8 box: object-cover
 * therefore threw away 47% of the frame's width (the desk, the window, most of
 * the room) and made the image 583px tall, taller than the whole text column,
 * so the hero alone measured 92% of a 1024x768 laptop viewport. Three different
 * aspect ratios across three breakpoints is also why the photo looked different
 * on every screen.
 *
 * Now: one honest 3:2 at every size, in a column that takes two of five parts of
 * the row. The text column becomes the tallest element again, which is what a
 * hero should be driven by, and the image stops deciding the page's height.
 *
 * The row uses `lg:grid-cols-5` with 3/2 spans instead of a fixed `26rem`
 * sidebar, so the image scales with the container (`--content-max`, 72rem)
 * and never needs a hand-tuned max-width. Below `lg` the hero is one column and
 * that column is 672-707px wide on a tablet, where an uncapped 3:2 photo is 470px
 * tall on its own; the `max-w-[30rem]` keeps the figure at a size that belongs to
 * the reading measure instead of the viewport width.
 *
 * On a phone the facts strip was three stacked cards — 239px of it at 390px wide —
 * and the old `xs` 3-up fallback measured no better (152px cells, because three
 * labels of ~26 characters cannot fit a 120px column). Each fact is therefore a
 * single value/label row until `sm`, which is where three columns first become
 * readable at 44px+ per label.
 */
export function Hero() {
  const primary = HERO_SLIDES[0];

  return (
    <section id="top" aria-label={`${HOTEL.name} — overview`} className="bg-ivory">
      <div className="wrap grid gap-block py-block lg:grid-cols-5 lg:items-center lg:gap-14 lg:py-section">
        <div className="min-w-0 max-w-[42rem] lg:col-span-3">
          <p className="eyebrow mb-4 flex flex-wrap items-center gap-x-2 gap-y-1">
            <Sparkles className="h-3.5 w-3.5 text-gold-deep" strokeWidth={2} aria-hidden />
            {HOTEL.building}
            <span aria-hidden className="text-line-strong">·</span>
            {HOTEL.floor}, {HOTEL.locality}
          </p>

          <h1 className="text-display font-display text-ink">
            A full 24 hours,
            <span className="block italic text-gold-ink">250 m from the temple.</span>
          </h1>

          <p className="lede mt-5">{STAY_CYCLE.blurb}</p>

          <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-7">
            <Button href="#enquiry" size="lg">
              Check my dates
            </Button>
            <Button href="#rooms" variant="outline" size="lg">
              See the rooms
            </Button>
          </div>

          <ul className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-card border border-line bg-line sm:mt-8 sm:grid-cols-3">
            {HERO_FACTS.map((fact) => (
              <li
                key={fact.key}
                className="flex items-baseline justify-between gap-3 bg-card px-4 py-2.5 sm:block sm:py-4"
              >
                <p className="font-display text-[1.25rem] leading-none text-ink sm:text-[1.5rem]">
                  {fact.value}
                </p>
                <p className="text-micro uppercase leading-snug tracking-[0.1em] text-ink-soft sm:mt-1.5">
                  {fact.key}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <figure className="m-0 mx-auto min-w-0 max-w-[30rem] lg:col-span-2">
          <div className="relative overflow-hidden rounded-card border border-line bg-card shadow-[var(--shadow-raise)]">
            <Image
              src={primary.src}
              alt={primary.alt}
              width={primary.width}
              height={primary.height}
              priority
              sizes="(min-width: 1024px) 27rem, (min-width: 40rem) 30rem, 100vw"
              className="aspect-[3/2] h-auto w-full object-cover object-center"
            />
            <div className="absolute left-3 top-3">
              <Badge tone="onImage">Real room photos</Badge>
            </div>
            <figcaption className="flex items-start gap-2 border-t border-line bg-card px-4 py-3 text-small leading-snug text-ink-soft">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" strokeWidth={2} aria-hidden />
              <span>
                {HOTEL.floor}, {HOTEL.building} — {HOTEL.landmark}, {HOTEL.locality},{" "}
                {HOTEL.town}
              </span>
            </figcaption>
          </div>
        </figure>
      </div>
    </section>
  );
}
