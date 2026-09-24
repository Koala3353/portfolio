import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import ExperienceTabs from "@/components/experience/ExperienceTabs";
import { certifications, educationEntries, experience } from "@/data/experience";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Work, consulting, and leadership roles of Keene Xander Brigado, from founding Klick n Code to building operations systems for Ritual Matcha Co.",
};

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        title="Experience"
        intro="5+ years of building, from Discord bots made at home to automation systems and consulting work for real companies. Each role sharpened a different skill."
      />

      <section aria-labelledby="roles-heading" className="container-page pb-20">
        <h2 id="roles-heading" className="sr-only">
          Roles
        </h2>
        <ExperienceTabs entries={experience} />
      </section>

      <section aria-labelledby="edu-heading" className="container-page border-t border-line py-16 md:py-20">
        <Reveal className="grid grid-cols-1 gap-8 md:grid-cols-[12rem_1fr] md:gap-10">
          <h2 id="edu-heading" className="text-2xl font-semibold">
            Education
          </h2>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {educationEntries.map((e) => (
              <li key={e.institution} className="surface p-6">
                <h3 className="font-semibold">{e.institution}</h3>
                <p className="mt-1 text-muted">{e.degree}</p>
                <p className="mt-4 font-mono text-sm text-subtle">{e.period}</p>
                {e.note && <p className="mt-2 text-sm text-accent">{e.note}</p>}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section aria-labelledby="cert-heading" className="container-page border-t border-line py-16 md:py-20">
        <Reveal className="grid grid-cols-1 gap-8 md:grid-cols-[12rem_1fr] md:gap-10">
          <h2 id="cert-heading" className="text-2xl font-semibold">
            Certifications
          </h2>
          <ul className="grid grid-cols-1 divide-y divide-line border-y border-line md:grid-cols-2 md:gap-x-10 md:divide-y-0">
            {certifications.map((c) => (
              <li key={c.name} className="py-4 md:border-b md:border-line">
                <p className="font-medium leading-snug">{c.name}</p>
                <p className="mt-1 text-sm text-muted">
                  {c.issuer} <span className="font-mono text-subtle">· {c.date}</span>
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section aria-labelledby="exp-cta" className="container-page border-t border-line py-16">
        <h2 id="exp-cta" className="text-2xl font-semibold">
          See the work behind these roles
        </h2>
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
