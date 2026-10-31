"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { GALLERY, HOTEL, WALKTHROUGH, type RoomPhoto } from "@/lib/hotel";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Sheet } from "@/components/ui/Sheet";

/**
 * Every image here is one of the six photographs supplied by the property.
 *
 * The grid is 2-up on a phone and 4-up above `sm`, with the first frame taking
 * a double cell — the same visual hierarchy as the old bento layout, without
 * the entrance stagger that made people wait for images to arrive.
 *
 * The walkthrough is not autoplayed anywhere: it is 5.3 MB, and it starts when
 * the guest taps play. Its length is read from the file's own mvhd box
 * (23.25 s), not estimated.
 */
function Thumb({ photo, onOpen }: { photo: RoomPhoto; onOpen: () => void }) {
  return (
    <li className="min-w-0">
      <button
        type="button"
        onClick={onOpen}
        className="group relative block aspect-square w-full overflow-hidden rounded-card border border-line bg-sand hover:border-gold"
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(min-width: 640px) 25vw, 50vw"
          className="object-cover object-center"
        />
        <span className="absolute inset-x-0 bottom-0 bg-night/78 px-3 pb-2 pt-6 text-left text-micro font-semibold uppercase tracking-[0.1em] text-on-night">
          {photo.label}
        </span>
      </button>
    </li>
  );
}

export function Gallery() {
  const [viewer, setViewer] = useState<RoomPhoto | null>(null);
  const [video, setVideo] = useState(false);

  return (
    <section id="gallery" className="section bg-sand" aria-labelledby="gallery-title">
      <div className="wrap">
        <SectionHeading
          id="gallery-title"
          index="04"
          eyebrow="Shot on property"
          title="The rooms as they are"
          lede="No stock photography and no renders. These are the Deluxe and Executive rooms at VVS Grand, plus the walkthrough the desk filmed."
          aside={
            <Badge tone="quiet">
              {GALLERY.length} photos · {WALKTHROUGH.durationLabel} video
            </Badge>
          }
        />

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <li className="col-span-2 row-span-2 min-w-0">
            <button
              type="button"
              onClick={() => setViewer(GALLERY[0])}
              className="relative block h-full min-h-[14rem] w-full overflow-hidden rounded-card border border-line bg-card shadow-[var(--shadow-card)] hover:border-gold"
            >
              <Image
                src={GALLERY[0].src}
                alt={GALLERY[0].alt}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover object-center"
              />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-night/78 p-4">
                <span className="text-small font-bold uppercase tracking-[0.1em] text-gold-light">
                  {GALLERY[0].label}
                </span>
                <span className="text-micro text-on-night-soft">Enlarge</span>
              </span>
            </button>
          </li>

          {GALLERY.slice(1, 4).map((item) => (
            <Thumb key={item.src} photo={item} onOpen={() => setViewer(item)} />
          ))}

          <li className="col-span-2 min-w-0">
            <button
              type="button"
              onClick={() => setVideo(true)}
              className="relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-card border border-line bg-night hover:border-gold"
            >
              <Image
                src={WALKTHROUGH.poster}
                alt=""
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover opacity-40"
              />
              <span className="relative z-10 flex flex-col items-center gap-2 text-on-night">
                <span className="grid h-14 w-14 place-items-center rounded-full border border-gold bg-night/70">
                  <Play className="ml-0.5 h-5 w-5 text-gold-light" strokeWidth={2} aria-hidden />
                </span>
                <span className="px-2 text-center text-micro font-bold uppercase tracking-[0.12em]">
                  Room walkthrough · {WALKTHROUGH.durationLabel}
                </span>
              </span>
            </button>
          </li>

          {GALLERY.slice(4).map((item) => (
            <Thumb key={item.src} photo={item} onOpen={() => setViewer(item)} />
          ))}
        </ul>

        <p className="mt-5 text-small leading-relaxed text-ink-soft">
          Photography is the property's own. {HOTEL.name} has not staged or retouched these frames;
          the lighting is as it appears in the rooms.
        </p>
      </div>

      <Sheet
        open={Boolean(viewer)}
        onClose={() => setViewer(null)}
        eyebrow={viewer?.label}
        title={viewer ? `${viewer.label} at ${HOTEL.name}` : ""}
      >
        {viewer && (
          <figure className="m-0">
            <Image
              src={viewer.src}
              alt={viewer.alt}
              width={viewer.width}
              height={viewer.height}
              sizes="(min-width: 640px) 42rem, 100vw"
              className="h-auto w-full rounded-card object-cover"
            />
            <figcaption className="mt-3 text-small leading-relaxed text-ink-soft">{viewer.alt}</figcaption>
          </figure>
        )}
      </Sheet>

      <Sheet
        open={video}
        onClose={() => setVideo(false)}
        eyebrow={`${HOTEL.name} · on-site footage`}
        title="Room walkthrough"
      >
        <video
          src={WALKTHROUGH.src}
          poster={WALKTHROUGH.poster}
          controls
          playsInline
          preload="none"
          aria-label={WALKTHROUGH.alt}
          className="h-auto w-full rounded-card bg-night"
        />
        <p className="mt-3 text-small leading-relaxed text-ink-soft">
          Filmed inside the rooms. Sound is the room tone as recorded.
        </p>
      </Sheet>
    </section>
  );
}
