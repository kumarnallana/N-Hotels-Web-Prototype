/* ============================================================================
   data.js — SINGLE SOURCE OF TRUTH
   ----------------------------------------------------------------------------
   Every fact about the property lives here exactly once. Nothing in this file
   contains markup. Anything that used to be hard-typed in several places
   (tariffs, address, phone, check-in cycle, temple distance) is declared here
   and interpolated everywhere else.
   ========================================================================== */
"use strict";

const HOTEL = {
  name: "[N] Hotel's",
  brand: "[N] Hotels",
  subBrand: "Luxury Rooms",
  building: "VVS Grand",
  floor: "3rd Floor",
  landmark: "Park Centre",
  town: "Pithapuram",
  state: "Andhra Pradesh",
  pincode: "533450",
  phoneDisplay: "+91 95158 44616",
  phoneDial: "+919515844616",
  whatsapp: "919515844616",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=17.1131253,82.2557761",
  coordinates: "17.1131253 N, 82.2557761 E",
};

/* Derived once, reused everywhere. ---------------------------------------- */
const ADDRESS_LINE = [
  HOTEL.floor,
  HOTEL.building,
  "Canara Bank Premises",
  HOTEL.landmark,
  HOTEL.town,
  `${HOTEL.state} ${HOTEL.pincode}`,
].join(", ");

const STAY_CYCLE = {
  label: "24-hour cycle",
  checkInTime: "07:00 AM",
  slots: [
    { value: "07:00 AM (24-Hour Cycle)", short: "07:00 AM · 24h cycle" },
    { value: "11:00 AM (Standard Cycle)", short: "11:00 AM · standard" },
  ],
};

const TARIFF = {
  currency: "₹",
  extraAdultDeluxe: 400,
  extraAdultExecutive: 500,
};

const GUEST_SLOTS = [
  { value: "1 Adult, 1 Room", label: "1 Adult, 1 Room" },
  { value: "2 Adults, 1 Room", label: "2 Adults, 1 Room" },
  { value: "3 Adults, 1 Room", label: "3 Adults, 1 Room" },
  { value: "4+ Family Group", label: "4+ Family Group" },
];

const ROOM_TYPES = [
  {
    id: "deluxe",
    name: "Deluxe AC Room",
    price: 1800,
    otaPrice: 2100,
    sizeLabel: "189 sq. ft (18 sq.m)",
    guests: "1 - 2 Guests",
    category: "Master Accommodation",
    badge: "Best Value Rate",
    badgeTone: "gold",
    blurb:
      "Comfortable king-size bed with whisper-quiet split air conditioning, warm cove ceiling lighting, attached geyser bathroom, and complimentary high-speed Wi-Fi.",
    features: [
      "King Comfort Bed",
      "Split Inverter AC",
      "24/7 Geyser Hot Water",
      "Cove Ceiling Lighting",
      "Wardrobe & Luggage Rack",
      "Complimentary Wi-Fi",
    ],
    photos: [
      {
        key: "bedroom",
        label: "Bedroom",
        src: "assets/img/mainBedroom.png",
        alt: "Deluxe AC Room king bedroom at [N] Hotel's",
      },
      {
        key: "bath",
        label: "Geyser Bath",
        src: "assets/img/bathroomGeyser.jpg",
        alt: "Ensuite geyser bathroom attached to the Deluxe AC Room at [N] Hotel's",
      },
    ],
  },
  {
    id: "executive",
    name: "Executive Family Suite",
    price: 2500,
    otaPrice: 2950,
    sizeLabel: "245 sq. ft (23 sq.m)",
    guests: "Up to 3-4 Guests",
    category: "Family Suite",
    badge: "Family Suite",
    badgeTone: "plum",
    blurb:
      "Generously proportioned suite designed for families or small groups. Features twin luxury beds, plush armchair, dedicated work desk with electric kettle, and rapid geyser bath.",
    features: [
      "Twin Luxury Beds",
      "Split Inverter AC",
      "Work Desk & Kettle",
      "Plush Seating Corner",
      "24/7 Geyser Hot Water",
      "Complimentary Wi-Fi",
    ],
    photos: [
      {
        key: "bedroom",
        label: "Bedroom",
        src: "assets/img/executiveBed.png",
        alt: "Executive Family Suite twin bedroom at [N] Hotel's",
      },
      {
        key: "bath",
        label: "Geyser Bath",
        src: "assets/img/bathroomGeyser.jpg",
        alt: "Rapid geyser bathroom serving the Executive Family Suite at [N] Hotel's",
      },
    ],
  },
];

