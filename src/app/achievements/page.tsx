"use client";

import { motion } from "framer-motion";
import { Trophy, Globe, GraduationCap } from "lucide-react";

/* ── Animation helpers ── */
const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
} as const;

/* ── Data ── */
interface Achievement {
  placement: string;
  title: string;
  date: string;
  role?: string;
  description: string;
}

const caseCompetitions: Achievement[] = [
  {
    placement: "Top 24",
    title: "National Semifinalist — L'Oréal Brandstorm 2026",
    date: "Mar 2026",
    role: "Team Leader",
    description:
      "Top 0.5% of 30,000+ innovators across 5,000+ teams. Represented Ateneo as one of the youngest groups in the competition.",
  },
  {
    placement: "Top 25",
    title: "ACTS '25 Semifinalist — Nestlé Philippines",
    date: "Oct 2025",
    role: "Team Leader",
    description:
      "Led team in developing sustainability solutions for the Ateneo Challenge for Transformational Sustainability.",
  },
  {
    placement: "2x Winner",
    title: "Bounty Winner — Ship or Be Shipped 2025",
    date: "Dec 2025",
    role: "Solo Developer",
    description:
      "24-hour hackathon. Built a production-ready React widget for Ripe, winning two separate bounty prizes.",
  },
];

const internationalCompetitions: Achievement[] = [
  {
    placement: "7th Place",
    title: "FLL Open European Championship",
    date: "May 2024 · Norway",
    role: "Team Lead Developer",
    description:
      "EdTech solution featuring AI chord detection (90%+ accuracy), computer vision karaoke, and a personalized exercise generator. Reduced learning time by 40%.",
  },
  {
    placement: "1st Place",
    title: "FLL Philippines 2024",
    date: "Feb 2024",
    role: "National Champion",
    description:
      "B2C educational website with MongoDB dashboards and GSAP animations, achieving a 35% increase in user engagement.",
  },
  {
    placement: "5th Place",
    title: "Innovation Project — FLL Philippines 2025",
    date: "Feb 2025",
    role: "Software Architect",
    description:
      "BlueHaven: IoT sensor network integrated with Python/Tkinter dashboard and OpenAI analytics for monitoring marine ecosystems.",
  },
  {
    placement: "Top 25–80",
    title: "Hack Club Arcade Showcase",
    date: "Aug 2024",
    role: "Out of 2,000 entrants",
    description:
      "Global peer-judged innovation exhibition showcasing creative technical projects from young developers worldwide.",
  },
];

const academicHonors: Achievement[] = [
  {
    placement: "Director's List",
    title: "Ateneo de Manila University",
    date: "Mar 2025",
    description:
      "Premier distinction for holistic excellence in academics, leadership, and character. Top 150 ACET performers.",
  },
  {
    placement: "Archer Achiever",
    title: "De La Salle University",
    date: "May 2025",
    description:
      "Top 100 in the DLSU College Admission Test, recognized for outstanding academic potential.",
  },
  {
    placement: "Gold & Silver",
    title: "CMA Mental Arithmetic",
    date: "Jul 2017",
    description:
      "Multiple distinctions including Gold (2016, 2017) and Silver (2016, 2017) medals in mental arithmetic competitions.",
  },
];

/* ── Achievement Card Component ── */
function AchievementCard({ achievement }: { achievement: Achievement }) {
  return (
    <motion.div variants={cardVariants} className="glass-card rounded-2xl p-6 md:p-8 group hover:border-white/15 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        {/* Placement badge */}
        <div className="shrink-0">
          <span className="inline-block px-4 py-2 text-sm font-bold text-accent bg-accent/10 border border-accent/20 rounded-xl whitespace-nowrap">
            {achievement.placement}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4 mb-2">
            <h3 className="text-lg md:text-xl font-bold leading-snug">
              {achievement.title}
            </h3>
            <span className="text-sm text-muted whitespace-nowrap shrink-0">
              {achievement.date}
            </span>
          </div>

          {achievement.role && (
            <p className="text-sm text-accent/80 font-medium mb-2">
              {achievement.role}
            </p>
          )}

          <p className="text-foreground/70 leading-relaxed text-sm md:text-base">
            {achievement.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Section Component ── */
function AchievementSection({
  icon: Icon,
  title,
  subtitle,
  achievements,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  achievements: Achievement[];
}) {
  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="section-padding"
    >
      <motion.div variants={headerVariants} className="flex items-center gap-3 mb-3">
        <div className="p-2.5 rounded-xl bg-accent/10 border border-accent/20">
          <Icon className="w-5 h-5 text-accent" />
        </div>
        <h2 className="font-bold tracking-tight">{title}</h2>
      </motion.div>

      <motion.p variants={headerVariants} className="text-muted mb-10 max-w-2xl">
        {subtitle}
      </motion.p>

      <div className="grid grid-cols-1 gap-4 md:gap-5">
        {achievements.map((a) => (
          <AchievementCard key={a.title} achievement={a} />
        ))}
      </div>
    </motion.section>
  );
}

/* ── Page ── */
export default function AchievementsPage() {
  return (
    <div className="page-top pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-4"
        >
          <p className="text-accent font-mono text-sm tracking-widest uppercase mb-4">
            Recognition & Awards
          </p>
          <h1 className="font-bold tracking-tight text-glow mb-4">
            Achieve<span className="text-muted">ments</span>
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
            A track record of competing at the highest levels — from national
            case competitions to international robotics championships.
          </p>
        </motion.div>

        {/* Stat highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { value: "7+", label: "Competitions" },
            { value: "3", label: "Countries" },
            { value: "Top 0.5%", label: "Brandstorm" },
            { value: "1st", label: "FLL PH 2024" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass-card rounded-xl p-4 md:p-5 text-center"
            >
              <p className="text-xl md:text-2xl font-bold text-accent mb-0.5">
                {stat.value}
              </p>
              <p className="text-xs md:text-sm text-muted">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Sections */}
        <AchievementSection
          icon={Trophy}
          title="Case Competitions"
          subtitle="Strategy, innovation, and leadership under pressure."
          achievements={caseCompetitions}
        />

        <AchievementSection
          icon={Globe}
          title="International Competitions"
          subtitle="Representing the Philippines on the global stage."
          achievements={internationalCompetitions}
        />

        <AchievementSection
          icon={GraduationCap}
          title="Academic Honors"
          subtitle="Excellence recognized across institutions."
          achievements={academicHonors}
        />
      </div>
    </div>
  );
}
