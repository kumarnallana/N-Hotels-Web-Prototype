import { Quote } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { REVIEW_DISCLAIMER, REVIEWS } from "@/lib/hotel";

/**
 * Demonstration quotes only.
 *
 * There is no star row and no marketplace logo here, because no verified guest
 * rating exists for this property yet. Each card carries the `Sample quote`
 * source from the data file, and the band carries a plain-language disclaimer,
 * so nothing on this page can be misread as a published review. Replace
 * `REVIEWS` in `src/lib/hotel.ts` with real, sourced quotes before launch and
 * delete the disclaimer line at the same time.
 *
 * Set on the night band because the light sections around it (sand amenities,
 * ivory gallery) would otherwise run together; the dark strip is the seam.
 */
export function Reviews() {
  return (
    <section id="reviews" className="night section">
      <div className="wrap">
        <SectionHeading
          index="05"
          eyebrow="Guest Feedback"
          onDark
          title="What guests say is not written yet."
          lede="The three quotes below are layout placeholders carried over from the prototype. They are shown so the section can be signed off, not to imply reviews exist."
        />

        <ul className="grid gap-4 md:grid-cols-3">
          {REVIEWS.map((review) => (
            <li key={review.quote} className="flex min-w-0">
              <Card tone="night" className="flex w-full flex-col gap-4 border-line-night">
                <Quote
                  className="h-6 w-6 shrink-0 text-gold"
                  strokeWidth={1.8}
                  aria-hidden
                />
                <blockquote className="min-w-0 font-display text-[1.2rem] leading-snug text-on-night">
                  {review.quote}
                </blockquote>
                <figcaption className="mt-auto flex flex-wrap items-center gap-2 border-t border-line-night pt-4">
                  <Badge tone="onNight">{review.source}</Badge>
                  <span className="text-small text-on-night-soft">{review.context}</span>
                </figcaption>
              </Card>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-block flex max-w-[64ch] items-start gap-3 rounded-card border border-line-night bg-card/6 px-4 py-3.5 text-small leading-relaxed text-on-night-soft">
          <span
            aria-hidden
            className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-warning"
          />
          <span>{REVIEW_DISCLAIMER}</span>
        </p>
      </div>
    </section>
  );
}
