import { formatRange, latestRole } from "./experience";

export const metrics = [
  { value: "43+", label: "Projects shipped" },
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

/** Display order for featured cards on the home page (first is the large card). */
export const featuredOrder = ["ripe-fx", "pop-portal", "budge", "poker-chips-tracker"];
