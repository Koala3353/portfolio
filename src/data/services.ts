export const recruiterSummary =
  "I'm a Management Engineering student at Ateneo who has built the systems a matcha supplier, a growth team, and several student organizations run on. I'm looking for an internship in tech, consulting, or FMCG operations.";

export const lookingFor = {
  headline: "Open to internships in tech, consulting, and FMCG.",
  workMode: "Hybrid or remote, based in Manila.",
  areas: ["Software & business systems", "Consulting & strategy", "FMCG operations & supply chain"],
};

export interface Service {
  title: string;
  description: string;
  highlights: string[];
}

export const services: Service[] = [
  {
    title: "Software & business systems",
    description:
      "Internal tools and web apps that real teams use every day. At Ritual Matcha I unified 8+ Google Sheets into one Shopify-connected portal and I'm leading its move to Supabase and Cloudflare.",
    highlights: [
      "Google Apps Script, Python, SQL",
      "React, Next.js, TypeScript",
      "Supabase, Shopify, Cloudflare",
      "n8n and AI-assisted development",
    ],
  },
  {
    title: "Consulting & strategy",
    description:
      "Diagnosing a problem, sizing it, and making the case for a fix. I built the financial model behind a joint venture GoRocky approved, and led teams to four case competition placements, including top 24 of 5,000+ teams at L'Oréal Brandstorm.",
    highlights: [
      "Financial modeling",
      "Market research",
      "Process diagnosis and redesign",
      "Stakeholder management",
    ],
  },
  {
    title: "FMCG operations & supply chain",
    description:
      "Inventory, procurement, and sales operations for a B2B matcha supplier serving 500+ cafés. I cut purchase-order turnaround from a week to same-day and gave the founders inventory data they could plan purchasing on.",
    highlights: [
      "Inventory and procurement systems",
      "Demand-based purchasing",
      "Sales operations dashboards",
      "Process automation",
    ],
  },
];

export const reasons = [
  {
    title: "I build what I recommend",
    description:
      "Most analysis stops at the slide. I can take a fix from diagnosis to a working system, then hand it over so the team can run it.",
  },
  {
    title: "Comfortable on both sides",
    description:
      "Management Engineering trained me to think in processes and stakeholders. Five years of building trained me to ship.",
  },
  {
    title: "Other people depend on it",
    description:
      "Systems in daily use at a growing supplier, 30+ international freelance clients since I was 13, and 9+ competition placements.",
  },
];

/** Résumé-backed numbers, each with what changed and where. */
export const quickFacts = [
  { value: "₱1.7M", label: "Monthly EBITDA in the joint venture model I built at GoRocky, approved to launch" },
  { value: "₱390K+", label: "Profit from the dev studio I founded at 13, across 30+ international clients" },
  { value: "~850", label: "People who used the Rose Sale store I built for a student org" },
  { value: "Top 24", label: "of 5,000+ teams at L'Oréal Brandstorm 2026, as team leader" },
];
