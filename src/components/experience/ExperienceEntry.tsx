import { formatRange, type ExperienceEntry as Entry } from "@/data/experience";

const VISIBLE = 3;

export default function ExperienceEntry({ entry }: { entry: Entry }) {
  const head = entry.bullets.slice(0, VISIBLE);
  const rest = entry.bullets.slice(VISIBLE);
  return (
    <article className="grid grid-cols-1 gap-2 py-8 md:grid-cols-[12rem_1fr] md:gap-10">
      <p className="font-mono text-sm text-subtle tabular">
        <time dateTime={entry.start}>{formatRange(entry)}</time>
      </p>
      <div>
        <h3 className="text-lg font-semibold">{entry.role}</h3>
        <p className="mt-1 text-sm text-muted">
          <span className="text-fg">{entry.org}</span>
          {entry.type && <span> · {entry.type}</span>}
          {entry.location && <span> · {entry.location}</span>}
        </p>
        <ul className="mt-4 max-w-[65ch] list-disc space-y-2 pl-5 leading-relaxed text-muted marker:text-subtle">
          {head.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        {rest.length > 0 && (
          <details className="group mt-2">
            <summary className="cursor-pointer text-sm text-accent hover:text-accent-hover">
              <span className="group-open:hidden">Show {rest.length} more</span>
              <span className="hidden group-open:inline">Show less</span>
            </summary>
            <ul className="mt-2 max-w-[65ch] list-disc space-y-2 pl-5 leading-relaxed text-muted marker:text-subtle">
              {rest.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </details>
        )}
        {entry.tags && entry.tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Skills">
            {entry.tags.map((t) => (
              <li key={t} className="rounded-full border border-line px-2.5 py-0.5 text-xs text-muted">
                {t}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
