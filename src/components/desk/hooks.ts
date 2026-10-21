"use client";

import { useEffect, useState } from "react";

/** Manila time, refreshed every second, so the desk feels like it's happening now. */
export function useManilaClock() {
  const [now, setNow] = useState<string>("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-PH", {
      timeZone: "Asia/Manila",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

/** Types a line out a few characters at a time. */
export function useTypewriter(text: string, instant: boolean) {
  const [state, setState] = useState({ text, n: 0 });
  // A new line restarts the typing (state reset during render, no effect needed).
  if (state.text !== text) setState({ text, n: 0 });
  useEffect(() => {
    if (instant) return;
    const id = setInterval(() => {
      setState((s) => (s.n >= s.text.length ? s : { ...s, n: s.n + 2 }));
    }, 22);
    return () => clearInterval(id);
  }, [text, instant]);
  return instant ? text : text.slice(0, state.n);
}
