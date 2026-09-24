"use client";

import { useCallback, useSyncExternalStore } from "react";

export type ThemePref = "system" | "light" | "dark";

const listeners = new Set<() => void>();

function readPref(): ThemePref {
  try {
    const t = localStorage.getItem("theme");
    return t === "light" || t === "dark" ? t : "system";
  } catch {
    return "system";
  }
}

function apply(pref: ThemePref) {
  const dark =
    pref === "dark" || (pref === "system" && matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.dataset.theme = dark ? "dark" : "light";
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const mq = matchMedia("(prefers-color-scheme: dark)");
  const onChange = () => {
    if (readPref() === "system") apply("system");
    cb();
  };
  mq.addEventListener("change", onChange);
  return () => {
    listeners.delete(cb);
    mq.removeEventListener("change", onChange);
  };
}

export function useTheme() {
  const pref = useSyncExternalStore(subscribe, readPref, () => "system" as ThemePref);

  const setPref = useCallback((next: ThemePref) => {
    try {
      localStorage.setItem("theme", next);
    } catch {}
    apply(next);
    listeners.forEach((l) => l());
  }, []);

  const cycle = useCallback(() => {
    const order: ThemePref[] = ["system", "light", "dark"];
    setPref(order[(order.indexOf(readPref()) + 1) % order.length]);
  }, [setPref]);

  return { pref, setPref, cycle };
}
