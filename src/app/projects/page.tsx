import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import ProjectFilter from "@/components/projects/ProjectFilter";
import { eras, projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Web apps, AI tools, Discord bots, and utilities built by Keene Xander Brigado from 2021 to today, with source code and live demos.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        title="Projects"
        intro={`${projects.length} projects from 2021 to today: client Discord bots, student organization platforms, hackathon builds, and tools I made because nothing else got the UX right.`}
      />

      <section aria-labelledby="all-projects" className="container-page pb-24">
        <h2 id="all-projects" className="sr-only">
          All projects
        </h2>
        <ProjectFilter projects={projects} />
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
