"use client";

import { useId, useRef, useState } from "react";
import { categoryLabels, type ExperienceCategory, type ExperienceEntry as Entry } from "@/data/experience";
import ExperienceEntry from "./ExperienceEntry";

type Filter = "all" | ExperienceCategory;
const filters: Filter[] = ["all", "work", "leadership"];
const label = (f: Filter) => (f === "all" ? "All" : categoryLabels[f]);

export default function ExperienceTabs({ entries }: { entries: Entry[] }) {
  const [active, setActive] = useState<Filter>("all");
  const id = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const shown = active === "all" ? entries : entries.filter((e) => e.category === active);

  function onKeyDown(e: React.KeyboardEvent, i: number) {
    let next = -1;
    if (e.key === "ArrowRight") next = (i + 1) % filters.length;
    if (e.key === "ArrowLeft") next = (i - 1 + filters.length) % filters.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = filters.length - 1;
    if (next < 0) return;
    e.preventDefault();
    setActive(filters[next]);
    refs.current[next]?.focus();
  }

  return (
    <div>
      <div role="tablist" aria-label="Filter experience" className="flex flex-wrap gap-2">
        {filters.map((f, i) => {
          const selected = f === active;
          const count = f === "all" ? entries.length : entries.filter((e) => e.category === f).length;
          return (
            <button
              key={f}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${id}-tab-${f}`}
              aria-selected={selected}
              aria-controls={`${id}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(f)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                selected ? "border-fg bg-fg text-bg" : "border-line text-muted hover:border-subtle hover:text-fg"
              }`}
            >
              {label(f)} <span className="font-mono text-xs opacity-70 tabular">{count}</span>
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-tab-${active}`}
        className="mt-6 divide-y divide-line border-t border-line"
      >
        {shown.map((e) => (
          <ExperienceEntry key={`${e.org}-${e.role}-${e.start}`} entry={e} />
        ))}
      </div>
    </div>
  );
}
