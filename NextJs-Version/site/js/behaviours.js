/* ============================================================================
   behaviours.js — INTERACTION LAYER
   ----------------------------------------------------------------------------
   Owns every event listener and every piece of state. It reads the DOM that
   render.js produced but never rewrites markup from site data, and it never
   hard-codes a property fact.
   ========================================================================== */
"use strict";

const REDUCED_MOTION =
  typeof matchMedia === "function" &&
  matchMedia("(prefers-reduced-motion: reduce)").matches;

const $ = (id) => document.getElementById(id);

/* One dwell time for the hero, mirrored into the CSS custom property so the
   Ken Burns zoom, the progress fill and the timer can never drift apart. */
const HERO_DWELL = 5600;
document.documentElement.style.setProperty("--hero-dwell", `${HERO_DWELL}ms`);
const on = (node, type, handler, options) =>
  node && node.addEventListener(type, handler, options);

/* ---------------------------------------------------------------------------
   STICKY HEADER + MOBILE CTA
   Both are driven from one rAF-throttled scroll read, so neither can fight the
   other for layout information.
   --------------------------------------------------------------------------- */
function initHeader() {
  const head = $("siteHead");
  const promo = document.querySelector(".promo");
  const hero = $("top");
  const mobileCta = $("mobileCta");
  if (!head || !promo) return;

  let ticking = false;

  function sync() {
    ticking = false;
    head.classList.toggle("is-stuck", promo.getBoundingClientRect().bottom <= 0);
    if (mobileCta && hero) {
      const pastHero = hero.getBoundingClientRect().bottom < 80;
      mobileCta.dataset.show = pastHero ? "true" : "false";
    }
  }

  function request() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(sync);
    }
  }

  on(window, "scroll", request, { passive: true });
  on(window, "resize", request, { passive: true });
  sync();
}

/* ---------------------------------------------------------------------------
   MOBILE NAVIGATION PANEL
   --------------------------------------------------------------------------- */
function initNav() {
  const nav = $("nav");
  const toggle = $("navToggle");
  const iconPath = $("navToggleIcon");
  if (!nav || !toggle) return;

  const MENU = "M4 6h16M4 12h16M4 18h16";
  const CLOSE = "M6 18L18 6M6 6l12 12";

  function setOpen(open) {
    nav.dataset.open = open ? "true" : "false";
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    iconPath.setAttribute("d", open ? CLOSE : MENU);
  }

  const isOpen = () => nav.dataset.open === "true";

  on(toggle, "click", () => setOpen(!isOpen()));

  /* Close after choosing a destination, on Escape, or when the panel no
     longer needs to be a drawer. */
  on(nav, "click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });

  on(document, "keydown", (event) => {
    if (event.key === "Escape" && isOpen()) {
      setOpen(false);
      toggle.focus();
    }
  });

  on(window, "resize", () => {
    if (window.innerWidth >= 1024) setOpen(false);
  });

  return { isOpen };
}

/* ---------------------------------------------------------------------------
   SCROLL-SPY — marks the section currently occupying the middle of the view
   --------------------------------------------------------------------------- */
function initScrollSpy() {
  const links = Array.from(document.querySelectorAll(".nav__link[data-spy]"));
  if (!links.length || typeof IntersectionObserver !== "function") return;

  const byId = new Map(
    links.map((link) => [link.dataset.spy, link]).filter(([id]) => $(id)),
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        byId.forEach((link) => link.removeAttribute("aria-current"));
        const active = byId.get(entry.target.id);
        if (active) active.setAttribute("aria-current", "page");
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
  );

  byId.forEach((_link, id) => observer.observe($(id)));
}

/* ---------------------------------------------------------------------------
   STAGGERED REVEALS
   The hiding class is added here, so a script failure can never leave content
   invisible.
   --------------------------------------------------------------------------- */
function initReveals() {
  const nodes = Array.from(document.querySelectorAll("[data-reveal]"));
  if (!nodes.length) return;

  if (REDUCED_MOTION || typeof IntersectionObserver !== "function") {
    nodes.forEach((node) => delete node.dataset.reveal);
    return;
  }

  nodes.forEach((node) => {
    const siblings = Array.from(
      node.parentElement.querySelectorAll(":scope > [data-reveal]"),
    );
    node.style.setProperty(
      "--reveal-delay",
      `${Math.min(siblings.indexOf(node), 4) * 70}ms`,
    );
    node.classList.add("js-reveal");
  });

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
  );

  nodes.forEach((node) => observer.observe(node));
}

