"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Component, useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { fredoka } from "./fonts";
import { daylight, greeting } from "./daylight";
import { useLocalHour, useManilaClock, useTypewriter } from "./hooks";
import { reportDeskCrash, setHomeView } from "./homeMode";
import LaptopScreen from "./LaptopScreen";
import NotebookPages from "./NotebookPages";
import BootLamp from "./BootLamp";
import ObjectPanel, { type PanelId } from "./ObjectPanels";
import {
  deskObjects,
  kobiIdleLines,
  objectById,
  type DeskObjectId,
  type LaptopScreen as Screen,
  type NotebookPage as Page,
} from "./objects";

const DeskScene = dynamic(() => import("./DeskScene"), { ssr: false });

/** If the 3D desk throws while rendering, fall back to the regular home for this visit. */
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    reportDeskCrash();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/** What the camera is zoomed into: the laptop or notebook (with a screen or page open), or another object. */
type View =
  | { kind: "laptop"; screen: Screen }
  | { kind: "notebook"; page: Page }
  | { kind: "object"; id: PanelId }
  | null;

/** How long the desk gets before we offer the regular version. */
const SLOW_MS = 6000;

export default function DeskHome() {
  const reduce = useReducedMotion() ?? false;
  const [hovered, setHovered] = useState<DeskObjectId | null>(null);
  const [view, setView] = useState<View>(null);
  const [idle, setIdle] = useState(0);
  const [ready, setReady] = useState(false);
  const [slow, setSlow] = useState(false);
  // Give the lamp time to switch on. This runs from page load, so on a first visit it overlaps
  // the site's logo intro instead of adding to it.
  const [lampOn, setLampOn] = useState(false);
  useEffect(() => {
    const quick = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = setTimeout(() => setLampOn(true), quick ? 0 : 1700);
    return () => clearTimeout(id);
  }, []);
  const clock = useManilaClock();
  const hour = useLocalHour();
  const light = daylight(hour);
  const deviceRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  const focus: DeskObjectId | null = view ? (view.kind === "object" ? view.id : view.kind) : null;

  // If the desk is still dark after a few seconds, offer the regular page.
  useEffect(() => {
    if (ready) return;
    const id = setTimeout(() => setSlow(true), SLOW_MS);
    return () => clearTimeout(id);
  }, [ready]);

  // Rotate Kobi's idle lines while nothing is being pointed at.
  useEffect(() => {
    if (hovered || view || reduce) return;
    const id = setInterval(() => setIdle((i) => (i + 1) % kobiIdleLines.length), 7000);
    return () => clearInterval(id);
  }, [hovered, view, reduce]);

  const line = useMemo(() => {
    const target = hovered ?? focus;
    if (target) return objectById[target].kobi;
    // Kobi opens with a greeting for the visitor's time of day.
    return idle === 0 ? greeting(hour) : kobiIdleLines[idle];
  }, [hovered, focus, idle, hour]);
  const bubble = useTypewriter(line, reduce);

  const open = useCallback((id: DeskObjectId) => {
    lastTrigger.current = document.activeElement as HTMLElement | null;
    setHovered(null);
    // Everything zooms in. The laptop and notebook open on their first screen or page.
    if (id === "laptop") setView({ kind: "laptop", screen: "projects" });
    else if (id === "notebook") setView({ kind: "notebook", page: "about" });
    else setView({ kind: "object", id });
  }, []);

  // From an object, fly over to the laptop screen or notebook page with the full story.
  const lookCloser = useCallback(() => {
    if (view?.kind !== "object") return;
    const opens = objectById[view.id].opens;
    if (opens?.device === "laptop") setView({ kind: "laptop", screen: opens.screen });
    if (opens?.device === "notebook") setView({ kind: "notebook", page: opens.page });
  }, [view]);

  const close = useCallback(() => {
    setView(null);
    lastTrigger.current?.focus?.();
  }, []);

  // Escape closes whatever is open; focus moves into it when it opens.
  useEffect(() => {
    if (!focus) return;
    // Line the desk up under the sticky header, then hold the page still until the view closes,
    // so nothing slides under the header while you read.
    const section = sectionRef.current;
    if (section) {
      const header = document.querySelector("header")?.offsetHeight ?? 0;
      const top = section.getBoundingClientRect().top + window.scrollY - header;
      window.scrollTo({ top, behavior: "instant" });
    }
    const root = document.documentElement;
    root.style.overflow = "hidden";
    deviceRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [focus, close]);

  const busy = view !== null;
  const full = view?.kind === "laptop" || view?.kind === "notebook";

  return (
    <section
      ref={sectionRef}
      aria-labelledby="desk-title"
      className={`desk ${fredoka.variable}`}
      data-view={focus ? "device" : "desk"}
      data-light={light.bright > 0.55 ? "day" : "night"}
      style={{ "--desk-bg-a": light.bgA, "--desk-bg-b": light.bgB } as CSSProperties}
      data-ready={ready}
    >
      {/* The 3D desk is decoration; every object also exists as a real button below. */}
      <div className="desk-canvas" inert={busy}>
        <SceneBoundary>
          <DeskScene
            hovered={focus ?? hovered}
            onHover={setHovered}
            onSelect={open}
            reduceMotion={reduce}
            focus={focus}
            onReady={() => setReady(true)}
            hour={hour}
          />
        </SceneBoundary>
      </div>

      {/* Shown until the first frame is drawn. */}
      <AnimatePresence>
        {ready && lampOn ? null : (
          <motion.div
            key="boot"
            className="desk-boot"
            role="status"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <BootLamp />
            <p className="desk-boot-text font-mono">
              Turning on the desk lamp<span>.</span>
              <span>.</span>
              <span>.</span>
            </p>
            {slow ? (
              <div className="desk-boot-slow">
                <p>Taking a while? The regular version has everything too.</p>
                <button type="button" className="btn btn-primary" onClick={() => setHomeView("classic")}>
                  Open the regular version
                </button>
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Kobi's speech bubble; the 3D scene moves this to sit above Kobi's head. */}
      <div className="kobi-anchor" aria-hidden="true">
        <div className="kobi-bubble">{bubble}</div>
      </div>

      <div className="desk-hud" inert={busy}>
        <div className="desk-hud-row">
          <p className="desk-clock font-mono">
            <span className="desk-rec" aria-hidden="true" />
            <span className="hidden sm:inline">Keene&apos;s desk ·</span> Manila{" "}
            <time suppressHydrationWarning>{clock}</time>
          </p>
          <button type="button" className="desk-plain" onClick={() => setHomeView("classic")}>
            Regular version
          </button>
        </div>
        <h1 id="desk-title" className="desk-title">
          Keene Brigado
          <span className="desk-sub">
            diagnoses how a business runs, then builds the fix. Open to tech, consulting, and FMCG internships.
          </span>
        </h1>
      </div>

      {/* Kobi's line, read out politely for screen readers. */}
      <p className="sr-only" aria-live="polite">
        Kobi says: {line}
      </p>

      <nav aria-label="Things on the desk" className="desk-shelf" inert={busy}>
        <p className="desk-shelf-hint font-mono" aria-hidden="true">
          Pick something up
        </p>
        <ul>
          {deskObjects.map((o) => (
            <li key={o.id}>
              <button
                type="button"
                className={`desk-chip ${hovered === o.id ? "is-hot" : ""}`}
                onMouseEnter={() => setHovered(o.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(o.id)}
                onBlur={() => setHovered(null)}
                onClick={() => open(o.id)}
                aria-haspopup="dialog"
              >
                <span className="desk-chip-thing">{o.thing}</span>
                <span className="desk-chip-section">{o.section}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <AnimatePresence>
        {focus ? (
          <motion.div
            key={focus}
            ref={deviceRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={`Keene's ${objectById[focus].thing.toLowerCase()}`}
            className={`desk-device ${full ? "desk-device-full" : "desk-device-side"}`}
            // Wait for the camera to arrive before the screen, page, or panel appears.
            initial={reduce ? { opacity: 0 } : full ? { opacity: 0, scale: 0.97 } : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, scale: 1, x: 0, transition: { delay: reduce ? 0 : full ? 0.7 : 0.45, duration: 0.35 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            {view?.kind === "laptop" ? (
              <LaptopScreen initial={view.screen} clock={clock} onClose={close} />
            ) : null}
            {view?.kind === "notebook" ? (
              <NotebookPages initial={view.page} reduceMotion={reduce} onClose={close} />
            ) : null}
            {view?.kind === "object" ? (
              <ObjectPanel id={view.id} clock={clock} reduceMotion={reduce} onLookCloser={lookCloser} onClose={close} />
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
