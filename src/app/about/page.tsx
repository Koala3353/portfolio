"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FloatingOrbs from "@/components/FloatingOrbs";
import TextReveal from "@/components/TextReveal";
import TiltCard from "@/components/TiltCard";
import MagneticButton from "@/components/MagneticButton";
import SmoothReveal from "@/components/SmoothReveal";

/* ── Animation helpers ── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

/* ── Data ── */
const competencies = [
  {
    title: "Development",
    items: ["React", "Next.js", "TypeScript", "HTML/CSS", "Git", "Google Apps Script", "Python", "Java"],
    accent: true,
  },
  {
    title: "Operations & Logic",
    items: ["Market Research", "Capacity Modeling", "Process Optimization", "Financial Modeling", "Supply Chain", "Data Analytics"],
    accent: false,
  },
  {
    title: "AI Workflows",
    items: ["Claude Code", "Gemini", "Claude Cowork", "Agentic Automation", "OpenAI GPT-4 Integration"],
    accent: false,
  },
];

const tools = [
  "React", "Next.js", "Python", "JavaScript", "TypeScript",
  "Google Apps Script", "MongoDB", "Git", "Tailwind CSS",
  "Framer Motion", "Claude", "Figma",
];

const education = [
  {
    school: "Ateneo de Manila University",
    degree: "BS Management Engineering",
    period: "2025 – Present",
    highlight: "Director's List (Mar 2025)",
  },
  {
    school: "Grace Christian College",
    degree: "Senior High School, STEM",
    period: "2023 – 2025",
    highlight: "Grade: 96.46/98.00",
    details: [
      "Excellent Star (Highest Honors) — Placed Top 4 of the batch",
      "Honors class from Grade 5-12",
      "Activities: Grace Robotics Team (2023-2025), Herodotus Club President (2024–25), Student Council Cultural Chairman (2024–25), Student Council Recreational Vice Chairman (2024–25), Computer Club Vice President (2023–24), Grace Journal Layout Editor (2023–24)",
    ],
  },
];

/* ── PAGE ── */
export default function AboutPage() {
  return (
    <div className="page-top pb-16 relative">
      <FloatingOrbs opacity={0.2} />
      {/* ── HERO / PROFILE ── */}
      <section className="px-6 mb-16 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="text-accent font-mono text-xs tracking-[0.3em] uppercase mb-4"
            >
              About Me
            </motion.p>

            <TextReveal
              text="Keene Xander Brigado"
              as="h1"
              className="font-bold tracking-tight text-glow mb-6"
            />

            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-muted font-medium mb-8 max-w-2xl"
            >
              Management Engineering · Ateneo de Manila University
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl"
            >
              <p className="text-foreground/80 leading-relaxed">
                I&apos;m a Management Engineering sophomore who bridges code,
                operations, and AI to build systems that scale. My trajectory
                spans from founding{" "}
                <span className="text-foreground font-medium">Klick n Code</span>{" "}
                at age 14 to consulting for companies like{" "}
                <span className="text-foreground font-medium">Ritual Matcha Co.</span>{" "}
                and <span className="text-foreground font-medium">GoRocky</span>.
              </p>
              <p className="text-foreground/70 leading-relaxed">
                I believe the best solutions come from understanding both the
                technical architecture and the business context. Whether
                it&apos;s automating a supply chain pipeline or shipping a
                full-stack app, I focus on building things that actually move the
                needle.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CORE COMPETENCIES ── */}
      <section className="px-6 mb-16">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="text-accent font-mono text-sm tracking-widest uppercase mb-3"
            >
              Core Competencies
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-bold tracking-tight mb-8"
            >
              What I <span className="text-muted">Know</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {competencies.map((comp) => (
                <motion.div
                  key={comp.title}
                  variants={fadeUp}
                >
                <TiltCard>
                <div
                  className="glass-card rounded-2xl p-6 hover:border-accent/15 transition-colors h-full"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        comp.accent ? "bg-accent" : "bg-accent-secondary"
                      }`}
                    />
                    <h3 className="font-semibold text-foreground text-base">
                      {comp.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {comp.items.map((item) => (
                      <span
                        key={item}
                        className="text-sm px-3 py-1.5 rounded-lg bg-white/5 border border-white/8 text-foreground/70"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  </div>
                </TiltCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TOOLS & PLATFORMS ── */}
      <section className="px-6 mb-16">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="text-accent font-mono text-sm tracking-widest uppercase mb-3"
            >
              Tools & Platforms
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-bold tracking-tight mb-8"
            >
              What I <span className="text-muted">Use</span>
            </motion.h2>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {tools.map((tool) => (
                <motion.div
                  key={tool}
                  variants={fadeUp}
                  whileHover={{ y: -3, scale: 1.02 }}
                  className="glass-card rounded-xl px-3 py-4 flex flex-col items-center justify-center text-center gap-2 group cursor-default hover:border-white/15 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-accent text-xs font-bold group-hover:bg-accent/10 transition-colors">
                    {tool.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
                  </div>
                  <span className="text-xs font-medium text-foreground/70 group-hover:text-foreground transition-colors leading-tight">
                    {tool}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section className="px-6 mb-16">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="text-accent font-mono text-sm tracking-widest uppercase mb-3"
            >
              Education
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-bold tracking-tight mb-8"
            >
              Where I&apos;ve <span className="text-muted">Studied</span>
            </motion.h2>

            <div className="space-y-3">
              {education.map((edu) => (
                <motion.div
                  key={edu.school}
                  variants={fadeUp}
                  className="glass-card rounded-2xl p-6 hover:border-white/15 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-foreground text-base mb-0.5">
                        {edu.school}
                      </h3>
                      <p className="text-foreground/60 text-sm">{edu.degree}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {edu.period && (
                        <span className="text-xs text-muted font-mono">
                          {edu.period}
                        </span>
                      )}
                      {edu.highlight && (
                        <span className="text-xs px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-medium">
                          {edu.highlight}
                        </span>
                      )}
                    </div>
                  </div>
                  {edu.details && (
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <ul className="space-y-2">
                        {edu.details.map((detail, i) => (
                          <li key={i} className="text-sm text-foreground/70 flex items-start gap-3 leading-relaxed">
                            <span className="text-accent/50 mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="glass-card rounded-2xl p-10 md:p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
            <div className="relative z-10">
              <motion.h2
                variants={fadeUp}
                className="font-bold tracking-tight mb-3"
              >
                Want to learn <span className="text-accent">more</span>?
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-muted mb-6 max-w-lg mx-auto"
              >
                Check out my work, download my résumé, or reach out directly.
              </motion.p>
              <motion.div
                variants={fadeUp}
                className="flex flex-col sm:flex-row gap-3 justify-center"
              >
                <MagneticButton className="flex">
                <Link
                  href="/projects"
                  className="w-full h-full px-6 py-3 bg-accent text-white font-medium rounded-lg hover:bg-accent-hover transition-colors flex items-center justify-center gap-2 glow-accent"
                >
                  View Projects <ArrowRight className="w-4 h-4" />
                </Link>
                </MagneticButton>
                <MagneticButton className="flex">
                <Link
                  href="/contact"
                  className="w-full h-full px-6 py-3 bg-white/5 border border-white/10 text-foreground font-medium rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center"
                >
                  Get in Touch
                </Link>
                </MagneticButton>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
