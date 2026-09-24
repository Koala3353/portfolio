export type SkillGroup = { title: string; items: string[] };
export type EducationItem = {
  school: string;
  program: string;
  period: string;
  highlight?: string;
  details?: string[];
};

export const aboutIntro =
  "Management Engineering student at Ateneo de Manila University. I work where code, operations, and AI meet, building systems that hold up as they scale.";

export const story = [
  "I'm a Management Engineering sophomore who connects code, operations, and AI to build systems that scale. I founded Klick n Code at 14, and I've since consulted for companies like Ritual Matcha Co. and GoRocky.",
  "The best solutions come from understanding both the technical architecture and the business context. Whether it's automating a supply chain pipeline or shipping a full-stack app, I focus on work that changes how a team actually operates.",
];

export const facts: { label: string; value: string }[] = [
  { label: "School", value: "Ateneo de Manila University" },
  { label: "Program", value: "BS Management Engineering" },
  { label: "Focus", value: "Development, operations, AI workflows" },
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
    highlight: "Grade: 96.46/98.00",
    details: [
      "Excellent Star (Highest Honors), placed top 4 of the batch",
      "Honors class from Grade 5 to 12",
      "Activities: Grace Robotics Team (2023-2025), Herodotus Club President (2024-25), Student Council Cultural Chairman (2024-25), Student Council Recreational Vice Chairman (2024-25), Computer Club Vice President (2023-24), Grace Journal Layout Editor (2023-24)",
    ],
  },
];
