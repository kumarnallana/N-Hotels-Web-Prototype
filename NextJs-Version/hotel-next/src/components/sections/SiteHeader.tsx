"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { HOTEL, SECTIONS } from "@/lib/hotel";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { BrandMark } from "@/components/ui/BrandMark";
import { Button } from "@/components/ui/Button";

const SECTION_IDS = SECTIONS.map((section) => section.id);
const NAV_ITEMS = SECTIONS.filter((section) => section.id !== "top");

/**
 * Sticky, never absolute, and opaque.
 *
 * The header occupies real height in the flow, so no section can ever be drawn
 * underneath it — the original bug was an absolutely-positioned header that
 * floated over the review cards. `scroll-padding-block-start` in globals.css
 * handles the one remaining case: arriving at `#rooms` from an anchor.
 *
 * The glass version used `backdrop-filter` plus a scroll-progress bar and a
 * shared-layout underline that travelled between labels. All three cost a
 * re-composite on every scroll frame, which is exactly the jank a phone cannot
 * afford, so the bar is a fixed height on a solid ground and the active state is
 * a static rule under the label.
 *
 * It is a direct child of the page flow, not of a wrapper: a sticky element can
 * only travel as far as its containing block, so wrapping it in a short
 * `relative` div would let it scroll off the top and disappear.
 */
export function SiteHeader() {
  const active = useActiveSection(SECTION_IDS);
  const [open, setOpen] = useState(false);

  useLockBodyScroll(open);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-ivory">
        <div className="wrap flex h-[var(--nav-height)] items-center justify-between gap-3">
          <BrandMark size={38} />

          <nav aria-label="Sections" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id}>
                    <Link
                      href={`#${item.id}`}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "tap relative inline-flex items-center rounded-lg px-3 text-micro font-bold uppercase tracking-[0.1em]",
                        isActive ? "text-gold-ink" : "text-ink-soft hover:text-ink",
                      )}
                    >
                      {item.label}
                      {isActive && (
                        <span aria-hidden className="rule-gold absolute inset-x-2.5 bottom-1 rounded-pill" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex min-w-0 items-center gap-2">
            <a
              href={`tel:${HOTEL.phoneDial}`}
              className="tap hidden min-w-0 items-center gap-2 text-small font-semibold text-ink hover:text-gold-ink xl:inline-flex"
            >
              <Phone className="h-4 w-4 shrink-0 text-gold-ink" strokeWidth={2} aria-hidden />
              <span className="truncate tabular-nums">{HOTEL.phoneDisplay}</span>
            </a>

            <Button href="#enquiry" size="sm" className="hidden sm:inline-flex">
              Book a stay
            </Button>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="tap inline-flex items-center gap-2 rounded-pill border border-line-strong px-3 text-micro font-bold uppercase tracking-[0.1em] text-ink hover:border-gold hover:text-gold-ink lg:hidden"
            >
              Menu
              <Menu className="h-4 w-4" strokeWidth={2} aria-hidden />
            </button>
          </div>
        </div>
      </header>

      {/*
        Full-screen, not a slide-over: an off-canvas panel on a 360px phone still
        leaves a sliver of the page behind it, and the tap that closes it is
        ambiguous. This is a plain scrollable list — no transform, no scrim, no
        animation, and the two actions that matter are pinned at the bottom.
      */}
      {open && (
        <div
          id="mobile-nav"
          className="fixed inset-0 z-100 flex flex-col bg-ivory lg:hidden"
        >
          <div className="flex h-[var(--nav-height)] shrink-0 items-center justify-between gap-3 border-b border-line px-[var(--spacing-gutter)]">
            <BrandMark href={null} size={38} />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="tap grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line-strong text-ink hover:border-gold hover:text-gold-ink"
            >
              <X className="h-4 w-4" strokeWidth={2} aria-hidden />
            </button>
          </div>

          <nav aria-label="Sections" className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-[var(--spacing-gutter)] py-4">
            <ul className="flex flex-col gap-1">
              {NAV_ITEMS.map((item, index) => (
                <li key={item.id}>
                  <Link
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === item.id ? "true" : undefined}
                    className={cn(
                      "tap flex items-center justify-between gap-4 rounded-xl border-l-2 px-3 text-[1.05rem] font-medium",
                      active === item.id
                        ? "border-gold bg-gold-tint font-semibold text-gold-ink"
                        : "border-transparent text-ink hover:border-line-strong hover:bg-sand",
                    )}
                  >
                    {item.label}
                    <span className="num text-micro tabular-nums text-ink-soft">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="shrink-0 border-t border-line bg-sand px-[var(--spacing-gutter)] py-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
            <div className="flex flex-col gap-2.5">
              <Button href="#enquiry" block onClick={() => setOpen(false)}>
                Check dates
              </Button>
              <Button href={`tel:${HOTEL.phoneDial}`} variant="outline" block>
                <Phone className="h-4 w-4" strokeWidth={2} aria-hidden />
                {HOTEL.phoneDisplay}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