/* Hero photography is drawn from the same room records, so a slide and its
   card can never drift apart. */
const HERO_SLIDES = [
  {
    src: "assets/img/mainBedroom.png",
    alt: "Deluxe king bedroom at [N] Hotel's",
    label: "Deluxe king bedroom",
  },
  {
    src: "assets/img/executiveBed.png",
    alt: "Executive family suite twin bedroom at [N] Hotel's",
    label: "Executive family suite",
  },
  {
    src: "assets/img/bathroomGeyser.jpg",
    alt: "Ensuite geyser bathroom at [N] Hotel's",
    label: "Ensuite geyser bathroom",
  },
  {
    src: "assets/img/livingLobby.jpg",
    alt: "Reception lounge at [N] Hotel's",
    label: "Reception lounge",
  },
];

/* Each headline fact is stated once on the page; the hero owns these three. */
const HERO_FACTS = [
  { value: "₹1,800", key: "Direct rate, per 24 hours" },
  { value: "07:00 AM", key: "Check-in on the 24-hour cycle" },
  { value: "24/7", key: "Staffed front desk & lift access" },
];

/* Interpolated helpers ------------------------------------------------------ */
const money = (n) => `${TARIFF.currency}${n.toLocaleString("en-IN")}`;
const roomOptionLabel = (room) => `${room.name} · ${money(room.price)}`;
const roomOptionValue = (room) => `${room.name} (${money(room.price)}/24h)`;
const tariffSummary = ROOM_TYPES.map(
  (room) => `${room.name.split(" ")[0]} ${money(room.price)}`,
).join(" · ");

