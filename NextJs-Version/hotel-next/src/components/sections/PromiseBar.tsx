import Image from "next/image";
import { Phone } from "lucide-react";
import { HOTEL, PROMISE } from "@/lib/hotel";

/**
 * Sits in normal flow above the sticky header and simply scrolls away.
 *
 * The prototype painted this over the top of the page and then made the header
 * absolute as well, which is how the nav ended up printed across the review
 * cards in the screenshots. Two blocks in flow cannot overlap.
 *
 * It is the one dark strip at the top of the page. It used to be a plum
 * gradient, which introduced a second brand hue for no reason.
 */
export function PromiseBar() {
  return (
    <div className="border-b border-line-night bg-night">
      <div className="wrap flex flex-wrap items-center justify-between gap-x-5 gap-y-1 py-2">
        <p className="flex min-w-0 items-start gap-2 text-micro font-semibold uppercase leading-snug tracking-[0.1em] text-on-night">
          <span aria-hidden className="mt-[0.35rem] block h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
          <span className="min-w-0">{PROMISE.message}</span>
        </p>
        <a
          href={`tel:${HOTEL.phoneDial}`}
          className="tap inline-flex shrink-0 items-center gap-2 rounded-pill px-2.5 py-1 text-micro font-bold uppercase tracking-[0.1em] text-gold-light hover:bg-card/10"
        >
          <Phone className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
          <span className="hidden xs:inline">{PROMISE.cta}</span>
          <span className="num">{HOTEL.phoneDisplay}</span>
        </a>
      </div>
    </div>
  );
}
