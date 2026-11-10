import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, GithubLogo } from "@phosphor-icons/react/dist/ssr";
import Reveal from "@/components/Reveal";
import HomeSwitch from "@/components/home/HomeSwitch";
import ClassicHero from "@/components/home/ClassicHero";
import Kobi2D from "@/components/desk/Kobi2D";
import { basePath, site } from "@/lib/site";
import { metrics, now, caseStudies, alsoBuilt, paths } from "@/data/home";
import { projects, type Project } from "@/data/projects";
import { testimonials } from "@/data/testimonials";
import { headlineWins } from "@/data/achievements";

export const metadata: Metadata = {
  title: { absolute: site.title },
  description: site.description,
};

const studies = caseStudies.map((c) => {
  const project = projects.find((p) => p.slug === c.slug);
  if (!project) throw new Error(`Home case study "${c.slug}" does not match any project slug`);
  return { ...c, project };
});

const projectBySlug = (slug: string) => {
  const p = projects.find((x) => x.slug === slug);
  if (!p) throw new Error(`Home path project "${slug}" does not match any project slug`);
  return p;
};

const topWins = headlineWins;
const quote = testimonials.find((t) => t.name === "Melvin Martinez") ?? testimonials[0];

const also = alsoBuilt.map(projectBySlug);

function Shot({ project, priority }: { project: Project; priority?: boolean }) {
  if (!project.image) return null;
  return (
    <div className="shot">
      <Image
        src={`${basePath}${project.image}`}
        alt={`Screenshot of ${project.title}`}
        width={1600}
        height={900}
        sizes="(min-width: 768px) 50vw, 100vw"
        priority={priority}
      />
    </div>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
      {project.preview && (
        <a
          href={project.preview}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-1.5 font-medium text-accent link-underline"
        >
          Live demo <ArrowUpRight aria-hidden className="size-4" />
        </a>
      )}
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-1.5 link-underline"
        >
          <GithubLogo aria-hidden className="size-4" /> Source
        </a>
      )}
      <Link href={`/projects#${project.slug}`} className="inline-flex min-h-11 items-center gap-1.5 text-muted link-underline">
        Details
      </Link>
    </div>
  );
}

