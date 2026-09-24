import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, GithubLogo } from "@phosphor-icons/react/dist/ssr";
import Reveal from "@/components/Reveal";
import HeroIntro from "@/components/home/HeroIntro";
import HeroSystem from "@/components/art/HeroSystem";
import CategoryGlyph from "@/components/art/CategoryGlyph";
import Parallax from "@/components/art/Parallax";
import Orbit from "@/components/art/Orbit";
import { site } from "@/lib/site";
import { metrics, stack, now, caseStudies, disciplines } from "@/data/home";
import { projects, type Project } from "@/data/projects";
import { skillGroups } from "@/data/about";
import { testimonials } from "@/data/testimonials";
import { achievementGroups } from "@/data/achievements";

export const metadata: Metadata = {
  title: { absolute: site.title },
  description: site.description,
};

const studies = caseStudies
  .map((c) => ({ ...c, project: projects.find((p) => p.slug === c.slug) }))
  .filter((c): c is typeof c & { project: Project } => Boolean(c.project));

const topWins = achievementGroups.flatMap((g) => g.items).filter((a) => a.featured).slice(0, 3);
const quote = testimonials.find((t) => t.name === "Melvin Martinez") ?? testimonials[0];

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
      {project.preview && (
        <a href={project.preview} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-medium text-accent link-underline">
          Live demo <ArrowUpRight aria-hidden className="size-4" />
        </a>
      )}
      <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 link-underline">
        <GithubLogo aria-hidden className="size-4" /> Source
      </a>
      <Link href={`/projects#${project.slug}`} className="inline-flex items-center gap-1.5 text-muted link-underline">
        Details
      </Link>
    </div>
  );
}