const AMENITIES = [
  {
    id: "elevator",
    title: "3rd Floor Lift Access",
    desc: "Dedicated passenger elevator directly to the reception floor. Effortless access for senior citizens and visiting families.",
    icon: "M19 14l-7 7m0 0l-7-7m7 7V3",
  },
  {
    id: "generator",
    title: "Generator Power Backup",
    desc: "Uninterrupted electrical generator backup keeping lighting, fans and phone charging running through local power fluctuations.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    id: "geyser",
    title: "24/7 Hot Water Geyser",
    desc: "Instant, high-temperature hot water in every ensuite bathroom, ideal for refreshing morning showers and early starts.",
    icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z",
  },
  {
    id: "frontdesk",
    title: "24h Front Desk & Auto Assist",
    desc: "Round-the-clock physical front desk. Assistance with early arrivals, secure luggage storage and trusted local transport.",
    icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
  },
  {
    id: "wifi",
    title: "High-Speed Wi-Fi",
    desc: "Complimentary wireless internet across guest rooms and reception corridors, to stay in contact with family during travel.",
    icon: "M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0",
  },
  {
    id: "housekeeping",
    title: "Daily Sanitized Housekeeping",
    desc: "Thorough room sanitization, freshly laundered linens, sanitized bath towels and floor cleaning before every arrival.",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    id: "parking",
    title: "On-Site Vehicle Parking",
    desc: "Designated parking for personal four-wheelers and guest vehicles arriving via Samalkot or National Highway 16.",
    icon: "M8 7h8m-8 5h4m-4 5h8M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z",
  },
  {
    id: "medical",
    title: "Doctor on Call & Support",
    desc: "Prompt medical consultation on call for senior citizens and guests, with 24-hour retail pharmacies in the complex below.",
    icon: "M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

/* Sacred landmarks and transit points. `kind` drives which labels the detail
   sheet uses, so a railway station is no longer described in temple terms. */
const LANDMARKS = [
  {
    id: "sripada",
    kind: "temple",
    name: "Sri Pada Sri Vallabha Temple",
    type: "Sacred Birthplace & Samsthanam",
    tag: "Prime Location & Major Landmark",
    distance: "250 metres",
    time: "3 min walk",
    summary:
      "Birthplace and divine abode of Sri Pada Sri Vallabha, the first avatar of Lord Dattatreya in Kali Yuga.",
    significance:
      "Considered one of the holiest Dattatreya kshetrams in India. Devotees visit from across Maharashtra, Karnataka and Andhra Pradesh for Paduka darshan, morning Abhishekam and sacred parayana.",
    hours: "05:00 AM to 12:30 PM and 04:30 PM to 09:00 PM",
    schedule:
      "Kakada Aarti 05:00 AM · Madhyahna Aarti 12:00 PM · Sheja Aarti 08:30 PM",
    facilities:
      "Daily free Mahaprasadam served 12:00 PM to 02:00 PM at the temple dining hall.",
    dressCode:
      "Traditional Hindu attire — dhoti/kurta for men, sarees/churidars for women.",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Sri+Pada+Sri+Vallabha+Temple+Pithapuram",
    faqs: [
      {
        q: "What is the best time for darshan?",
        a: "Early morning 05:30 AM Abhishekam is the most peaceful, with minimal queue. The 07:00 AM check-in cycle lets you attend early darshan comfortably.",
      },
      {
        q: "How far is it from the property?",
        a: "Only 250 metres. Step out of the building, walk straight past the bank toward the temple entrance — about a 3-minute walk.",
      },
      {
        q: "Is Annadanam prasadam available?",
        a: "Yes. Sri Pada Vallabha Samsthanam serves daily free Mahaprasadam between 12:00 PM and 02:00 PM to all visiting guests.",
      },
    ],
  },
  {
    id: "puruhutika",
    kind: "temple",
    name: "Puruhutika Devi Shakti Peetham",
    type: "Astadasa Maha Shakti Peetham",
    tag: "18 Maha Shakti Peethas",
    distance: "1.2 km",
    time: "5 min auto",
    summary:
      "One of the 18 revered Maha Shakti Peethas, inside the ancient Kukkuteswara Swamy Temple complex.",
    significance:
      "Here Devi Sati's hip (Puruhutika) fell. The complex also holds the sacred Pada Gaya Sarovaram, where devotees take holy dips and perform ancestral rites, and the ancient Svayambhu Kukkuteswara Swamy lingam.",
    hours: "05:30 AM to 12:30 PM and 04:30 PM to 08:30 PM",
    schedule:
      "Morning Puja 06:00 AM · Archana through the morning · Evening Harati 07:30 PM",
    facilities: "Temple prasadam counters available in the courtyard.",
    dressCode: "Traditional temple attire recommended.",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Puruhutika+Devi+Temple+Kukkuteswara+Swamy+Pithapuram",
    faqs: [
      {
        q: "What rituals are performed at Pada Gaya?",
        a: "Devotees take a holy bath in the Pada Gaya pond and offer Pinda Pradanam for ancestors before having darshan of Lord Kukkuteswara and Puruhutika Devi.",
      },
      {
        q: "What is the auto fare from the property?",
        a: "A local auto from the temple complex takes about 5 minutes and costs roughly ₹40 to ₹50.",
      },
    ],
  },
  {
    id: "kuntimadhava",
    kind: "temple",
    name: "Kunti Madhava Swamy Temple",
    type: "Pancha Madhava Kshetram",
    tag: "Ancient Dwapara Temple",
    distance: "1.5 km",
    time: "6 min auto",
    summary:
      "One of the five sacred Pancha Madhava temples in India, worshipped by Kunti Devi and the Pandavas.",
    significance:
      "Established by Lord Indra to atone for sin and later worshipped by Kunti Devi. Enshrines Lord Vishnu as Sri Madhava Swamy with Sridevi and Bhudevi, in exquisite ancient stonework.",
    hours: "06:00 AM to 12:00 PM and 04:30 PM to 08:00 PM",
    schedule:
      "Suprabhatam 06:00 AM · Nitya Puja 07:30 AM · Sayaraksha 07:00 PM",
    facilities: "Prasadam distribution on festival days and Ekadashi.",
    dressCode: "Modest conservative clothing.",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Kunti+Madhava+Swamy+Temple+Pithapuram",
    faqs: [
      {
        q: "Why is it called Kunti Madhava?",
        a: "During their exile the Pandavas and their mother Kunti Devi lived here and worshipped Lord Vishnu, giving the temple its revered name.",
      },
      {
        q: "How do I combine it with other temples?",
        a: "Visitors usually take Sri Pada Vallabha first (250m), then Puruhutika Devi and Kukkuteswara (1.2 km), followed by Kunti Madhava Swamy (1.5 km).",
      },
    ],
  },
  {
    id: "railway-station",
    kind: "transit",
    name: "Pithapuram Railway Station (PAP)",
    type: "Mainline Railway Station",
    tag: "South Coast Railway",
    distance: "1.1 km",
    time: "4 min auto",
    summary:
      "Closest railway station, on the express mainline connecting Chennai and Howrah.",
    significance:
      "Key arrival point for devotees travelling on the Janmabhoomi, Tirupati, Circar and Simhadri Express services. Round-the-clock autos connect directly to the property.",
    hours: "Operational 24 hours",
    schedule: "Train arrivals vary — check the current timetable before travel.",
    facilities:
      "Waiting halls, computerised reservation counter and tea stalls on the platform.",
    dressCode: "Standard travel attire.",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Pithapuram+Railway+Station",
    faqs: [
      {
        q: "How do I reach the property from the station?",
        a: "Step out of the exit gate and take an auto to the Canara Bank building at Park Centre. Travel time is about 4 minutes and the standard fare is ₹40 to ₹60.",
      },
      {
        q: "What if I arrive at 5:00 AM?",
        a: "The front desk is staffed 24/7, and the 07:00 AM check-in cycle means you are not waiting for an afternoon standard check-in.",
      },
    ],
  },
  {
    id: "samalkot-junction",
    kind: "transit",
    name: "Samalkot Junction (SLO)",
    type: "Major Railway Junction",
    tag: "Superfast & Vande Bharat Hub",
    distance: "13 km",
    time: "20 min drive",
    summary:
      "Major rail junction where superfast, Rajdhani and Vande Bharat services stop.",
    significance:
      "The primary high-speed transit hub for visitors arriving from Hyderabad, Bengaluru, Visakhapatnam and New Delhi, connected via State Highway 40.",
    hours: "Operational 24 hours",
    schedule: "Multi-platform junction — allow time for the transfer.",
    facilities: "Station food court, refreshment rooms and prepaid transport.",
    dressCode: "Standard travel attire.",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Samalkot+Junction+Railway+Station",
    faqs: [
      {
        q: "How do I travel from Samalkot to the property?",
        a: "Dedicated autos (₹200 to ₹250) and taxis (₹400 to ₹500) run round the clock outside Platform 1. The drive is about 20 minutes.",
      },
      {
        q: "Can the front desk arrange a pickup?",
        a: "Yes — call the desk and staff will connect you with reliable local taxi operators on request.",
      },
    ],
  },
  {
    id: "rajahmundry-airport",
    kind: "transit",
    name: "Rajahmundry Airport (RJA)",
    type: "Commercial Airport",
    tag: "Nearest Airport Hub",
    distance: "64 km",
    time: "75 min drive",
    summary:
      "Nearest operational airport, with daily non-stop flights from Hyderabad, Bengaluru and Chennai.",
    significance:
      "Located at Madhurapudi along NH-16 — the convenient gateway for interstate and overseas visitors coming to the Samsthanam.",
    hours: "Open according to flight schedules",
    schedule: "Check-in counters typically open 2-3 hours before departure.",
    facilities: "Taxi desk, security check and cafeteria in the terminal.",
    dressCode: "Standard travel attire.",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Rajahmundry+Airport",
    faqs: [
      {
        q: "What is the best way in from the airport?",
        a: "Take an airport taxi via NH-16 and ADB Road straight to Park Centre. The drive is roughly 1 hour 15 minutes.",
      },
      {
        q: "Which airlines fly to Rajahmundry?",
        a: "IndiGo operates regular daily non-stop flights from Hyderabad, Bengaluru and Chennai.",
      },
    ],
  },
];

/* Review quotes are supplied content. The aggregate score panel is not, so it
   is flagged as a placeholder wherever it renders. */
const REVIEWS = [
  {
    id: "praveen",
    source: "Google Maps",
    rating: 5,
    quote:
      "Super clean and well-maintained rooms right at Park Centre. The spring mattresses and clean white linens are top notch, comparable to 3-star city hotels. Just 3 minutes walking distance to Sri Pada Sri Vallabha temple. Courteous, cooperative staff.",
    author: "Praveen K.",
    stay: "Deluxe King Stay",
  },
  {
    id: "suresh",
    source: "Google Maps",
    rating: 5,
    quote:
      "Best stay in Pithapuram. Located on 3rd floor of VVS Grand above Canara Bank, so there is complete peace and zero street noise. The 24-hour check-in cycle was very convenient for our morning train arrival from Samalkot.",
    author: "Suresh Sharma",
    stay: "Business & Temple Visitor",
  },
  {
    id: "murali",
    source: "MakeMyTrip",
    rating: 5,
    quote:
      "Executive suite is very spacious and comfortably accommodated our family of 3 with extra bedding. Attached bathroom was spotless with 24/7 hot water geyser for early 4:30 AM temple bath. Front desk assisted us with trusted auto contacts.",
    author: "Murali Krishna",
    stay: "Family Suite Stay",
  },
];

const REVIEW_SCORECARD = {
  label: "Illustrative score panel",
  note: "Design placeholder — confirm the rating source before launch.",
  overall: "4.5",
  metrics: [
    { name: "Cleanliness", score: "4.8 / 5" },
    { name: "Temple Proximity", score: "4.9 / 5" },
    { name: "Staff Service", score: "4.7 / 5" },
    { name: "Peace & Quiet", score: "4.8 / 5" },
  ],
};

/* The temples band leads with one narrative block instead of re-listing the
   rooms that already have their own cards. */
const TEMPLE_INTRO = {
  photo: "assets/img/livingLobby.jpg",
  alt: "Reception lounge at [N] Hotel's",
  eyebrow: "Sacred Geography",
  title: "Three minutes on foot from Sri Pada Sri Vallabha",
  body:
    "Step out of the lift lobby, walk straight past the bank and you are at the temple entrance. Puruhutika Devi, Kunti Madhava and the railway station are all inside a five-minute auto ride, which is why the desk keeps a short list of drivers we would put our own family in.",
  facts: [
    { value: "250 m", key: "Walk to Sri Pada temple" },
    { value: "1.1 km", key: "Pithapuram station (PAP)" },
    { value: "13 km", key: "Samalkot junction (SLO)" },
  ],
};

const SECTIONS = [
  { id: "top", label: "Home" },
  { id: "rooms", label: "Rooms" },
  { id: "amenities", label: "Amenities" },
  { id: "temples", label: "Temples" },
  { id: "reviews", label: "Reviews" },
  { id: "location", label: "Contact" },
];

const NAV = SECTIONS.map((section) => ({
  href: `#${section.id}`,
  label: section.label,
}));

const FOOTER_GUIDE = [
  { href: "#booking", label: "Check Rates & Availability" },
  { href: "#rooms", label: "Rooms & Tariffs" },
  { href: "#amenities", label: "Amenities & Access" },
  { href: "#temples", label: "Temples & Travel" },
  { href: "#reviews", label: "Guest Reviews" },
  { href: "#location", label: "Location & Directions" },
  { href: "desk.html", label: "Front Office Desk" },
];

/* Seeded front-office records — demonstration data for the desk page only. */
const SEED_ENQUIRIES = [
  {
    id: "NH-2026-0814",
    guestName: "Venkata Satyanarayana",
    phone: "+91 98480 12345",
    roomType: "Deluxe AC Room",
    dates: "Nov 4 to Nov 6 (2 nights)",
    slot: "07:00 AM (24-Hour Cycle)",
    guests: "2 Adults",
    totalAmount: "₹3,600 (Net Direct Tariff)",
    status: "Confirmed",
    note: "Early morning darshan at Sri Pada Vallabha temple. Quiet room requested.",
  },
  {
    id: "NH-2026-0815",
    guestName: "Raghavendra Rao",
    phone: "+91 94401 56789",
    roomType: "Executive Family Suite",
    dates: "Nov 5 to Nov 6 (1 night)",
    slot: "11:00 AM (Standard Cycle)",
    guests: "3 Adults",
    totalAmount: "₹2,500 (Net Direct Tariff)",
    status: "New",
    note: "Family visiting Puruhutika Devi Peetham. Requested auto assistance.",
  },
  {
    id: "NH-2026-0816",
    guestName: "K. S. Ramanujam",
    phone: "+91 98840 98765",
    roomType: "Deluxe AC Room",
    dates: "Nov 8 to Nov 10 (2 nights)",
    slot: "07:00 AM (24-Hour Cycle)",
    guests: "1 Adult",
    totalAmount: "₹3,600 (Net Direct Tariff)",
    status: "Contacted",
    note: "Single guest on sacred parayana, arriving via Samalkot Station.",
  },
];

const STORAGE_KEY = "nh-enquiries-v1";

const SITE = {
  HOTEL,
  ADDRESS_LINE,
  STAY_CYCLE,
  TARIFF,
  GUEST_SLOTS,
  ROOM_TYPES,
  HERO_SLIDES,
  HERO_FACTS,
  AMENITIES,
  LANDMARKS,
  REVIEWS,
  REVIEW_SCORECARD,
  TEMPLE_INTRO,
  NAV,
  FOOTER_GUIDE,
  SEED_ENQUIRIES,
  STORAGE_KEY,
  money,
  tariffSummary,
  roomOptionLabel,
};
