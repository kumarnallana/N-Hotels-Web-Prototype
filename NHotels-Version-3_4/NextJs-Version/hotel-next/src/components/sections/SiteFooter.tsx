import Link from "next/link";
import { MessageCircle, Navigation, Phone } from "lucide-react";
import { BrandMark } from "@/components/ui/BrandMark";
import { HOTEL, SECTIONS, tariffSummary } from "@/lib/hotel";

/**
 * Things a signed-off site must not imply, stated plainly in one place rather
 * than footnoted separately in every section.
 */
const NOTICES = [
  "Rates are the direct tariff, quoted per 24-hour stay.",
  "An enquiry holds nothing — the desk confirms by phone first.",
  "Guest quotes on this page are demonstration placeholders, not published reviews.",
] as const;

const CONTACT = [
  { label: HOTEL.phoneDisplay, href: `tel:${HOTEL.phoneDial}`, Icon: Phone },
  {
    label: "WhatsApp the desk",
    href: `https://wa.me/${HOTEL.whatsapp}`,
    Icon: MessageCircle,
    external: true,
  },
  { label: "Open in Maps", href: HOTEL.mapsUrl, Icon: Navigation, external: true },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="night border-t border-line-night pb-[calc(env(safe-area-inset-bottom)+1.5rem)] pt-block">
      <div className="wrap">
        <div className="grid gap-block md:grid-cols-2 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_minmax(0,1.1fr)]">
          <div className="flex min-w-0 flex-col gap-4">
            <BrandMark tone="night" priority={false} />
            <p className="max-w-[38ch] text-reading leading-relaxed text-on-night-soft">
              {HOTEL.floor}, {HOTEL.building}, {HOTEL.locality}. {HOTEL.town} {HOTEL.pincode},{" "}
              {HOTEL.state}.
            </p>
            <p className="num text-small font-semibold text-gold-light">{tariffSummary}</p>
          </div>

          <nav aria-label="Sections" className="min-w-0">
            <h2 className="eyebrow eyebrow-on-night mb-3">On this page</h2>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 sm:grid-cols-3 lg:grid-cols-2">
              {SECTIONS.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="tap inline-flex items-center text-small text-on-night hover:text-gold-light"
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex min-w-0 flex-col gap-3">
            <h2 className="eyebrow eyebrow-on-night">Front desk</h2>
            <ul className="flex flex-col gap-2">
              {CONTACT.map(({ label, href, Icon, ...rest }) => (
                <li key={label} className="min-w-0">
                  <a
                    href={href}
                    {...("external" in rest && rest.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="tap inline-flex min-w-0 items-center gap-2.5 text-small font-semibold text-on-night hover:text-gold-light"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-gold" strokeWidth={2} aria-hidden />
                    <span className="truncate">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-small text-on-night-soft">{HOTEL.establishedNote}.</p>
          </div>
        </div>

        <section
          aria-labelledby="footer-notices"
          className="mt-block rounded-card border border-line-night bg-card/6 p-5"
        >
          <h2 id="footer-notices" className="eyebrow eyebrow-on-night mb-2.5">
            Please note
          </h2>
          <ul className="grid gap-2 sm:grid-cols-3">
            {NOTICES.map((notice) => (
              <li key={notice} className="flex min-w-0 gap-2.5 text-small leading-relaxed text-on-night-soft">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                <span>{notice}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-6 flex flex-col gap-3 border-t border-line-night pt-5 text-small text-on-night-soft sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {HOTEL.name} · {HOTEL.building}, {HOTEL.town}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="#enquiry" className="tap font-semibold text-gold-light hover:text-on-night">
              Send an enquiry
            </Link>
            <Link href="/desk" className="tap hover:text-gold-light">
              Front desk view
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
