export type ExperienceCategory = "work" | "leadership";

export type ExperienceEntry = {
  org: string;
  role: string;
  category: ExperienceCategory;
  /** Employment type, e.g. Consulting, Internship. */
  type?: string;
  /** YYYY-MM */
  start: string;
  /** YYYY-MM, or null for ongoing */
  end: string | null;
  location?: string;
  bullets: string[];
  tags?: string[];
  link?: string;
};

const entries: ExperienceEntry[] = [
  {
    role: "Business Systems Consultant", org: "Ritual Matcha Co.", category: "work", type: "Consulting",
    start: "2026-07", end: null,
    bullets: [
      "Self-initiated and now leading the migration of Ritual Matcha's operations backend from Google Sheets to Supabase (PostgreSQL) and Cloudflare, fixing 2-minute dashboard loads and timeouts projected within a year, while supervising 1 intern",
      "Unified 8+ fragmented Google Sheets into a Shopify-integrated Apps Script portal for operations, inventory, clients, and sales, replacing a co-founder's 1+ day monthly manual report with real-time dashboards for seven-figure monthly sales",
      "Automated recurring manual work such as tracking-sticker generation for outgoing packages",
    ],
    tags: ["Google Apps Script", "Supabase", "Shopify", "Dashboards", "Operations"],
  },
  {
    role: "Sales Operations Intern", org: "Ritual Matcha Co.", category: "work", type: "Internship",
    start: "2026-03", end: "2026-07",
    bullets: [
      "Replaced an unreliable formula-based inventory ledger with an Apps Script system tracking 40+ SKUs across 3 locations, giving founders trusted data for demand-based purchasing to serve 500+ café clients",
      "Digitized a physical kanban purchase-order process into a tracked request system handling ~20 POs per week, cutting request-to-purchase turnaround from a week to same-day",
      "Refactored 5+ legacy Apps Script codebases, reducing PO receiving and tracking-sticker generation from 8 minutes to 1 (-87%)",
      "Built client dashboards from Shopify data to support demand forecasting",
    ],
    tags: ["Google Apps Script", "JavaScript", "Shopify", "Operations", "Automation"],
  },
  {
    role: "Growth Analyst Intern", org: "GoRocky", category: "work", type: "Internship",
    start: "2026-01", end: "2026-04",
    bullets: [
      "Built an end-to-end financial model for a joint venture projecting seven-figure monthly EBITDA, securing leadership approval to launch",
      "Built an n8n CRM pipeline automating 1,000+ Viber/SMS messages per week, removing manual outreach",
    ],
    tags: ["Financial Modeling", "n8n", "Growth Strategy"],
  },
  {
    role: "Data Processing Consultant", org: "Amada Corporation", category: "work", type: "Freelance",
    start: "2025-06", end: "2025-07",
    bullets: ["Automated payroll reporting and audit validation, cutting turnaround from one business day to under 20 minutes with full compliance"],
    tags: ["Python", "Business Process Automation"],
  },
  {
    role: "Admin, Facilities Management", org: "Primer Group of Companies", category: "work", type: "Internship",
    start: "2025-05", end: "2025-06",
    bullets: [
      "Conducted facility operations analysis across generator and cooler rooms",
      "Automated monthly and annual reports using Google Apps Script (60% reduction in processing time)",
    ],
    tags: ["Google Apps Script", "Process Automation"],
  },
  {
    role: "Data Processing Consultant", org: "Horsepower Contractors", category: "work", type: "Freelance",
    start: "2025-04", end: "2025-05",
    bullets: [
      "Designed Excel file parsing algorithms for payroll and project accounting",
      "Automated job order expense consolidation (99.5% success rate)",
    ],
    tags: ["Python", "Business Process Automation"],
  },
  {
    role: "Web Solutions Engineer", org: "TLB Kitchen", category: "work", type: "Contract",
    start: "2024-06", end: "2025-08",
    bullets: [
      "Developed a dynamic digital storefront for The Little Baker Kitchen",
      "Launched a promotional blog hub (35% increase in repeat traffic)",
      "Implemented a lead-generation contact form (25% boost in catering inquiries)",
    ],
    tags: ["Web Development", "MongoDB", "JavaScript"],
  },
  {
    role: "Software Developer", org: "BetDEX Labs Inc.", category: "work", type: "Contract",
    start: "2022-06", end: "2022-07",
    bullets: [
      "Designed and deployed BetDUX Bot for community engagement",
      "Achieved 70% reduction in manual data compilation time",
    ],
    tags: ["Java", "APIs", "Databases"],
  },
  {
    role: "Owner and Founder", org: "Klick n Code", category: "work",
    start: "2021-03", end: "2026-04",
    bullets: [
      "Founded a solo development studio at age 13, building Discord bots and websites for 30+ international clients, including BETDEX, and generating six-figure profit",
      "Built a reusable bot framework that cut development time by 40%, shipping most projects within a week",
    ],
    tags: ["Java", "JavaScript", "Full-Stack Development"],
  },
  {
    org: "Ateneo Management Engineering Association", role: "Recruitment and Secretariat Core Head, LEADS 2627", category: "leadership",
    start: "2026-09", end: null,
    bullets: [
      "Proposed and led a 5-person team to build MEA's first custom applicant portal, replacing Google Forms with an immersive, story-themed web app for LEADS, MEA's 3-day offsite leadership camp",
      "Built the Google Sheets backend for 100+ participants, automating participant tracking, email blasts, and grouping attendees into families across multiple factors, saving 8+ hours of manual work",
    ],
    tags: ["Event Logistics", "Google Apps Script", "Team Collaboration"],
  },
  {
    org: "Ateneo Celadon", role: "Recruitment and Strategy Head, Jade Business Summit", category: "leadership",
    start: "2026-07", end: null,
    bullets: ["Oversaw recruitment and strategy for a one-day business summit serving 80+ high-school and college students, leading a team of 6 across participant tracking, registration, and backend systems using Google Suite"],
    tags: ["Recruitment Strategy", "Google Apps Script", "Team Collaboration"],
  },
  {
    org: "Ateneo Celadon", role: "Associate Vice President, Organization Strategies and Research Department", category: "leadership",
    start: "2026-06", end: null,
    bullets: [
      "Leads a 17-person research and evaluation department running 3+ training workshops for 100+ members",
      "Built Celadon's first professional website, including an applicant portal and a project manager toolkit",
      "Launched the first URL shortener built by an ADMU org, with branded, unlimited QR code generation",
      "Acted as an internal strategy consultant for two key organizational projects, auditing operational processes and social impact",
      "Authored data-driven sustainability reports, synthesizing quantitative and qualitative feedback to evaluate project success and recommend improvements for future iterations",
    ],
    tags: ["Team Collaboration", "Data Analytics", "Strategy Consulting"],
  },
  {
    org: "Ateneo Celadon", role: "Project Manager, Recruitment Week and Welcome Week '26", category: "leadership",
    start: "2026-06", end: "2026-09",
    bullets: [
      "Led the first Recruitment Week run by project managers instead of the executive board, which meant recruiting a core team through open applications for the first time, where cores were previously assigned",
      "Marketed the core team openings with a primer and publicity materials that drew more applicants than the organization's yearly projects",
      "Directed a 44-person, 6-committee team that recruited 832 members (+24% returning YoY) and returned ~10x on project costs, despite record typhoon class suspensions",
      "Led the marketing and creatives team, whose designs were voted the best among all organizations in ADMU",
      "Launched the organization's first mobile-game tournament, drawing 2x the expected turnout",
      "Created the first CelaWrapped, a Spotify Wrapped-style recap of each member's RecWeek activity with fun facts about the organization's members and their backgrounds",
      "Launched ADMU's first mahjong leaderboard portal on Apps Script, with 350+ users and 1,000+ games logged in 4 days",
    ],
    tags: ["Project Management", "Marketing", "Recruitment Strategy", "Team Collaboration"],
  },
  {
    org: "Ateneo Celadon", role: "Recruitment and Secretariat Core + OSR Analyst, Celaball '26", category: "leadership",
    start: "2025-09", end: "2026-06",
    bullets: [
      "Led event logistics by designing and deploying a centralized table reservation system in Google Workspace, streamlining seat allocation for 70+ attendees",
      "Managed core documentation and compliance by developing and distributing event forms, including parental consent and registration, in line with organizational guidelines",
    ],
    tags: ["Data Analytics", "Google Apps Script"],
  },
  {
    org: "Ateneo Celadon", role: "Operations Core + OSR Analyst, Rose Sale '26", category: "leadership",
    start: "2025-09", end: "2026-03",
    bullets: [
      "Engineered a full-stack e-commerce website with real-time Google Sheets integration (replacing legacy Google Forms), serving about 850 unique users",
      "Developed an automated Delivery Portal using Google Apps Script to manage end-to-end fulfillment, increasing delivery volume by 35% and eliminating manual data entry for runners",
      "Authored a project audit report with data-driven recommendations to optimize resource allocation and operational efficiency for future iterations",
    ],
    tags: ["Web Development", "Team Collaboration", "Process Automation", "Google Apps Script"],
  },
  {
    org: "Ateneo Gabay", role: "Logistics Head, 16th Scholars' Week", category: "leadership",
    start: "2025-11", end: "2026-04",
    bullets: [
      "Led end-to-end logistics and technical execution for five campus-wide events serving 304 total attendees, including a 118-person flagship gathering night",
      "Led the logistics core team in event execution and contingency planning",
      "Managed venue procurement and independently operated a 5-hour light and sound system during peak sessions with zero technical downtime",
    ],
    tags: ["Logistics Management", "Team Collaboration", "Event Execution"],
  },
  {
    org: "SOBO (Student Venture)", role: "Co-Founder and Student Entrepreneur", category: "leadership",
    start: "2024-04", end: "2024-04",
    bullets: [
      "Launched and managed a rapid-turnover retail venture, generating five-figure net profit in 72 hours",
      "Oversaw end-to-end supply chain logistics, forecasting demand to minimize food waste and optimize inventory turnover during the peak sales period",
    ],
    tags: ["Entrepreneurship", "Supply Chain Logistics", "Financial Forecasting"],
  },
];

