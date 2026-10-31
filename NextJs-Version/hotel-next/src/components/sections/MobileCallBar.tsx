import { MessageSquare, Phone } from "lucide-react";
import { HOTEL } from "@/lib/hotel";

/**
 * The two actions that matter on a phone: call the desk, ask for dates.
 *
 * Below `lg` the header's phone link scrolls away and the footer's is a long
 * reach, so both live in a fixed bar instead. Hidden from `lg` up, where the
 * header carries them permanently.
 *
 * The spacer is not decoration: a fixed bar takes height out of the layout
 * without telling the layout, so without it the bar sits over the last line of
 * the footer forever. `pb-[env(safe-area-inset-bottom)]` then keeps the buttons
 * clear of the iOS home indicator.
 */
export function MobileCallBar() {
  return (
    <>
      <div aria-hidden className="h-[4.25rem] bg-night lg:hidden" />
      <nav
        aria-label="Contact and enquiry"
        className="fixed inset-x-0 bottom-0 z-40 flex items-stretch gap-2.5 border-t border-line-night bg-night px-4 pb-[calc(env(safe-area-inset-bottom)+0.65rem)] pt-2.5 lg:hidden"
      >
        <a
          href={`tel:${HOTEL.phoneDial}`}
          className="tap flex min-w-0 flex-1 items-center justify-center gap-2 rounded-pill bg-gold px-3 text-micro font-bold uppercase tracking-[0.08em] text-ink active:bg-gold-deep"
        >
          <Phone className="h-4 w-4 shrink-0" strokeWidth={2.2} aria-hidden />
          <span className="truncate tabular-nums">{HOTEL.phoneDisplay}</span>
        </a>
        <a
          href="#enquiry"
          className="tap flex min-w-0 flex-1 items-center justify-center gap-2 rounded-pill border border-card/30 px-3 text-micro font-bold uppercase tracking-[0.08em] text-on-night hover:border-gold hover:text-gold-light"
        >
          <MessageSquare className="h-4 w-4 shrink-0 text-gold" strokeWidth={2.2} aria-hidden />
          <span className="truncate">Enquire</span>
        </a>
      </nav>
    </>
  );
}
