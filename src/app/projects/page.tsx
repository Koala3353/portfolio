import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import EarlierWork from "@/components/projects/EarlierWork";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectFilter from "@/components/projects/ProjectFilter";
import { eras, featuredProjects, projects } from "@/data/projects";

const CUTOFF = "2024";
const recent = projects.filter((p) => p.year >= CUTOFF);
const earlier = projects.filter((p) => p.year < CUTOFF);
const earlierYears = `${earlier.at(-1)?.year}-${earlier[0]?.year}`;

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Web apps, AI tools, Discord bots, and utilities built by Keene Xander Brigado from 2021 to today, with source code and live demos.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader seed={4}
        title="Projects"
        intro={`The ${featuredProjects.length} I'd show first, then everything since ${CUTOFF}. My Discord bot work from ${earlierYears.replace("-", " to ")} is at the bottom.`}
      />

      <section aria-labelledby="start-here" className="container-page pb-20">
        <h2 id="start-here" className="text-2xl font-semibold md:text-3xl">
          Start here
        </h2>
        <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 0.05}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </ul>
      </section>

      <section aria-labelledby="all-projects" className="container-page pb-16">
        <h2 id="all-projects" className="mb-8 text-2xl font-semibold md:text-3xl">
          Everything since {CUTOFF}
        </h2>
        <ProjectFilter projects={recent} />
      </section>

      <section aria-label="Earlier work" className="container-page pb-24">
        <EarlierWork projects={earlier} years={earlierYears} />
      </section>

      <section aria-labelledby="timeline-title" className="container-page pb-28">
        <Reveal>
          <h2 id="timeline-title" className="text-2xl font-semibold md:text-3xl">
            How the work changed
          </h2>
        </Reveal>
        <ol className="mt-8 divide-y divide-line border-y border-line">
          {eras.map((e) => {
            const count = projects.filter((p) => p.year === e.year).length;
            return (
              <Reveal as="li" key={e.year} className="grid gap-2 py-6 md:grid-cols-12 md:gap-8">
                <p className="font-mono text-sm text-subtle md:col-span-3">
                  <time>{e.year}</time>
                  {e.label && <span className="block">{e.label}</span>}
                </p>
                <p className="max-w-[65ch] leading-relaxed text-muted md:col-span-7">{e.subtitle}</p>
                <p className="tabular font-mono text-sm text-subtle md:col-span-2 md:text-right">
                  {count} {count === 1 ? "project" : "projects"}
                </p>
              </Reveal>
            );
          })}
        </ol>
        <p className="mt-10 text-muted">
          Want the context behind these?{" "}
          <Link href="/experience" className="text-fg link-underline">
            See my experience
          </Link>
          .
        </p>
      </section>
    </>
  );
}
