"use client";

import { useSyncExternalStore } from "react";

/**
 * Which home the visitor sees: the regular (flat) page by default, or the 3D desk once they ask for it.
 * The choice is remembered per browser; `?view=desk` opens the desk and `?view=classic` forces the regular page.
 */
const KEY = "home-view";
const EVENT = "home-view-change";

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

let sessionView: "desk" | "classic" | undefined;

function readPrefersClassic() {
  const param = new URLSearchParams(window.location.search).get("view");
  if (param === "classic") return true;
  if (param === "desk") return false;
  if (sessionView) return sessionView === "classic";
  try {
    return localStorage.getItem(KEY) !== "desk";
  } catch {
    return true;
  }
}

export function setHomeView(view: "desk" | "classic") {
  sessionView = view;
  try {
    localStorage.setItem(KEY, view);
  } catch {
    // Private mode or blocked storage: sessionView keeps the switch working for this visit.
  }
  if (new URLSearchParams(window.location.search).has("view")) {
    window.history.replaceState(null, "", window.location.pathname);
  }
  if (view === "desk" && crashed) {
    crashed = false;
    crashListeners.forEach((l) => l());
  }
  window.dispatchEvent(new Event(EVENT));
  window.scrollTo({ top: 0 });
}

export function usePrefersClassic() {
  return useSyncExternalStore(subscribe, readPrefersClassic, () => true);
}

let webgl: boolean | undefined;
function detectWebGL() {
  if (webgl === undefined) {
    try {
      const canvas = document.createElement("canvas");
      webgl = Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
    } catch {
      webgl = false;
    }
  }
  return webgl;
}

/** False when this browser can't draw the desk at all. */
export function useWebGL() {
  return useSyncExternalStore(
    () => () => {},
    detectWebGL,
    () => true,
  );
}

/** Lets the desk report that it failed (a crash or a lost context) for this visit. */
let crashed = false;
const crashListeners = new Set<() => void>();
export function reportDeskCrash() {
  crashed = true;
  crashListeners.forEach((l) => l());
}
export function useDeskCrashed() {
  return useSyncExternalStore(
    (l) => {
      crashListeners.add(l);
      return () => crashListeners.delete(l);
    },
    () => crashed,
    () => false,
  );
}
