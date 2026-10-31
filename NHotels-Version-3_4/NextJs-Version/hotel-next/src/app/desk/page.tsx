import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { HOTEL } from "@/lib/hotel";
import { BrandMark } from "@/components/ui/BrandMark";
import { DeskQueue } from "@/components/sections/DeskQueue";

export const metadata: Metadata = {
  title: "Front desk queue",
  description:
    "Demonstration view of the enquiry queue the guest page saves to. Stored in this browser only.",
  robots: { index: false, follow: false },
};

export default function DeskPage() {
  return (
    <div className="min-h-svh bg-ivory">
      <header className="sticky top-0 z-50 border-b border-line bg-ivory">
        <nav aria-label="Front desk" className="wrap flex h-[var(--nav-height)] items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <BrandMark href={null} size={38} />
            <span className="hidden min-w-0 sm:block">
              <span className="block truncate text-small font-bold uppercase tracking-[0.14em] text-gold-ink">
                Front desk
              </span>
              <span className="block truncate text-micro text-ink-soft">
                {HOTEL.name} · {HOTEL.town}
              </span>
            </span>
          </div>
          <Link
            href="/"
            className="tap inline-flex shrink-0 items-center gap-2 rounded-pill border border-line-strong px-3.5 text-micro font-bold uppercase tracking-[0.08em] text-ink hover:border-gold hover:bg-gold-tint hover:text-gold-ink"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2.2} aria-hidden />
            Guest site
          </Link>
        </nav>
      </header>

      <main id="main" className="wrap py-block">
        <DeskQueue />
      </main>
    </div>
  );
}
