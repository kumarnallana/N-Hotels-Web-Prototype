/* ============================================================================
   templates.js — DATA -> HTML STRINGS
   ----------------------------------------------------------------------------
   Pure functions only: no DOM queries, no event handlers, no state. Each one
   takes a record from data.js and returns a markup string. Anything a user
   types is passed through escapeHtml() before it reaches the page.
   ========================================================================== */
"use strict";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function icon(path, extraClass) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"
    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"${
    extraClass ? ` class="${extraClass}"` : ""
  }><path d="${path}"/></svg>`;
}

const CHECK_PATH = "M5 13l4 4L19 7";

/* ---- Navigation ---------------------------------------------------------- */

function navLinksTemplate(links) {
  return links
    .map(
      (link) => `<a class="nav__link" href="${link.href}" data-spy="${link.href.slice(
        1,
      )}">${escapeHtml(link.label)}</a>`,
    )
    .join("");
}

/* ---- Hero ---------------------------------------------------------------- */

function heroSlidesTemplate(slides) {
  return slides
    .map(
      (slide, index) =>
        `<img class="hero__slide${index === 0 ? " is-active" : ""}" src="${
          slide.src
        }" alt="${escapeHtml(slide.alt)}"${
          index === 0 ? "" : ' aria-hidden="true"'
        }${index < 2 ? ' fetchpriority="high"' : ' loading="lazy"'} />`,
    )
    .join("");
}

function heroDotsTemplate(slides) {
  return slides
    .map(
      (slide, index) => `<button class="dot" type="button" data-slide="${index}"
        aria-pressed="${index === 0}"
        aria-label="Show photograph: ${escapeHtml(slide.label)}">
        <span class="dot__fill" aria-hidden="true"></span>
      </button>`,
    )
    .join("");
}

function heroFactsTemplate(facts) {
  return facts
    .map(
      (fact) => `<div class="fact">
        <p class="fact__value">${escapeHtml(fact.value)}</p>
        <p class="fact__key">${escapeHtml(fact.key)}</p>
      </div>`,
    )
    .join("");
}

/* ---- Booking panel selects ----------------------------------------------- */

function roomOptionTemplate(rooms) {
  return rooms
    .map(
      (room) =>
        `<option value="${escapeHtml(room.name)}">${escapeHtml(
          SITE.roomOptionLabel(room),
        )}</option>`,
    )
    .join("");
}

function slotOptionTemplate(slots) {
  return slots
    .map(
      (slot) =>
        `<option value="${escapeHtml(slot.value)}">${escapeHtml(
          slot.short,
        )}</option>`,
    )
    .join("");
}

function guestOptionTemplate(options) {
  return options
    .map(
      (option) =>
        `<option value="${escapeHtml(option.value)}">${escapeHtml(
          option.label,
        )}</option>`,
    )
    .join("");
}

/* ---- Temples band intro --------------------------------------------------- */

function templeIntroTemplate(intro) {
  const facts = intro.facts
    .map(
      (fact) => `<div class="mini-fact">
        <b>${escapeHtml(fact.value)}</b>
        <span>${escapeHtml(fact.key)}</span>
      </div>`,
    )
    .join("");

  return `<figure class="temple-intro__media">
      <img src="${intro.photo}" alt="${escapeHtml(intro.alt)}" loading="lazy" />
    </figure>
    <div class="temple-intro__body">
      <p class="eyebrow">${escapeHtml(intro.eyebrow)}</p>
      <h2 class="temple-intro__title">${escapeHtml(intro.title)}</h2>
      <p class="lede">${escapeHtml(intro.body)}</p>
      <div class="mini-facts">${facts}</div>
    </div>`;
}

/* ---- Room cards ---------------------------------------------------------- */

