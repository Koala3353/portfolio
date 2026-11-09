export type SkillGroup = { title: string; items: string[] };
export type EducationItem = {
  school: string;
  program: string;
  period: string;
  highlight?: string;
  details?: string[];
};

export const aboutIntro =
  "Management Engineering student at Ateneo de Manila University. I started a paid development studio at 13. These days I build and fix the operations systems behind a matcha supplier, a growth team, and several student organizations.";

/** The About story in short titled blocks, so it scans instead of reading as one wall of text. */
export const story: { title: string; body: string }[] = [
  {
    title: "Work",
    body: "I founded Klick n Code at 13 and built Discord bots and websites for 30+ international clients. At Ritual Matcha Co., a B2B matcha supplier, I turned 8+ scattered Google Sheets into one Shopify-connected portal behind seven-figure monthly sales, cut purchase-order turnaround from a week to same-day, and now lead the move to Supabase and Cloudflare. At GoRocky, I built the financial model for a joint venture projecting ₱1.7M in monthly EBITDA, and leadership approved it to launch.",
  },
  {
    title: "Student organizations",
    body: "In student organizations I keep ending up rebuilding whatever the last team left behind. For Celadon's Rose Sale, I replaced the old Google Forms with an online store that about 850 people used, and built a delivery portal that raised delivery volume by 35%. For Celaball, I built a table reservation system for 70+ attendees. As an analyst in Celadon's research department, I write audit reports so the next team starts from a better system than I did.",
  },
  {
    title: "Recruitment Week",
    body: "I was Project Manager of Celadon's Recruitment Week, the first one run by project managers instead of the executive board. That meant recruiting a core team through open applications for the first time, and my primer drew more applicants than the organization's yearly projects. I led 44 people across 6 committees to 832 recruits, returning about 10x on project costs. We added a mobile-game tournament at twice the expected turnout, CelaWrapped (a Spotify Wrapped-style recap of each member's week), and a mahjong leaderboard with 350+ users and 1,000+ games in 4 days. Our creatives were voted the best design among all ADMU organizations.",
  },
  {
    title: "How I lead",
    body: "I want my team to leave knowing a tool or a way of working they didn't know before, so the fix outlasts my term. I also design for everyone a system touches: participants, the executive board, and my own core team. For the JADE Business Summit and LEADS 2627, that meant rebuilding the registration, tracking, and backend systems for 80+ and 100+ participants.",
  },
];

export const facts: { label: string; value: string }[] = [
  { label: "School", value: "Ateneo de Manila University" },
  { label: "Program", value: "BS Management Engineering" },
  { label: "QPI", value: "3.56" },
  { label: "Honors", value: "Director's List, 2x Dean's Lister" },
  { label: "Open to", value: "Tech, consulting, FMCG" },
  { label: "Work setup", value: "Hybrid or remote, Manila" },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Development",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "HTML/CSS", "Tailwind CSS", "Python", "Java", "Google Apps Script", "SQL", "Supabase", "MongoDB", "Shopify", "Git", "Framer Motion", "Figma"],
  },
  {
    title: "Operations and logic",
    items: ["Market research", "Capacity modeling", "Process optimization", "Financial modeling", "Supply chain", "Data analytics"],
  },
  {
    title: "AI workflows",
    items: ["Claude", "Claude Code", "Claude Cowork", "Gemini", "Agentic automation", "n8n", "OpenAI GPT-4 integration"],
  },
];

export const education: EducationItem[] = [
  {
    school: "Ateneo de Manila University",
    program: "BS Management Engineering",
    period: "2025 - Present",
    highlight: "QPI 3.56 · Director's List · 2x Dean's Lister",
  },
  {
    school: "Grace Christian College",
    program: "Senior High School, STEM",
    period: "2023 - 2025",
    highlight: "96.17% GPA, graduated top 4",
    details: [
      "Honors class, graduated top 4 of the batch (Excellent Star, Highest Honors)",
      "Honors class from Grade 5 to 12",
      "Activities: Grace Robotics Team (2023-2025), Herodotus Club President (2024-25), Student Council Cultural Chairman (2024-25), Student Council Recreational Vice Chairman (2024-25), Computer Club Vice President (2023-24), Grace Journal Layout Editor (2023-24)",
    ],
  },
];
