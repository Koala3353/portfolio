import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import {
  achievementGroups,
  achievementStats,
  featuredAchievements,
  type Achievement,
} from "@/data/achievements";

export const metadata: Metadata = {
  title: "Achievements",
  description:
    "Case competition, robotics, hackathon, and academic results, from national semifinals to the FLL Open European Championship.",
};

function Meta({ a }: { a: Achievement }) {
  return (
    <p className="font-mono text-sm text-subtle">
      <time dateTime={a.dateTime}>{a.date}</time>
      {a.location && <> · {a.location}</>}
      {a.role && <> · {a.role}</>}
    </p>
  );
}

export default function AchievementsPage() {
  const [lead, ...rest] = featuredAchievements;

  return (
    <>
      <PageHeader
        title="Achievements"
        intro="A track record of competing at a high level, from national case competitions to international robotics championships."
      >
        <dl className="grid grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-4">
          {achievementStats.map((s) => (
            <div key={s.label} className="border-t border-line pt-3">
              <dt className="text-sm text-muted">{s.label}</dt>
              <dd className="tabular mt-1 text-2xl font-semibold">{s.value}</dd>
            </div>
          ))}
        </dl>
      </PageHeader>

      <section aria-labelledby="highlights" className="container-page pb-20">
        <h2 id="highlights" className="mb-6 text-2xl font-semibold md:text-3xl">
          Highlights
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2">
          {lead && (
            <Reveal as="article" className="surface flex flex-col justify-between p-8 md:col-span-2 md:row-span-2 md:p-10">
              <div>
                <p className="text-sm font-medium text-accent">{lead.placement}</p>
                <h3 className="mt-3 max-w-[20ch] text-3xl font-semibold leading-tight md:text-4xl">
                  {lead.title}
                </h3>
                <p className="mt-5 max-w-[55ch] leading-relaxed text-muted">{lead.description}</p>
              </div>
              <div className="mt-8">
                <Meta a={lead} />
              </div>
            </Reveal>
          )}
          {rest.map((a, i) => (
            <Reveal key={a.title} as="article" delay={0.08 * (i + 1)} className="surface flex flex-col p-6">
              <p className="text-sm font-medium text-accent">{a.placement}</p>
              <h3 className="mt-2 text-xl font-semibold leading-snug">{a.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{a.description}</p>
              <div className="mt-auto pt-5">
                <Meta a={a} />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {achievementGroups.map((group) => {
        const items = group.items.filter((a) => !a.featured);
        return (
          <section
            key={group.id}
            aria-labelledby={`group-${group.id}`}
            className="container-page grid grid-cols-1 gap-6 border-t border-line py-14 md:grid-cols-[1fr_2fr] md:gap-12"
          >
            <Reveal>
              <h2 id={`group-${group.id}`} className="text-2xl font-semibold">
                {group.title}
              </h2>
              <p className="mt-2 max-w-[35ch] leading-relaxed text-muted">{group.subtitle}</p>
            </Reveal>
            <ul className="grid grid-cols-1 gap-8">
              {items.map((a) => (
                <Reveal as="li" key={a.title} className="grid grid-cols-1 gap-1 sm:grid-cols-[6rem_1fr] sm:gap-6">
                  <time dateTime={a.dateTime} className="font-mono text-sm text-subtle sm:pt-1">
                    {a.date}
                  </time>
                  <div>
                    <h3 className="text-lg font-semibold leading-snug">{a.title}</h3>
                    <p className="mt-1 text-sm text-fg">
                      <span className="font-medium">{a.placement}</span>
                      {(a.org || a.role || a.location) && (
                        <span className="text-muted">
                          {" "}
                          · {[a.org, a.location, a.role].filter(Boolean).join(" · ")}
                        </span>
                      )}
                    </p>
                    <p className="mt-2 max-w-[65ch] text-sm leading-relaxed text-muted">{a.description}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </section>
        );
      })}
    </>
  );
}
