import { HOTEL, ROOM_TYPES, STAY_CYCLE, money } from "./hotel";

export type EnquiryStatus = "New" | "Contacted" | "Confirmed";

export interface Enquiry {
  id: string;
  guestName: string;
  phone: string;
  roomType: string;
  dates: string;
  slot: string;
  guests: string;
  totalAmount: string;
  status: EnquiryStatus;
  note: string;
  createdAt: string;
}

const STORAGE_KEY = "nh-enquiries-v1";

/**
 * Today as YYYY-MM-DD on the hotel's own calendar.
 *
 * Pinned to Asia/Kolkata rather than read from the machine: `new Date()` would
 * give the *server* one answer and the *visitor* another, and because this
 * value seeds the default check-in dates, that difference is a hydration
 * mismatch on every date input on the page. A room in Pithapuram is let for
 * Indian calendar dates, so that is the calendar used.
 */
export const todayIso = (): string =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(new Date())
    .slice(0, 10);

export const addIsoDays = (iso: string, days: number): string => {
  const base = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(base.getTime())) return iso;
  base.setDate(base.getDate() + days);
  return base.toISOString().slice(0, 10);
};

export const nightsBetween = (checkIn: string, checkOut: string): number => {
  const start = new Date(`${checkIn}T00:00:00`).getTime();
  const end = new Date(`${checkOut}T00:00:00`).getTime();
  if (Number.isNaN(start) || Number.isNaN(end)) return 0;
  return Math.max(0, Math.round((end - start) / 86_400_000));
};

export const prettyDate = (iso: string): string => {
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
};

export const priceFor = (roomName: string, nights: number): number => {
  const room = ROOM_TYPES.find((item) => item.name === roomName) ?? ROOM_TYPES[0];
  return room.price * Math.max(0, nights);
};

export const SEED_ENQUIRIES: Enquiry[] = [
  {
    id: "NH-2026-0814",
    guestName: "Venkata Satyanarayana",
    phone: "+91 98480 12345",
    roomType: "Deluxe AC Room",
    dates: "Nov 4 to Nov 6 (2 nights)",
    slot: "07:00 AM (24-Hour Cycle)",
    guests: "2 Adults",
    totalAmount: `${money(3600)} (Net Direct Tariff)`,
    status: "Confirmed",
    note: "Early morning darshan at Sri Pada Vallabha. Asked for the quiet side of the floor.",
    createdAt: "2026-10-28",
  },
  {
    id: "NH-2026-0815",
    guestName: "Raghavendra Rao",
    phone: "+91 94401 56789",
    roomType: "Executive Family Suite",
    dates: "Nov 5 to Nov 6 (1 night)",
    slot: "11:00 AM (Standard Cycle)",
    guests: "3 Adults",
    totalAmount: `${money(2500)} (Net Direct Tariff)`,
    status: "New",
    note: "Family visiting Puruhutika Devi Peetham. Requested auto assistance from Park Centre.",
    createdAt: "2026-10-29",
  },
  {
    id: "NH-2026-0816",
    guestName: "K. S. Ramanujam",
    phone: "+91 98840 98765",
    roomType: "Deluxe AC Room",
    dates: "Nov 8 to Nov 10 (2 nights)",
    slot: "07:00 AM (24-Hour Cycle)",
    guests: "1 Adult",
    totalAmount: `${money(3600)} (Net Direct Tariff)`,
    status: "Contacted",
    note: "Single guest on parayana. Arriving via Samalkot Junction.",
    createdAt: "2026-10-30",
  },
];

const demoRecord = (): Enquiry => ({
  id: `NH-2026-0${Math.floor(Math.random() * 900) + 100}`,
  guestName: "Demo Guest",
  phone: HOTEL.phoneDisplay,
  roomType: ROOM_TYPES[0].name,
  dates: `${prettyDate(addIsoDays(todayIso(), 12))} to ${prettyDate(addIsoDays(todayIso(), 14))} (2 nights)`,
  slot: STAY_CYCLE.slots[0].value,
  guests: "2 Adults",
  totalAmount: `${money(3600)} (Net Direct Tariff)`,
  status: "New",
  note: "Simulated test record — not a real booking.",
  createdAt: todayIso(),
});

function read(): Enquiry[] | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Enquiry[]) : null;
  } catch {
    return null;
  }
}

function write(rows: Enquiry[]): boolean {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
    return true;
  } catch {
    return false;
  }
}

export const EnquiryStore = {
  /** Seed rows live in memory until something is actually submitted, so a
   *  first-time visitor to the desk page still sees a populated queue. */
  all(): Enquiry[] {
    return read() ?? SEED_ENQUIRIES;
  },
  add(enquiry: Enquiry): boolean {
    return write([enquiry, ...EnquiryStore.all()]);
  },
  setStatus(id: string, status: EnquiryStatus): boolean {
    return write(EnquiryStore.all().map((row) => (row.id === id ? { ...row, status } : row)));
  },
  addDemo(): boolean {
    return write([demoRecord(), ...EnquiryStore.all()]);
  },
  reset(): boolean {
    return write(SEED_ENQUIRIES);
  },
  clear(): void {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* private mode — nothing to clear */
    }
  },
  amountOf(row: Enquiry): number {
    return parseInt(row.totalAmount.replace(/[^0-9]/g, ""), 10) || 0;
  },
};

export function whatsappUrl(row: Pick<Enquiry, "guestName" | "roomType" | "dates" | "slot" | "guests" | "totalAmount" | "note">): string {
  const lines = [
    `Enquiry for ${HOTEL.name}`,
    `Name: ${row.guestName}`,
    `Room: ${row.roomType}`,
    `Dates: ${row.dates}`,
    `Arrival: ${row.slot}`,
    `Guests: ${row.guests}`,
    `Estimate: ${row.totalAmount}`,
    `Requests: ${row.note}`,
  ];
  return `https://wa.me/${HOTEL.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
}
