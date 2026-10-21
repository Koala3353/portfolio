"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import Kobi2D from "@/components/desk/Kobi2D";
import { fredoka } from "@/components/desk/fonts";
import { useManilaClock, useTypewriter } from "@/components/desk/hooks";
import { setHomeView, useDeskCrashed, useWebGL } from "@/components/desk/homeMode";
import { lookingFor } from "@/data/services";
import { site } from "@/lib/site";

const lines = [
  "Hi, I'm Kobi. This is the regular version of Keene's desk.",
  "Same content, no 3D. Scroll down for the quick tour.",
  "Keene's open to tech, consulting, and FMCG internships.",
  "The résumé is one click away. I checked.",
];

/** The top of the regular home: the desk, flattened onto an index card. */
export default function ClassicHero() {
  const reduce = useReducedMotion() ?? false;
  const clock = useManilaClock();
  const webgl = useWebGL();
  const crashed = useDeskCrashed();
  const [i, setI] = useState(0);
  const bubble = useTypewriter(lines[i], reduce);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % lines.length), 6500);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <section aria-labelledby="home-title" className={`classic-hero ${fredoka.variable}`}>
      <div className="container-page grid items-center gap-12 pb-16 pt-12 md:grid-cols-12 md:pb-24 md:pt-20">
        <div className="md:col-span-7">
          <p className="classic-clock font-mono">
            <span className="classic-lamp" aria-hidden="true" /> Keene&apos;s desk · Manila{" "}
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
          {webgl && !crashed ? (
            <button type="button" className="classic-desk-link" onClick={() => setHomeView("desk")}>
              <span aria-hidden="true">◐</span> Open the 3D desk instead
            </button>
          ) : (
            <p className="classic-note" role="note">
              {crashed
                ? "The 3D desk didn't load this time, so you're on the regular version. Everything's here."
                : "This browser can't draw the 3D desk, so you're on the regular version. Everything's here."}
            </p>
          )}
        </div>

        <div className="classic-stage md:col-span-5" aria-hidden="true">
          <div className="classic-bubble">{bubble || " "}</div>
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
      {/* Screen readers get Kobi's lines without the typing. */}
      <p className="sr-only">{lookingFor.headline}</p>
    </section>
  );
}
