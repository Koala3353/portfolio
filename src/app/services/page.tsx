"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Code2,
  BarChart3,
  Sparkles,
  Zap,
  MessageSquare,
  Trophy,
  Download,
} from "lucide-react";

/* ── Animation helpers ── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: "easeOut" as const },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardReveal = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

/* ── Data ── */
const services = [
  {
    icon: Code2,
    title: "Full-Stack Development",
    description:
      "End-to-end application engineering from React frontends to server-side automation. Shipped 30+ projects spanning e-commerce platforms, fintech tools, and enterprise dashboards.",
    highlights: [
      "React / Next.js / TypeScript",
      "Google Apps Script automation",
      "REST APIs & database design",
      "CI/CD & deployment",
    ],
    accent: "from-accent/20 to-accent/5",
  },
  {
    icon: BarChart3,
    title: "Operations & Process Design",
    description:
      "Data-driven process optimization, capacity modeling, and supply chain analysis. Architected an automated inventory receiving and transfer portal for Ritual Matcha, establishing full supply chain traceability and eliminating manual tracking. The system remains in active daily production.",
    highlights: [
      "Financial modeling",
      "Capacity & supply chain analysis",
      "Process automation",
      "Data analytics & reporting",
    ],
    accent: "from-accent-secondary/20 to-accent-secondary/5",
  },
  {
    icon: Sparkles,
    title: "AI-Augmented Workflows",
    description:
      "Leveraging Claude Code, Gemini, and agentic automation to ship code and draft architecture 10x faster. Building the future where AI amplifies human capability.",
    highlights: [
      "Claude Code & Gemini integration",
      "Agentic automation pipelines",
      "AI-assisted code generation",
      "Prompt engineering & optimization",
    ],
    accent: "from-purple-500/20 to-purple-500/5",
  },
];

const reasons = [
  {
    icon: Zap,
    title: "Quick learner who ships fast",
    description:
      "From zero to deployed in days, not months. I thrive in fast-paced environments where speed and iteration matter.",
  },
  {
    icon: MessageSquare,
    title: "Cross-functional communicator",
    description:
      "I speak both engineering and business. Management Engineering training means I understand stakeholders, not just code.",
  },
  {
    icon: Trophy,
    title: "Proven track record",
    description:
      "7+ hackathon and competition wins, real client work, and a portfolio of shipped products that deliver measurable impact.",
  },
];

/* ── Section Header ── */
function SectionLabel({ label }: { label: string }) {
  return (
    <motion.p
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="text-accent font-mono text-sm tracking-widest uppercase mb-4"
    >
      {label}
    </motion.p>
  );
}

/* ── PAGE ── */
export default function ServicesPage() {
  return (
    <div className="page-top pb-16">
      {/* ── HERO ── */}
      <section className="section-padding px-6">
        <div className="max-w-5xl mx-auto">
          <SectionLabel label="Services" />

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="font-bold tracking-tight text-glow mb-6"
          >
            What I <span className="text-accent">Bring</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={0.15}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-xl md:text-2xl text-muted font-medium tracking-wide mb-4 max-w-2xl"
          >
            Three disciplines. One operator.
          </motion.p>

          <motion.p
            variants={fadeUp}
            custom={0.25}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-foreground/70 text-base md:text-lg leading-relaxed max-w-3xl"
          >
            I combine full-stack engineering, operations expertise, and AI
            fluency to deliver solutions that are technically sound{" "}
            <em>and</em>{" "}business-aligned. Here&apos;s what I can do for your
            team.
          </motion.p>
        </div>
      </section>

      {/* ── VALUE PROPOSITION CARDS ── */}
      <section className="section-padding px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  variants={cardReveal}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="glass-card rounded-2xl p-8 flex flex-col group hover:border-white/15 transition-colors relative overflow-hidden"
                >
                  {/* Gradient glow */}
                  <div
                    className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl ${service.accent} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-accent/10 group-hover:border-accent/20 transition-colors">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>

                    <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-foreground/70 leading-relaxed mb-6 flex-1">
                      {service.description}
                    </p>

                    <ul className="space-y-2.5">
                      {service.highlights.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2.5 text-sm text-foreground/60"
                        >
                          <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── WHY WORK WITH ME ── */}
      <section className="section-padding px-6">
        <div className="max-w-5xl mx-auto">
          <SectionLabel label="Why Me" />

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="font-bold tracking-tight mb-10"
          >
            Why Work <span className="text-muted">With Me</span>
          </motion.h2>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {reasons.map((reason) => {
              const Icon = reason.icon;
              return (
                <motion.div
                  key={reason.title}
                  variants={cardReveal}
                  className="glass-card rounded-2xl p-6 md:p-8 group hover:border-white/15 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-foreground/60 leading-relaxed">
                    {reason.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── IMPACT NUMBERS ── */}
      <section className="section-padding px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { value: "30+", label: "Projects Shipped" },
              { value: "94%", label: "Reporting Cycle Reduction" },
              { value: "850+", label: "Users Served" },
              { value: "10×", label: "Faster with AI" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={cardReveal}
                className="glass-card rounded-2xl p-6 text-center"
              >
                <p className="text-3xl md:text-4xl font-bold text-accent mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-muted">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-padding px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-2xl p-10 md:p-14 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
            <div className="relative z-10">
              <motion.h2
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="font-bold tracking-tight mb-4"
              >
                Let&apos;s build something{" "}
                <span className="text-accent">together</span>
              </motion.h2>
              <motion.p
                variants={fadeUp}
                custom={0.1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="text-muted mb-8 max-w-lg mx-auto"
              >
                I&apos;m actively seeking internships and project
                collaborations. Grab my résumé or reach out directly.
              </motion.p>
              <motion.div
                variants={fadeUp}
                custom={0.2}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <a
                  href="/BRIGADO-Resume.pdf"
                  download
                  className="px-6 py-3 bg-accent text-white font-medium rounded-lg hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Résumé
                </a>
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-white/5 border border-white/10 text-foreground font-medium rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                >
                  Get in Touch <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
