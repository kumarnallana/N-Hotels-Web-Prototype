"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { CalendarCheck, MessageCircle, Phone, Send } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Field, Select, TextArea, TextInput } from "@/components/ui/Field";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useToast } from "@/components/ui/Toast";
import { useStay } from "@/components/providers/StayProvider";
import {
  GUEST_OPTIONS,
  HOTEL,
  ROOM_TYPES,
  STAY_CYCLE,
  directSaving,
  money,
  roomByName,
} from "@/lib/hotel";
import {
  EnquiryStore,
  addIsoDays,
  prettyDate,
  priceFor,
  todayIso,
  whatsappUrl,
} from "@/lib/enquiry";

/**
 * Ten digits, optionally +91. Deliberately permissive about separators because
 * people type `98480 12345` and rejecting that is a form defect, not a rule.
 */
const PHONE = /^(\+?91[-\s]?)?[6-9]\d{4}[-\s]?\d{5}$/;

interface Errors {
  guestName?: string;
  phone?: string;
  note?: string;
}

const today = todayIso();

/**
 * The enquiry form is the whole conversion surface for this site: there is no
 * payment gateway and no live availability feed, so it asks for a request, not
 * a booking, and says so under the button.
 *
 * Room, dates, arrival slot and guest count are read from `useStay()` — the
 * same state the booking strip at the top of the page writes. In the prototype
 * these were two unrelated sets of inputs, so the estimate in the header could
 * disagree with the total submitted at the bottom.
 */
