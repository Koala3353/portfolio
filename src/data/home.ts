import { formatRange, latestRole } from "./experience";
import { projects } from "./projects";

export const metrics = [
  { value: String(projects.length), label: "Projects shipped" },
  { value: "5+", label: "Years building" },
  { value: "9+", label: "Competition wins" },
  { value: "10+", label: "Tools and languages" },
] as const;

export const stack = [
  "React", "Next.js", "TypeScript", "Python", "Google Apps Script",
  "Tailwind CSS", "Framer Motion", "MongoDB", "Git", "Claude Code",
  "Gemini", "Financial Modeling", "Process Optimization", "Data Analytics",
] as const;

/** Derived from the newest work role in src/data/experience.ts. */
export const now = {
  role: latestRole.role,
  company: latestRole.org,
  period: formatRange(latestRole),
  focus: latestRole.bullets[0],
};

/**
 * Home case studies, in display order (first is the lead card).
 * `impact` is optional and must restate a fact already in the project data.
 */
export const caseStudies: { slug: string; impact?: string; impactLabel?: string }[] = [
  { slug: "celadon-website" },
  { slug: "celadon-rose-sale-system", impact: "850+", impactLabel: "unique users served" },
  { slug: "budge" },
  { slug: "kandama-market-entry-model" },
  { slug: "splurge" },
];

/** The three disciplines, matching the nodes in the hero illustration. */
export const disciplines = [
  {
    id: "code",
    title: "Code",
    body: "Full-stack web apps and internal tools, shipped to real users and kept running.",
    skillGroup: "Development",
  },
  {
    id: "ops",
    title: "Operations",
    body: "Process design, capacity and financial models, and the dashboards teams make decisions from.",
    skillGroup: "Operations and logic",
  },
  {
    id: "ai",
    title: "AI",
    body: "Agentic workflows and LLM integrations that take repetitive work off people's plates.",
    skillGroup: "AI workflows",
  },
] as const;