/** All entries, newest first (by start date; ongoing roles first on ties). */
export const experience: ExperienceEntry[] = [...entries].sort((a, b) => {
  if (a.start !== b.start) return a.start < b.start ? 1 : -1;
  return (a.end ?? "9999") < (b.end ?? "9999") ? 1 : -1;
});

export const categoryLabels: Record<ExperienceCategory, string> = {
  work: "Work",
  leadership: "Leadership",
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatMonth(ym: string): string {
  const [y, m] = ym.split("-");
  return `${MONTHS[Number(m) - 1]} ${y}`;
}

export function formatRange(e: Pick<ExperienceEntry, "start" | "end">): string {
  if (e.end === e.start) return formatMonth(e.start);
  return `${formatMonth(e.start)} - ${e.end ? formatMonth(e.end) : "Present"}`;
}

/** Most recent work role (for the home page). */
export const latestRole = experience.find((e) => e.category === "work")!;

export const educationEntries = [
  { institution: "Ateneo de Manila University", degree: "BS Management Engineering", period: "Jul 2025 - Present", note: "Director's List, 2x Dean's Lister" },
  { institution: "Grace Christian College", degree: "Senior High School, STEM", period: "2023 - 2025", note: "Honors class, 96.17% GPA, graduated top 4" },
];

export const certifications = [
  { name: "Forward Program Graduate", issuer: "McKinsey & Company", date: "Jun 2026" },
  { name: "Microsoft Power BI Data Analyst Associate (PL-300) Cert Prep", issuer: "Microsoft", date: "Jul 2025" },
  { name: "Power BI Essential Training", issuer: "National Association of State Boards of Accountancy (NASBA)", date: "Jul 2025" },
  { name: "Data Analytics for Business Professionals", issuer: "National Association of State Boards of Accountancy (NASBA)", date: "Jul 2025" },
  { name: "Business Analysis Foundations", issuer: "National Association of State Boards of Accountancy (NASBA)", date: "Jul 2025" },
  { name: "Consulting Foundations: Client Management and Relationships", issuer: "National Association of State Boards of Accountancy (NASBA)", date: "Jul 2025" },
  { name: "Project Management Foundations", issuer: "National Association of State Boards of Accountancy (NASBA)", date: "Jul 2025" },
  { name: "Six Sigma White Belt", issuer: "The Council for Six Sigma Certification (CSSC)", date: "Jul 2025" },
  { name: "Unreal Engine 5 C++ Developer: Learn C++ & Make Video Games", issuer: "Udemy", date: "Aug 2022" },
  { name: "Java Masterclass 2025: 130+ Hours of Expert Lessons", issuer: "Udemy", date: "Jul 2022" },
  { name: "Microsoft Access Complete Beginner to Advanced", issuer: "Udemy", date: "Jul 2020" },
  { name: "Microsoft Excel - Excel from Beginner to Advanced", issuer: "Udemy", date: "Jun 2020" },
];
