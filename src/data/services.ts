export const recruiterSummary =
  "I combine full-stack engineering, operations expertise, and AI fluency to deliver solutions that are technically sound and business-aligned.";

export const lookingFor = {
  headline: "Actively seeking internships and project collaborations.",
  areas: ["Full-stack development", "Operations & process design", "AI-augmented workflows"],
};

export interface Service {
  title: string;
  description: string;
  highlights: string[];
}

export const services: Service[] = [
  {
    title: "Full-stack development",
    description:
      "End-to-end application engineering from React frontends to server-side automation. Shipped 30+ projects spanning e-commerce platforms, fintech tools, and enterprise dashboards.",
    highlights: [
      "React / Next.js / TypeScript",
      "Google Apps Script automation",
      "REST APIs & database design",
      "CI/CD & deployment",
    ],
  },
  {
    title: "Operations & process design",
    description:
      "Data-driven process optimization, capacity modeling, and supply chain analysis. Architected an automated inventory receiving and transfer portal for Ritual Matcha, establishing full supply chain traceability and eliminating manual tracking. The system remains in active daily production.",
    highlights: [
      "Financial modeling",
      "Capacity & supply chain analysis",
      "Process automation",
      "Data analytics & reporting",
    ],
  },
  {
    title: "AI-augmented workflows",
    description:
      "Using Claude Code, Gemini, and agentic automation to ship code and draft architecture 10x faster.",
    highlights: [
      "Claude Code & Gemini integration",
      "Agentic automation pipelines",
      "AI-assisted code generation",
      "Prompt engineering & optimization",
    ],
  },
];

export const reasons = [
  {
    title: "Quick learner who ships fast",
    description:
      "From zero to deployed in days, not months. I thrive in fast-paced environments where speed and iteration matter.",
  },
  {
    title: "Cross-functional communicator",
    description:
      "I speak both engineering and business. Management Engineering training means I understand stakeholders, not just code.",
  },
  {
    title: "Proven track record",
    description:
      "7+ hackathon and competition wins, real client work, and a portfolio of shipped products that deliver measurable impact.",
  },
];

export const quickFacts = [
  { value: "30+", label: "Projects shipped" },
  { value: "94%", label: "Reporting cycle reduction" },
  { value: "850+", label: "Users served" },
  { value: "10x", label: "Faster with AI" },
];
