export const basePath = process.env.NODE_ENV === "production" ? "/portfolio" : "";

export const site = {
  name: "Keene Xander Brigado",
  shortName: "Keene Brigado",
  url: "https://koala3353.github.io/portfolio",
  title: "Keene Xander Brigado | Tech, consulting, and operations",
  description:
    "Management Engineering student at Ateneo de Manila University who diagnoses how a business runs and builds the systems that fix it. Open to internships in tech, consulting, and FMCG.",
  email: "brigadokeene@gmail.com",
  github: "https://github.com/Koala3353",
  linkedin: "https://linkedin.com/in/keene-brigado",
  resume: `${basePath}/resume.pdf`,
  formEndpoint:
    "https://script.google.com/macros/s/AKfycbySc20ht17M5_nN1J_4khKAyDJewNazERoj2cZBrfu64L1DLm5v_uB4M3hfZbDVeLAx/exec",
};

export const primaryNav = [
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/achievements", label: "Achievements" },
] as const;

export const secondaryNav = [
  { href: "/services", label: "For recruiters" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/cv", label: "Résumé" },
  { href: "/contact", label: "Contact" },
] as const;

export const allRoutes = ["/", ...primaryNav.map((l) => l.href), ...secondaryNav.map((l) => l.href)];