/** The regular home: the desk's content laid flat, for anyone who skips or can't load the 3D. */
function ClassicHome() {
  const [lead, ...others] = studies;

  return (
    <>
      <ClassicHero />

      {/* Selected work: real screenshots, one figure each */}
      <section aria-labelledby="work-title" className="container-page pb-24">
        <Reveal className="mb-8 flex flex-col gap-3 border-t border-line pt-8 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 id="work-title" className="text-3xl md:text-4xl">
              Selected work
            </h2>
            <p className="mt-3 max-w-[58ch] leading-relaxed text-muted">
              Booking a room at Ateneo meant checking 152 calendars, so I built one search. Also a student org&apos;s
              online store, a market-entry model, and that org&apos;s first website.
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex min-h-11 shrink-0 items-center gap-1.5 text-sm font-medium text-accent link-underline"
          >
            All {projects.length} projects <ArrowRight aria-hidden className="size-4" />
          </Link>
        </Reveal>

        {lead && (
          <Reveal>
            <article className="surface shot-card grid overflow-hidden lg:grid-cols-12">
              <div className="shot-lead min-w-0 lg:col-span-7">
                <Shot project={lead.project} priority />
              </div>
              <div className="flex min-w-0 flex-col p-6 md:p-8 lg:col-span-5">
                <p className="font-mono text-xs text-subtle">
                  {lead.project.year} · {lead.project.category}
                </p>
                <h3 className="mt-2 text-2xl font-semibold">{lead.project.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{lead.project.description}</p>
                {lead.impact && (
                  <p className="mt-6 flex items-baseline gap-3 border-t border-line pt-5">
                    <span className="mark tabular font-mono text-3xl font-semibold">{lead.impact}</span>
                    <span className="text-sm text-muted">{lead.impactLabel}</span>
                  </p>
                )}
                <div className="mt-auto pt-6">
                  <ProjectLinks project={lead.project} />
                </div>
              </div>
            </article>
          </Reveal>
        )}

        <ul className="mt-5 grid gap-5 md:grid-cols-3">
          {others.map((c, i) => (
            <Reveal as="li" key={c.slug} delay={i * 0.06}>
              <article className="surface shot-card flex h-full flex-col overflow-hidden">
                <Shot project={c.project} />
                <div className="flex flex-1 flex-col p-6">
                  <p className="font-mono text-xs text-subtle">
                    {c.project.year} · {c.project.category}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold">{c.project.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{c.project.description}</p>
                  {c.impact && (
                    <p className="mt-4 flex items-baseline gap-2">
                      <span className="tabular font-mono text-xl font-semibold">{c.impact}</span>
                      <span className="text-sm text-muted">{c.impactLabel}</span>
                    </p>
                  )}
                  <div className="mt-auto pt-4">
                    <ProjectLinks project={c.project} />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-8">
          <p className="text-sm font-medium text-subtle">Also built</p>
          <ul className="ruled-list mt-3 grid md:grid-cols-2 md:gap-x-10">
            {also.map((w) => (
              <li key={w.slug}>
                <a
                  href={w.preview ?? w.github ?? `/projects#${w.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-12 items-center justify-between gap-4 py-2"
                >
                  <span className="font-medium transition-colors group-hover:text-accent">{w.title}</span>
                  <span className="flex items-center gap-2 font-mono text-xs text-subtle">
                    {w.year} · {w.category}
                    <ArrowUpRight aria-hidden className="size-4" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Proof in numbers, each with what changed */}
      <section aria-labelledby="metrics-title" className="container-page pb-24">
        <h2 id="metrics-title" className="sr-only">
          Track record
        </h2>
        <ul className="stat-strip">
          {metrics.map((m, i) => (
            <Reveal as="li" key={m.label} delay={i * 0.05}>
              <p className="tabular font-mono text-2xl font-semibold">{m.value}</p>
              <p className="mt-2 text-sm leading-snug text-muted">{m.label}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* The three paths, each with proof */}
      <section aria-labelledby="paths-title" className="container-page pb-24">
        <Reveal className="max-w-2xl">
          <h2 id="paths-title" className="text-3xl md:text-4xl">
            What I&apos;ve done in each lane
          </h2>
          <p className="mt-3 max-w-[55ch] leading-relaxed text-muted">
            Find the one you&apos;re hiring for. Each lists what I did and what I shipped.
          </p>
        </Reveal>

        <ul className="ruled-list mt-10">
          {paths.map((p, i) => (
            <Reveal
              as="li"
              key={p.id}
              delay={i * 0.05}
              className="grid gap-6 py-8 md:grid-cols-2 md:gap-x-10 lg:grid-cols-12"
            >
              <div className="md:col-span-2 lg:col-span-3">
                <h3 className="font-display text-3xl font-medium">{p.title}</h3>
                <p className="mt-1 text-sm text-subtle">{p.kicker}</p>
              </div>
              <div className="lg:col-span-5">
                <p className="leading-relaxed text-muted">{p.body}</p>
                <ul className="mt-4 grid gap-2">
                  {p.proof.map((line) => (
                    <li key={line} className="tick">
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-4">
                <p className="text-sm font-medium text-subtle">Shipped</p>
                <ul className="mt-2 divide-y divide-line border-y border-line">
                  {p.work.map((slug) => {
                    const w = projectBySlug(slug);
                    return (
                      <li key={slug}>
                        <a
                          href={w.preview ?? `/projects#${w.slug}`}
                          {...(w.preview ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="group flex min-h-12 items-center justify-between gap-4 py-2"
                        >
                          <span className="font-medium transition-colors group-hover:text-accent">{w.title}</span>
                          <span className="flex items-center gap-2 font-mono text-xs text-subtle">
                            {w.year}
                            <ArrowUpRight aria-hidden className="size-4" />
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          ))}
        </ul>
        <Link
          href="/services"
          className="mt-6 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-accent link-underline"
        >
          What I can do for your team <ArrowRight aria-hidden className="size-4" />
        </Link>
      </section>

      {/* Social proof: one recommendation and the top placements */}
      <section aria-labelledby="proof-title" className="container-page pb-24">
        <h2 id="proof-title" className="sr-only">
          What others say
        </h2>
        <div className="grid gap-12 md:grid-cols-12 md:items-start">
          <Reveal className="md:col-span-7">
            <figure className="quote-block">
              <blockquote>&ldquo;{quote.excerpt}&rdquo;</blockquote>
              <figcaption className="mt-5 text-sm text-muted">
                <span className="font-semibold text-fg">{quote.name}</span>, {quote.title}. {quote.relationship}.
              </figcaption>
              <Link
                href="/testimonials"
                className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-accent link-underline"
              >
                Read recommendations <ArrowRight aria-hidden className="size-4" />
              </Link>
            </figure>
          </Reveal>
          <Reveal delay={0.08} className="md:col-span-5">
            <h3 className="text-sm font-medium text-subtle">Case competitions</h3>
            <ul className="ruled-list mt-3">
              {topWins.map((w) => (
                <li key={w.title} className="flex items-baseline justify-between gap-4 py-3">
                  <span>
                    <span className="block font-medium">{w.title}</span>
                    <time dateTime={w.dateTime} className="block font-mono text-xs text-subtle">
                      {w.date}
                    </time>
                  </span>
                  <span className="shrink-0 font-mono text-sm font-semibold">{w.placement}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/achievements"
              className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium link-underline"
            >
              All achievements <ArrowRight aria-hidden className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Currently */}
      <section aria-labelledby="now-title" className="container-page pb-24">
        <Reveal>
          <div className="surface grid gap-6 p-6 md:grid-cols-12 md:items-center md:p-8">
            <div className="md:col-span-8">
              <h2 id="now-title" className="hero-eyebrow !font-sans !font-normal !tracking-normal">
                <span className="hero-lamp" aria-hidden="true" /> Currently
              </h2>
              <p className="mt-3 text-xl font-semibold md:text-2xl">
                {now.role}, {now.company}
              </p>
              <p className="mt-2 max-w-[60ch] text-muted">{now.focus}</p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <p className="font-mono text-xs text-subtle">{now.period}</p>
              <Link
                href="/experience"
                className="mt-2 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-accent link-underline"
              >
                Full experience <ArrowRight aria-hidden className="size-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Close */}
      <section
        aria-labelledby="cta-title"
        className="container-page grid items-end gap-10 pb-24 md:grid-cols-12"
      >
        <Reveal className="md:col-span-8">
          <h2 id="cta-title" className="max-w-[18ch] text-4xl leading-[1.05] md:text-6xl">
            Hiring an intern for tech, consulting, or FMCG?
          </h2>
          <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-muted">
            Email is the fastest way to reach me. If you&apos;d rather start with the résumé, it&apos;s one page.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/contact" className="btn btn-primary">
              Get in touch
            </Link>
            <a href={site.resume} download className="btn btn-secondary">
              Download résumé
            </a>
            <Link href="/services" className="ml-2 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium link-underline">
              For recruiters <ArrowUpRight aria-hidden className="size-4" />
            </Link>
          </div>
        </Reveal>
        <div className="mx-auto hidden w-full max-w-[12rem] md:col-span-4 md:block" aria-hidden="true">
          <Kobi2D variant="peek" className="w-full" />
          <div className="-mt-2 h-px bg-line" />
        </div>
      </section>
    </>
  );
}

export default function HomePage() {
  return <HomeSwitch classic={<ClassicHome />} />;
}
