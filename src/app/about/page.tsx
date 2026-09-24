import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { aboutIntro, education, facts, skillGroups, story } from "@/data/about";

export const metadata: Metadata = {
  title: "About",
  description:
    "Keene Xander Brigado, Management Engineering student at Ateneo de Manila University working across code, operations, and AI.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader title="About" intro={aboutIntro} />

      <section aria-labelledby="story-heading" className="container-page pb-16 md:pb-24">
        <Reveal className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_18rem] md:gap-16">
          <div>
            <h2 id="story-heading" className="text-2xl font-semibold">
              Background
            </h2>
            <div className="mt-5 max-w-[65ch] space-y-5 leading-relaxed text-muted">
              {story.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <dl className="divide-y divide-line self-start border-y border-line">
            {facts.map((f) => (
              <div key={f.label} className="py-4">
                <dt className="font-mono text-sm text-subtle">{f.label}</dt>
                <dd className="mt-1">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      <section aria-labelledby="skills-heading" className="container-page border-t border-line py-16 md:py-24">
        <Reveal>
          <h2 id="skills-heading" className="text-2xl font-semibold">
            Skills and tools
          </h2>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {skillGroups.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.06} className="surface p-6">
              <h3 className="font-semibold">{g.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <li key={item} className="rounded-full border border-line bg-surface-2 px-3 py-1 text-sm text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      <section aria-labelledby="edu-heading" className="container-page border-t border-line py-16 md:py-24">
        <Reveal>
          <h2 id="edu-heading" className="text-2xl font-semibold">
            Education
          </h2>
        </Reveal>
        <ol className="mt-8 divide-y divide-line border-y border-line">
          {education.map((e) => (
            <Reveal as="li" key={e.school} className="grid grid-cols-1 gap-2 py-8 md:grid-cols-[12rem_1fr] md:gap-10">
              <p className="font-mono text-sm text-subtle">{e.period}</p>
              <div>
                <h3 className="text-lg font-semibold">{e.school}</h3>
                <p className="mt-1 text-muted">
                  {e.program}
                  {e.highlight && <span className="text-accent"> · {e.highlight}</span>}
                </p>
                {e.details && (
                  <ul className="mt-4 max-w-[65ch] list-disc space-y-2 pl-5 leading-relaxed text-muted marker:text-subtle">
                    {e.details.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      <section aria-labelledby="about-cta" className="container-page border-t border-line py-16">
        <h2 id="about-cta" className="text-2xl font-semibold">
          Want to learn more?
        </h2>
        <p className="mt-3 max-w-[65ch] text-muted">See the work, or reach out directly.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/projects" className="btn btn-primary">
            View projects
          </Link>
          <Link href="/contact" className="btn btn-secondary">
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
