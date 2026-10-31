/* ============================================================================
   render.js — MOUNT TEMPLATES INTO THE DOCUMENT
   ----------------------------------------------------------------------------
   The only file that writes innerHTML from site data. It runs once at
   DOMContentLoaded and never touches events — behaviours.js owns those.
   ========================================================================== */
"use strict";

const Render = {
  el(id) {
    return document.getElementById(id);
  },

  html(id, markup) {
    const node = this.el(id);
    if (node) node.innerHTML = markup;
    return node;
  },

  text(id, value) {
    const node = this.el(id);
    if (node) node.textContent = value;
    return node;
  },

  attr(id, name, value) {
    const node = this.el(id);
    if (node) node.setAttribute(name, value);
  },

  /* ---- Static facts that used to be re-typed in six places --------------- */
  identity() {
    const { HOTEL, ADDRESS_LINE } = SITE;

    this.text("promoPhoneText", HOTEL.phoneDisplay);
    this.attr("promoPhone", "href", `tel:${HOTEL.phoneDial}`);
    this.attr("mapsLink", "href", HOTEL.mapsUrl);
    this.attr("callLink", "href", `tel:${HOTEL.phoneDial}`);
    this.text("callLink", `Call ${HOTEL.phoneDisplay}`);

    const footPhone = this.el("footPhone");
    if (footPhone) {
      footPhone.href = `tel:${HOTEL.phoneDial}`;
      footPhone.textContent = HOTEL.phoneDisplay;
    }
    this.text("footAddress", ADDRESS_LINE);
    this.attr("footMaps", "href", HOTEL.mapsUrl);
    this.text("footLegal", `${HOTEL.name} · ${HOTEL.town}, ${HOTEL.state}`);
    this.attr("mobileCall", "href", `tel:${HOTEL.phoneDial}`);

    this.text("mapCardTitle", `${HOTEL.building} · ${HOTEL.floor}`);
    this.text(
      "mapCardAddress",
      `${HOTEL.landmark}, ${HOTEL.town}, ${HOTEL.state} ${HOTEL.pincode}`,
    );
    this.text("mapCardCoords", HOTEL.coordinates);
    this.attr("mapCardLink", "href", HOTEL.mapsUrl);
  },

  locationFacts() {
    const { HOTEL, ADDRESS_LINE, STAY_CYCLE } = SITE;
    const rows = [
      ["Address", ADDRESS_LINE],
      ["GPS", `<span class="mono">${escapeHtml(HOTEL.coordinates)}</span>`],
      [
        "Front desk",
        `<a href="tel:${HOTEL.phoneDial}">${escapeHtml(HOTEL.phoneDisplay)}</a>`,
      ],
      [
        "Check-in",
        `${escapeHtml(STAY_CYCLE.checkInTime)} on the ${escapeHtml(
          STAY_CYCLE.label,
        )}`,
      ],
    ];

    this.html(
      "locationList",
      rows
        .map(
          (row) => `<div class="location__row">
            <dt>${escapeHtml(row[0])}</dt><dd>${row[1]}</dd>
          </div>`,
        )
        .join(""),
    );
  },

  /* ---- Repeated blocks --------------------------------------------------- */
  navigation() {
    this.html("navLinks", navLinksTemplate(SITE.NAV));
    this.html("footerGuide", footerGuideTemplate(SITE.FOOTER_GUIDE));
  },

  hero() {
    this.html("heroSlides", heroSlidesTemplate(SITE.HERO_SLIDES));
    this.html("heroDots", heroDotsTemplate(SITE.HERO_SLIDES));
    this.html("heroFacts", heroFactsTemplate(SITE.HERO_FACTS));
  },

  booking() {
    this.html("bkRoom", roomOptionTemplate(SITE.ROOM_TYPES));
    this.html("bkSlot", slotOptionTemplate(SITE.STAY_CYCLE.slots));
    this.text(
      "bookingNote",
      `Net direct rates · extra adult ${SITE.money(
        SITE.TARIFF.extraAdultDeluxe,
      )} Deluxe / ${SITE.money(
        SITE.TARIFF.extraAdultExecutive,
      )} Suite · late checkout on request`,
    );
  },

  rooms() {
    this.html(
      "roomGrid",
      SITE.ROOM_TYPES.map(roomCardTemplate).join(""),
    );
    this.text("roomsTariffChip", `${SITE.tariffSummary} per 24 hours`);
  },

  amenities() {
    this.html(
      "amenityGrid",
      SITE.AMENITIES.map(amenityTemplate).join(""),
    );
  },

  temples() {
    this.html("templeIntro", templeIntroTemplate(SITE.TEMPLE_INTRO));
    this.html(
      "landmarkGrid",
      SITE.LANDMARKS.map(landmarkTemplate).join(""),
    );
  },

  reviews() {
    this.html(
      "reviewGrid",
      SITE.REVIEWS.map(reviewTemplate).join(""),
    );
    this.html(
      "metricGrid",
      metricTemplate(SITE.REVIEW_SCORECARD.metrics),
    );
  },

  enquiryForm() {
    this.html("gRoom", roomOptionTemplate(SITE.ROOM_TYPES));
    this.html("gSlot", slotOptionTemplate(SITE.STAY_CYCLE.slots));
    this.html("gGuests", guestOptionTemplate(SITE.GUEST_SLOTS));
  },

  run() {
    this.identity();
    this.locationFacts();
    this.navigation();
    this.hero();
    this.booking();
    this.rooms();
    this.amenities();
    this.temples();
    this.reviews();
    this.enquiryForm();
  },
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => Render.run());
} else {
  Render.run();
}
