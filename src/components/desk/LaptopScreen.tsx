"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState, type KeyboardEvent } from "react";
import { categories, projects, type ProjectCategory } from "@/data/projects";
import { experience, formatRange, categoryLabels, certifications } from "@/data/experience";
import { skillGroups } from "@/data/about";
import { caseStudies } from "@/data/home";
import { site } from "@/lib/site";
import Kobi2D from "./Kobi2D";
import ResumePaper from "./ResumePaper";
import type { LaptopScreen as Screen } from "./objects";

const apps: { id: Screen; label: string; kobi: string }[] = [
  { id: "projects", label: "Projects", kobi: "Tap a category to filter. The live ones open in a new tab." },
  { id: "experience", label: "Experience", kobi: "Newest first. Ritual Matcha is the current day job." },
  { id: "skills", label: "Skills", kobi: "Code on one side, business on the other. Keene uses both." },
  { id: "resume", label: "Résumé", kobi: "One page, ready to print. I'd hire Keene. I'm a koala, though." },
];

/** A small app icon per screen, drawn in the desk palette. */
function AppIcon({ id }: { id: Screen }) {
  const common = { width: 22, height: 22, viewBox: "0 0 24 24", "aria-hidden": true, fill: "none" } as const;
  if (id === "projects")
    return (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="14" rx="3" fill="#7cc4ff" />
        <path d="M8 10l-2 2 2 2M16 10l2 2-2 2M13 9l-2 6" stroke="#1e3a5f" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  if (id === "experience")
    return (
      <svg {...common}>
        <rect x="3" y="4" width="18" height="16" rx="3" fill="#f3ead8" />
        <path d="M6 14h12" stroke="#3b6fd6" strokeWidth="1.6" />
        <circle cx="8" cy="14" r="1.8" fill="#3b6fd6" />
        <circle cx="16" cy="14" r="1.8" fill="#4e7a3d" />
        <path d="M6 8h7" stroke="#20222b" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  if (id === "skills")
    return (
      <svg {...common}>
        <rect x="3" y="3" width="18" height="18" rx="4" fill="#7fb069" />
        <path d="M8 9h8M8 12h5M8 15h7" stroke="#20222b" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M6 3h9l4 4v14H6z" fill="#fff" />
      <path d="M15 3v4h4" fill="#d9dbe2" />
      <path d="M9 11h7M9 14h7M9 17h4" stroke="#c2410c" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

const pinned = caseStudies.map((c) => c.slug);

function ProjectsApp() {
  const [filter, setFilter] = useState<ProjectCategory | "All">("All");
  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter);
  // Pinned work (the same picks as the regular home) first, then newest.
  const rank = (slug: string) => {
    const i = pinned.indexOf(slug);
    return i === -1 ? pinned.length : i;
  };
  const sorted = [...shown].sort((a, b) => rank(a.slug) - rank(b.slug) || b.year.localeCompare(a.year));

  return (
    <div>
      <div className="os-filter" role="group" aria-label="Filter projects">
        {(["All", ...categories] as const).map((c) => (
          <button key={c} type="button" aria-pressed={filter === c} onClick={() => setFilter(c)}>
            {c}
            <span>{c === "All" ? projects.length : projects.filter((p) => p.category === c).length}</span>
          </button>
        ))}
      </div>
      <ul className="os-grid">
        {sorted.map((p) => (
          <li key={p.slug} className="os-card">
            <p className="os-meta">
              {p.year} · {p.category}
              {pinned.includes(p.slug) ? <span className="os-star"> · Pinned</span> : null}
            </p>
            <h3>{p.title}</h3>
            <p className="os-desc">{p.description}</p>
            <div className="os-links">
              {p.preview ? (
                <a href={p.preview} target="_blank" rel="noopener noreferrer">
                  Open live ↗
                </a>
              ) : null}
              {p.github ? (
                <a href={p.github} target="_blank" rel="noopener noreferrer">
                  Source ↗
                </a>
              ) : null}
              <Link href={`/projects#${p.slug}`}>Details</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ExperienceApp() {
  return (
    <div className="os-columns">
      {(["work", "leadership"] as const).map((cat) => (
        <section key={cat} aria-labelledby={`os-exp-${cat}`}>
          <h3 id={`os-exp-${cat}`} className="os-section-title">
            {categoryLabels[cat]}
          </h3>
          <ol className="os-timeline">
            {experience
              .filter((e) => e.category === cat)
              .map((e) => (
                <li key={`${e.org}${e.role}${e.start}`}>
                  <p className="os-meta">{formatRange(e)}</p>
                  <p className="os-role">{e.role}</p>
                  <p className="os-org">{e.org}</p>
                  {e.bullets[0] ? <p className="os-desc">{e.bullets[0]}</p> : null}
                </li>
              ))}
          </ol>
        </section>
      ))}
    </div>
  );
}

function SkillsApp() {
  return (
    <div className="os-columns">
      {skillGroups.map((g) => (
        <section key={g.title} aria-labelledby={`os-skill-${g.title}`}>
          <h3 id={`os-skill-${g.title}`} className="os-section-title">
            {g.title}
          </h3>
          <ul className="os-chips">
            {g.items.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>
      ))}
      <section aria-labelledby="os-certs">
        <h3 id="os-certs" className="os-section-title">
          Certifications
        </h3>
        <ul className="os-list">
          {certifications.slice(0, 5).map((c) => (
            <li key={c.name}>
              <span>{c.name}</span>
              <span className="os-meta">
                {c.issuer} · {c.date}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function ResumeApp() {
  return (
    <div className="os-resume">
      <ResumePaper />
      <div className="os-resume-actions">
        <p>The full résumé fits on one page. Download it, or read it on the site.</p>
        <a href={site.resume} download className="btn btn-primary">
          Download PDF
        </a>
        <Link href="/cv" className="btn os-btn-ghost">
          Open the résumé page
        </Link>
      </div>
    </div>
  );
}

export default function LaptopScreen({
  initial,
  clock,
  onClose,
}: {
  initial: Screen;
  clock: string;
  onClose: () => void;
}) {
  const [screen, setScreen] = useState<Screen>(initial);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = apps.find((a) => a.id === screen)!;

  // Arrow keys move between apps, like a tab list.
  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (i + step + apps.length) % apps.length;
    setScreen(apps[next].id);
    tabs.current[next]?.focus();
  };

  return (
    <div className="os">
      <header className="os-bar">
        <p className="os-brand">
          <span aria-hidden="true">●</span> KeeneOS
        </p>
        <h2 className="os-title">
          {current.label}
        </h2>
        <p className="os-clock font-mono" suppressHydrationWarning>
          {clock}
        </p>
        <button type="button" className="os-close" onClick={onClose}>
          Close laptop <kbd>Esc</kbd>
        </button>
      </header>

      <div className="os-body" id="os-panel" role="tabpanel" aria-labelledby={`os-tab-${screen}`}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={screen}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
          >
            {screen === "projects" ? <ProjectsApp /> : null}
            {screen === "experience" ? <ExperienceApp /> : null}
            {screen === "skills" ? <SkillsApp /> : null}
            {screen === "resume" ? <ResumeApp /> : null}
          </motion.div>
        </AnimatePresence>
      </div>

      <footer className="os-dock-row">
        <p className="os-kobi" aria-live="polite">
          <Kobi2D className="os-kobi-face" />
          <span>{current.kobi}</span>
        </p>
        <div className="os-dock" role="tablist" aria-label="Apps">
          {apps.map((a, i) => (
            <button
              key={a.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              id={`os-tab-${a.id}`}
              type="button"
              role="tab"
              aria-selected={screen === a.id}
              aria-controls="os-panel"
              tabIndex={screen === a.id ? 0 : -1}
              onClick={() => setScreen(a.id)}
              onKeyDown={(e) => onTabKey(e, i)}
            >
              <AppIcon id={a.id} />
              <span>{a.label}</span>
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
}