/* ---------------------------------------------------------------------------
   HERO CAROUSEL — autoplay, progress fill, explicit pause/resume
   --------------------------------------------------------------------------- */
function initHero() {
  const hero = $("top");
  const slidesHost = $("heroSlides");
  const dotsHost = $("heroDots");
  const pauseBtn = $("heroPause");
  if (!hero || !slidesHost || !dotsHost) return;

  const slides = Array.from(slidesHost.querySelectorAll(".hero__slide"));
  const dots = Array.from(dotsHost.querySelectorAll(".dot"));
  if (slides.length < 2) return;

  let index = 0;
  let timer = null;
  let paused = REDUCED_MOTION;

  function paint() {
    slides.forEach((slide, i) => {
      const active = i === index;
      slide.classList.toggle("is-active", active);
      slide.toggleAttribute("aria-hidden", !active);
    });
    dots.forEach((dot, i) => dot.setAttribute("aria-pressed", i === index));
    /* Re-inserting the fill restarts its animation, including when the viewer
       re-selects the slide already on screen. */
    const active = dots[index];
    const fill = active && active.querySelector(".dot__fill");
    if (fill) fill.replaceWith(fill.cloneNode(true));
  }

  function stop() {
    clearInterval(timer);
    timer = null;
  }

  function start() {
    stop();
    if (paused) return;
    timer = setInterval(() => {
      index = (index + 1) % slides.length;
      paint();
    }, HERO_DWELL);
  }

  function goTo(next) {
    index = (next + slides.length) % slides.length;
    paint();
    start();
  }

  function setPaused(value) {
    paused = value;
    hero.dataset.paused = value ? "true" : "false";
    $("heroPauseIcon").innerHTML = value ? "&#9654;" : "&#10074;&#10074;";
    $("heroPauseLabel").textContent = value ? "Play" : "Pause";
    if (value) stop();
    else start();
  }

  dotsHost.addEventListener("click", (event) => {
    const dot = event.target.closest(".dot");
    if (dot) goTo(Number(dot.dataset.slide));
  });

  on(pauseBtn, "click", () => setPaused(!paused));

  on(hero, "keydown", (event) => {
    if (event.key === "ArrowRight") goTo(index + 1);
    if (event.key === "ArrowLeft") goTo(index - 1);
  });

  /* Stop the timer while the tab is hidden so the slide the viewer returns to
     is not half-changed. */
  on(document, "visibilitychange", () => {
    if (document.hidden) stop();
    else start();
  });

  paint();
  setPaused(paused);
}

/* ---------------------------------------------------------------------------
   ROOM PHOTO SWITCHERS
   --------------------------------------------------------------------------- */
function initRoomShots() {
  const grid = $("roomGrid");
  if (!grid) return;

  grid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-shot-target]");
    if (!button) return;

    const card = button.closest("[data-room]");
    const wanted = button.dataset.shotTarget;

    card.querySelectorAll(".shot__img").forEach((img) => {
      const active = img.dataset.shot === wanted;
      img.classList.toggle("is-active", active);
      if (active) img.removeAttribute("aria-hidden");
      else img.setAttribute("aria-hidden", "true");
    });

    card.querySelectorAll("[data-shot-target]").forEach((toggle) => {
      toggle.setAttribute(
        "aria-pressed",
        toggle.dataset.shotTarget === wanted ? "true" : "false",
      );
    });
  });
}

/* ---------------------------------------------------------------------------
   "SELECT ROOM" — carries the choice into the enquiry form
   --------------------------------------------------------------------------- */
