"use client";

import { ArrowRight, CalendarClock, Phone } from "lucide-react";
import {
  GUEST_OPTIONS,
  HOTEL,
  ROOM_TYPES,
  STAY_CYCLE,
  TARIFF,
  directSaving,
  money,
  roomByName,
} from "@/lib/hotel";
import { priceFor } from "@/lib/enquiry";
import { useStay } from "@/components/providers/StayProvider";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Field, Select, TextInput } from "@/components/ui/Field";

/**
 * The same five inputs the enquiry form uses, writing to the same provider, so
 * a guest who sets their dates here never meets a different total down there.
 * In the prototype the two were independent sets of controls.
 *
 * It used to be pulled up over the hero with a negative margin, which is how it
 * ended up covering the photo controls by 30px. It sits in normal flow now.
 */
export function BookingPanel() {
  const stay = useStay();
  const room = roomByName(stay.roomName) ?? ROOM_TYPES[0];
  const total = priceFor(stay.roomName, stay.nights);

  return (
    <section aria-label="Plan your stay" className="wrap mt-block">
      <div className="overflow-hidden rounded-card border border-line bg-card shadow-[var(--shadow-raise)]">
        <span aria-hidden className="rule-gold block" />

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-sand px-4 py-3.5 sm:px-6">
          <h2 className="flex items-center gap-2.5 text-heading font-semibold">
            <CalendarClock className="h-5 w-5 text-gold-deep" strokeWidth={1.9} aria-hidden />
            Plan your stay
          </h2>
          <Badge tone="gold">
            Direct saves {money(directSaving(room))} on {room.name.split(" ")[0]}
          </Badge>
        </div>

        <div className="grid gap-4 px-4 py-5 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
          <Field id="bk-room" label="Room" className="sm:col-span-2 lg:col-span-1">
            <Select
              id="bk-room"
              value={stay.roomName}
              onChange={(event) => stay.setRoomName(event.target.value)}
            >
              {ROOM_TYPES.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name} — {money(item.price)} / 24 h
                </option>
              ))}
            </Select>
          </Field>

          <Field id="bk-in" label="Check-in" hint={`Cycle starts ${STAY_CYCLE.checkInTime}`}>
            <TextInput
              id="bk-in"
              type="date"
              className="tap"
              value={stay.checkIn}
              onChange={(event) => stay.setCheckIn(event.target.value)}
            />
          </Field>

          <Field id="bk-out" label="Check-out">
            <TextInput
              id="bk-out"
              type="date"
              className="tap"
              value={stay.checkOut}
              min={stay.checkIn}
              onChange={(event) => stay.setCheckOut(event.target.value)}
            />
          </Field>

          <Field id="bk-slot" label="Arrival slot">
            <Select id="bk-slot" value={stay.slot} onChange={(event) => stay.setSlot(event.target.value)}>
              {STAY_CYCLE.slots.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.value}
                </option>
              ))}
            </Select>
          </Field>

          <Field
            id="bk-guests"
            label="Guests"
            className="sm:col-span-2 lg:col-span-1"
            hint={`Room holds up to ${room.maxGuests}; extra adult ${money(
              room.id === "deluxe" ? TARIFF.extraAdultDeluxe : TARIFF.extraAdultExecutive,
            )} ${TARIFF.unit}`}
          >
            <Select id="bk-guests" value={stay.guests} onChange={(event) => stay.setGuests(event.target.value)}>
              {GUEST_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </Field>

          <div className="flex flex-col justify-center rounded-card border border-gold/40 bg-gold-tint px-4 py-4">
            <p className="text-micro font-bold uppercase tracking-[0.12em] text-gold-ink">
              {stay.nights} {stay.nights === 1 ? "night" : "nights"} · estimate
            </p>
            <p className="num mt-1 font-display text-[1.9rem] leading-none text-ink">{money(total)}</p>
            <p className="mt-1 text-small text-ink-soft">
              {money(room.price)} per 24 h, taxes included
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 border-t border-line bg-sand px-4 py-4 sm:px-6">
          <Button href="#enquiry" size="md">
            Send this as an enquiry
            <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
          </Button>
          <Button href={`tel:${HOTEL.phoneDial}`} variant="outline" size="md">
            <Phone className="h-4 w-4 text-gold-deep" strokeWidth={2} aria-hidden />
            Call {HOTEL.phoneDisplay}
          </Button>
          <p className="min-w-0 flex-1 text-small leading-relaxed text-ink-soft">
            Rates are the direct tariff supplied by the property. Availability is confirmed by the
            desk — this page does not show live inventory.
          </p>
        </div>
      </div>
    </section>
  );
}
