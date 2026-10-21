import { experience, formatRange, educationEntries } from "@/data/experience";
import { achievementGroups } from "@/data/achievements";
import { site } from "@/lib/site";

/** Case competitions come first in the achievements data; these are the headline wins. */
const topAwards = achievementGroups[0].items.slice(0, 3);
const work = experience.filter((e) => e.category === "work").slice(0, 4);

/** A one-page résumé preview, shared by the laptop's Résumé app and the printer. */
export default function ResumePaper() {
  return (
    <article className="os-paper" aria-label="Résumé preview">
      <p className="os-paper-name">{site.name}</p>
      <p className="os-paper-line">
        {site.email} · linkedin.com/in/keene-brigado · github.com/Koala3353
      </p>
      <h3>Education</h3>
      {educationEntries.slice(0, 1).map((e) => (
        <p key={e.institution}>
          <strong>{e.institution}</strong>, {e.degree} <span className="os-paper-date">{e.period}</span>
          <br />
          {e.note}
        </p>
      ))}
      <h3>Experience</h3>
      <ul>
        {work.map((e) => (
          <li key={`${e.org}${e.start}`}>
            <strong>{e.role}</strong>, {e.org} <span className="os-paper-date">{formatRange(e)}</span>
          </li>
        ))}
      </ul>
      <h3>Awards</h3>
      <ul>
        {topAwards.map((a) => (
          <li key={a.title}>
            <strong>{a.placement}</strong>, {a.title}
          </li>
        ))}
      </ul>
      <div className="os-paper-fade" aria-hidden="true" />
    </article>
  );
}
