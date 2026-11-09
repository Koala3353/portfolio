"use client";

import Link from "next/link";
import { ArrowRight, Cube } from "@phosphor-icons/react/dist/ssr";
import Kobi2D from "@/components/desk/Kobi2D";
import { fredoka } from "@/components/desk/fonts";
import { useManilaClock } from "@/components/desk/hooks";
import { setHomeView, useDeskCrashed, useWebGL } from "@/components/desk/homeMode";
import { proofStrip } from "@/data/home";
import { lookingFor } from "@/data/services";
import { site } from "@/lib/site";

/** The top of the regular home: who Keene is, who trusted him with real work, and how to reach him. */
export default function ClassicHero() {
  const clock = useManilaClock();
  const webgl = useWebGL();
  const crashed = useDeskCrashed();

  return (
    <section aria-labelledby="home-title" className={`classic-hero ${fredoka.variable}`}>
      <div className="container-page grid items-center gap-12 pb-16 pt-12 md:grid-cols-12 md:pb-24 md:pt-20">
        <div className="md:col-span-7">
          <p className="classic-clock font-mono">
            <span className="classic-lamp" aria-hidden="true" /> Manila, Philippines{" "}
            <time suppressHydrationWarning>{clock}</time>
          </p>
          <h1 id="home-title" className="classic-title">
            Keene Brigado
          </h1>
          <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-muted md:text-xl">
            Management Engineering at Ateneo. I diagnose how a business runs, then build the systems that fix it.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/contact" className="btn btn-primary">
              Get in touch
            </Link>
            <a href={site.resume} download className="btn btn-secondary">
              Download résumé
            </a>
          </div>

          <div className="mt-10 max-w-[34rem]">
            <p className="font-mono text-sm text-subtle">Recent work</p>
            <ul className="classic-proof mt-3">
              {proofStrip.map((p) => (
                <li key={p.name}>
                  <span className="font-semibold text-fg">{p.name}</span>
                  <span className="text-muted">{p.detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {webgl && !crashed ? (
            <button type="button" className="classic-desk-link group" onClick={() => setHomeView("desk")}>
              <span className="classic-desk-icon" aria-hidden="true">
                <Cube className="size-6" weight="duotone" />
              </span>
              <span className="min-w-0 flex-1 text-left">
                <span className="block font-semibold text-fg">Explore the 3D desk</span>
                <span className="block text-sm text-muted">An interactive version of this site, built with three.js</span>
              </span>
              <ArrowRight
                aria-hidden
                className="size-5 shrink-0 text-subtle transition-transform group-hover:translate-x-1 group-hover:text-accent"
              />
            </button>
          ) : (
            <p className="classic-note" role="note">
              {crashed
                ? "The 3D desk didn't load this time. Everything is on this page too."
                : "This browser can't draw the 3D desk. Everything is on this page too."}
            </p>
          )}
        </div>

        <div className="classic-stage md:col-span-5" aria-hidden="true">
          <Kobi2D variant="peek" className="classic-kobi" />
          <div className="classic-card">
            <p className="classic-card-head font-mono">Open to</p>
            <ul>
              {lookingFor.areas.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            <p className="classic-card-foot">Ateneo de Manila · BS Management Engineering</p>
          </div>
        </div>
      </div>
      <p className="sr-only">{lookingFor.headline}</p>
    </section>
  );
}
