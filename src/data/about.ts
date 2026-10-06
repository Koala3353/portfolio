export type SkillGroup = { title: string; items: string[] };
export type EducationItem = {
  school: string;
  program: string;
  period: string;
  highlight?: string;
  details?: string[];
};

export const aboutIntro =
  "Management Engineering student at Ateneo de Manila University. I diagnose how an organization actually runs, recommend what should change, and build it, always with the people who use it in mind. I join projects to improve the systems they inherited, not to rerun them.";

export const story = [
  "I'm a Management Engineering sophomore who approaches every role like a consultant: understand the business, then fix what's slowing it down. I founded Klick n Code at 14, and I've since consulted for Ritual Matcha Co., where I turned 8+ operational systems into one real-time view behind a business selling over ₱2M a month, and worked on growth at GoRocky, where I modeled a joint venture projecting ₱1.7M in monthly EBITDA to guide the launch decision. Code is how I execute, but the work starts with understanding the business and the people it serves.",
  "I don't take on a role just to run last year's playbook. Whether I'm a head or a core member, in recruitment and secretariat, operations, recruitment strategy, or OSR, I look at the system I inherited and ask how it should work instead. For Rose Sale, I replaced the legacy Google Forms with a full-stack store that served about 850 users, and built a delivery portal that raised delivery volume by 35%. For Celaball, I built a centralized table reservation system for 70+ attendees. As an OSR analyst, I write audit reports so the next team starts from a better system than I did.",
  "As Project Manager of Celadon's Recruitment Week, I led 44 people across 6 committees to 831 recruits and launched three firsts for the organization: a mobile-game tournament that brought in ₱81,770 on ₱8K in costs, CelaWrapped, a Spotify Wrapped-style recap of each member's week, and a mahjong leaderboard portal with 150+ users. For the JADE Business Summit and LEADS 2627, I rebuilt the registration, tracking, and backend systems behind events for 80+ and 100+ participants.",
  "When I lead, a better system for the project is only half the goal. The other half is my team: everyone should leave knowing a tool or a way of working they didn't know before, so the improvement outlasts my term. I also consider every stakeholder a system touches, from the participants to the executive board (EBCB) to my own core team, and design so each of them has an easier time using it. The changes I push for tend to stick, and the feedback from the people using them has been consistently strong.",
];

export const facts: { label: string; value: string }[] = [
  { label: "School", value: "Ateneo de Manila University" },
  { label: "Program", value: "BS Management Engineering" },
  { label: "Focus", value: "Operations, strategy, systems design" },
  { label: "Honors", value: "Director's List (Mar 2025)" },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Development",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "HTML/CSS", "Tailwind CSS", "Python", "Java", "Google Apps Script", "MongoDB", "Git", "Framer Motion", "Figma"],
  },
  {
    title: "Operations and logic",
    items: ["Market research", "Capacity modeling", "Process optimization", "Financial modeling", "Supply chain", "Data analytics"],
  },
  {
    title: "AI workflows",
    items: ["Claude", "Claude Code", "Claude Cowork", "Gemini", "Agentic automation", "OpenAI GPT-4 integration"],
  },
];

export const education: EducationItem[] = [
  {
    school: "Ateneo de Manila University",
    program: "BS Management Engineering",
    period: "2025 - Present",
    highlight: "Director's List (Mar 2025)",
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
