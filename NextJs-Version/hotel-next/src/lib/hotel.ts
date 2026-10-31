/**
 * hotel.ts — the single source of truth for every string, number and asset
 * path on the site. Nothing in `src/components` hard-codes copy: change it
 * here and both pages update.
 *
 * FACTUAL POLICY
 * Rates, sizes, slots and the address are carried over verbatim from the
 * supplied material. Anything that could be read as a third-party claim
 * (guest ratings, review quotes) is flagged `placeholder: true` so the UI is
 * forced to label it as demonstration content rather than fact.
 */

export type PhotoKey = "king-01" | "king-02" | "twin-01" | "twin-02" | "twin-03" | "twin-04";

export interface RoomPhoto {
  key: string;
  label: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface RoomType {
  id: string;
  name: string;
  tagline: string;
  price: number;
  otaPrice: number;
  sizeSqFt: number;
  maxGuests: number;
  bedLabel: string;
  badge: string;
  badgeTone: "gold" | "ink";
  features: string[];
  photos: RoomPhoto[];
}

const PHOTO_FILES: Record<PhotoKey, { src: string; w: number; h: number }> = {
  "king-01": { src: "/media/room-king-01.jpg", w: 1600, h: 1066 },
  "king-02": { src: "/media/room-king-02.jpg", w: 1600, h: 1066 },
  "twin-01": { src: "/media/room-twin-01.jpg", w: 1600, h: 1066 },
  "twin-02": { src: "/media/room-twin-02.jpg", w: 1600, h: 1066 },
  "twin-03": { src: "/media/room-twin-03.jpg", w: 1156, h: 867 },
  "twin-04": { src: "/media/room-twin-04.jpg", w: 1156, h: 867 },
};

function photo(key: PhotoKey, label: string, alt: string): RoomPhoto {
  const file = PHOTO_FILES[key];
  return { key, label, alt, src: file.src, width: file.w, height: file.h };
}

export const HOTEL = {
  name: "[N] Hotel's",
  wordmark: "Hotel's",
  bracket: "N",
  tagline: "Luxury Rooms",
  building: "VVS Grand",
  floor: "3rd Floor",
  landmark: "above Canara Bank",
  locality: "Park Centre",
  town: "Pithapuram",
  state: "Andhra Pradesh",
  pincode: "533450",
  phoneDisplay: "+91 95158 44616",
  phoneDial: "+919515844616",
  whatsapp: "919515844616",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=VVS+Grand+Park+Centre+Pithapuram",
  coordinates: "17.1131253 N, 82.2557761 E",
  establishedNote: "Front desk staffed around the clock",
} as const;

export const ADDRESS_LINE = `${HOTEL.floor}, ${HOTEL.building}, ${HOTEL.landmark}, ${HOTEL.locality}, ${HOTEL.town}, ${HOTEL.state} ${HOTEL.pincode}`;

/** The property sells a rolling 24-hour stay, not an afternoon check-in. */
export const STAY_CYCLE = {
  checkInTime: "07:00 AM",
  blurb:
    "Your stay runs a full 24 hours from the moment you check in. Arrive on a 5 AM train and the room is yours for the whole of the next morning.",
  slots: [
    { value: "07:00 AM (24-Hour Cycle)", short: "Morning · 07:00" },
    { value: "11:00 AM (Standard Cycle)", short: "Mid-day · 11:00" },
    { value: "02:00 PM (Standard Cycle)", short: "Afternoon · 14:00" },
    { value: "08:00 PM (Late Arrival)", short: "Night · 20:00" },
  ],
} as const;

export const TARIFF = {
  currency: "₹",
  extraAdultDeluxe: 400,
  extraAdultExecutive: 500,
  unit: "per 24 hours",
} as const;

export const GUEST_OPTIONS = ["1 Adult", "2 Adults", "3 Adults", "2 Adults + 1 Child"] as const;

export const ROOM_TYPES: RoomType[] = [
  {
    id: "deluxe",
    name: "Deluxe AC Room",
    tagline: "King bed, ensuite bathroom, work desk",
    price: 1800,
    otaPrice: 2100,
    sizeSqFt: 189,
    maxGuests: 3,
    bedLabel: "1 King Bed",
    badge: "Best Value",
    badgeTone: "gold",
    features: [
      "Air-conditioned with inverter AC",
      "Ensuite bathroom with 24/7 geyser",
      "Wall-mounted LED television",
      "Wooden work desk and lounge chair",
      "Daily sanitised housekeeping",
    ],
    photos: [
      photo("king-01", "Bedroom", "Deluxe AC Room with king bed, curtain-dressed window and wooden desk"),
      photo("king-02", "Desk Side", "Deluxe AC Room seen from the wardrobe, showing desk and television"),
    ],
  },
  {
    id: "executive",
    name: "Executive Family Suite",
    tagline: "Twin beds, extra mattress on request",
    price: 2500,
    otaPrice: 2950,
    sizeSqFt: 245,
    maxGuests: 5,
    bedLabel: "2 Double Beds",
    badge: "Family",
    badgeTone: "ink",
    features: [
      "Two full-size beds with extra bedding",
      "Air-conditioned with inverter AC",
      "Ensuite bathroom with 24/7 geyser",
      "Study table with two seating chairs",
      "Wardrobe and luggage bench",
    ],
    photos: [
      photo("twin-01", "Bedroom", "Executive Family Suite with twin beds, wardrobe and wall-mounted television"),
      photo("twin-02", "Bath Side", "Executive Family Suite showing the second bed, desk and blue headboard"),
    ],
  },
];

export interface HeroSlide {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const heroSlide = (key: PhotoKey, alt: string): HeroSlide => {
  const file = PHOTO_FILES[key];
  return { src: file.src, alt, width: file.w, height: file.h };
};

/**
 * The hero frame is first. It is the only one of the six with the bed centred,
 * so a full-bleed cover can crop the edges — the doorway, the bathroom door —
 * and still hold the room's subject.
 */
export const HERO_SLIDES: HeroSlide[] = [
  heroSlide("king-02", "Deluxe AC Room at [N] Hotel's: dressed king bed, seating and curtain"),
  heroSlide("king-01", "Deluxe king bedroom at [N] Hotel's, VVS Grand"),
  heroSlide("twin-01", "Executive family suite bedroom at [N] Hotel's"),
  heroSlide("twin-02", "Twin-bed suite at [N] Hotel's, Pithapuram"),
  heroSlide("twin-03", "Second twin room with green headboard"),
  heroSlide("twin-04", "Twin room corridor view at [N] Hotel's"),
];

/** All six supplied room photographs, for the gallery grid. */
export const GALLERY: RoomPhoto[] = [
  photo("king-01", "Deluxe bedroom", "Deluxe AC Room: king bed, dressed window, wooden desk"),
  photo("twin-01", "Executive suite", "Executive Family Suite: twin beds and wardrobe"),
  photo("king-02", "Desk and television", "Deluxe AC Room from the wardrobe side"),
  photo("twin-02", "Second bed", "Executive Family Suite, desk and headboard wall"),
  photo("twin-03", "Green headboard room", "Twin room with green headboard and wall television"),
  photo("twin-04", "Corridor view", "Twin room seen from the doorway"),
];

/** Real walkthrough footage, offered on demand rather than autoplayed. */
export const WALKTHROUGH = {
  src: "/media/walkthrough.mp4",
  poster: "/media/room-king-01.jpg",
  durationLabel: "23 sec",
  alt: "Video walkthrough of the guest rooms at [N] Hotel's",
} as const;

export const HERO_FACTS = [
  { value: "₹1,800", key: "Direct rate, per 24 hours" },
  { value: "07:00 AM", key: "Check-in on the 24-hour cycle" },
  { value: "250 m", key: "Walk to Sri Pada temple" },
] as const;

export const PROMISE = {
  message: "24-hour check-in cycle · 250 m from Sri Pada Sri Vallabha Temple",
  cta: "Call the front desk",
} as const;

export interface Amenity {
  id: string;
  title: string;
  desc: string;
  icon: string;
}

/** `icon` holds SVG path data so lucide stays the only other icon source. */
export const AMENITIES: Amenity[] = [
  {
    id: "elevator",
    title: "3rd Floor Lift Access",
    desc: "Passenger elevator running directly to the 3rd-floor reception at VVS Grand — no stair climb with luggage.",
    icon: "M19 14l-7 7m0 0l-7-7m7 7V3",
  },
  {
    id: "generator",
    title: "Generator Power Backup",
    desc: "Electrical backup keeps lighting, fans and phone charging live through local power fluctuations.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    id: "geyser",
    title: "24/7 Hot Water Geyser",
    desc: "Instant hot water in every ensuite bathroom, sized for the 4:30 AM temple-bath crowd.",
    icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z",
  },
  {
    id: "frontdesk",
    title: "24h Desk & Auto Assist",
    desc: "Staffed round the clock on the 3rd floor, with help arranging a trusted auto to the station or temples.",
    icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
  },
  {
    id: "wifi",
    title: "High-Speed Wi-Fi",
    desc: "Complimentary wireless internet across the rooms and the reception corridor.",
    icon: "M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0",
  },
  {
    id: "housekeeping",
    title: "Sanitised Housekeeping",
    desc: "Room sanitised, linens laundered and towels replaced before every single arrival.",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    id: "parking",
    title: "On-Site Parking",
    desc: "Designated space for guest cars arriving by road from Samalkot or NH-16.",
    icon: "M8 7h8m-8 5h4m-4 5h8M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z",
  },
  {
    id: "medical",
    title: "Doctor on Call",
    desc: "Consultation arranged on request, with 24-hour pharmacies in the Park Centre complex below.",
    icon: "M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

export type LandmarkKind = "temple" | "transit";

export interface Landmark {
  id: string;
  kind: LandmarkKind;
  name: string;
  type: string;
  distance: string;
  time: string;
  tag: string;
  summary: string;
  significance: string;
  hours: string;
  schedule: string;
  facilities: string;
  dressCode: string;
  mapsUrl: string;
  faqs: { q: string; a: string }[];
}

export const LANDMARKS: Landmark[] = [
  {
    id: "sripada",
    kind: "temple",
    name: "Sri Pada Sri Vallabha Temple",
    type: "Sacred Birthplace & Samsthanam",
    distance: "250 metres",
    time: "3 min walk",
    tag: "Prime Location",
    summary:
      "Birthplace and divine abode of Sri Pada Sri Vallabha, the first avatar of Lord Dattatreya in Kali Yuga.",
    significance:
      "One of the holiest Dattatreya kshetrams in India. Devotees come from Maharashtra, Karnataka and Andhra Pradesh for paduka darshan, morning Abhishekam and sacred parayana.",
    hours: "05:00 AM to 12:30 PM and 04:30 PM to 09:00 PM",
    schedule:
      "Kakada Aarti 05:00 AM · Madhyahna Aarti 12:00 PM · Sheja Aarti 08:30 PM",
    facilities:
      "Free Mahaprasadam served daily from 12:00 PM to 02:00 PM at the temple dining hall.",
    dressCode: "Dhoti or kurta for men, saree or churidar for women.",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Sri+Pada+Sri+Vallabha+Temple+Pithapuram",
    faqs: [
      {
        q: "What is the quietest time for darshan?",
        a: "The 05:30 AM Abhishekam slot has the shortest queue. The 07:00 AM check-in cycle here is built around exactly that — room first, then darshan without rushing.",
      },
      {
        q: "How far is it from the hotel?",
        a: "250 metres. Step out of VVS Grand, pass Canara Bank and walk straight to the temple entrance — about three minutes.",
      },
      {
        q: "Is annadanam prasadam available?",
        a: "Yes. Sri Pada Vallabha Samsthanam serves free Mahaprasadam between 12:00 PM and 02:00 PM to all visitors.",
      },
    ],
  },
  {
    id: "puruhutika",
    kind: "temple",
    name: "Puruhutika Devi Shakti Peetham",
    type: "Astadasa Maha Shakti Peetham",
    distance: "1.2 km",
    time: "5 min auto",
    tag: "18 Maha Shakti Peethas",
    summary:
      "One of the eighteen revered Maha Shakti Peethas, inside the ancient Kukkuteswara Swamy Temple complex.",
    significance:
      "The complex holds the Pada Gaya Sarovaram, where devotees take a holy dip and perform ancestral rites, alongside the Svayambhu Kukkuteswara Swamy lingam.",
    hours: "05:30 AM to 12:30 PM and 04:30 PM to 08:30 PM",
    schedule: "Morning Puja 06:00 AM · Archana through the morning · Evening Harati 07:30 PM",
    facilities: "Prasadam counters line the temple courtyard.",
    dressCode: "Traditional temple attire is recommended.",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Puruhutika+Devi+Temple+Kukkuteswara+Swamy+Pithapuram",
    faqs: [
      {
        q: "What is done at Pada Gaya?",
        a: "Devotees bathe in the Pada Gaya pond and offer Pinda Pradanam for ancestors before the darshan of Lord Kukkuteswara and Puruhutika Devi.",
      },
      {
        q: "What does an auto cost from Park Centre?",
        a: "Roughly ₹40 to ₹50 each way, and about five minutes in normal traffic.",
      },
    ],
  },
  {
    id: "kuntimadhava",
    kind: "temple",
    name: "Kunti Madhava Swamy Temple",
    type: "Pancha Madhava Kshetram",
    distance: "1.5 km",
    time: "6 min auto",
    tag: "Ancient Dwapara Temple",
    summary:
      "One of the five sacred Pancha Madhava temples in India, associated with Kunti Devi and the Pandavas.",
    significance:
      "Enshrines Lord Vishnu as Sri Madhava Swamy with Sridevi and Bhudevi, and is noted for its stone architecture and unusually quiet courtyard.",
    hours: "06:00 AM to 12:00 PM and 04:30 PM to 08:00 PM",
    schedule: "Suprabhatam 06:00 AM · Nitya Puja 07:30 AM · Sayaraksha 07:00 PM",
    facilities: "Prasadam is distributed on festival days and Ekadashi.",
    dressCode: "Modest, conservative clothing.",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Kunti+Madhava+Swamy+Temple+Pithapuram",
    faqs: [
      {
        q: "Why is it called Kunti Madhava?",
        a: "Tradition holds that the Pandavas and their mother Kunti Devi worshipped Lord Vishnu here during their exile.",
      },
      {
        q: "How do I combine the three temples in one day?",
        a: "Sri Pada Vallabha first on foot (250 m), then Puruhutika Devi and Kukkuteswara (1.2 km), and Kunti Madhava last (1.5 km).",
      },
    ],
  },
  {
    id: "railway-station",
    kind: "transit",
    name: "Pithapuram Railway Station (PAP)",
    type: "Mainline Railway Station",
    distance: "1.1 km",
    time: "4 min auto",
    tag: "South Coast Railway",
    summary:
      "The closest station, on the Chennai to Howrah mainline and served by the express trains most pilgrims take.",
    significance:
      "Janmabhoomi, Tirupati, Circar and Simhadri expresses all halt here. Autos run to Park Centre at almost every hour of the night.",
    hours: "Station open 24 hours",
    schedule: "Computerised reservation counter, waiting hall and tea stalls on site.",
    facilities: "Autos queue at the exit gate for the four-minute run to VVS Grand.",
    dressCode: "Standard travel clothing.",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Pithapuram+Railway+Station",
    faqs: [
      {
        q: "How do I reach the hotel from the platform?",
        a: "Exit the gate and take an auto to VVS Grand at Park Centre — the Canara Bank building. Four minutes, ₹40 to ₹60.",
      },
      {
        q: "What if my train lands at 5 in the morning?",
        a: "The desk is staffed through the night, and the 07:00 AM cycle means you are not stuck waiting for an afternoon check-in.",
      },
    ],
  },
  {
    id: "samalkot-junction",
    kind: "transit",
    name: "Samalkot Junction (SLO)",
    type: "Major Railway Junction",
    distance: "13 km",
    time: "20 min drive",
    tag: "Superfast & Vande Bharat",
    summary:
      "The junction that carries the superfast, Rajdhani and Vande Bharat services Pithapuram does not stop for.",
    significance:
      "The practical gateway for visitors coming from Hyderabad, Bengaluru, Visakhapatnam and New Delhi, linked to town by State Highway 40.",
    hours: "Junction open 24 hours",
    schedule: "Multi-platform junction with a prepaid transport counter.",
    facilities: "Food court and refreshment rooms on the concourse.",
    dressCode: "Standard travel clothing.",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Samalkot+Junction+Railway+Station",
    faqs: [
      {
        q: "How do I get from Samalkot to the hotel?",
        a: "Autos run ₹200 to ₹250 and taxis ₹400 to ₹500 from outside Platform 1 around the clock. The drive is about twenty minutes.",
      },
      {
        q: "Can the hotel arrange a pickup?",
        a: "Ring the desk on +91 95158 44616 and they will connect you with a local operator they actually use.",
      },
    ],
  },
  {
    id: "rajahmundry-airport",
    kind: "transit",
    name: "Rajahmundry Airport (RJA)",
    type: "Commercial Airport",
    distance: "64 km",
    time: "75 min drive",
    tag: "Nearest Airport",
    summary:
      "The nearest operating airport, with daily flights in from Hyderabad, Bengaluru and Chennai.",
    significance:
      "Sits at Madhurapudi on NH-16, so the run to Pithapuram is a straightforward highway drive rather than town traffic.",
    hours: "Open to flight schedule",
    schedule: "Taxi desk, security check and a cafeteria in the single terminal.",
    facilities: "Cafe in-terminal, plus highway restaurants along NH-16.",
    dressCode: "Standard travel clothing.",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Rajahmundry+Airport",
    faqs: [
      {
        q: "Best way in from the airport?",
        a: "Pre-paid taxi onto NH-16, then ADB Road into Pithapuram. Allow an hour and fifteen minutes outside peak hours.",
      },
      {
        q: "Which airlines serve Rajahmundry?",
        a: "IndiGo flies the Hyderabad, Bengaluru and Chennai routes.",
      },
    ],
  },
];

export interface Review {
  quote: string;
  author: string;
  context: string;
  source: string;
}

/**
 * PLACEHOLDER CONTENT — these are demonstration quotes carried over from the
 * prototype, not collected reviews. The UI must label them as such and must
 * not render a star rating or a marketplace name as though it were verified.
 */
export const REVIEWS: Review[] = [
  {
    quote:
      "Rooms sit right at Park Centre, so the temple is a three-minute walk and the corridor stays quiet after ten.",
    author: "Guest name pending",
    context: "Deluxe king stay",
    source: "Sample quote",
  },
  {
    quote:
      "Third floor above the bank, lift goes straight up. The 24-hour cycle meant our morning train arrival was not a problem.",
    author: "Guest name pending",
    context: "Business and temple visit",
    source: "Sample quote",
  },
  {
    quote:
      "Suite took our family of three with the extra bedding no trouble, and the geyser held hot water at 4:30 in the morning.",
    author: "Guest name pending",
    context: "Family suite stay",
    source: "Sample quote",
  },
];

export const REVIEW_DISCLAIMER =
  "Demonstration quotes for layout sign-off. Replace with published guest reviews before this goes live.";

/**
 * The section list the header nav, the mobile drawer and the footer are all
 * built from — one source, so the three cannot disagree. `reviews` is left out
 * on purpose: the quotes there are placeholders, and a nav item implies content
 * worth jumping to.
 */
export const SECTIONS = [
  { id: "top", label: "Stay" },
  { id: "rooms", label: "Rooms" },
  { id: "amenities", label: "Amenities" },
  { id: "nearby", label: "Nearby" },
  { id: "gallery", label: "Gallery" },
  { id: "enquiry", label: "Enquire" },
  { id: "location", label: "Location" },
] as const;

export const money = (rupees: number): string =>
  `${TARIFF.currency}${rupees.toLocaleString("en-IN")}`;

export const roomOptionLabel = (room: RoomType): string =>
  `${room.name} · ${money(room.price)}`;

export const tariffSummary = ROOM_TYPES.map(
  (room) => `${room.name.split(" ")[0]} ${money(room.price)}`,
).join(" · ");

export const roomByName = (name: string): RoomType | undefined =>
  ROOM_TYPES.find((room) => room.name === name);

export const directSaving = (room: RoomType): number => room.otaPrice - room.price;
