"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Award,
  Users,
  ChevronRight,
} from "lucide-react";
import FloatingOrbs from "@/components/FloatingOrbs";
import TextReveal from "@/components/TextReveal";
import TiltCard from "@/components/TiltCard";
import SmoothReveal from "@/components/SmoothReveal";

/* ─── Data ─────────────────────────────────────────────── */

interface WorkEntry {
  title: string;
  company: string;
  type: string;
  period: string;
  bullets: string[];
  skills: string[];
}

const workEntries: WorkEntry[] = [
  {
    title: "Sales Operations Consultant",
    company: "Ritual Matcha Co.",
    type: "Internship",
    period: "Mar 2026 – Present",
    bullets: [
      "Architected end-to-end automated inventory and procurement system using Google Apps Script",
      "Built multi-module corporate web portal: Receiving Form, Transfer Portal, SKU management",
      "Achieved 100% real-time stock visibility, eliminating manual purchase orders",
    ],
    skills: ["Google Apps Script", "JavaScript", "Operations", "Automation"],
  },
  {
    title: "Growth Analyst",
    company: "GoRocky",
    type: "Internship",
    period: "Jan 2026 – Apr 2026",
    bullets: [
      "Engineered strategic financial model for joint venture projecting ₱1.7M monthly EBITDA",
      "Orchestrated 50+ member digital migration with zero downtime",
      "Built dashboards tracking funnel performance and KPIs",
    ],
    skills: ["Financial Modeling", "Data Analytics", "Growth Strategy"],
  },
  {
    title: "Data Processing Consultant",
    company: "Amada Corporation",
    type: "Freelance",
    period: "Jun 2025 – Jul 2025",
    bullets: [
      "Reduced reporting cycle time by 94% with automated validation workflow",
      "Optimized data integrity for payroll audits with unified dashboard",
    ],
    skills: ["Python", "Business Process Automation"],
  },
  {
    title: "Admin – Facilities Management",
    company: "Primer Group of Companies",
    type: "Internship",
    period: "May 2025 – Jun 2025",
    bullets: [
      "Conducted facility operations analysis across generator/cooler rooms",
      "Automated monthly/annual reports using Google Apps Script (60% reduction in processing time)",
    ],
    skills: ["Google Apps Script", "Process Automation"],
  },
  {
    title: "Data Processing Consultant",
    company: "Horsepower Contractors",
    type: "Freelance",
    period: "Apr 2025 – May 2025",
    bullets: [
      "Designed Excel file parsing algorithms for payroll and project accounting",
      "Automated job order expense consolidation (99.5% success rate)",
    ],
    skills: ["Python", "Business Process Automation"],
  },
  {
    title: "Web Solutions Engineer",
    company: "TLB Kitchen",
    type: "Contract",
    period: "Jun 2024 – Aug 2025",
    bullets: [
      "Developed dynamic digital storefront for The Little Baker Kitchen",
      "Launched promotional blog hub (35% increase in repeat traffic)",
      "Implemented lead-generation contact form (25% boost in catering inquiries)",
    ],
    skills: ["Web Development", "MongoDB", "JavaScript"],
  },
  {
    title: "Software Developer",
    company: "BetDEX Labs Inc.",
    type: "Contract",
    period: "Jun 2022 – Jul 2022",
    bullets: [
      "Designed and deployed BetDUX Bot for community engagement",
      "Achieved 70% reduction in manual data compilation time",
    ],
    skills: ["Java", "APIs", "Databases"],
  },
  {
    title: "Owner & Founder",
    company: "Klick n Code",
    type: "",
    period: "Mar 2021 – Apr 2026",
    bullets: [
      "Built custom Discord bots for 15+ international clients including BETDEX",
      "Generated $3,000+ revenue",
    ],
    skills: ["Java", "JavaScript", "Full-Stack Development"],
  },
];

interface LeadershipEntry {
  org: string;
  role: string;
  period: string;
  bullets: string[];
  skills: string[];
}

