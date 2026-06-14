"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import FloatingOrbs from "@/components/FloatingOrbs";
import TextReveal from "@/components/TextReveal";
import TiltCard from "@/components/TiltCard";
import MagneticButton from "@/components/MagneticButton";
import SmoothReveal from "@/components/SmoothReveal";

/* ── Marquee ── */
const marqueeItems = [
  "React", "Next.js", "TypeScript", "Python", "Google Apps Script",
  "Tailwind CSS", "Framer Motion", "MongoDB", "Git", "Claude Code",
  "Gemini", "Financial Modeling", "Process Optimization", "Data Analytics",
];

function Marquee() {
  return (
    <div className="relative overflow-hidden py-8 border-y border-white/5 bg-background">
      <div 
        className="flex animate-[marquee_30s_linear_infinite] w-max"
        style={{ transform: "translateZ(0)", willChange: "transform" }}
      >
        {[...marqueeItems, ...marqueeItems].map((item, i) => (
          <span
            key={i}
            className="mx-8 text-sm font-medium text-muted/60 whitespace-nowrap uppercase tracking-[0.2em] hover:text-accent transition-colors duration-300"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Featured Card ── */
function FeaturedCard({
  title,
  description,
  tags,
  href,
}: {
  title: string;
  description: string;
  tags: string[];
  href: string;
}) {
  return (
    <Link href={href} className="block group">
      <TiltCard>
        <div className="glass-card rounded-2xl p-8 h-full flex flex-col justify-between min-h-[280px] hover:border-accent/20 transition-all duration-500 relative overflow-hidden">
          {/* Hover glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-3 group-hover:text-gradient transition-colors duration-300">
              {title}
            </h3>
            <p className="text-foreground/60 leading-relaxed mb-6 max-w-lg">
              {description}
            </p>
          </div>
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-accent/5 border border-accent/10 text-accent/70"
                >
                  {tag}
                </span>
              ))}
            </div>
            <ArrowRight className="w-5 h-5 text-muted group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
          </div>
        </div>
      </TiltCard>
    </Link>
  );
}

/* ── Metric Card ── */
function MetricCard({ value, label, delay }: { value: string; label: string; delay: number }) {
  return (
    <SmoothReveal variant="scale-in" delay={delay}>
      <TiltCard>
        <div className="glass-card rounded-2xl p-6 text-center glow-border">
          <p className="text-3xl md:text-4xl font-bold text-gradient mb-1">{value}</p>
          <p className="text-sm text-muted">{label}</p>
        </div>
      </TiltCard>
    </SmoothReveal>
  );
}

/* ── PAGE ── */
export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(heroScroll, [0, 1], [0, 150]);
  const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);
  const subtitleY = useTransform(heroScroll, [0, 1], [0, 80]);

  return (
    <div className="overflow-x-hidden">
      {/* ═══════════════════════════════════════════════════════
          CHAPTER 1: THE HOOK
       ═══════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
      >
        <FloatingOrbs opacity={0.6} />

        {/* Hero Content */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity, willChange: "transform, opacity" }}
          className="relative z-10 text-center max-w-5xl"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-6"
            style={{ willChange: "transform, opacity" }}
          >
            <span className="inline-block px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-accent border border-accent/20 rounded-full bg-accent/5">
              Portfolio 2026
            </span>
          </motion.div>

          {/* Main headline with character reveal */}
          <TextReveal
            text="Bridging Code, Operations, and AI"
            as="h1"
            className="font-bold tracking-tight text-glow mb-6"
            delay={0.3}
          />

          {/* Subtitle with parallax */}
          <motion.div style={{ y: subtitleY, willChange: "transform" }}>
            <motion.p
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 1.2, duration: 0.8 }}
              style={{ willChange: "transform, opacity, filter" }}
              className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              I&apos;m <span className="text-foreground font-medium">Keene Xander Brigado</span> — 
              a Management Engineering student at Ateneo de Manila who builds 
              systems that scale.
            </motion.p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <MagneticButton className="flex">
              <Link
                href="/projects"
                className="w-full h-full px-6 py-3 text-sm font-medium bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors flex items-center justify-center gap-2 glow-accent"
              >
                View My Work <ArrowRight className="w-4 h-4" />
              </Link>
            </MagneticButton>
            <MagneticButton className="flex">
              <a
                href="https://github.com/Koala3353"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-full px-6 py-3 text-sm font-medium bg-white/5 border border-white/10 rounded-lg text-foreground hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                GitHub
              </a>
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="absolute bottom-10 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted/60 uppercase tracking-[0.2em]">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 text-muted/40" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CHAPTER 2: THE NUMBERS
       ═══════════════════════════════════════════════════════ */}
      <section className="section-padding px-6 relative">
        <div className="max-w-6xl mx-auto">
          <SmoothReveal variant="fade-up" className="text-center mb-12">
            <p className="text-accent font-mono text-xs tracking-[0.3em] uppercase mb-3">Track Record</p>
            <h2 className="font-bold tracking-tight">
              Numbers that <span className="text-gradient">speak</span>
            </h2>
          </SmoothReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <MetricCard value="30+" label="Projects Shipped" delay={0} />
            <MetricCard value="5+" label="Years Building" delay={0.1} />
            <MetricCard value="7+" label="Competition Wins" delay={0.2} />
            <MetricCard value="10+" label="Tools & Languages" delay={0.3} />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CHAPTER 3: THE STACK
       ═══════════════════════════════════════════════════════ */}
      <Marquee />

      {/* ═══════════════════════════════════════════════════════
          CHAPTER 4: FEATURED WORK
       ═══════════════════════════════════════════════════════ */}
      <section className="section-padding px-6 relative">
        <FloatingOrbs opacity={0.2} />
        <div className="max-w-6xl mx-auto relative z-10">
          <SmoothReveal variant="fade-up">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-accent font-mono text-xs tracking-[0.3em] uppercase mb-3">Selected Projects</p>
                <h2 className="font-bold tracking-tight">
                  Featured <span className="text-muted">Work</span>
                </h2>
              </div>
              <Link
                href="/projects"
                className="hidden md:flex items-center gap-2 text-sm text-accent hover:underline underline-offset-4"
              >
                View all projects <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </SmoothReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SmoothReveal variant="fade-up" delay={0}>
              <FeaturedCard
                title="Budge"
                description="A personal budgeting web app built because existing finance apps had terrible UX. Clean interface for tracking expenses and income with real-time insights."
                tags={["React", "Full-Stack", "Finance"]}
                href="/projects"
              />
            </SmoothReveal>
            <SmoothReveal variant="fade-up" delay={0.1}>
              <FeaturedCard
                title="Poker Chips Tracker"
                description="A sleek, real-time poker chip tracker for Texas Hold'em home games. Built mobile-first for landscape play — no scrolling, no distractions."
                tags={["React", "Mobile-First", "Real-Time"]}
                href="/projects"
              />
            </SmoothReveal>
            <SmoothReveal variant="fade-up" delay={0.2}>
              <FeaturedCard
                title="Ripe FX Widget"
                description="Production-ready React widget providing real-time stablecoin-to-fiat transparency. Won 2 bounties at Ship or Be Shipped 2025 hackathon."
                tags={["React", "DeFi", "Hackathon Winner"]}
                href="/projects"
              />
            </SmoothReveal>
            <SmoothReveal variant="fade-up" delay={0.3}>
              <FeaturedCard
                title="Proof of Purchase Portal"
                description="Automated payment verification for Ateneo organizations, cross-checking GCash and Maya screenshots against official transaction history."
                tags={["React", "OCR", "FinTech"]}
                href="/projects"
              />
            </SmoothReveal>
          </div>

          <div className="mt-8 md:hidden text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-accent hover:underline underline-offset-4"
            >
              View all projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CHAPTER 5: THE CLOSER
       ═══════════════════════════════════════════════════════ */}
      <section className="section-padding px-6 relative">
        <div className="max-w-4xl mx-auto">
          <SmoothReveal variant="scale-in">
            <div className="glass-card rounded-3xl p-10 md:p-16 text-center relative overflow-hidden glow-border">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent-secondary/5" />
              <FloatingOrbs opacity={0.15} />

              <div className="relative z-10">
                <TextReveal
                  text="Ready to build something impactful?"
                  as="h2"
                  className="font-bold tracking-tight mb-4"
                />

                <SmoothReveal variant="fade-up" delay={0.3}>
                  <p className="text-muted mb-8 max-w-lg mx-auto">
                    I&apos;m actively seeking internships at fast-paced companies
                    where I can leverage code, operations, and AI to scale impact.
                  </p>
                </SmoothReveal>

                <SmoothReveal variant="fade-up" delay={0.5}>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <MagneticButton className="flex">
                      <Link
                        href="/contact"
                        className="w-full h-full px-8 py-3.5 bg-accent text-white font-medium rounded-lg hover:bg-accent-hover transition-colors flex items-center justify-center glow-accent"
                      >
                        Get in Touch
                      </Link>
                    </MagneticButton>
                    <MagneticButton className="flex">
                      <Link
                        href="/cv"
                        className="w-full h-full px-8 py-3.5 bg-white/5 border border-white/10 text-foreground font-medium rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center"
                      >
                        View Résumé
                      </Link>
                    </MagneticButton>
                  </div>
                </SmoothReveal>
              </div>
            </div>
          </SmoothReveal>
        </div>
      </section>
    </div>
  );
}
