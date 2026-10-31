/* ============================================================================
   desk.js — FRONT OFFICE VIEW STATE
   ----------------------------------------------------------------------------
   Reads records through EnquiryStore, keeps the active filter, and repaints
   the queue. Markup comes from templates.js; nothing here knows the schema.
   ========================================================================== */
"use strict";

const Desk = (() => {
  const state = { records: [], filter: "all" };

  const el = (id) => document.getElementById(id);

  function visible() {
    if (state.filter === "all") return state.records;
    return state.records.filter((record) => record.status === state.filter);
  }

  function kpis() {
    const pending = state.records.filter(
      (record) => record.status !== "Confirmed",
    ).length;
    const confirmed = state.records.length - pending;
    const revenue = state.records.reduce(
      (total, record) => total + EnquiryStore.amountOf(record),
      0,
    );

    return [
      { label: "Records in queue", value: String(state.records.length) },
      { label: "Awaiting a call", value: String(pending), tone: "warn" },
      { label: "Confirmed stays", value: String(confirmed), tone: "ok" },
      { label: "Estimated direct revenue", value: SITE.money(revenue), tone: "plum" },
    ];
  }

  function paint() {
    const rows = visible();

    el("kpis").innerHTML = kpis().map(kpiTemplate).join("");
    el("queueBody").innerHTML = rows.map(queueRowTemplate).join("");
    el("queueCards").innerHTML = rows.map(queueCardTemplate).join("");
    el("queueCount").textContent =
      `${rows.length} of ${state.records.length} record${
        state.records.length === 1 ? "" : "s"
      }`;
    el("queueEmpty").hidden = rows.length > 0;
  }

  function reload() {
    state.records = EnquiryStore.all();
    paint();
  }

  function init() {
    const { HOTEL } = SITE;
    el("deskSub").textContent = `${HOTEL.name} · ${HOTEL.landmark}, ${HOTEL.town}`;
    el("deskNote").textContent =
      "Enquiries sent from the guest website land here. Confirming a record does not create a booking — the desk still calls the guest.";

    Toast.init();

    el("statusFilter").addEventListener("change", (event) => {
      state.filter = event.target.value;
      paint();
    });

    /* One delegated listener covers both the table and the card view, because
       both use the same data-confirm attribute. */
    el("queue").addEventListener("click", (event) => {
      const button = event.target.closest("[data-confirm]");
      if (!button) return;
      state.records = EnquiryStore.setStatus(button.dataset.confirm, "Confirmed");
      paint();
      Toast.show(`${button.dataset.confirm} marked confirmed.`);
    });

    el("addDemo").addEventListener("click", () => {
      EnquiryStore.add(EnquiryStore.demoRecord());
      reload();
      Toast.show("Test record added to the queue.");
    });

    el("resetQueue").addEventListener("click", () => {
      state.records = EnquiryStore.reset();
      paint();
      Toast.show("Queue reset to the seeded demonstration records.");
    });

    reload();
  }

  return { init, paint };
})();

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", Desk.init);
} else {
  Desk.init();
}