function initRoomSelection() {
  const grid = $("roomGrid");
  const select = $("gRoom");
  if (!grid || !select) return;

  grid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-select-room]");
    if (!button) return;
    select.value = button.dataset.selectRoom;
    Enquiry.refresh();
    document.getElementById("enquiry").scrollIntoView({ behavior: "smooth" });
    Toast.show(`${button.dataset.selectRoom} selected — complete the enquiry.`);
  });
}

/* ---------------------------------------------------------------------------
   LANDMARK SHEET
   --------------------------------------------------------------------------- */
const Sheet = (() => {
  const sheet = $("sheet");
  const panel = $("sheetPanel");
  let lastFocused = null;

  function open(landmark) {
    if (!sheet || !panel) return;
    lastFocused = document.activeElement;
    panel.innerHTML = sheetTemplate(landmark);
    sheet.hidden = false;
    document.body.classList.add("no-scroll");
    panel.focus();
  }

  function close() {
    if (!sheet || sheet.hidden) return;
    sheet.hidden = true;
    panel.innerHTML = "";
    document.body.classList.remove("no-scroll");
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  function isOpen() {
    return sheet && !sheet.hidden;
  }

  if (sheet) {
    sheet.addEventListener("click", (event) => {
      if (event.target.closest("[data-sheet-close]")) close();
    });

    sheet.addEventListener("click", (event) => {
      const question = event.target.closest("[data-qa]");
      if (!question) return;
      const item = question.closest(".qa__item");
      const open = item.dataset.open !== "true";
      item.dataset.open = open ? "true" : "false";
      question.setAttribute("aria-expanded", open ? "true" : "false");
      question.querySelector(".qa__sign").textContent = open ? "−" : "+";
    });

    on(document, "keydown", (event) => {
      if (event.key === "Escape" && isOpen()) close();
    });
  }

  return { open, close, isOpen };
})();

function initLandmarks() {
  const grid = $("landmarkGrid");
  if (!grid) return;

  grid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-landmark]");
    if (!button) return;
    const landmark = SITE.LANDMARKS.find(
      (item) => item.id === button.dataset.landmark,
    );
    if (landmark) Sheet.open(landmark);
  });
}

/* ---------------------------------------------------------------------------
   ENQUIRY FORM — dates, live estimate, validation, browser storage
   --------------------------------------------------------------------------- */