function roomCardTemplate(room) {
  const shots = room.photos
    .map(
      (photo, index) =>
        `<img class="shot__img${index === 0 ? " is-active" : ""}"
          src="${photo.src}"
          data-shot="${escapeHtml(photo.key)}"
          alt="${escapeHtml(photo.alt)}"
          loading="lazy" />`,
    )
    .join("");

  const toggles = room.photos
    .map(
      (photo, index) =>
        `<button type="button" data-shot-target="${escapeHtml(photo.key)}"
          aria-pressed="${index === 0}">${escapeHtml(photo.label)}</button>`,
    )
    .join("");

  const features = room.features
    .map(
      (feature) =>
        `<li class="room__feature">${icon(CHECK_PATH)}<span>${escapeHtml(
          feature,
        )}</span></li>`,
    )
    .join("");

  const saving = room.otaPrice - room.price;

  return `<article class="card card--tone-gold" data-room="${room.id}" data-reveal>
    <div class="shot">
      ${shots}
      <div class="shot__badges">
        <span class="badge badge--onImage">${escapeHtml(room.sizeLabel)}</span>
        <span class="badge badge--${
          room.badgeTone === "plum" ? "plum" : "gold"
        }">${escapeHtml(room.badge)}</span>
      </div>
      <div class="shot__toggle" role="group" aria-label="${escapeHtml(
        room.name,
      )} photographs">
        ${toggles}
      </div>
    </div>

    <div class="card__body">
      <div class="landmark__top">
        <h3 class="landmark__name">${escapeHtml(room.name)}</h3>
        <span class="amenity__desc">${escapeHtml(room.guests)}</span>
      </div>

      <p class="room__price">${SITE.money(room.price)}
        <small>/ 24-hour cycle</small>
      </p>

      <p class="amenity__desc">${escapeHtml(room.blurb)}</p>

      <ul class="room__features">${features}</ul>

      <p class="room__save">
        <s>${SITE.money(room.otaPrice)} elsewhere</s>
        <span>Booking direct saves <b>${SITE.money(saving)}</b></span>
      </p>
    </div>

    <div class="card__foot">
      <span class="room__meta">${escapeHtml(room.category)}</span>
      <span class="room__actions">
        <button class="btn btn--gold btn--sm" type="button"
          data-select-room="${escapeHtml(room.name)}">Select Room</button>
      </span>
    </div>
  </article>`;
}

/* ---- Amenities ----------------------------------------------------------- */

function amenityTemplate(amenity) {
  return `<article class="card card--pad card--hover" data-reveal>
    <div class="stack">
      <div class="amenity__icon">${icon(amenity.icon)}</div>
      <h3 class="amenity__title">${escapeHtml(amenity.title)}</h3>
      <p class="amenity__desc">${escapeHtml(amenity.desc)}</p>
    </div>
  </article>`;
}

/* ---- Landmarks ----------------------------------------------------------- */

function landmarkTemplate(landmark) {
  return `<article class="card card--pad card--hover" data-reveal>
    <div class="stack">
      <div class="landmark__top">
        <span class="eyebrow">${escapeHtml(landmark.tag)}</span>
        <span class="badge">${escapeHtml(landmark.distance)}</span>
      </div>
      <h3 class="landmark__name">${escapeHtml(landmark.name)}</h3>
      <p class="landmark__summary">${escapeHtml(landmark.summary)}</p>
    </div>
    <div class="landmark__top card__inline-foot">
      <span class="amenity__desc">${escapeHtml(landmark.time)}</span>
      <button class="landmark__more" type="button" data-landmark="${
        landmark.id
      }">
        <span>Details &amp; advice</span><span aria-hidden="true">&rarr;</span>
      </button>
    </div>
  </article>`;
}

const SHEET_LABELS = {
  temple: {
    hours: "Visiting & open hours",
    schedule: "Aarti & puja timings",
    facilities: "Prasadam / annadanam",
    dressCode: "Dress code",
  },
  transit: {
    hours: "Operating hours",
    schedule: "Service notes",
    facilities: "Facilities",
    dressCode: "Travel note",
  },
};

