export const recruiterSummary =
  "I figure out how a business actually runs, recommend what should change, and then build it. That makes me useful on a tech team, a consulting team, or inside an operations-heavy business like FMCG.";

export const lookingFor = {
  headline: "Open to internships in tech, consulting, and FMCG.",
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
      "Diagnosing a problem, sizing it, and making the case for a fix. I built the financial model behind a joint venture GoRocky approved, and led teams to four case competition placements, including the top 0.5% of L'Oréal Brandstorm.",
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
    title: "Real results, not class projects",
    description:
      "Systems in daily use at a growing supplier, 30+ international freelance clients since I was 13, and 9+ competition placements.",
  },
];

export const quickFacts = [
  { value: "500+", label: "Café clients served at RMC" },
  { value: "-87%", label: "Processing time cut" },
  { value: "850+", label: "Users on a system I built" },
  { value: "Top 0.5%", label: "L'Oréal Brandstorm 2026" },
];
