"use client";

import Link from "next/link";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { useEffect, useState } from "react";
import { aboutIntro, facts } from "@/data/about";
import { certifications, educationEntries } from "@/data/experience";
import { achievementGroups } from "@/data/achievements";
import { testimonials } from "@/data/testimonials";
import { lookingFor } from "@/data/services";
import { site } from "@/lib/site";
import type { NotebookPage as Page } from "./objects";

const pages: { id: Page; tab: string; title: string }[] = [
  { id: "about", tab: "Me", title: "Hi, I'm Keene." },
  { id: "school", tab: "School", title: "School" },
  { id: "wins", tab: "Wins", title: "Wins, written down" },
  { id: "notes", tab: "Notes", title: "Notes from people" },
  { id: "next", tab: "Next", title: "What I'm looking for" },
];

const wins = achievementGroups.flatMap((g) => g.items).slice(0, 7);

/**
 * Page turns. Forward: the old page swings over the spine and the next one is already underneath.
 * Back: the previous page swings back over on top. `custom` is the direction, so exiting pages
 * use the direction of the turn that removed them.
 */
const TURN = { duration: 0.55, ease: [0.4, 0, 0.2, 1] } as const;
const flip: Variants = {
  enter: (d: number) => (d > 0 ? { rotateY: 0, zIndex: 1 } : { rotateY: -100, zIndex: 2 }),
  center: (d: number) => ({ rotateY: 0, zIndex: d > 0 ? 1 : 2, transition: d > 0 ? { duration: 0 } : TURN }),
  exit: (d: number) => (d > 0 ? { rotateY: -100, zIndex: 2, transition: TURN } : { zIndex: 1, transition: TURN }),
};
const fade: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

function PageBody({ id }: { id: Page }) {
  if (id === "about")
    return (
      <>
        <p>{aboutIntro}</p>
        <dl className="nb-facts">
          {facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
        <Link href="/about" className="nb-link">
          Read the whole story →
        </Link>
      </>
    );
  if (id === "school")
    return (
      <>
        <ul className="nb-list">
          {educationEntries.map((e) => (
            <li key={e.institution}>
              <strong>{e.institution}</strong>
              <span>
                {e.degree} · {e.period}
              </span>
              <em>{e.note}</em>
            </li>
          ))}
        </ul>
        <p className="nb-aside">Also: {certifications[0].name}, {certifications[0].issuer} ({certifications[0].date}), plus {certifications.length - 1} more certificates.</p>
      </>
    );
  if (id === "wins")
    return (
      <>
        <ul className="nb-wins">
          {wins.map((w) => (
            <li key={w.title}>
              <span className="nb-place">{w.placement}</span>
              <span>
                {w.title}
                <time dateTime={w.dateTime}> · {w.date}</time>
              </span>
            </li>
          ))}
        </ul>
        <Link href="/achievements" className="nb-link">
          Every award →
        </Link>
      </>
    );
  if (id === "notes")
    return (
      <>
        <ul className="nb-notes">
          {testimonials.map((t, i) => (
            <li key={t.name} style={{ rotate: `${i % 2 ? 1.2 : -1.4}deg` }}>
              <blockquote>&ldquo;{t.excerpt}&rdquo;</blockquote>
              <p>
                {t.name}, {t.title}
              </p>
            </li>
          ))}
        </ul>
        <Link href="/testimonials" className="nb-link">
          Full recommendations →
        </Link>
      </>
    );
  return (
    <>
      <p className="nb-big">{lookingFor.headline}</p>
      <ul className="nb-check">
        {lookingFor.areas.map((a) => (
          <li key={a}>{a}</li>
        ))}
      </ul>
      <p>Anywhere a messy process needs someone to figure out what&apos;s wrong, then build the fix.</p>
      <div className="nb-actions">
        <Link href="/contact" className="btn btn-primary">
          Get in touch
        </Link>
        <a href={site.resume} download className="btn nb-btn-ghost">
          Download résumé
        </a>
        <Link href="/services" className="nb-link">
          For recruiters →
        </Link>
      </div>
    </>
  );
}

export default function NotebookPages({
  initial,
  reduceMotion,
  onClose,
}: {
  initial: Page;
  reduceMotion: boolean;
  onClose: () => void;
}) {
  const [{ index, dir }, setState] = useState({ index: pages.findIndex((p) => p.id === initial), dir: 1 });
  const go = (to: number) => {
    if (to < 0 || to >= pages.length || to === index) return;
    setState({ index: to, dir: to > index ? 1 : -1 });
  };
  const page = pages[index];

  // Arrow keys flip pages.
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "ArrowRight") setState((s) => (s.index < pages.length - 1 ? { index: s.index + 1, dir: 1 } : s));
      if (e.key === "ArrowLeft") setState((s) => (s.index > 0 ? { index: s.index - 1, dir: -1 } : s));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);


  return (
    <div className="nb">
      {/* The left page: an index of tabs, and Kobi's doodle */}
      <nav className="nb-index" aria-label="Notebook pages">
        <p className="nb-index-title font-mono">Keene&apos;s notebook</p>
        <ol>
          {pages.map((p, i) => (
            <li key={p.id}>
              <button type="button" aria-current={i === index ? "page" : undefined} onClick={() => go(i)}>
                <span className="font-mono">{String(i + 1).padStart(2, "0")}</span>
                  <span className="nb-tab">{p.tab}</span>
              </button>
            </li>
          ))}
        </ol>
        <button type="button" className="nb-close" onClick={onClose}>
          Close notebook <kbd>Esc</kbd>
        </button>
      </nav>

      {/* The right page, which flips */}
      <div className="nb-stage">
        <AnimatePresence initial={false} custom={dir}>
          <motion.article
            key={page.id}
            className="nb-page"
            custom={dir}
            variants={reduceMotion ? fade : flip}
            initial="enter"
            animate="center"
            exit="exit"
            onPanEnd={(_, info) => {
              if (info.offset.x < -60) go(index + 1);
              else if (info.offset.x > 60) go(index - 1);
            }}
          >
            <h2 className="nb-title">
              {page.title}
            </h2>
            <div className="nb-body">
              <PageBody id={page.id} />
            </div>
          </motion.article>
        </AnimatePresence>
        <div className="nb-turn">
          <button type="button" onClick={() => go(index - 1)} disabled={index === 0} aria-label="Previous page">
            ←
          </button>
          <p className="font-mono" aria-live="polite">
            Page {index + 1} of {pages.length}
          </p>
          <button
            type="button"
            onClick={() => go(index + 1)}
            disabled={index === pages.length - 1}
            aria-label="Next page"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