function sheetTemplate(landmark) {
  const labels = SHEET_LABELS[landmark.kind] || SHEET_LABELS.transit;

  const rows = [
    [labels.hours, landmark.hours, false],
    [labels.schedule, landmark.schedule, false],
    [labels.facilities, landmark.facilities, true],
    [labels.dressCode, landmark.dressCode, true],
  ]
    .filter((row) => row[1])
    .map(
      (row) =>
        `<div${row[2] ? ' class="facts__wide"' : ""}>
          <dt>${escapeHtml(row[0])}</dt><dd>${escapeHtml(row[1])}</dd>
        </div>`,
    )
    .join("");

  const faqs = landmark.faqs
    .map(
      (faq, index) => `<div class="qa__item" data-open="${index === 0}">
        <button class="qa__q" type="button" data-qa
          aria-expanded="${index === 0}">
          <span>${escapeHtml(faq.q)}</span>
          <span class="qa__sign" aria-hidden="true">${
            index === 0 ? "−" : "+"
          }</span>
        </button>
        <p class="qa__a">${escapeHtml(faq.a)}</p>
      </div>`,
    )
    .join("");

  return `<div class="drag-handle" aria-hidden="true"></div>
    <div class="sheet__head">
      <div class="stack stack--tight">
        <div class="cluster" style="gap:.5rem">
          <span class="badge badge--plum">${escapeHtml(landmark.type)}</span>
          <span class="amenity__desc">${escapeHtml(landmark.distance)}
            (${escapeHtml(landmark.time)})</span>
        </div>
        <h2 class="landmark__name" id="sheet-title">${escapeHtml(
          landmark.name,
        )}</h2>
      </div>
      <button class="sheet__close" type="button" data-sheet-close
        aria-label="Close details">
        ${icon("M6 18L18 6M6 6l12 12")}
      </button>
    </div>

    <div class="sheet__scroll">
      <div class="stack">
        <p class="eyebrow">About this location</p>
        <p class="amenity__desc">${escapeHtml(landmark.significance)}</p>
      </div>

      <dl class="facts">${rows}</dl>

      <div class="concierge">
        <div class="concierge__head">
          <span class="concierge__label">Front desk advice</span>
          <span class="concierge__note">Written for this property</span>
        </div>
        <p class="amenity__desc concierge__intro">
          Tap a common guest question for the answer our desk gives on the phone:
        </p>
        <div class="qa">${faqs}</div>
      </div>
    </div>

    <div class="sheet__foot">
      <a class="btn btn--quiet" href="${landmark.mapsUrl}" target="_blank"
        rel="noopener noreferrer">
        ${icon(
          "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z",
        )}
        <span>Open map</span>
      </a>
      <a class="btn btn--dark" href="tel:${SITE.HOTEL.phoneDial}">
        <span>Call the desk</span>
      </a>
    </div>`;
}

/* ---- Reviews ------------------------------------------------------------- */

function reviewTemplate(review) {
  return `<article class="card card--pad" data-reveal>
    <div class="stack stack--loose">
      <div class="landmark__top">
        <span class="review__stars" aria-label="${review.rating} out of 5">
          ${"★".repeat(review.rating)}
        </span>
        <span class="badge">${escapeHtml(review.source)}</span>
      </div>
      <blockquote class="review__quote">&ldquo;${escapeHtml(
        review.quote,
      )}&rdquo;</blockquote>
    </div>
    <p class="review__by"><b>${escapeHtml(review.author)}</b>
      &bull; ${escapeHtml(review.stay)}</p>
  </article>`;
}

function metricTemplate(metrics) {
  return metrics
    .map(
      (metric) =>
        `<div class="metric"><span>${escapeHtml(
          metric.name,
        )}</span><b>${escapeHtml(metric.score)}</b></div>`,
    )
    .join("");
}

/* ---- Footer -------------------------------------------------------------- */

function footerGuideTemplate(links) {
  return links
    .map(
      (link) =>
        `<li><a href="${link.href}">${escapeHtml(link.label)}</a></li>`,
    )
    .join("");
}