const leadershipEntries: LeadershipEntry[] = [
  {
    org: "Ateneo Celadon",
    role: "Junior Analyst, Organization Strategies & Research Department",
    period: "Sep 2025 – Jun 2026",
    bullets: [
      "Oversees Celadon’s overall welfare by spearheading various research and evaluations.",
      "Served as the custodian of all files and forwards information and recommendations to the succeeding Executive Board.",
      "Acted as an internal strategy consultant for two key organizational projects, conducting comprehensive audits of operational processes and social impact.",
      "Authored data-driven sustainability reports, synthesizing quantitative and qualitative feedback to evaluate project success and recommend improvements for future iterations."
    ],
    skills: ["Team Collaboration", "Data Analytics", "Strategy Consulting"]
  },
  {
    org: "Ateneo Celadon",
    role: "Recruitment & Secretariat Core + OSR Analyst, Celaball '26",
    period: "Sep 2025 – Jun 2026",
    bullets: [
      "Spearheaded event logistics by designing and deploying a centralized table reservation system in Google Workspace, successfully streamlining seat allocation for 70+ attendees.",
      "Managed core documentation and compliance by developing and distributing essential event forms, including parental consent and registration, ensuring strict adherence to organizational guidelines."
    ],
    skills: ["Data Analytics", "Google Apps Script"]
  },
  {
    org: "Ateneo Celadon",
    role: "Operations Core + OSR Analyst, Rose Sale '26",
    period: "Sep 2025 – Mar 2026",
    bullets: [
      "Engineered a full-stack e-commerce website with real-time Google Sheets integration (replacing legacy Google Forms), serving 850~ unique users.",
      "Developed an automated Delivery Portal using Google Apps Script to manage end-to-end fulfillment, increasing delivery volume by 35% and eliminating manual data entry for runners.",
      "Authored a comprehensive project audit report, providing data-driven recommendations to optimize resource allocation and operational efficiency for future project iterations."
    ],
    skills: ["Web Development", "Team Collaboration", "Process Automation", "Google Apps Script"]
  },
  {
    org: "Ateneo Gabay",
    role: "Logistics Head, 16th Scholars’ Week",
    period: "Nov 2025 – Apr 2026",
    bullets: [
      "Spearheaded end-to-end logistics and technical execution for five campus-wide events serving 304 total attendees, including a 118-person flagship gathering night.",
      "Lead the logistics core team in event execution and contingency planning to ensure seamless operations.",
      "Managed venue procurement and independently operated a 5-hour light and sound system during peak sessions to ensure 100% operational continuity and zero technical downtime."
    ],
    skills: ["Logistics Management", "Team Collaboration", "Event Execution"]
  },
  {
    org: "SOBO (Student Venture)",
    role: "Co-Founder & Student Entrepreneur",
    period: "Apr 2024",
    bullets: [
      "Launched and managed a rapid-turnover retail venture, generating PHP 50,000 net profit in 72 hours.",
      "Oversaw end-to-end supply chain logistics, forecasting demand to minimize food waste and optimize inventory turnover during peak sales period."
    ],
    skills: ["Entrepreneurship", "Supply Chain Logistics", "Financial Forecasting"]
  }
];

interface EducationEntry {
  institution: string;
  degree: string;
  period: string;
  note: string;
}

const educationEntries: EducationEntry[] = [
  {
    institution: "Ateneo de Manila University",
    degree: "BS Management Engineering",
    period: "Jul 2025 – Present",
    note: "Director's List",
  },
  {
    institution: "Grace Christian College",
    degree: "Senior High School, STEM",
    period: "2023 – 2025",
    note: "",
  },
];

interface CertEntry {
  name: string;
  issuer: string;
  date: string;
}

