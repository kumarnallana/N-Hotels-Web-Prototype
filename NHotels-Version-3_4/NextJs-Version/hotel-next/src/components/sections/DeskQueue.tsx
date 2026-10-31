"use client";

import { useEffect, useMemo, useState } from "react";
import { MessageCircle, Phone, RotateCcw, Sparkles, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Tabs, type TabItem } from "@/components/ui/Tabs";
import { Select } from "@/components/ui/Field";
import { useToast } from "@/components/ui/Toast";
import { HOTEL } from "@/lib/hotel";
import { EnquiryStore, SEED_ENQUIRIES, whatsappUrl, type Enquiry, type EnquiryStatus } from "@/lib/enquiry";

const STATUSES: EnquiryStatus[] = ["New", "Contacted", "Confirmed"];

const STATUS_TONE: Record<EnquiryStatus, "gold" | "warning" | "success"> = {
  New: "gold",
  Contacted: "warning",
  Confirmed: "success",
};

/**
 * Staff-side view of the queue the guest page writes to.
 *
 * It exists for one reason: an enquiry form that saves to nowhere cannot be
 * tested or signed off. This is the other half of that form, not a property
 * management system — no room blocks, no rates editing, no guest CRM.
 *
 * The queue lives in this browser's localStorage. Seed rows are in memory only
 * until something is submitted, which is why a first visit still shows a
 * populated list, and why nothing here has touched a server.
 */
