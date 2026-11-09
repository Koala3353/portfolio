"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import ProjectCard from "@/components/projects/ProjectCard";
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
              className={`inline-flex h-11 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors duration-200 ${
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
                <ProjectCard project={p} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </div>
  );
}