const certEntries: CertEntry[] = [
  {
    name: "Microsoft Power BI Data Analyst Associate (PL-300) Cert Prep",
    issuer: "Microsoft",
    date: "Jul 2025",
  },
  {
    name: "Power BI Essential Training",
    issuer: "National Association of State Boards of Accountancy (NASBA)",
    date: "Jul 2025",
  },
  {
    name: "Data Analytics for Business Professionals",
    issuer: "National Association of State Boards of Accountancy (NASBA)",
    date: "Jul 2025",
  },
  {
    name: "Business Analysis Foundations",
    issuer: "National Association of State Boards of Accountancy (NASBA)",
    date: "Jul 2025",
  },
  {
    name: "Consulting Foundations: Client Management and Relationships",
    issuer: "National Association of State Boards of Accountancy (NASBA)",
    date: "Jul 2025",
  },
  {
    name: "Project Management Foundations",
    issuer: "National Association of State Boards of Accountancy (NASBA)",
    date: "Jul 2025",
  },
  {
    name: "Six Sigma White Belt",
    issuer: "The Council for Six Sigma Certification (CSSC)",
    date: "Jul 2025",
  },
  {
    name: "Unreal Engine 5 C++ Developer: Learn C++ & Make Video Games",
    issuer: "Udemy",
    date: "Aug 2022",
  },
  {
    name: "Java Masterclass 2025: 130+ Hours of Expert Lessons",
    issuer: "Udemy",
    date: "Jul 2022",
  },
  {
    name: "Microsoft Access Complete Beginner to Advanced",
    issuer: "Udemy",
    date: "Jul 2020",
  },
  {
    name: "Microsoft Excel - Excel from Beginner to Advanced",
    issuer: "Udemy",
    date: "Jun 2020",
  },
];

/* ─── Animation Variants ───────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

/* ─── Section Heading ──────────────────────────────────── */

function SectionHeading({
  icon: Icon,
  label,
  title,
  accent,
}: {
  icon: React.ElementType;
  label: string;
  title: string;
  accent: string;
}) {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="mb-12 md:mb-16"
    >
      <div className="flex items-center gap-2.5 mb-4">
        <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
          <Icon className="w-4 h-4 text-accent" />
        </div>
        <span className="text-accent font-mono text-xs tracking-widest uppercase">
          {label}
        </span>
      </div>
      <h2 className="font-bold tracking-tight">
        {title} <span className="text-muted">{accent}</span>
      </h2>
    </motion.div>
  );
}

/* ─── Timeline Node ────────────────────────────────────── */

function TimelineNode({ isFirst }: { isFirst: boolean }) {
  return (
    <div className="relative flex flex-col items-center">
      {/* Glowing dot */}
      <div className="relative z-10">
        <div className="w-3.5 h-3.5 rounded-full bg-accent border-2 border-background" />
        {isFirst && (
          <div className="absolute inset-0 w-3.5 h-3.5 rounded-full bg-accent animate-ping opacity-40" />
        )}
      </div>
      {/* Vertical line — extended via CSS */}
      <div className="absolute top-3.5 w-px h-full bg-gradient-to-b from-accent/40 to-accent/5" />
    </div>
  );
}

/* ─── Timeline Card ────────────────────────────────────── */

