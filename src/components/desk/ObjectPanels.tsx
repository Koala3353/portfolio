"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { experience, formatRange } from "@/data/experience";
import { winsInOrder } from "@/data/achievements";
import { testimonials } from "@/data/testimonials";
import { paths } from "@/data/home";
import { site } from "@/lib/site";
import Kobi2D from "./Kobi2D";
import ResumePaper from "./ResumePaper";
import { objectById, type DeskObjectId } from "./objects";

export type PanelId = Exclude<DeskObjectId, "laptop" | "notebook">;

const work = experience.filter((e) => e.category === "work").slice(0, 5);
const leadershipCount = experience.filter((e) => e.category === "leadership").length;
const plaques = winsInOrder.slice(0, 6);
const notes = ["#ffe27a", "#ffb3c7", "#a7e3c4"];

/* -------------------------------------------------------------------------- */
/* What each object shows up close                                             */
/* -------------------------------------------------------------------------- */

function WhiteboardBody() {
  return (
    <>
      <ol className="wb-timeline">
        {work.map((e, i) => (
          <li key={`${e.org}${e.start}`} style={{ "--marker": i === 0 ? "#4e7a3d" : "#3b6fd6" } as React.CSSProperties}>
            <span className="wb-date">{formatRange(e)}</span>
            <span className="wb-role">{e.role}</span>
            <span className="wb-org">{e.org}</span>
          </li>
        ))}
      </ol>
      <p className="wb-note">+ {leadershipCount} leadership roles in orgs at Ateneo</p>
    </>
  );
}

function TrophiesBody() {
  return (
    <ul className="tr-plaques">
      {plaques.map((a) => (
        <li key={a.title}>
          <span className="tr-place">{a.placement}</span>
          <span className="tr-title">{a.title}</span>
          <time dateTime={a.dateTime} className="tr-date">
            {a.date}
          </time>
        </li>
      ))}
    </ul>
  );
}

function StickyBody() {
  return (
    <ul className="st-notes">
      {testimonials.map((t, i) => (
        <li key={t.name} style={{ background: notes[i % notes.length], rotate: `${i % 2 ? 1.5 : -1.5}deg` }}>
          <blockquote>&ldquo;{t.excerpt}&rdquo;</blockquote>
          <p>
            {t.name}, {t.title}
          </p>
        </li>
      ))}
    </ul>
  );
}

function PrinterBody({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div className="pr-slot">
      {/* The page feeds out a line at a time, like it's printing. */}
      <motion.div
        initial={reduceMotion ? false : { y: "-100%" }}
        animate={{ y: "0%" }}
        transition={{ delay: 0.8, duration: 1.6, ease: (t: number) => Math.floor(t * 14) / 14 }}
      >
        <ResumePaper />
      </motion.div>
    </div>
  );
}

function MatchaBody() {
  return (
    <>
      <p className="mj-lede">Open to internships in tech, consulting, and FMCG.</p>
      <ul className="mj-paths">
        {paths.map((p) => (
          <li key={p.id}>
            <span className="mj-path">{p.title}</span>
            <span>{p.proof[0]}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

function PhoneBody({ clock }: { clock: string }) {
  const apps = [
    { label: "Email", detail: site.email, href: `mailto:${site.email}`, external: true },
    { label: "LinkedIn", detail: "in/keene-brigado", href: site.linkedin, external: true },
    { label: "GitHub", detail: "Koala3353", href: site.github, external: true },
    { label: "Message form", detail: "On the contact page", href: "/contact", external: false },
  ];
  return (
    <div className="ph-screen">
      <p className="ph-status font-mono" suppressHydrationWarning>
        <span>{clock.replace(/:\d\d(?= )/, "")}</span>
        <span aria-hidden="true">●●● 5G</span>
      </p>
      <p className="ph-thread-name">Kobi</p>
      <p className="ph-bubble">Want to reach Keene? Pick whichever is easiest for you.</p>
      <ul className="ph-apps">
        {apps.map((a) =>
          a.external ? (
            <li key={a.label}>
              <a href={a.href} {...(a.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                <span className="ph-app-label">{a.label}</span>
                <span className="ph-app-detail">{a.detail}</span>
              </a>
            </li>
          ) : (
            <li key={a.label}>
              <Link href={a.href}>
                <span className="ph-app-label">{a.label}</span>
                <span className="ph-app-detail">{a.detail}</span>
              </Link>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* The panel                                                                   */
/* -------------------------------------------------------------------------- */

const lookLabels: Partial<Record<PanelId, string>> = {
  whiteboard: "Every role, on the laptop",
  printer: "Read it on the laptop",
  trophies: "The full list, in the notebook",
  sticky: "Read them in the notebook",
  matcha: "What I'm looking for",
};

/** The card that sits beside an object once the camera has flown in to it. */
export default function ObjectPanel({
  id,
  clock,
  reduceMotion,
  onLookCloser,
  onClose,
}: {
  id: PanelId;
  clock: string;
  reduceMotion: boolean;
  onLookCloser: () => void;
  onClose: () => void;
}) {
  const o = objectById[id];
  const bodies: Record<PanelId, ReactNode> = {
    whiteboard: <WhiteboardBody />,
    trophies: <TrophiesBody />,
    sticky: <StickyBody />,
    printer: <PrinterBody reduceMotion={reduceMotion} />,
    matcha: <MatchaBody />,
    phone: <PhoneBody clock={clock} />,
  };
  const look = o.opens ? lookLabels[id] : undefined;

  return (
    <div className={`obj obj-${id}`}>
      <p className="obj-kobi">
        <Kobi2D className="obj-kobi-face" />
        <span>{o.kobi}</span>
      </p>
      <h2 className="obj-title">{o.title}</h2>
      <div className="obj-body">{bodies[id]}</div>
      <div className="obj-actions">
        {id === "printer" ? (
          <a href={site.resume} download className="btn btn-primary">
            Download PDF
          </a>
        ) : null}
        {look ? (
          <button type="button" className={`btn ${id === "printer" ? "obj-btn-ghost" : "btn-primary"}`} onClick={onLookCloser}>
            {look}
          </button>
        ) : null}
        <Link href={o.href} className="btn obj-btn-ghost">
          {o.cta}
        </Link>
        <button type="button" className="obj-back" onClick={onClose}>
          Put it back <kbd>Esc</kbd>
        </button>
      </div>
    </div>
  );
}
