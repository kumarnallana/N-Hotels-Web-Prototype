/* ============================================================================
   toast.js — SHARED TRANSIENT MESSAGE
   ----------------------------------------------------------------------------
   Used by both the guest page and the front-office page, so it lives on its
   own rather than being duplicated inside behaviours.js.
   ========================================================================== */
"use strict";

const Toast = (() => {
  let timer = null;

  function show(message) {
    const box = document.getElementById("toast");
    if (!box) return;
    document.getElementById("toastText").textContent = message;
    box.hidden = false;
    clearTimeout(timer);
    timer = setTimeout(hide, 5000);
  }

  function hide() {
    const box = document.getElementById("toast");
    if (box) box.hidden = true;
    clearTimeout(timer);
  }

  function init() {
    const dismiss = document.getElementById("toastDismiss");
    if (dismiss) dismiss.addEventListener("click", hide);
  }

  return { show, hide, init };
})();
