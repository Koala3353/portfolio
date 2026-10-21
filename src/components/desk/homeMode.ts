"use client";

import { useSyncExternalStore } from "react";

/**
 * Which home the visitor sees: the 3D desk, or the regular (flat) page.
 * The choice is remembered per browser; `?view=classic` forces the regular page.
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

function readPrefersClassic() {
  if (new URLSearchParams(window.location.search).get("view") === "classic") return true;
  try {
    return localStorage.getItem(KEY) === "classic";
  } catch {
    return false;
  }
}

export function setHomeView(view: "desk" | "classic") {
  try {
    localStorage.setItem(KEY, view);
  } catch {
    // Private mode or blocked storage: the switch still works for this visit.
  }
  if (view === "desk" && new URLSearchParams(window.location.search).get("view") === "classic") {
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
  return useSyncExternalStore(subscribe, readPrefersClassic, () => false);
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
