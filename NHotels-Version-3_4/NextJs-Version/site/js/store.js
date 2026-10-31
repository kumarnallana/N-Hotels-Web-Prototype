/* ============================================================================
   store.js — ENQUIRY PERSISTENCE
   ----------------------------------------------------------------------------
   The guest page writes records; the front-office page reads and updates them.
   Both go through this one module so the storage shape is defined once.
   ========================================================================== */
"use strict";

const EnquiryStore = (() => {
  function read() {
    try {
      const raw = localStorage.getItem(SITE.STORAGE_KEY);
      const stored = raw ? JSON.parse(raw) : null;
      return Array.isArray(stored) ? stored : null;
    } catch (error) {
      return null;
    }
  }

  function write(list) {
    try {
      localStorage.setItem(SITE.STORAGE_KEY, JSON.stringify(list));
      return true;
    } catch (error) {
      return false;
    }
  }

  /* Seeded demonstration records are only injected when nothing has been
     stored yet, so resetting the queue is a one-line delete. */
  function all() {
    const stored = read();
    if (stored && stored.length) return stored;
    write(SITE.SEED_ENQUIRIES);
    return SITE.SEED_ENQUIRIES.slice();
  }

  function add(record) {
    return write([record, ...all()]);
  }

  function setStatus(id, status) {
    const next = all().map((record) =>
      record.id === id ? Object.assign({}, record, { status }) : record,
    );
    write(next);
    return next;
  }

  function reset() {
    write(SITE.SEED_ENQUIRIES);
    return SITE.SEED_ENQUIRIES.slice();
  }

  function demoRecord() {
    const stamp = Date.now();
    return {
      id: `NH-${new Date().getFullYear()}-${String(stamp).slice(-4)}`,
      guestName: "Test Record (design review)",
      phone: SITE.HOTEL.phoneDisplay,
      roomType: SITE.ROOM_TYPES[0].name,
      dates: "Nov 12 to Nov 14 (2 nights)",
      slot: SITE.STAY_CYCLE.slots[0].value,
      guests: "2 Adults",
      totalAmount: `${SITE.money(SITE.ROOM_TYPES[0].price * 2)} (Net Direct Tariff)`,
      status: "New",
      note: "Injected from the desk page to demonstrate the queue.",
    };
  }

  /* "₹3,600 (Net Direct Tariff)" -> 3600, for the revenue tile. */
  function amountOf(record) {
    return Number(String(record.totalAmount).replace(/[^\d.]/g, "")) || 0;
  }

  return {
    all,
    add,
    setStatus,
    reset,
    demoRecord,
    amountOf,
    available: () => read() !== null || typeof localStorage !== "undefined",
  };
})();