const Enquiry = (() => {
  const form = $("enquiryForm");
  if (!form) return { refresh() {} };

  const fields = {
    name: $("gName"),
    phone: $("gPhone"),
    room: $("gRoom"),
    guests: $("gGuests"),
    checkIn: $("gIn"),
    checkOut: $("gOut"),
    slot: $("gSlot"),
    note: $("gNote"),
  };

  const panel = {
    in: $("bkIn"),
    out: $("bkOut"),
    slot: $("bkSlot"),
    room: $("bkRoom"),
  };

  /* Local-safe: toISOString() alone can shift a date back one day east of UTC. */
  const iso = (date) =>
    new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 10);
  const addDays = (date, days) =>
    new Date(date.getTime() + days * 86400000);

  function nights() {
    const start = new Date(fields.checkIn.value);
    const end = new Date(fields.checkOut.value);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return 0;
    return Math.max(0, Math.round((end - start) / 86400000));
  }

  function priceOf(name) {
    const room = SITE.ROOM_TYPES.find((item) => item.name === name);
    return room ? room.price : SITE.ROOM_TYPES[0].price;
  }

  function refresh() {
    const count = nights();
    const price = priceOf(fields.room.value);
    $("sumRoom").textContent = fields.room.value;
    $("sumNights").textContent = count ? String(count) : "Select dates";
    $("sumRate").textContent = SITE.money(price);
    $("sumSlot").textContent = fields.slot.value;
    $("sumTotal").textContent = SITE.money(count * price);
  }

  function mirrorToForm() {
    fields.checkIn.value = panel.in.value;
    fields.checkOut.value = panel.out.value;
    fields.slot.value = panel.slot.value;
    fields.room.value = panel.room.value;
    refresh();
  }

  function mirrorToPanel() {
    panel.in.value = fields.checkIn.value;
    panel.out.value = fields.checkOut.value;
    panel.slot.value = fields.slot.value;
    panel.room.value = fields.room.value;
  }

  function validate() {
    const error = $("formError");
    const name = fields.name.value.trim();
    const phone = fields.phone.value.replace(/\D/g, "");

    let message = "";
    if (name.length < 2) message = "Please enter the guest name.";
    else if (phone.length < 10)
      message = "Please enter a 10-digit mobile number.";
    else if (nights() < 1) message = "Check-out must be after check-in.";

    error.hidden = !message;
    error.textContent = message;
    return !message;
  }

  function buildRecord() {
    const count = nights();
    const price = priceOf(fields.room.value);
    return {
      id: `NH-${new Date().getFullYear()}-${String(
        Date.now()
      ).slice(-4)}`,
      guestName: fields.name.value.trim(),
      phone: fields.phone.value.trim(),
      roomType: fields.room.value,
      dates: `${fields.checkIn.value} to ${fields.checkOut.value} (${count} night${
        count === 1 ? "" : "s"
      })`,
      slot: fields.slot.value,
      guests: fields.guests.value,
      totalAmount: `${SITE.money(count * price)} (Net Direct Tariff)`,
      status: "New",
      note: fields.note.value.trim() || "No special requests recorded.",
    };
  }

  function whatsappUrl(record) {
    const lines = [
      `Enquiry for ${SITE.HOTEL.name}`,
      `Name: ${record.guestName}`,
      `Room: ${record.roomType}`,
      `Dates: ${record.dates}`,
      `Arrival: ${record.slot}`,
      `Guests: ${record.guests}`,
      `Estimate: ${record.totalAmount}`,
      `Requests: ${record.note}`,
    ];
    return `https://wa.me/${SITE.HOTEL.whatsapp}?text=${encodeURIComponent(
      lines.join("\n"),
    )}`;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validate()) return;

    const record = buildRecord();
    const stored = EnquiryStore.add(record);

    $("confirmRef").textContent = record.id;
    $("confirmPhone").textContent = record.phone;
    $("confirmPanel").hidden = false;
    $("whatsappLink").href = whatsappUrl(record);
    form.hidden = true;

    Toast.show(
      stored
        ? `Enquiry ${record.id} saved to this browser's desk queue.`
        : `Enquiry ${record.id} recorded — storage unavailable in this browser.`,
    );
  });

  on($("clearConfirm"), "click", () => {
    $("confirmPanel").hidden = true;
    form.hidden = false;
    fields.name.value = "";
    fields.phone.value = "";
    fields.note.value = "";
    refresh();
    fields.name.focus();
  });

  ["input", "change"].forEach((type) => {
    on(fields.checkIn, type, () => {
      if (fields.checkOut.value <= fields.checkIn.value) {
        fields.checkOut.value = iso(
          addDays(new Date(fields.checkIn.value), 1),
        );
      }
      mirrorToPanel();
      refresh();
    });
    on(fields.checkOut, type, refresh);
    on(fields.room, type, () => {
      mirrorToPanel();
      refresh();
    });
    on(fields.slot, type, () => {
      mirrorToPanel();
      refresh();
    });
  });

  ["input", "change"].forEach((type) => {
    on(panel.in, type, mirrorToForm);
    on(panel.out, type, mirrorToForm);
    on(panel.slot, type, mirrorToForm);
    on(panel.room, type, mirrorToForm);
  });

  function seedDates() {
    const today = new Date();
    const start = addDays(today, 4);
    const end = addDays(start, 1);
    [panel.in, fields.checkIn].forEach((node) => {
      node.value = iso(start);
      node.min = iso(today);
    });
    [panel.out, fields.checkOut].forEach((node) => {
      node.value = iso(end);
      node.min = iso(addDays(start, 1));
    });
  }

  function init() {
    seedDates();
    refresh();
    $("whatsappLink").href = "#";
  }

  return { init, refresh };
})();

/* ---------------------------------------------------------------------------
   BOOT
   --------------------------------------------------------------------------- */
function boot() {
  Toast.init();
  initHeader();
  initNav();
  initScrollSpy();
  initHero();
  initRoomShots();
  initRoomSelection();
  initLandmarks();
  initReveals();
  Enquiry.init();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
