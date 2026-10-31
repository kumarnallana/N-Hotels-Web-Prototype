import { Compass, MapPin, Navigation, Phone } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ADDRESS_LINE, HOTEL } from "@/lib/hotel";

/** Four things a driver or a first-time guest actually needs, in order. */
const FINDING = [
  {
    title: "The building",
    body: `${HOTEL.building} faces Park Centre. The bank branch on the ground floor is the reference point everyone in town uses.`,
  },
  {
    title: "The floor",
    body: `${HOTEL.floor}, above ${HOTEL.landmark}. The passenger lift runs from the lobby straight to reception — no stairs with luggage.`,
  },
  {
    title: "What to tell the auto driver",
    body: `Say “VVS Grand, Park Centre — above Canara Bank.” Autos from ${HOTEL.town} station and from Samalkot Junction both know the building.`,
  },
  {
    title: "If you cannot find the door",
    body: `Ring the desk. Staff meet arrivals in the lobby and can walk you up, at any hour.`,
  },
] as const;

/**
 * Where the property is, and how to get through the door.
 *
 * Deliberately narrow: temple and station distances live in the Nearby section
 * and are not restated here, and the postal address is not repeated in the
 * footer either. There is no embedded map frame — a keyless Google embed is a
 * third-party request that can fail on a weak connection, and a broken map is
 * worse than no map. The link opens maps on the visitor's own device instead.
 */
export function LocationSection() {
  return (
    <section id="location" className="section bg-sand">
      <div className="wrap">
        <SectionHeading
          index="07"
          eyebrow="Location"
          align="left"
          title="Park Centre, third floor, above the bank."
          lede="The full postal line, the map pin, and the four things that get you to the reception desk."
          aside={<Badge tone="quiet">{HOTEL.locality}</Badge>}
        />

        <div className="grid gap-4 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-6">
          <Card className="flex min-w-0 flex-col gap-5">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold-tint text-gold-ink">
                <MapPin className="h-4.5 w-4.5" strokeWidth={2} aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="eyebrow mb-1.5">{HOTEL.name}</p>
                <address className="font-display text-[1.15rem] not-italic leading-snug text-ink">
                  {ADDRESS_LINE}
                </address>
              </div>
            </div>

            <div className="rounded-card border border-line bg-ivory px-4 py-3.5">
              <p className="eyebrow mb-1">Map pin</p>
              <p className="num text-small font-semibold text-ink">{HOTEL.coordinates}</p>
              <p className="mt-1 text-small text-ink-soft">
                Coordinates as supplied by the property; the street view on your
                maps app is the reference for the doorway.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Button href={HOTEL.mapsUrl} external block>
                <Navigation className="h-4 w-4" strokeWidth={2} aria-hidden />
                Open in Maps
              </Button>
              <Button href={`tel:${HOTEL.phoneDial}`} variant="outline" block>
                <Phone className="h-4 w-4" strokeWidth={2} aria-hidden />
                Call for directions
              </Button>
            </div>
          </Card>

          <Card tone="sand" padded={false} className="min-w-0">
            <ul className="grid gap-px bg-line sm:grid-cols-2">
              {FINDING.map((item, index) => (
                <li key={item.title} className="flex gap-4 bg-card p-5 sm:p-6">
                  <span className="num shrink-0 font-display text-[1.5rem] leading-none text-gold-ink">
                    0{index + 1}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-heading leading-tight">{item.title}</h3>
                    <p className="mt-2 text-reading leading-relaxed text-ink-soft">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-line px-5 py-4 sm:px-6">
              <Compass className="h-4 w-4 shrink-0 text-gold-ink" strokeWidth={2} aria-hidden />
              <p className="min-w-0 text-small text-ink-soft">
                Walking distances to the temples and the stations, with travel
                times, are listed once in
                <a
                  href="#nearby"
                  className="tap ml-1 inline-flex font-semibold text-gold-ink underline decoration-gold underline-offset-4 hover:text-ink"
                >
                  nearby
                </a>
                .
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
