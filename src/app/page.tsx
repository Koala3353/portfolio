import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, GithubLogo } from "@phosphor-icons/react/dist/ssr";
import Reveal from "@/components/Reveal";
import HomeSwitch from "@/components/home/HomeSwitch";
import ClassicHero from "@/components/home/ClassicHero";
import Kobi2D from "@/components/desk/Kobi2D";
import CategoryGlyph from "@/components/art/CategoryGlyph";
import { site } from "@/lib/site";
import { metrics, stack, now, caseStudies, paths } from "@/data/home";
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

/** Sticky-note colours, the same pads that hang on the 3D desk's wall. */
const stickies = ["#ffe27a", "#ffb3c7", "#a7e3c4", "#bfdcff"];
const tilts = [-2, 1.5, -1, 2];
const cups = ["#e8b04a", "#c9ccd6", "#c07a45"];

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
      {project.preview && (
        <a
          href={project.preview}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-medium text-accent link-underline"
        >
          Live demo <ArrowUpRight aria-hidden className="size-4" />
        </a>
      )}
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 link-underline"
        >
          <GithubLogo aria-hidden className="size-4" /> Source
        </a>
      )}
      <Link href={`/projects#${project.slug}`} className="inline-flex items-center gap-1.5 text-muted link-underline">
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

      {/* Proof in numbers, as sticky notes */}
      <section aria-labelledby="metrics-title" className="container-page pb-24">
        <h2 id="metrics-title" className="sr-only">
          Track record
        </h2>
        <ul className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <Reveal as="li" key={m.label} delay={i * 0.06}>
              <div className="sticky-note" style={{ background: stickies[i], rotate: `${tilts[i]}deg` }}>
                <p className="tabular font-kobi text-4xl font-semibold lg:text-5xl">{m.value}</p>
                <p className="mt-2 text-sm leading-snug">{m.label}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* The three paths, each with proof */}
      <section aria-labelledby="paths-title" className="container-page pb-28">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-sm text-subtle">Tech · Consulting · FMCG</p>
          <h2 id="paths-title" className="mt-3 text-3xl font-semibold md:text-5xl">
            Three paths, one way of working.
          </h2>
          <p className="mt-4 max-w-[55ch] text-lg leading-relaxed text-muted">
            I figure out how a business actually runs, recommend what should change, then build it. That works on a
            tech team, a consulting team, or inside an operations-heavy business.
          </p>
        </Reveal>

        <ul className="ruled-list mt-12">
          {paths.map((p, i) => (
            <Reveal
              as="li"
              key={p.id}
              delay={i * 0.06}
              className="grid gap-6 py-8 md:grid-cols-2 md:gap-x-10 lg:grid-cols-12 lg:py-10"
            >
              <div className="md:col-span-2 lg:col-span-4">
                <h3 className="font-kobi text-4xl font-semibold lg:text-5xl">{p.title}</h3>
                <p className="mt-2 font-mono text-sm text-subtle">{p.kicker}</p>
              </div>
              <div className="lg:col-span-4">
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
                          className="group flex items-center justify-between gap-4 py-3"
                        >
                          <span className="font-medium transition-colors group-hover:text-accent">{w.title}</span>
                          <span className="flex items-center gap-2 font-mono text-sm text-subtle">
                            {w.year}
                            <ArrowUpRight
                              aria-hidden
                              className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            />
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
          className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-accent link-underline"
        >
          What I can do for your team <ArrowRight aria-hidden className="size-4" />
        </Link>
      </section>

      {/* Selected work, the lead one on a little laptop */}
      <section aria-labelledby="work-title" className="container-page pb-28">
        <Reveal className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 id="work-title" className="text-3xl font-semibold md:text-5xl">
              Built for real users.
            </h2>
            <p className="mt-4 max-w-[55ch] text-lg leading-relaxed text-muted">
              Live tools for student organizations, a market-entry model, and everyday money apps.
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-accent link-underline"
          >
            All {projects.length} projects <ArrowRight aria-hidden className="size-4" />
          </Link>
        </Reveal>

        {lead && (
          <Reveal>
            <article className="surface grid overflow-hidden md:grid-cols-12">
              <div className="mini-laptop md:col-span-5" aria-hidden="true">
                <div className="mini-laptop-screen">
                  <CategoryGlyph category={lead.project.category} className="size-24 md:size-32" />
                  <span className="font-mono text-xs">{lead.project.title}</span>
                </div>
                <div className="mini-laptop-base" />
              </div>
              <div className="flex flex-col p-6 md:col-span-7 md:p-10">
                <p className="font-mono text-sm text-subtle">
                  {lead.project.year} · {lead.project.category}
                </p>
                <h3 className="mt-3 text-3xl font-semibold md:text-4xl">{lead.project.title}</h3>
                <p className="mt-4 max-w-[55ch] leading-relaxed text-muted">{lead.project.description}</p>
                {lead.impact && (
                  <p className="mt-8 flex items-baseline gap-3 border-t border-line pt-6">
                    <span className="tabular text-5xl font-semibold tracking-tight text-accent">{lead.impact}</span>
                    <span className="text-muted">{lead.impactLabel}</span>
                  </p>
                )}
                <div className="mt-auto pt-8">
                  <ProjectLinks project={lead.project} />
                </div>
              </div>
            </article>
          </Reveal>
        )}

        <ul className="mt-5 grid gap-4 md:grid-cols-2 md:gap-5">
          {others.map((c, i) => (
            <Reveal as="li" key={c.slug} delay={i * 0.08}>
              <article className="surface group flex h-full flex-col p-6">
                <div className="flex items-start justify-between gap-4">
                  <p className="font-mono text-sm text-subtle">
                    {c.project.year} · {c.project.category}
                  </p>
                  <CategoryGlyph
                    category={c.project.category}
                    className="size-12 shrink-0 text-subtle transition-colors group-hover:text-fg"
                  />
                </div>
                <h3 className="mt-2 text-xl font-semibold">{c.project.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{c.project.description}</p>
                {c.impact && (
                  <p className="mt-6 flex items-baseline gap-2 border-t border-line pt-5">
                    <span className="tabular text-3xl font-semibold tracking-tight">{c.impact}</span>
                    <span className="text-sm text-muted">{c.impactLabel}</span>
                  </p>
                )}
                <div className="mt-auto pt-5">
                  <ProjectLinks project={c.project} />
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Social proof: a note taped up, and the trophy shelf */}
      <section aria-labelledby="proof-title" className="container-page pb-28">
        <h2 id="proof-title" className="sr-only">
          What others say
        </h2>
        <div className="grid gap-12 md:grid-cols-12 md:items-start">
          <Reveal className="md:col-span-7">
            <figure className="paper-card">
              <span className="paper-tape" aria-hidden="true" />
              <blockquote className="font-kobi text-2xl font-medium leading-snug md:text-3xl">
                &ldquo;{quote.excerpt}&rdquo;
              </blockquote>
              <figcaption className="paper-muted mt-6">
                <span className="font-semibold text-[#20222b]">{quote.name}</span>, {quote.title}.{" "}
                {quote.relationship}.
              </figcaption>
              <Link href="/testimonials" className="paper-link mt-5 inline-flex items-center gap-1.5 text-sm font-medium">
                Read recommendations <ArrowRight aria-hidden className="size-4" />
              </Link>
            </figure>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-5">
            <h3 className="text-sm font-medium text-subtle">On the trophy shelf</h3>
            <ul className="trophy-shelf mt-4">
              {topWins.map((w, i) => (
                <li key={w.title} className="trophy-row">
                  <svg viewBox="0 0 24 24" className="size-7 shrink-0" fill={cups[i]} aria-hidden="true">
                    <path d="M7 3h10v3h3v2a4 4 0 0 1-4 4h-.3A5 5 0 0 1 13 14.9V18h3v3H8v-3h3v-3.1A5 5 0 0 1 8.3 12H8a4 4 0 0 1-4-4V6h3zm0 5V8H6a2 2 0 0 0 1 1.7zm10 0v1.7A2 2 0 0 0 18 8z" />
                  </svg>
                  <span>
                    <span className="block font-semibold text-accent">{w.placement}</span>
                    <span className="block font-medium">{w.title}</span>
                    <time dateTime={w.dateTime} className="block font-mono text-sm text-subtle">
                      {w.date}
                    </time>
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href="/achievements"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium link-underline"
            >
              All achievements <ArrowRight aria-hidden className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Currently, as a notebook page */}
      <section aria-labelledby="now-title" className="container-page pb-24">
        <Reveal>
          <div className="notebook-page grid gap-6 md:grid-cols-12 md:items-center">
            <div className="md:col-span-8">
              <h2 id="now-title" className="paper-muted font-mono text-sm">
                Currently
              </h2>
              <p className="mt-2 font-kobi text-2xl font-semibold md:text-3xl">
                {now.role}, {now.company}
              </p>
              <p className="mt-2 max-w-[60ch]">{now.focus}</p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <p className="paper-muted font-mono text-sm">{now.period}</p>
              <Link href="/experience" className="paper-link mt-3 inline-flex items-center gap-1.5 text-sm font-medium">
                Full experience <ArrowRight aria-hidden className="size-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Stack marquee (the only one sitewide) */}
      <section aria-labelledby="stack-title" className="pb-24">
        <h2 id="stack-title" className="sr-only">
          Tools and skills
        </h2>
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

      {/* Close */}
      <section
        aria-labelledby="cta-title"
        className="container-page grid items-center gap-10 pb-28 pt-8 md:grid-cols-12"
      >
        <Reveal className="md:col-span-7">
          <h2 id="cta-title" className="max-w-[18ch] text-4xl font-semibold leading-[1.05] md:text-6xl">
            Looking for an intern who ships?
          </h2>
          <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-muted">
            I&apos;m open to internships in tech, consulting, and FMCG, anywhere a messy process needs someone to
            diagnose it and then build the fix.
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
        <div className="mx-auto hidden w-full max-w-[16rem] md:col-span-5 md:block" aria-hidden="true">
          <Kobi2D variant="peek" className="w-full" />
          <div className="cta-ledge" />
        </div>
      </section>
    </>
  );
}

export default function HomePage() {
  return <HomeSwitch classic={<ClassicHome />} />;
}