export default function HomePage() {
  const [lead, ...others] = studies;

  return (
    <>
      {/* 1. Hero: claim + illustration, side by side (no overlap) */}
      <section aria-labelledby="hero-title" className="container-page relative grid items-center gap-8 overflow-x-clip pb-12 pt-12 md:min-h-[calc(100dvh-4rem)] md:grid-cols-12 md:pt-16">
        <HeroIntro className="md:col-span-6 lg:col-span-6">
          <h1 id="hero-title" className="max-w-[14ch] text-5xl font-semibold leading-[1.02] md:text-6xl lg:text-7xl">
            I build the systems teams run on.
          </h1>
          <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-muted">
            I&apos;m Keene, a Management Engineering student at Ateneo who ships software, models, and AI workflows for real operations.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/projects" className="btn btn-primary">
              View projects <ArrowRight aria-hidden className="size-4" />
            </Link>
            <Link href="/contact" className="btn btn-secondary">
              Get in touch
            </Link>
          </div>
        </HeroIntro>
        <HeroSystem className="pointer-events-none mx-auto aspect-square w-full max-w-[34rem] md:col-span-6" />
      </section>

      {/* 2. Proof in numbers */}
      <section aria-labelledby="metrics-title" className="container-page pb-24">
        <h2 id="metrics-title" className="sr-only">Track record</h2>
        <Reveal>
          <dl className="grid grid-cols-2 border-y border-line md:grid-cols-4 md:divide-x md:divide-line">
            {metrics.map((m, i) => (
              <div
                key={m.label}
                className={`py-8 md:px-8 md:first:pl-0 ${i % 2 === 1 ? "border-l border-line pl-6 md:border-l-0" : ""} ${i < 2 ? "border-b border-line md:border-b-0" : ""}`}
              >
                <dt className="text-sm text-muted">{m.label}</dt>
                <dd className="tabular mt-2 text-4xl font-semibold tracking-tight md:text-5xl">{m.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* 3. What I do: the three nodes from the hero, explained */}
      <section aria-labelledby="do-title" className="container-page pb-28">
        <Reveal className="max-w-2xl">
          <h2 id="do-title" className="text-3xl font-semibold md:text-5xl">One person across three disciplines.</h2>
          <p className="mt-4 max-w-[55ch] text-lg leading-relaxed text-muted">
            Most problems sit between engineering and operations. I work on both sides, and use AI to move faster.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-12 md:gap-5">
          {disciplines.map((d, i) => {
            const skills = skillGroups.find((g) => g.title === d.skillGroup)?.items ?? [];
            const big = i === 0;
            return (
              <Reveal
                key={d.id}
                delay={i * 0.08}
                className={big ? "md:col-span-7 md:row-span-2" : "md:col-span-5"}
              >
                <article className={`surface flex h-full flex-col p-6 md:p-8 ${big ? "bg-accent-soft" : ""}`}>
                  <p className="font-mono text-sm text-accent">{d.id}</p>
                  <h3 className={`mt-3 font-semibold ${big ? "text-3xl" : "text-2xl"}`}>{d.title}</h3>
                  <p className="mt-3 max-w-[48ch] leading-relaxed text-muted">{d.body}</p>
                  <ul className="mt-auto flex flex-wrap gap-2 pt-8" aria-label={`${d.title} skills`}>
                    {skills.slice(0, big ? 10 : 5).map((s) => (
                      <li key={s} className="rounded-full border border-line bg-surface px-3 py-1 text-sm text-muted">
                        {s}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* 4. Selected work as case studies */}
      <section aria-labelledby="work-title" className="container-page pb-28">
        <Reveal className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 id="work-title" className="text-3xl font-semibold md:text-5xl">Built for real users.</h2>
            <p className="mt-4 max-w-[55ch] text-lg leading-relaxed text-muted">
              Student organizations, hackathon judges, and friends splitting a bill. Here is what the work did.
            </p>
          </div>
          <Link href="/projects" className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-accent link-underline">
            All {projects.length} projects <ArrowRight aria-hidden className="size-4" />
          </Link>
        </Reveal>

        {lead && (
          <Reveal>
            <article className="surface grid overflow-hidden md:grid-cols-12">
              <div className="relative grid min-h-56 place-items-center border-b border-line bg-surface-2 md:col-span-5 md:border-b-0 md:border-r">
                <Parallax speed={50} className="size-40 text-subtle md:size-56">
                  <CategoryGlyph category={lead.project.category} className="size-full" />
                </Parallax>
              </div>
              <div className="flex flex-col p-6 md:col-span-7 md:p-10">
                <p className="font-mono text-sm text-subtle">{lead.project.year} · {lead.project.category}</p>
                <h3 className="mt-3 text-3xl font-semibold md:text-4xl">{lead.project.title}</h3>
                <p className="mt-4 max-w-[55ch] leading-relaxed text-muted">{lead.project.description}</p>
                <p className="mt-8 flex items-baseline gap-3 border-t border-line pt-6">
                  <span className="tabular text-5xl font-semibold tracking-tight text-accent">{lead.impact}</span>
                  <span className="text-muted">{lead.impactLabel}</span>
                </p>
                <div className="mt-6">
                  <ProjectLinks project={lead.project} />
                </div>
              </div>
            </article>
          </Reveal>
        )}

        <ul className="mt-5 grid gap-4 md:grid-cols-3 md:gap-5">
          {others.map((c, i) => (
            <Reveal as="li" key={c.slug} delay={i * 0.08}>
              <article className="surface group flex h-full flex-col p-6">
                <div className="flex items-start justify-between gap-4">
                  <p className="font-mono text-sm text-subtle">{c.project.year} · {c.project.category}</p>
                  <CategoryGlyph category={c.project.category} className="size-12 shrink-0 text-subtle transition-colors group-hover:text-fg" />
                </div>
                <h3 className="mt-2 text-xl font-semibold">{c.project.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{c.project.description}</p>
                <p className="mt-6 flex items-baseline gap-2 border-t border-line pt-5">
                  <span className="tabular text-3xl font-semibold tracking-tight">{c.impact}</span>
                  <span className="text-sm text-muted">{c.impactLabel}</span>
                </p>
                <div className="mt-auto pt-5">
                  <ProjectLinks project={c.project} />
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* 5. Social proof: a manager's words + top wins */}
      <section aria-labelledby="proof-title" className="container-page pb-28">
        <h2 id="proof-title" className="sr-only">What others say</h2>
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <Reveal className="md:col-span-7">
            <figure>
              <blockquote className="text-2xl font-medium leading-snug tracking-tight md:text-4xl">
                &ldquo;{quote.excerpt}&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-muted">
                <span className="font-medium text-fg">{quote.name}</span>, {quote.title}. {quote.relationship}.
              </figcaption>
              <Link href="/testimonials" className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent link-underline">
                Read recommendations <ArrowRight aria-hidden className="size-4" />
              </Link>
            </figure>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-5">
            <h3 className="text-sm font-medium text-subtle">Recent wins</h3>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {topWins.map((w) => (
                <li key={w.title} className="py-5">
                  <p className="font-semibold text-accent">{w.placement}</p>
                  <p className="mt-1 font-medium">{w.title}</p>
                  <p className="mt-1 font-mono text-sm text-subtle">
                    <time dateTime={w.dateTime}>{w.date}</time>
                  </p>
                </li>
              ))}
            </ul>
            <Link href="/achievements" className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium link-underline">
              All achievements <ArrowRight aria-hidden className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 6. Currently */}
      <section aria-labelledby="now-title" className="container-page pb-24">
        <Reveal>
          <div className="surface grid gap-6 p-6 md:grid-cols-12 md:items-center md:p-8">
            <div className="md:col-span-8">
              <h2 id="now-title" className="text-sm font-medium text-subtle">Currently</h2>
              <p className="mt-2 text-xl font-semibold md:text-2xl">
                {now.role}, {now.company}
              </p>
              <p className="mt-2 max-w-[60ch] text-muted">{now.focus}</p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <p className="font-mono text-sm text-subtle">{now.period}</p>
              <Link href="/experience" className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium link-underline">
                Full experience <ArrowRight aria-hidden className="size-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 7. Stack marquee (the only one sitewide) */}
      <section aria-labelledby="stack-title" className="pb-24">
        <h2 id="stack-title" className="sr-only">Tools and skills</h2>
        <div className="group relative overflow-hidden border-y border-line py-6 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <ul className="flex w-max animate-[marquee_40s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-3 motion-reduce:px-5 motion-reduce:animate-none">
            {[...stack, ...stack].map((item, i) => (
              <li
                key={i}
                aria-hidden={i >= stack.length || undefined}
                className={`mx-6 whitespace-nowrap font-mono text-sm text-muted ${i >= stack.length ? "motion-reduce:hidden" : ""}`}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 8. Close */}
      <section aria-labelledby="cta-title" className="container-page grid items-center gap-10 pb-28 pt-8 md:grid-cols-12">
        <Reveal className="md:col-span-7">
          <h2 id="cta-title" className="max-w-[18ch] text-4xl font-semibold leading-[1.05] md:text-6xl">
            Looking for an intern who ships?
          </h2>
          <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-muted">
            I&apos;m seeking internships at fast-paced companies where code, operations, and AI can scale real impact.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/contact" className="btn btn-primary">
              Get in touch
            </Link>
            <a href={site.resume} download className="btn btn-secondary">
              Download résumé
            </a>
            <Link href="/services" className="ml-2 inline-flex items-center gap-1.5 text-sm font-medium link-underline">
              For recruiters <ArrowUpRight aria-hidden className="size-4" />
            </Link>
          </div>
        </Reveal>
        <Parallax rotate={60} speed={60} className="pointer-events-none mx-auto hidden aspect-square w-full max-w-[22rem] md:col-span-5 md:block">
          <Orbit className="size-full" />
        </Parallax>
      </section>
    </>
  );
}
