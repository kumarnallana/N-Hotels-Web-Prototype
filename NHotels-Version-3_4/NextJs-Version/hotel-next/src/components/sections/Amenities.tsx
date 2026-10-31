import { AMENITIES } from "@/lib/hotel";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Eight tiles, one per supplied facility.
 *
 * This section used to run a WebGL light band, a mesh gradient, a grid veil and
 * a film-grain layer behind the same eight sentences. The copy is the point;
 * it now sits on a sand band so the page has a second surface colour and the
 * eye gets a change of ground without anything moving.
 *
 * The icons are the path data held in `AMENITIES`, drawn inline at a 1.8
 * stroke to match the lucide set used everywhere else.
 */
export function Amenities() {
  return (
    <section id="amenities" className="section bg-sand" aria-labelledby="amenities-title">
      <div className="wrap">
        <SectionHeading
          id="amenities-title"
          index="02"
          eyebrow="In the building"
          title="What the third floor actually has"
          lede="Lift, backup power and a desk that is staffed through the night — the three things that matter most when a train lands early."
        />

        <ul className="grid grid-cols-1 gap-3 xs:grid-cols-2 lg:grid-cols-4">
          {AMENITIES.map((amenity) => (
            <li
              key={amenity.id}
              className="flex min-w-0 flex-col rounded-card border border-line bg-card p-4 shadow-[var(--shadow-card)] sm:p-5"
            >
              <span className="mb-3 grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gold-tint text-gold-ink">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d={amenity.icon} />
                </svg>
              </span>

              <h3 className="text-reading font-semibold leading-snug">{amenity.title}</h3>
              <p className="mt-1.5 text-small leading-relaxed text-ink-soft">{amenity.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