function footerTariffTemplate(rooms) {
  return rooms
    .map(
      (room) => `<li>
        <b>${escapeHtml(room.name)}</b>: ${SITE.money(room.price)} / 24h
        <small>${escapeHtml(room.guests)} &bull; extra adult
          ${SITE.money(
            room.id === "deluxe"
              ? SITE.TARIFF.extraAdultDeluxe
              : SITE.TARIFF.extraAdultExecutive,
          )}</small>
      </li>`,
    )
    .join("");
}

/* ---------------------------------------------------------------------------
   Front-office queue (desk.html)
   Every guest-typed value is escaped before it reaches the page.
   --------------------------------------------------------------------------- */

const STATUS_CLASS = {
  Confirmed: "badge--ok",
  Contacted: "badge--info",
  New: "badge--warn",
};

function statusBadgeTemplate(status) {
  return `<span class="badge ${
    STATUS_CLASS[status] || ""
  }">${escapeHtml(status)}</span>`;
}

function kpiTemplate(kpi) {
  return `<div class="kpi${kpi.tone ? ` kpi--${kpi.tone}` : ""}">
    <p class="kpi__label">${escapeHtml(kpi.label)}</p>
    <p class="kpi__value">${escapeHtml(kpi.value)}</p>
  </div>`;
}

function queueRowTemplate(record) {
  return `<tr>
    <td class="ref">${escapeHtml(record.id)}</td>
    <td>
      <b>${escapeHtml(record.guestName)}</b>
      <span class="cell-sub">${escapeHtml(record.guests)}</span>
    </td>
    <td><a class="gold-link" href="tel:${escapeHtml(
      String(record.phone).replace(/[^\d+]/g, ""),
    )}">${escapeHtml(record.phone)}</a></td>
    <td>
      ${escapeHtml(record.roomType)}
      <span class="cell-sub">${escapeHtml(record.dates)}</span>
    </td>
    <td>${escapeHtml(record.slot)}</td>
    <td><b>${escapeHtml(record.totalAmount)}</b></td>
    <td>${statusBadgeTemplate(record.status)}</td>
    <td class="ta-right">
      <span class="cell-actions">
        ${
          record.status === "Confirmed"
            ? ""
            : `<button class="btn btn--dark btn--sm" type="button"
                 data-confirm="${escapeHtml(record.id)}">Confirm</button>`
        }
        <a class="btn btn--quiet btn--sm" href="tel:${escapeHtml(
          String(record.phone).replace(/[^\d+]/g, ""),
        )}">Call</a>
      </span>
    </td>
  </tr>`;
}

function queueCardTemplate(record) {
  return `<li class="qcard">
    <div class="qcard__top">
      <div class="stack stack--tight">
        <span class="ref">${escapeHtml(record.id)}</span>
        <b>${escapeHtml(record.guestName)}</b>
      </div>
      ${statusBadgeTemplate(record.status)}
    </div>
    <div class="qcard__rows">
      <div><b>Phone</b><span>${escapeHtml(record.phone)}</span></div>
      <div><b>Room</b><span>${escapeHtml(record.roomType)}</span></div>
      <div><b>Dates</b><span>${escapeHtml(record.dates)}</span></div>
      <div><b>Arrival</b><span>${escapeHtml(record.slot)}</span></div>
      <div><b>Guests</b><span>${escapeHtml(record.guests)}</span></div>
      <div><b>Total</b><span>${escapeHtml(record.totalAmount)}</span></div>
      <div><b>Note</b><span>${escapeHtml(record.note)}</span></div>
    </div>
    <div class="cell-actions">
      ${
        record.status === "Confirmed"
          ? ""
          : `<button class="btn btn--dark btn--sm" type="button"
               data-confirm="${escapeHtml(record.id)}">Confirm</button>`
      }
      <a class="btn btn--quiet btn--sm" href="tel:${escapeHtml(
        String(record.phone).replace(/[^\d+]/g, ""),
      )}">Call guest</a>
    </div>
  </li>`;
}
