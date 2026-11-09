import { ArrowUpRight, GithubLogo } from "@phosphor-icons/react/dist/ssr";
import CategoryGlyph from "@/components/art/CategoryGlyph";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project: p }: { project: Project }) {
  return (
    <article className="surface group flex h-full flex-col p-6 transition-colors hover:border-accent/60">
      <div className="flex items-start justify-between gap-4">
        <p className="font-mono text-sm text-subtle">
          <time>{p.year}</time> · {p.category}
        </p>
        <CategoryGlyph
          category={p.category}
          className="-mr-1 -mt-1 size-10 shrink-0 text-subtle transition-colors group-hover:text-fg"
        />
      </div>
      <h3 className="mt-2 text-lg font-semibold">{p.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.description}</p>
      <div className="mt-5 flex flex-wrap gap-x-5 border-t border-line pt-2 text-sm">
        {!p.github && !p.preview && <span className="py-3 text-subtle">Private, no public link</span>}
        {p.github && (
          <a
            href={p.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 link-underline"
            aria-label={`${p.title} source code on GitHub`}
          >
            <GithubLogo aria-hidden className="size-4" /> Source
          </a>
        )}
        {p.preview && (
          <a
            href={p.preview}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 text-accent link-underline"
            aria-label={`${p.title} live demo`}
          >
            Live demo <ArrowUpRight aria-hidden className="size-4" />
          </a>
        )}
      </div>
    </article>
  );
}