export function Enquiry() {
  const { show } = useToast();
  const { roomName, checkIn, checkOut, slot, guests, nights, setRoomName, setCheckIn, setCheckOut, setSlot, setGuests } =
    useStay();

  const [guestName, setGuestName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const room = roomByName(roomName) ?? ROOM_TYPES[0];
  const total = useMemo(() => priceFor(roomName, nights), [roomName, nights]);
  const datesLabel = `${prettyDate(checkIn)} to ${prettyDate(checkOut)} (${nights} ${nights === 1 ? "night" : "nights"})`;

  const validate = (): Errors => {
    const next: Errors = {};
    if (guestName.trim().length < 2) next.guestName = "Please tell us the name for the room.";
    if (!PHONE.test(phone.trim())) {
      next.phone = "Enter a 10-digit mobile number so the desk can call you back.";
    }
    if (note.trim().length > 500) next.note = "Keep the note under 500 characters.";
    return next;
  };

  const record = () => ({
    guestName: guestName.trim(),
    phone: phone.trim(),
    roomType: roomName,
    dates: datesLabel,
    slot,
    guests,
    totalAmount: `${money(total)} (Net Direct Tariff)`,
    note: note.trim(),
  });

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const id = `NH-${new Date().getFullYear()}-${String(Date.now()).slice(-5)}`;
    const stored = EnquiryStore.add({
      ...record(),
      id,
      status: "New",
      createdAt: today,
    });

    if (!stored) {
      show("This browser blocked local storage, so the enquiry was not saved.");
      return;
    }

    setSubmittedId(id);
    setNote("");
    show(`Enquiry ${id} saved. The desk sees it on their queue page.`);
  };

  return (
    <section id="enquiry" className="section bg-ivory">
      <div className="wrap">
        <SectionHeading
          index="06"
          eyebrow="Enquire"
          align="left"
          title="Send the desk your dates."
          lede="This is a request, not a confirmed booking — availability is held only after the front desk answers. Rates shown are the direct tariff."
        />

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,23rem)] lg:gap-6">
          <form onSubmit={onSubmit} className="min-w-0">
            <Card className="flex flex-col gap-5">
            <fieldset className="min-w-0 border-0 p-0">
              <legend className="eyebrow mb-3 p-0">Guest details</legend>
              <div className="grid gap-4 xs:grid-cols-2">
                <Field
                  id="en-name"
                  label="Name for the room"
                  required
                  error={errors.guestName}
                  className="min-w-0"
                >
                  <TextInput
                    id="en-name"
                    name="guestName"
                    autoComplete="name"
                    value={guestName}
                    invalid={Boolean(errors.guestName)}
                    onChange={(event) => setGuestName(event.target.value)}
                    placeholder="Venkata Satyanarayana"
                  />
                </Field>

                <Field
                  id="en-phone"
                  label="Mobile number"
                  required
                  error={errors.phone}
                  hint="The desk calls this number back."
                  className="min-w-0"
                >
                  <TextInput
                    id="en-phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={phone}
                    invalid={Boolean(errors.phone)}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="98480 12345"
                  />
                </Field>
              </div>
            </fieldset>

            <span aria-hidden className="block h-px bg-line" />

            <fieldset className="min-w-0 border-0 p-0">
              <legend className="eyebrow mb-3 p-0">Stay</legend>
              <div className="grid gap-4 xs:grid-cols-2">
                <Field id="en-room" label="Room" className="min-w-0 xs:col-span-2">
                  <Select
                    id="en-room"
                    name="roomType"
                    value={roomName}
                    onChange={(event) => setRoomName(event.target.value)}
                  >
                    {ROOM_TYPES.map((item) => (
                      <option key={item.id} value={item.name}>
                        {item.name} — {money(item.price)} {item.sizeSqFt} sq ft
                      </option>
                    ))}
                  </Select>
                </Field>

                <Field id="en-in" label="Check-in" className="min-w-0">
                  <TextInput
                    id="en-in"
                    name="checkIn"
                    type="date"
                    min={today}
                    value={checkIn}
                    onChange={(event) => setCheckIn(event.target.value)}
                  />
                </Field>

                <Field id="en-out" label="Check-out" className="min-w-0">
                  <TextInput
                    id="en-out"
                    name="checkOut"
                    type="date"
                    min={addIsoDays(checkIn, 1)}
                    value={checkOut}
                    onChange={(event) => setCheckOut(event.target.value)}
                  />
                </Field>

                <Field
                  id="en-slot"
                  label="Arrival slot"
                  className="min-w-0"
                  hint="24 hours from whichever slot you pick."
                >
                  <Select id="en-slot" name="slot" value={slot} onChange={(event) => setSlot(event.target.value)}>
                    {STAY_CYCLE.slots.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.value}
                      </option>
                    ))}
                  </Select>
                </Field>

                <Field id="en-guests" label="Guests" className="min-w-0">
                  <Select
                    id="en-guests"
                    name="guests"
                    value={guests}
                    onChange={(event) => setGuests(event.target.value)}
                  >
                    {GUEST_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Select>
                </Field>
              </div>
            </fieldset>

            <Field
              id="en-note"
              label="Requests"
              error={errors.note}
              hint="Darshan timing, extra mattress, pickup from the station — anything the desk should know."
              className="min-w-0"
            >
              <TextArea
                id="en-note"
                name="note"
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Arriving on the 05:40 train, would like the 07:00 cycle."
              />
            </Field>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button type="submit" size="lg" className="sm:w-auto">
                <Send className="h-4 w-4" strokeWidth={2} aria-hidden />
                Send enquiry
              </Button>
              <Button href={whatsappUrl(record())} external variant="outline" size="lg">
                <MessageCircle className="h-4 w-4" strokeWidth={2} aria-hidden />
                Send on WhatsApp
              </Button>
            </div>

            <p className="text-small leading-relaxed text-ink-soft">
              Nothing is charged here and no room is held by this form. The desk
              confirms on {HOTEL.phoneDisplay} before anything is agreed.
            </p>

            {submittedId && (
              <div className="flex flex-col gap-3 rounded-card border border-success/30 bg-success-tint px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-small font-semibold text-success">
                  Saved as {submittedId}. It stays on this device until the desk
                  answers by phone.
                </p>
                <Button href="/desk" variant="night" size="sm">
                  <CalendarCheck className="h-4 w-4" strokeWidth={2} aria-hidden />
                  See the desk queue
                </Button>
              </div>
            )}
            </Card>
          </form>

          <aside className="flex min-w-0 flex-col gap-4">
            <Card tone="sand" className="flex flex-col gap-4">
              <div className="flex items-start justify-between gap-3">
                <p className="eyebrow p-0">Your stay</p>
                <Badge tone="success">{nights} {nights === 1 ? "night" : "nights"}</Badge>
              </div>

              <dl className="grid gap-2.5 text-small">
                {[
                  ["Room", room.name],
                  ["Dates", `${prettyDate(checkIn)} → ${prettyDate(checkOut)}`],
                  ["Arrival", slot],
                  ["Guests", guests],
                  ["Held for", `${room.maxGuests} max, ${room.bedLabel}`],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-baseline justify-between gap-3">
                    <dt className="shrink-0 text-ink-soft">{label}</dt>
                    <dd className="min-w-0 text-right font-semibold text-ink">{value}</dd>
                  </div>
                ))}
              </dl>

              <span aria-hidden className="block h-px bg-line-strong" />

              <div className="flex items-end justify-between gap-3">
                <p className="text-small text-ink-soft">
                  Estimate
                  <span className="block">
                    {money(room.price)} × {nights}
                  </span>
                </p>
                <p className="num font-display text-[2rem] leading-none text-ink">
                  {money(total)}
                </p>
              </div>

              <p className="text-small leading-relaxed text-ink-soft">
                Indicative only. Extra-bed and meal charges are quoted by the desk
                when it confirms.
              </p>

              <span aria-hidden className="rule-gold block rounded-pill" />

              <p className="text-small font-semibold text-gold-ink">
                Booking direct saves {money(directSaving(room))} per night against{" "}
                {money(room.otaPrice)} on the travel apps.
              </p>
            </Card>

            <Card className="flex flex-col gap-3">
              <p className="eyebrow p-0">Prefer to talk?</p>
              <p className="text-reading leading-relaxed text-ink-soft">
                The 3rd-floor desk at {HOTEL.building} is staffed around the
                clock. {HOTEL.establishedNote}.
              </p>
              <Button href={`tel:${HOTEL.phoneDial}`} variant="night" block>
                <Phone className="h-4 w-4" strokeWidth={2} aria-hidden />
                {HOTEL.phoneDisplay}
              </Button>
              <Link
                href="/desk"
                className="tap inline-flex items-center gap-1.5 text-small font-semibold text-gold-ink hover:text-ink"
              >
                Front desk view of saved enquiries
              </Link>
            </Card>
          </aside>
        </div>
      </div>
    </section>
  );
}
