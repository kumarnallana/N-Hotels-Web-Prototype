"use client";

import { useState } from "react";
import { Clock, Footprints, MapPin } from "lucide-react";
import { LANDMARKS, type Landmark, type LandmarkKind } from "@/lib/hotel";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Sheet } from "@/components/ui/Sheet";
import { Tabs, type TabItem } from "@/components/ui/Tabs";
import { SectionHeading } from "@/components/ui/SectionHeading";

const TABS: TabItem[] = [
  { id: "temple", label: "Darshan", hint: "3" },
  { id: "transit", label: "Arrival", hint: "3" },
];

const LEDE: Record<LandmarkKind, string> = {
  temple: "Three temples within a short walk or auto ride, with the timings the desk actually quotes.",
  transit: "Where trains, autos and flights put you, and what the run to Park Centre costs.",
};

const DETAILS: { label: string; key: "hours" | "schedule" | "facilities" | "dressCode" }[] = [
  { label: "Open", key: "hours" },
  { label: "Puja / on site", key: "schedule" },
  { label: "Facilities", key: "facilities" },
  { label: "Dress", key: "dressCode" },
];

export function Nearby() {
  const [kind, setKind] = useState<LandmarkKind>("temple");
  const [open, setOpen] = useState<Landmark | null>(null);

  const items = LANDMARKS.filter((landmark) => landmark.kind === kind);

  return (
    <section id="nearby" className="section bg-ivory" aria-labelledby="nearby-title">
      <div className="wrap">
        <SectionHeading
          id="nearby-title"
          index="03"
          eyebrow="Around Pithapuram"
          title="Temple town, on foot and by auto"
          lede={LEDE[kind]}
        />

        <Tabs items={TABS} value={kind} onChange={(id) => setKind(id as LandmarkKind)} ariaLabel="Filter landmarks" />

        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((landmark) => (
            <li
              key={landmark.id}
              className="flex min-w-0 flex-col rounded-card border border-line bg-card p-4 shadow-[var(--shadow-card)] sm:p-5"
            >
              <Badge tone="quiet" className="self-start">
                {landmark.tag}
              </Badge>

              <h3 className="mt-2.5 text-reading font-semibold leading-snug">{landmark.name}</h3>
              <p className="mt-1 text-small text-ink-soft">{landmark.type}</p>

              <p className="num mt-3 flex items-center gap-4 text-micro font-bold uppercase tracking-[0.08em] text-gold-ink">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
                  {landmark.distance}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
                  {landmark.time}
                </span>
              </p>

              <p className="mt-3 flex-1 text-small leading-relaxed text-ink">{landmark.summary}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => setOpen(landmark)}>
                  <Footprints className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                  Details
                </Button>
                <Button href={landmark.mapsUrl} external variant="gold" size="sm">
                  Map
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Sheet
        open={Boolean(open)}
        onClose={() => setOpen(null)}
        eyebrow={open ? `${open.distance} · ${open.time}` : undefined}
        title={open?.name ?? ""}
        footer={
          open && (
            <Button href={open.mapsUrl} external size="md" block>
              Open in Google Maps
            </Button>
          )
        }
      >
        {open && (
          <div className="flex flex-col gap-6">
            <p className="text-reading leading-relaxed text-ink">{open.significance}</p>

            <dl className="grid gap-px overflow-hidden rounded-card border border-line bg-line">
              {DETAILS.map((detail) => (
                <div key={detail.key} className="grid gap-1 bg-card px-4 py-3 sm:grid-cols-[9rem_1fr]">
                  <dt className="text-micro font-bold uppercase tracking-[0.12em] text-gold-ink">
                    {detail.label}
                  </dt>
                  <dd className="text-small leading-relaxed text-ink">{open[detail.key]}</dd>
                </div>
              ))}
            </dl>

            <div>
              <h3 className="text-reading font-semibold">Questions the desk gets</h3>
              <ul className="mt-3 flex flex-col gap-3">
                {open.faqs.map((faq) => (
                  <li key={faq.q} className="rounded-card border border-line bg-sand px-4 py-3">
                    <p className="text-small font-semibold text-ink">{faq.q}</p>
                    <p className="mt-1 text-small leading-relaxed text-ink-soft">{faq.a}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Sheet>
    </section>
  );
}
