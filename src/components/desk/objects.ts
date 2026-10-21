import { projects } from "@/data/projects";

export type DeskObjectId =
  | "notebook"
  | "laptop"
  | "whiteboard"
  | "trophies"
  | "matcha"
  | "sticky"
  | "phone"
  | "printer";

/** The two things you can zoom into, and what's inside each. */
export type LaptopScreen = "projects" | "experience" | "skills" | "resume";
export type NotebookPage = "about" | "school" | "wins" | "notes" | "next";
export type Opens =
  | { device: "laptop"; screen: LaptopScreen }
  | { device: "notebook"; page: NotebookPage };

export type DeskObject = {
  id: DeskObjectId;
  /** What the thing is, on the desk. */
  thing: string;
  /** The page it opens. */
  section: string;
  href: string;
  /** What Kobi says when you point at it. */
  kobi: string;
  /** Heading and page link on the object's close-up panel. */
  title: string;
  cta: string;
  /** The laptop screen or notebook page with the full story, offered from the close-up panel. */
  opens?: Opens;
  /** Where Kobi looks when this object is hovered (scene units). */
  lookAt: [number, number, number];
};

export const deskObjects: DeskObject[] = [
  {
    id: "laptop",
    thing: "Laptop",
    section: "Projects",
    href: "/projects",
    kobi: `The laptop! ${projects.length} projects, the work history, and the résumé are all on it.`,
    title: "Projects",
    cta: "Open all projects",
    lookAt: [-0.9, 0.9, 0.2],
  },
  {
    id: "notebook",
    thing: "Notebook",
    section: "About",
    href: "/about",
    kobi: "Keene's notebook. School, wins, and what people say about Keene are in there.",
    title: "About Keene",
    cta: "Read the story",
    lookAt: [-1.9, 0.4, 0.9],
  },
  {
    id: "whiteboard",
    thing: "Whiteboard",
    section: "Experience",
    href: "/experience",
    kobi: "The whiteboard is the short version. The laptop has every role.",
    title: "Experience",
    cta: "Full experience page",
    opens: { device: "laptop", screen: "experience" },
    lookAt: [-0.6, 2.6, -1.7],
  },
  {
    id: "trophies",
    thing: "Trophy shelf",
    section: "Achievements",
    href: "/achievements",
    kobi: "Careful, those are heavy! Keene writes every win down in the notebook.",
    title: "Achievements",
    cta: "See every award",
    opens: { device: "notebook", page: "wins" },
    lookAt: [2.0, 2.4, -1.7],
  },
  {
    id: "matcha",
    thing: "Matcha jar",
    section: "For recruiters",
    href: "/services",
    kobi: "Matcha! Keene builds the systems behind a supplier serving 500+ cafés.",
    title: "For recruiters",
    cta: "What I can do for your team",
    opens: { device: "notebook", page: "next" },
    lookAt: [1.7, 0.6, 0.3],
  },
  {
    id: "sticky",
    thing: "Sticky notes",
    section: "Testimonials",
    href: "/testimonials",
    kobi: "Those sticky notes are from people Keene worked with. I'm not allowed to peel them off.",
    title: "Testimonials",
    cta: "All recommendations",
    opens: { device: "notebook", page: "notes" },
    lookAt: [0.9, 2.5, -1.7],
  },
  {
    id: "phone",
    thing: "Phone",
    section: "Contact",
    href: "/contact",
    kobi: "Want to talk to Keene? The phone works. I checked.",
    title: "Get in touch",
    cta: "Send a message",
    lookAt: [0.7, 0.4, 1.0],
  },
  {
    id: "printer",
    thing: "Printer",
    section: "Résumé",
    href: "/cv",
    kobi: "The printer only prints one thing. Keene's one-page résumé.",
    title: "Résumé",
    cta: "Open the résumé page",
    opens: { device: "laptop", screen: "resume" },
    lookAt: [2.6, 0.7, -0.4],
  },
];

export const kobiIdleLines = [
  "Hi, I'm Kobi! This is Keene's desk. Click anything on it.",
  "Try the laptop. You can zoom right into the screen.",
  "Keene's open to tech, consulting, and FMCG internships.",
  "The notebook has pages. You can flip them!",
  "Try the trophy shelf. I polish those every night.",
];

export const objectById = Object.fromEntries(deskObjects.map((o) => [o.id, o])) as Record<
  DeskObjectId,
  DeskObject
>;
