"use client";

import { useEffect, useRef } from "react";
import ProjectCard from "@/components/projects/ProjectCard";
import type { Project } from "@/data/projects";

/** Older projects, collapsed by default. Opens itself when a link points at one of them (#slug). */
export default function EarlierWork({ projects, years }: { projects: Project[]; years: string }) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const open = () => {
      const slug = decodeURIComponent(window.location.hash.slice(1));
      if (!slug || !projects.some((p) => p.slug === slug)) return;
      if (ref.current) ref.current.open = true;
      requestAnimationFrame(() => document.getElementById(slug)?.scrollIntoView());
    };
    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
  }, [projects]);

  return (
    <details ref={ref} className="group border-y border-line">
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 [&::-webkit-details-marker]:hidden">
        <span>
          <span className="text-xl font-semibold">Earlier work, {years}</span>
          <span className="mt-1 block text-sm text-muted">
            {projects.length} Discord bots and small tools from when I started freelancing.
          </span>
        </span>
        <span aria-hidden="true" className="font-mono text-2xl text-subtle transition-transform group-open:rotate-45">
          +
        </span>
      </summary>
      <ul className="grid grid-cols-1 gap-4 pb-8 pt-2 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <li key={p.slug} id={p.slug} className="scroll-mt-28 target:[&>article]:border-accent">
            <ProjectCard project={p} />
          </li>
        ))}
      </ul>
    </details>
  );
}
