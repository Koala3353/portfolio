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
      "Built interactive Google Workspace dashboards in Apps Script that consolidate 8+ operational systems into a single real-time view",
      "Enabled faster reporting and forecasting for sales reaching over ₱2M per month",
    ],
    tags: ["Google Apps Script", "Dashboards", "Operations", "Automation"],
  },
  {
    role: "Sales Operations Consultant", org: "Ritual Matcha Co.", category: "work", type: "Consulting",
    start: "2026-03", end: "2026-07",
    bullets: [
      "Designed an end-to-end inventory and procurement system in Apps Script, achieving 100% visibility for real-time stock worth millions of pesos across multiple locations and eliminating manual purchase orders",
      "Rebuilt 5+ legacy Apps Script codebases to improve processing speed and reliability as data volumes grew to over a hundred entries per day",
    ],
    tags: ["Google Apps Script", "JavaScript", "Operations", "Automation"],
  },
  {
    role: "Growth Analyst Intern", org: "GoRocky", category: "work", type: "Internship",
    start: "2026-01", end: "2026-04",
    bullets: [
      "Modeled a joint venture end to end, projecting ₱1.7M in monthly EBITDA to guide the launch decision",
      "Developed an n8n CRM pipeline that reduced manual Viber/SMS messaging to zero",
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
      "Ran an independent development studio to ₱170K+ profit across 15+ international clients, including BETDEX",
      "Used reusable frameworks to cut delivery time by 40%",
    ],
    tags: ["Java", "JavaScript", "Full-Stack Development"],
  },
  {
    org: "Ateneo Management Engineering Association", role: "Recruitment and Secretariat Core Head, LEADS 2627", category: "leadership",
    start: "2026-09", end: null,
    bullets: ["Coordinated registration and accommodation systems using Google Suite and other tools for 100+ participants at a 3-day offsite leadership retreat, managing a team of 5"],
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
      "Leads a 17-person research and evaluation department, delivering 3+ deputy training workshops",
      "Builds the internal websites and tools behind Celadon's data-driven decisions using Google Suite",
      "Acted as an internal strategy consultant for two key organizational projects, auditing operational processes and social impact",
      "Authored data-driven sustainability reports, synthesizing quantitative and qualitative feedback to evaluate project success and recommend improvements for future iterations",
    ],
    tags: ["Team Collaboration", "Data Analytics", "Strategy Consulting"],
  },
  {
    org: "Ateneo Celadon", role: "Project Manager, Recruitment Week and Welcome Week '26", category: "leadership",
    start: "2026-06", end: "2026-09",
    bullets: [
      "Directed a 44-person, 6-committee team that recruited 831 members (+24% returning YoY)",
      "Launched the organization's first mobile-game tournament, generating ₱81,770 in revenue against ₱8K in costs",
    ],
    tags: ["Project Management", "Team Collaboration", "Recruitment Strategy"],
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
      "Launched and managed a rapid-turnover retail venture, generating PHP 50,000 net profit in 72 hours",
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