export function DeskQueue() {
  const { show } = useToast();
  const [rows, setRows] = useState<Enquiry[]>(SEED_ENQUIRIES);
  const [filter, setFilter] = useState<string>("all");
  const [loaded, setLoaded] = useState(false);

  // Reading localStorage during render would make the server and the browser
  // disagree about the list, so the first paint uses the seeds and the real
  // queue arrives one effect later.
  useEffect(() => {
    setRows(EnquiryStore.all());
    setLoaded(true);
  }, []);

  const counts = useMemo(() => {
    const map = new Map<EnquiryStatus, number>(STATUSES.map((status) => [status, 0]));
    for (const row of rows) map.set(row.status, (map.get(row.status) ?? 0) + 1);
    return map;
  }, [rows]);

  const tabs: TabItem[] = useMemo(
    () => [
      { id: "all", label: "All", hint: String(rows.length) },
      ...STATUSES.map((status) => ({
        id: status.toLowerCase(),
        label: status,
        hint: String(counts.get(status) ?? 0),
      })),
    ],
    [rows.length, counts],
  );

  const visible = useMemo(
    () => (filter === "all" ? rows : rows.filter((row) => row.status.toLowerCase() === filter)),
    [rows, filter],
  );

  const committed = useMemo(
    () =>
      rows
        .filter((row) => row.status === "Confirmed")
        .reduce((sum, row) => sum + EnquiryStore.amountOf(row), 0),
    [rows],
  );

  const mutate = (next: boolean, message: string) => {
    if (!next) {
      show("This browser blocked local storage, so the change was not kept.");
      return;
    }
    setRows(EnquiryStore.all());
    show(message);
  };

  return (
    <div className="flex flex-col gap-block">
      <Card tone="sand" className="flex flex-col gap-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="eyebrow mb-1">{HOTEL.name} · front desk</p>
            <h1 className="text-title font-display">Enquiry queue</h1>
          </div>
          <dl className="flex flex-wrap gap-x-6 gap-y-2">
            {[
              ["Saved here", String(rows.length)],
              ["Confirmed value", `₹${committed.toLocaleString("en-IN")}`],
              ["Source", loaded ? "This browser" : "Seed rows"],
            ].map(([label, value]) => (
              <div key={label} className="min-w-0">
                <dt className="text-micro font-bold uppercase tracking-[0.12em] text-ink-soft">
                  {label}
                </dt>
                <dd className="num font-display text-[1.35rem] leading-tight text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <p className="max-w-[70ch] text-small leading-relaxed text-ink-soft">
          Demonstration queue. Enquiries submitted on the guest page are stored in
          this browser only — nothing here is sent to the hotel, and no room is
          held by a status change.
        </p>

        <div className="flex flex-wrap gap-2.5">
          <Button size="sm" variant="outline" onClick={() => mutate(EnquiryStore.addDemo(), "Test enquiry added.")}>
            <Sparkles className="h-4 w-4" strokeWidth={2} aria-hidden />
            Add test enquiry
          </Button>
          <Button size="sm" variant="ghost" onClick={() => mutate(EnquiryStore.reset(), "Queue reset to the three seed rows.")}>
            <RotateCcw className="h-4 w-4" strokeWidth={2} aria-hidden />
            Reset seeds
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              EnquiryStore.clear();
              setRows(SEED_ENQUIRIES);
              setLoaded(false);
              show("Cleared this browser’s saved enquiries.");
            }}
          >
            <Trash2 className="h-4 w-4" strokeWidth={2} aria-hidden />
            Clear saved
          </Button>
        </div>
      </Card>

      <Tabs items={tabs} value={filter} onChange={setFilter} ariaLabel="Filter enquiries by status" />

      {visible.length === 0 ? (
        <Card className="flex flex-col items-start gap-3">
          <p className="font-display text-heading">Nothing at this stage.</p>
          <p className="max-w-[60ch] text-reading text-ink-soft">
            {filter === "all"
              ? "The queue holds no enquiries right now. Add a test enquiry above, or send one from the guest page."
              : `No enquiry in the queue is marked ${tabs.find((tab) => tab.id === filter)?.label}. Switch to All, or add a test enquiry above.`}
          </p>
          <Button href="/" variant="outline" size="sm">
            Open the guest page
          </Button>
        </Card>
      ) : (
        <ul className="flex flex-col gap-4">
          {visible.map((row) => (
            <li key={row.id} className="min-w-0">
              <Card className="flex flex-col gap-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="num text-micro font-bold uppercase tracking-[0.14em] text-ink-soft">
                      {row.id} · {row.createdAt}
                    </p>
                    <h2 className="mt-1 font-display text-[1.3rem] leading-tight">{row.guestName}</h2>
                  </div>
                  <Badge tone={STATUS_TONE[row.status]}>{row.status}</Badge>
                </div>

                <dl className="grid gap-x-5 gap-y-3 border-y border-line py-4 xs:grid-cols-2 lg:grid-cols-3">
                  {[
                    ["Room", row.roomType],
                    ["Dates", row.dates],
                    ["Arrival", row.slot],
                    ["Guests", row.guests],
                    ["Estimate", row.totalAmount],
                  ].map(([label, value]) => (
                    <div key={label} className="min-w-0">
                      <dt className="text-micro font-bold uppercase tracking-[0.12em] text-ink-soft">
                        {label}
                      </dt>
                      <dd className="mt-0.5 text-small font-semibold leading-snug text-ink">
                        {value}
                      </dd>
                    </div>
                  ))}

                  <div className="min-w-0">
                    <dt className="text-micro font-bold uppercase tracking-[0.12em] text-ink-soft">
                      Status
                    </dt>
                    <dd className="mt-1">
                      <Select
                        aria-label={`Status for ${row.guestName}`}
                        value={row.status}
                        onChange={(event) =>
                          mutate(
                            EnquiryStore.setStatus(row.id, event.target.value as EnquiryStatus),
                            `${row.id} marked ${event.target.value}.`,
                          )
                        }
                      >
                        {STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </Select>
                    </dd>
                  </div>
                </dl>

                {row.note && (
                  <p className="rounded-card border border-line bg-ivory px-4 py-3 text-small leading-relaxed text-ink">
                    {row.note}
                  </p>
                )}

                <div className="flex flex-wrap gap-2.5">
                  <Button href={`tel:${row.phone.replace(/\s/g, "")}`} variant="night" size="sm">
                    <Phone className="h-4 w-4" strokeWidth={2} aria-hidden />
                    Call {row.phone}
                  </Button>
                  <Button href={whatsappUrl(row)} external variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4" strokeWidth={2} aria-hidden />
                    Open in WhatsApp
                  </Button>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
