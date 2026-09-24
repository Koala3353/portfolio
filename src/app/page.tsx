import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, GithubLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import Reveal from "@/components/Reveal";
import HeroIntro from "@/components/home/HeroIntro";
import { site } from "@/lib/site";
import { metrics, stack, now, featuredOrder } from "@/data/home";
import { projects, type Project } from "@/data/projects";

export const metadata: Metadata = {
  title: { absolute: site.title },
  description: site.description,
};

const featured = featuredOrder
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter((p): p is Project => Boolean(p));

function FeaturedCard({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <Link
      href={`/projects#${project.slug}`}
      className={`surface group flex h-full flex-col justify-between p-6 transition-colors duration-200 hover:border-accent md:p-8 ${large ? "min-h-[20rem]" : "min-h-[13rem]"}`}
    >
      <div>
        <p className="font-mono text-sm text-subtle">
          {project.year} · {project.category}
        </p>
        <h3 className={`mt-3 font-semibold ${large ? "text-3xl md:text-4xl" : "text-xl"}`}>{project.title}</h3>
        <p className={`mt-3 max-w-[55ch] leading-relaxed text-muted ${large ? "text-base md:text-lg" : "text-sm"}`}>
          {project.description}
        </p>
      </div>
      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-fg">
        Read more
        <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

export default function HomePage() {
  const [lead, ...rest] = featured;

  return (
    <>
      {/* Hero */}
      <section aria-labelledby="hero-title" className="container-page grid min-h-[calc(100dvh-4rem)] items-center gap-12 pb-16 pt-16 md:grid-cols-12 md:pt-24">
        <HeroIntro className="md:col-span-7">
          <h1 id="hero-title" className="max-w-[16ch] text-5xl font-semibold leading-[1.02] md:text-7xl">
            I build the systems teams run on.
          </h1>
          <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-muted">
            I&apos;m Keene, a Management Engineering student at Ateneo bridging code, operations, and AI.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/projects" className="btn btn-primary">
              View projects <ArrowRight aria-hidden className="size-4" />
            </Link>
            <Link href="/cv" className="btn btn-secondary">
              View résumé
            </Link>
          </div>
        </HeroIntro>

        <Reveal delay={0.2} className="md:col-span-5">
          <aside aria-label="Currently" className="surface p-6 md:p-7">
            <h2 className="text-sm font-medium text-subtle">Now</h2>
            <p className="mt-3 text-xl font-semibold">{now.role}</p>
            <p className="mt-1 text-muted">{now.company}</p>
            <p className="mt-1 font-mono text-sm text-subtle">{now.period}</p>
            <p className="mt-5 border-t border-line pt-5 text-sm leading-relaxed text-muted">{now.focus}</p>
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-5 text-sm">
              <li>
                <a href={site.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 link-underline">
                  <GithubLogo aria-hidden className="size-4" /> GitHub
                </a>
              </li>
              <li>
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 link-underline">
                  <LinkedinLogo aria-hidden className="size-4" /> LinkedIn
                </a>
              </li>
              <li>
                <Link href="/experience" className="link-underline">
                  Full experience
                </Link>
              </li>
            </ul>
          </aside>
        </Reveal>
      </section>

      {/* Metrics */}
      <section aria-labelledby="metrics-title" className="container-page pb-20">
        <h2 id="metrics-title" className="sr-only">
          Track record
        </h2>
        <Reveal>
          <dl className="grid grid-cols-2 border-y border-line md:grid-cols-4 md:divide-x md:divide-line">
            {metrics.map((m, i) => (
              <div
                key={m.label}
                className={`py-8 md:px-8 md:first:pl-0 ${i % 2 === 1 ? "pl-6 border-l border-line md:border-l-0" : ""} ${i < 2 ? "border-b border-line md:border-b-0" : ""}`}
              >
                <dt className="text-sm text-muted">{m.label}</dt>
                <dd className="tabular mt-2 text-4xl font-semibold tracking-tight md:text-5xl">{m.value}</dd>
              </div>
            ))}
          </dl>
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

      {/* Featured work */}
      <section aria-labelledby="work-title" className="container-page pb-24">
        <Reveal className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 id="work-title" className="text-3xl font-semibold md:text-5xl">
              Selected work
            </h2>
            <p className="mt-3 max-w-[55ch] leading-relaxed text-muted">
              Tools built for real users: student organizations, hackathon judges, and friends splitting a bill.
            </p>
          </div>
          <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm font-medium text-accent link-underline">
            View projects <ArrowRight aria-hidden className="size-4" />
          </Link>
        </Reveal>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-5">
          {lead && (
            <Reveal as="li" className="md:col-span-4 md:row-span-2">
              <FeaturedCard project={lead} large />
            </Reveal>
          )}
          {rest.slice(0, 1).map((p) => (
            <Reveal as="li" key={p.slug} delay={0.08} className="md:col-span-2">
              <FeaturedCard project={p} />
            </Reveal>
          ))}
          {rest.slice(1, 2).map((p) => (
            <Reveal as="li" key={p.slug} delay={0.12} className="md:col-span-2">
              <FeaturedCard project={p} />
            </Reveal>
          ))}
          {rest.slice(2).map((p) => (
            <Reveal as="li" key={p.slug} delay={0.16} className="md:col-span-6">
              <FeaturedCard project={p} />
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Recruiter strip */}
      <section aria-labelledby="recruiter-title" className="container-page pb-24">
        <Reveal className="flex flex-col gap-4 border-y border-line py-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 id="recruiter-title" className="text-xl font-semibold">
              Hiring for an internship?
            </h2>
            <p className="mt-1 text-muted">A short overview of what I work on and how I can help your team.</p>
          </div>
          <Link href="/services" className="inline-flex items-center gap-1.5 font-medium text-accent link-underline">
            For recruiters <ArrowUpRight aria-hidden className="size-4" />
          </Link>
        </Reveal>
      </section>

      {/* Closing CTA */}
      <section aria-labelledby="cta-title" className="container-page pb-28">
        <Reveal className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <h2 id="cta-title" className="max-w-[20ch] text-4xl font-semibold leading-[1.05] md:text-6xl">
              Ready to build something that matters?
            </h2>
            <p className="mt-5 max-w-[55ch] text-lg leading-relaxed text-muted">
              I&apos;m seeking internships at fast-paced companies where code, operations, and AI can scale real impact.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
            <Link href="/contact" className="btn btn-primary">
              Get in touch
            </Link>
            <Link href="/cv" className="btn btn-secondary">
              View résumé
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
