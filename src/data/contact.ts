import { site } from "@/lib/site";

export type ContactChannel = {
  id: "email" | "linkedin" | "github";
  label: string;
  href: string;
  display: string;
  external: boolean;
};

export const contactIntro =
  "I'm actively seeking internships at fast-paced, origin-story-driven companies where I can use code, operations, and AI to scale impact.";

export const contactChannels: ContactChannel[] = [
  { id: "email", label: "Email", href: `mailto:${site.email}`, display: site.email, external: false },
  { id: "linkedin", label: "LinkedIn", href: site.linkedin, display: "keene-brigado", external: true },
  { id: "github", label: "GitHub", href: site.github, display: "Koala3353", external: true },
];
