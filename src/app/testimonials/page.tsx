import type { Metadata } from "next";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";
import { testimonials, type Testimonial } from "@/data/testimonials";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Recommendations from a client and a direct supervisor who have seen Keene's work firsthand.",
};

function Attribution({ t }: { t: Testimonial }) {
  return (
    <footer className="text-sm">
      <p className="font-semibold text-fg">{t.name}</p>
      <p className="text-muted">
        {t.title} · {t.relationship}
      </p>
      <p className="mt-1 font-mono text-subtle">
        <time dateTime={t.dateTime}>{t.date}</time>
      </p>
    </footer>
  );
}

function FullText({ t }: { t: Testimonial }) {
  return (
    <details className="group mt-6">
      <summary className="cursor-pointer text-sm font-medium text-accent hover:text-accent-hover">
        Read full recommendation
      </summary>
      <p className="mt-4 max-w-[65ch] leading-relaxed text-muted">&ldquo;{t.quote}&rdquo;</p>
    </details>
  );
}

export default function TestimonialsPage() {
  const [first, second] = testimonials;

  return (
    <>
      <PageHeader seed={6}
        title="Testimonials"
        intro="Recommendations from clients and supervisors who have seen the work firsthand."
      />

      {/* Treatment 1: large full-width pull-quote */}
      <section aria-label={`Recommendation from ${first.name}`} className="container-page pb-16">
        <Reveal as="article" className="border-t border-line pt-10">
          <blockquote>
            <p className="max-w-[30ch] text-3xl font-semibold leading-snug md:text-4xl">
              &ldquo;{first.excerpt}&rdquo;
            </p>
          </blockquote>
          <div className="mt-8">
            <Attribution t={first} />
          </div>
          <FullText t={first} />
        </Reveal>
      </section>

      {/* Treatment 2: split, attribution left, quote in surface right */}
      <section aria-label={`Recommendation from ${second.name}`} className="container-page pb-20">
        <Reveal
          as="article"
          className="grid grid-cols-1 gap-8 border-t border-line pt-10 md:grid-cols-[1fr_2fr] md:gap-12"
        >
          <div className="order-2 md:order-1">
            <Attribution t={second} />
          </div>
          <div className="surface order-1 p-8 md:order-2 md:p-10">
            <blockquote>
              <p className="text-xl font-medium leading-relaxed md:text-2xl">&ldquo;{second.excerpt}&rdquo;</p>
            </blockquote>
            <FullText t={second} />
          </div>
        </Reveal>
      </section>

      <section aria-labelledby="more" className="container-page border-t border-line py-14">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 id="more" className="text-2xl font-semibold">
              See more on LinkedIn
            </h2>
            <p className="mt-2 max-w-[50ch] leading-relaxed text-muted">
              Read additional recommendations and endorsements on my LinkedIn profile.
            </p>
          </div>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-secondary group self-start">
            View LinkedIn recommendations
            <ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </a>
        </Reveal>
      </section>
    </>
  );
}
