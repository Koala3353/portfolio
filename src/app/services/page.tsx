import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import CopyEmailButton from "@/components/services/CopyEmailButton";
import { site } from "@/lib/site";
import { lookingFor, quickFacts, reasons, recruiterSummary, services } from "@/data/services";

export const metadata: Metadata = {
  title: "For recruiters",
  description:
    "A 30-second overview of Keene Brigado: roles sought, what he brings in full-stack development, operations, and AI workflows, plus résumé and contact.",
};

function Actions() {
  return (
    <div className="flex flex-wrap gap-3">
      <a href={site.resume} download className="btn btn-primary">
        <DownloadSimple aria-hidden />
        Download résumé
      </a>
      <Link href="/contact" className="btn btn-secondary group">
        Get in touch
        <ArrowRight className="transition-transform group-hover:translate-x-0.5" aria-hidden />
      </Link>
      <CopyEmailButton email={site.email} />
    </div>
  );
}

export default function ServicesPage() {
  const [lead, ...others] = services;

  return (
    <>
      <PageHeader seed={7} title="Code, operations, and AI in one hire" intro={recruiterSummary}>
        <Actions />
      </PageHeader>

      {/* Looking for + quick facts: split */}
      <section aria-labelledby="looking-for" className="container-page grid grid-cols-1 gap-10 border-t border-line py-14 md:grid-cols-2 md:gap-16">
        <Reveal>
          <h2 id="looking-for" className="text-2xl font-semibold">
            What I&apos;m looking for
          </h2>
          <p className="mt-3 max-w-[45ch] leading-relaxed text-muted">{lookingFor.headline}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {lookingFor.areas.map((a) => (
              <li key={a} className="rounded-full border border-line px-3 py-1 text-sm text-fg">
                {a}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-2xl font-semibold">Quick facts</h2>
          <dl className="mt-5 grid grid-cols-2 gap-x-8 gap-y-6">
            {quickFacts.map((f) => (
              <div key={f.label}>
                <dd className="tabular text-3xl font-semibold">{f.value}</dd>
                <dt className="mt-1 text-sm text-muted">{f.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* What I bring: asymmetric, one large + two stacked */}
      <section aria-labelledby="bring" className="container-page border-t border-line py-14">
        <h2 id="bring" className="mb-8 text-2xl font-semibold md:text-3xl">
          What I bring
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
          <Reveal as="article" className="surface p-8 md:col-span-3 md:row-span-2 md:p-10">
            <h3 className="text-2xl font-semibold">{lead.title}</h3>
            <p className="mt-4 max-w-[55ch] leading-relaxed text-muted">{lead.description}</p>
            <ul className="mt-6 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
              {lead.highlights.map((h) => (
                <li key={h} className="border-t border-line pt-2 text-fg">
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>
          {others.map((s, i) => (
            <Reveal key={s.title} as="article" delay={0.08 * (i + 1)} className="surface p-6 md:col-span-2">
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.description}</p>
              <p className="mt-4 font-mono text-xs leading-relaxed text-subtle">{s.highlights.join(" · ")}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Why work with me: list */}
      <section aria-labelledby="why" className="container-page grid grid-cols-1 gap-8 border-t border-line py-14 md:grid-cols-[1fr_2fr] md:gap-12">
        <h2 id="why" className="text-2xl font-semibold">
          Why work with me
        </h2>
        <ul className="grid grid-cols-1 gap-8">
          {reasons.map((r) => (
            <Reveal as="li" key={r.title}>
              <h3 className="text-lg font-semibold">{r.title}</h3>
              <p className="mt-1 max-w-[60ch] leading-relaxed text-muted">{r.description}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section aria-labelledby="next" className="container-page border-t border-line py-14">
        <Reveal>
          <h2 id="next" className="text-2xl font-semibold md:text-3xl">
            Let&apos;s talk
          </h2>
          <p className="mb-6 mt-2 max-w-[55ch] leading-relaxed text-muted">
            Grab my résumé or reach out directly at{" "}
            <a href={`mailto:${site.email}`} className="link-underline text-fg">
              {site.email}
            </a>
            .
          </p>
          <Actions />
        </Reveal>
      </section>
    </>
  );
}
