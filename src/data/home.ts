import { formatRange, latestRole } from "./experience";
import { quickFacts } from "./services";

/** Resume-backed numbers for the regular home. Same as the For recruiters page. */
export const metrics = quickFacts;

export const stack = [
  "React", "Next.js", "TypeScript", "Python", "SQL", "Supabase", "Shopify",
  "Google Apps Script", "n8n", "Cloudflare", "Claude Code", "Financial Modeling",
  "Market Research", "Process Optimization", "Data Analytics",
] as const;

/** The short stack line in the hero: what Keene builds with most. */
export const heroStack = ["React", "Next.js", "TypeScript", "Python", "SQL", "Supabase", "Apps Script", "n8n"] as const;

/**
 * The hero ledger: processes Keene changed, with the before and after.
 * Every row restates a figure from the résumé or LinkedIn. Do not add one that isn't there.
 */
export const ledger = [
  { what: "Purchase-order turnaround", where: "Ritual Matcha Co.", before: "1 week", after: "same day" },
  { what: "PO receiving and tracking stickers", where: "Ritual Matcha Co.", before: "8 min", after: "1 min" },
  { what: "Monthly sales report", where: "Ritual Matcha Co.", before: "1+ day", after: "live" },
  { what: "Payroll data reporting", where: "Amada Corporation", before: "1 day", after: "< 20 min" },
  { what: "Finding a free room", where: "Ateneo de Manila", before: "152 calendars", after: "1 search" },
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
  { slug: "he-venue-explorer", impact: "152", impactLabel: "venue calendars in one search" },
  { slug: "celadon-rose-sale-system", impact: "~850", impactLabel: "people used it" },
  { slug: "kandama-market-entry-model" },
  { slug: "celadon-website" },
];

/** Smaller builds listed under the case studies, by slug. */
export const alsoBuilt = ["budge", "splurge", "ripe-fx", "pop-portal"];

/**
 * The three paths Keene is open to, each with proof from the résumé.
 * `work` holds project slugs from src/data/projects.ts.
 */
export const paths = [
  {
    id: "tech",
    title: "Tech",
    kicker: "Software & business systems",
    body: "Internal tools and web apps that teams use every day, from the first sketch to keeping them running.",
    proof: [
      "Leading Ritual Matcha's move from Google Sheets to Supabase and Cloudflare",
      "5 years of freelance builds for 30+ international clients",
    ],
    skillGroup: "Development",
    work: ["he-venue-explorer", "budge", "splurge"],
  },
  {
    id: "consulting",
    title: "Consulting",
    kicker: "Consulting & strategy",
    body: "Diagnose the problem, size it, and make the case for the fix with numbers people can check.",
    proof: [
      "Built the financial model behind a joint venture GoRocky approved",
      "Top 24 of 5,000+ teams at L'Oréal Brandstorm 2026, as team leader",
    ],
    skillGroup: "Operations and logic",
    work: ["kandama-market-entry-model"],
  },
  {
    id: "fmcg",
    title: "FMCG",
    kicker: "Operations & supply chain",
    body: "Inventory, procurement, and sales operations for a B2B matcha supplier serving 500+ cafés.",
    proof: [
      "Cut purchase-order turnaround from a week to same-day",
      "Unified 8+ Google Sheets into one Shopify-connected portal",
    ],
    skillGroup: "Operations and logic",
    work: ["celadon-rose-sale-system", "apps-script-automations"],
  },
] as const;
