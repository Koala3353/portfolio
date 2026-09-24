"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, GithubLogo } from "@phosphor-icons/react";
import { categories, type Project, type ProjectCategory } from "@/data/projects";

type Filter = "All" | ProjectCategory;

export default function ProjectFilter({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const reduce = useReducedMotion();

  const counts = Object.fromEntries(
    categories.map((c) => [c, projects.filter((p) => p.category === c).length]),
  ) as Record<ProjectCategory, number>;
  const options: { key: Filter; count: number }[] = [
    { key: "All", count: projects.length },
    ...categories.map((c) => ({ key: c, count: counts[c] })),
  ];
  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div>
      <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = filter === o.key;
          return (
            <button
              key={o.key}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(o.key)}
              className={`inline-flex h-9 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors duration-200 ${
                active ? "border-fg bg-fg text-bg" : "border-line text-muted hover:border-subtle hover:text-fg"
              }`}
            >
              {o.key}
              <span className={`tabular font-mono text-xs ${active ? "text-bg/70" : "text-subtle"}`}>{o.count}</span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} projects
      </p>

      {visible.length === 0 ? (
        <div className="mt-10 border-y border-line py-16 text-center">
          <p className="font-medium">No projects in this category yet.</p>
          <button type="button" onClick={() => setFilter("All")} className="mt-3 text-sm text-accent link-underline">
            Show all projects
          </button>
        </div>
      ) : (
        <motion.ul layout={!reduce} className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((p) => (
              <motion.li
                key={p.slug}
                id={p.slug}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="scroll-mt-28 target:[&>article]:border-accent"
              >
                <article className="surface flex h-full flex-col p-6">
                  <p className="font-mono text-sm text-subtle">
                    <time>{p.year}</time> · {p.category}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.description}</p>
                  <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-4 text-sm">
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 link-underline"
                      aria-label={`${p.title} source code on GitHub`}
                    >
                      <GithubLogo aria-hidden className="size-4" /> Source
                    </a>
                    {p.preview && (
                      <a
                        href={p.preview}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-accent link-underline"
                        aria-label={`${p.title} live demo`}
                      >
                        Live demo <ArrowUpRight aria-hidden className="size-4" />
                      </a>
                    )}
                  </div>
                </article>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </div>
  );
}
