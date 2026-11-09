import { site } from "@/lib/site";

export type ContactChannel = {
  id: "email" | "linkedin" | "github";
  label: string;
  href: string;
  display: string;
  external: boolean;
};

export const contactIntro =
  "I'm looking for internships in tech, consulting, or FMCG operations, hybrid or remote. I'm based in Manila. Email is the fastest way to reach me.";

export const contactChannels: ContactChannel[] = [
  { id: "email", label: "Email", href: `mailto:${site.email}`, display: site.email, external: false },
  { id: "linkedin", label: "LinkedIn", href: site.linkedin, display: "keene-brigado", external: true },
  { id: "github", label: "GitHub", href: site.github, display: "Koala3353", external: true },
];