function TimelineCard({
  entry,
  index,
}: {
  entry: WorkEntry;
  index: number;
}) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="glass-card rounded-2xl p-6 md:p-8 hover:border-white/15 transition-colors"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-4">
        <div>
          <h3 className="font-bold text-foreground">{entry.title}</h3>
          <p className="text-accent text-sm font-medium">
            {entry.company}
            {entry.type && (
              <span className="text-muted"> · {entry.type}</span>
            )}
          </p>
        </div>
        <span className="text-xs text-muted font-mono whitespace-nowrap mt-1 sm:mt-0.5">
          {entry.period}
        </span>
      </div>

      {/* Bullets */}
      <ul className="space-y-2 mb-5">
        {entry.bullets.map((bullet, i) => (
          <li
            key={i}
            className="flex items-start gap-2.5 text-sm text-foreground/70 leading-relaxed"
          >
            <ChevronRight className="w-3.5 h-3.5 text-accent/60 mt-1 shrink-0" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      {/* Skills */}
      <div className="flex flex-wrap gap-2">
        {entry.skills.map((skill) => (
          <span
            key={skill}
            className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-foreground/60"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Page Component ───────────────────────────────────── */

export default function ExperiencePage() {
  return (
    <div className="page-top pb-16">
      {/* ── Hero Header ── */}
      <section className="section-padding px-6 relative">
        <FloatingOrbs opacity={0.2} />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-accent font-mono text-xs tracking-[0.3em] uppercase mb-6"
          >
            Career · Leadership · Growth
          </motion.p>

          <TextReveal
            text="Experience & Trajectory"
            as="h1"
            className="font-bold tracking-tight text-glow leading-[1.1] mb-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed"
          >
            5+ years of building—from crafting Discord bots in a bedroom to
            architecting corporate automation systems and consulting for
            real companies. Every role sharpened a different edge.
          </motion.p>
        </div>
      </section>

      {/* ── Work Experience (Timeline) ── */}
      <section className="section-padding px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            icon={Briefcase}
            label="Work History"
            title="Professional"
            accent="Experience"
          />

          {/* Timeline */}
          <div className="relative">
            {workEntries.map((entry, i) => (
              <div
                key={`${entry.company}-${entry.period}`}
                className="relative grid grid-cols-[20px_1fr] md:grid-cols-[24px_1fr] gap-4 md:gap-8 pb-10 last:pb-0"
              >
                {/* Timeline spine */}
                <TimelineNode isFirst={i === 0} />

                {/* Card */}
                <TimelineCard entry={entry} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leadership & Organizations ── */}
      <section className="section-padding px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            icon={Users}
            label="Leadership"
            title="Organizations &"
            accent="Impact"
          />

          <div className="flex flex-col gap-6">
            {leadershipEntries.map((entry, i) => (
              <motion.div
                key={`${entry.role}-${entry.period}`}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="glass-card rounded-2xl p-8 hover:border-white/15 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-6">
                  <div>
                    <h3 className="font-bold text-xl text-foreground mb-1">
                      {entry.role}
                    </h3>
                    <p className="text-accent text-sm font-medium">
                      {entry.org}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-muted/60 whitespace-nowrap bg-white/5 px-3 py-1.5 rounded-md shrink-0 border border-white/5">
                    {entry.period}
                  </span>
                </div>
                
                {entry.bullets && entry.bullets.length > 0 && (
                  <ul className="space-y-3 mb-8">
                    {entry.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-accent mt-1.5 text-xs">▹</span>
                        <span className="text-muted text-sm md:text-base leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {entry.skills && entry.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5 mt-auto">
                    {entry.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] md:text-xs px-3 py-1 rounded-md bg-white/5 border border-white/10 text-muted/80"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Education ── */}
      <section className="section-padding px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            icon={GraduationCap}
            label="Education"
            title="Academic"
            accent="Foundation"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {educationEntries.map((entry, i) => (
              <motion.div
                key={entry.institution}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="glass-card rounded-2xl p-6 md:p-8 hover:border-white/15 transition-colors"
              >
                <h3 className="font-bold text-foreground mb-1">
                  {entry.institution}
                </h3>
                <p className="text-accent text-sm font-medium mb-2">
                  {entry.degree}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted font-mono">
                    {entry.period}
                  </span>
                  {entry.note && (
                    <span className="text-xs px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-medium">
                      {entry.note}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certifications ── */}
      <section className="section-padding px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            icon={Award}
            label="Certifications"
            title="Continuous"
            accent="Learning"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certEntries.map((cert, i) => (
              <motion.div
                key={cert.name}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="glass-card rounded-xl p-5 hover:border-white/15 transition-colors group"
              >
                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-accent/10 border border-accent/20 mt-0.5 shrink-0">
                    <Award className="w-3.5 h-3.5 text-accent" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-foreground leading-snug mb-1">
                      {cert.name}
                    </h4>
                    <p className="text-xs text-muted">
                      {cert.issuer}{" "}
                      <span className="text-foreground/30">·</span>{" "}
                      {cert.date}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
