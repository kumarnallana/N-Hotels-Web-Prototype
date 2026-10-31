"use client";

import Image from "next/image";
import { BedDouble, Check, Maximize, Users } from "lucide-react";
import { HOTEL, ROOM_TYPES, directSaving, type RoomType, money } from "@/lib/hotel";
import { useStay } from "@/components/providers/StayProvider";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Both supplied photographs of a room are shown, side by side, always.
 *
 * They used to sit behind a crossfade tab, which hid one of the two facts a
 * guest is comparing and put a control where a picture should be. Two images
 * in a grid is less clever and more useful.
 */
function RoomCard({ room, selected, onChoose }: { room: RoomType; selected: boolean; onChoose: () => void }) {
  return (
    <article
      className={`overflow-hidden rounded-card border bg-card shadow-[var(--shadow-card)] ${
        selected ? "border-gold-deep ring-1 ring-gold" : "border-line"
      }`}
    >
      <div className="grid grid-cols-2 gap-px bg-line">
        {room.photos.map((photo) => (
          <div key={photo.src} className="relative bg-card">
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(min-width: 1024px) 34rem, 50vw"
              className="aspect-[4/3] h-auto w-full object-cover object-center"
            />
          </div>
        ))}
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="mb-1.5 flex flex-wrap items-center gap-2">
              <Badge tone={room.badgeTone}>{room.badge}</Badge>
              {selected && <Badge tone="success">Selected</Badge>}
            </div>
            <h3 className="text-heading">{room.name}</h3>
            <p className="mt-1 text-small text-ink-soft">{room.tagline}</p>
          </div>

          <p className="shrink-0 text-right">
            <span className="num block font-display text-[1.7rem] leading-none text-ink">
              {money(room.price)}
            </span>
            <span className="mt-1 block text-micro uppercase tracking-[0.1em] text-ink-soft">
              per 24 hours
            </span>
          </p>
        </div>

        <ul className="mt-4 grid grid-cols-3 gap-3 border-y border-line py-3.5">
          {[
            { icon: Maximize, label: `${room.sizeSqFt} sq ft` },
            { icon: BedDouble, label: room.bedLabel },
            { icon: Users, label: `Up to ${room.maxGuests}` },
          ].map((spec) => (
            <li key={spec.label} className="min-w-0">
              <spec.icon className="mb-1 h-4 w-4 text-gold-deep" strokeWidth={1.9} aria-hidden />
              <p className="text-micro font-semibold uppercase leading-snug tracking-[0.06em] text-ink-soft">
                {spec.label}
              </p>
            </li>
          ))}
        </ul>

        <ul className="mt-4 flex flex-col gap-2">
          {room.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-small leading-relaxed text-ink">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" strokeWidth={2.4} aria-hidden />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-3">
          <Button onClick={onChoose} size="md">
            {selected ? "Keeping this room" : "Choose this room"}
          </Button>
          <Button href={`tel:${HOTEL.phoneDial}`} variant="outline" size="md">
            Ask about it
          </Button>
          <p className="min-w-0 flex-1 text-micro leading-relaxed text-ink-soft">
            OTA comparison rate {money(room.otaPrice)} — booking direct saves {money(directSaving(room))}.
          </p>
        </div>
      </div>
    </article>
  );
}

export function Rooms() {
  const stay = useStay();

  const choose = (name: string) => {
    stay.setRoomName(name);
    document.getElementById("enquiry")?.scrollIntoView({ block: "start" });
  };

  return (
    <section id="rooms" className="section bg-ivory" aria-labelledby="rooms-title">
      <div className="wrap">
        <SectionHeading
          id="rooms-title"
          index="01"
          eyebrow="Two room types"
          title="Straight rates, both photographed"
          lede="Every rate below is the direct tariff for a full 24-hour cycle, taxes included. There is no live inventory on this page — the desk confirms availability by phone or WhatsApp."
        />

        <div className="grid gap-block lg:grid-cols-2">
          {ROOM_TYPES.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              selected={stay.roomName === room.name}
              onChoose={() => choose(room.name)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
