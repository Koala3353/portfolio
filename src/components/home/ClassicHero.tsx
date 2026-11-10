"use client";

import Link from "next/link";
import { ArrowRight, GithubLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import Kobi2D from "@/components/desk/Kobi2D";
import CopyEmailButton from "@/components/contact/CopyEmailButton";
import { useManilaClock } from "@/components/desk/hooks";
import { setHomeView, useDeskCrashed, useWebGL } from "@/components/desk/homeMode";
import { caseStudies, heroStack, ledger } from "@/data/home";
import { projects } from "@/data/projects";
import { lookingFor } from "@/data/services";
import { site } from "@/lib/site";

const topWork = caseStudies.slice(0, 3).flatMap((c) => projects.filter((p) => p.slug === c.slug));

/** The first screen: who Keene is, what he changed, what he builds with, and how to reach him. */
export default function ClassicHero() {
  const clock = useManilaClock();
  const webgl = useWebGL();
  const crashed = useDeskCrashed();

  return (
    <section aria-labelledby="home-title">
      <div className="container-page grid items-center gap-12 pb-12 pt-10 md:pt-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p className="hero-eyebrow">
            <span className="hero-lamp" aria-hidden="true" />
            <span>{lookingFor.headline}</span>
            <span className="font-mono text-xs">
              Manila <time suppressHydrationWarning>{clock}</time>
            </span>
          </p>
          <h1 id="home-title" className="hero-title">
            Keene Brigado builds the systems a business runs on
          </h1>
          <p className="mt-5 max-w-[50ch] text-lg leading-relaxed text-muted">
            Management Engineering at Ateneo. Business Systems Consultant at Ritual Matcha, a B2B matcha supplier
            serving 500+ cafés.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/contact" className="btn btn-primary">
              Get in touch
            </Link>
            <a href={site.resume} download className="btn btn-secondary">
              Download résumé
            </a>
          </div>

          <dl className="hero-spec max-w-[36rem]">
            <div>
              <dt>Work</dt>
              <dd>
                {topWork.map((w) => (
                  <a
                    key={w.slug}
                    href={w.preview ?? w.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline"
                  >
                    {w.title}
                  </a>
                ))}
              </dd>
            </div>
            <div>
              <dt>Stack</dt>
              <dd>
                {heroStack.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </dd>
            </div>
            <div>
              <dt>Reach</dt>
              <dd className="items-center">
                <span className="inline-flex items-center gap-2">
                  <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center link-underline">
                    {site.email}
                  </a>
                  <CopyEmailButton email={site.email} />
                </span>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-1.5 link-underline"
                >
                  <LinkedinLogo aria-hidden className="size-4" /> LinkedIn
                </a>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-1.5 link-underline"
                >
                  <GithubLogo aria-hidden className="size-4" /> GitHub
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div className="lg:col-span-5">
          <div className="ledger-stage">
            <Kobi2D variant="peek" className="ledger-kobi" />
            <div className="ledger">
              <div className="ledger-head">
                <h2>What I changed</h2>
                <span>before → after</span>
              </div>
              <ul>
                {ledger.map((row, i) => (
                  <li key={row.what} className="ledger-row" style={{ "--i": i } as React.CSSProperties}>
                    <span className="ledger-what">
                      {row.what}
                      <span className="ledger-where">{row.where}</span>
                    </span>
                    <span className="ledger-change">
                      <span className="ledger-before">
                        <span className="sr-only">from </span>
                        {row.before}
                      </span>
                      <span className="ledger-after">
                        <span className="sr-only">to </span>
                        {row.after}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-3 flex items-center justify-between gap-4">
              <Link href="/experience" className="desk-link">
                How each one happened <ArrowRight aria-hidden className="size-4" />
              </Link>
              {webgl && !crashed && (
                <button type="button" className="desk-link" onClick={() => setHomeView("desk")}>
                  See this as a 3D desk
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
