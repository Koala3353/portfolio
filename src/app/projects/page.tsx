"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ExternalLink } from "lucide-react";

/* ── Types ── */
type Category = "All" | "Web" | "AI" | "Bots" | "Tools";

interface Project {
  title: string;
  description: string;
  github: string;
  preview?: string;
  category: Category;
}

interface YearGroup {
  year: string;
  label?: string;
  subtitle: string;
  projects: Project[];
}

/* ── Data ── */
const yearGroups: YearGroup[] = [
  {
    year: "2026",
    label: "CURRENT YEAR",
    subtitle: "Building full-stack applications and expanding into financial modeling and growth analytics.",
    projects: [
      { title: "Budge", description: "A personal budgeting web app built because existing finance apps had terrible UX. Clean interface for tracking expenses and income with real-time insights — no clutter, no subscriptions.", github: "https://github.com/Koala3353/budge", preview: "https://koala3353.github.io/budge/", category: "Web" },
      { title: "Poker Chips Tracker", description: "A sleek, real-time poker chip tracker for Texas Hold'em home games. Built mobile-first for landscape play — no scrolling, no distractions. Made because no existing app got the UX right.", github: "https://github.com/Koala3353/poker-chips-tracker", preview: "https://koala3353.github.io/poker-chips-tracker/", category: "Web" },
      { title: "Proof of Purchase API", description: "Upload a receipt image → get back the transaction number, amount, time, and confidence score as structured JSON.", github: "https://github.com/Koala3353/pop-api", preview: "https://pop-api-mocha.vercel.app/docs", category: "AI" },
      { title: "POP Portal", description: "Automated payment verification system for Ateneo student organizations, cross-checking GCash, Maya, and BDO receipt screenshots against official transaction history.", github: "https://github.com/Koala3353/pop-portal", preview: "https://koala3353.github.io/pop-portal/", category: "Web" },
    ],
  },
  {
    year: "2025",
    subtitle: "College freshman year — full-stack development, hackathons, and production-grade applications.",
    projects: [
      { title: "Celadon Rose Sale System", description: "Full-stack e-commerce platform replacing legacy Google Forms, serving 850+ unique users with real-time Google Sheets integration.", github: "https://github.com/Koala3353/celadon-rose-sale", category: "Web" },
      { title: "Ripe FX", description: "Production-ready React widget providing stablecoin-to-fiat conversion transparency in Southeast Asia. Won 2 Bounty Prizes at Ship or Be Shipped.", github: "https://github.com/Koala3353/Ripe-FX-Transparency-Widget", category: "Web" },
      { title: "MediGuard AI", description: "Clinical assistant using OpenAI GPT-4 for personalized treatment plans, enforcing safety protocols with AI reasoning and a deterministic rule engine.", github: "https://github.com/Koala3353/AI-Powered-Treatment-Plan-Assistant", category: "AI" },
      { title: "CodeHonesty", description: "Code submission integrity and similarity checking application with a dashboard for analytics and tracking.", github: "https://github.com/Koala3353/CodeHonesty", category: "Tools" },
      { title: "Excel Summarizer", description: "Batch Excel processing tool that generates summary files with weekly/date columns and totals from multiple input files.", github: "https://github.com/Koala3353/excel-summarizer", category: "Tools" },
      { title: "BlueHaven App", description: "Weather monitoring and marine life density tracking with Arduino sensors, Python/Tkinter GUI, and OpenAI integration. FLL 2025 submission.", github: "https://github.com/Koala3353/bluehaven-app", category: "AI" },
      { title: "Chess Game", description: "Chess game implemented with Python and tkinter GUI, using the python-chess library for game logic.", github: "https://github.com/Koala3353/chess-tkinter", category: "Tools" },
      { title: "Ateneo Eats", description: "Modern web app helping students find, filter, and order food from every canteen and stall on the Ateneo campus.", github: "https://github.com/Koala3353/ateneo-eats", preview: "https://koala3353.github.io/ateneo-eats/", category: "Web" },
      { title: "EJK Heatmap PH", description: "Interactive heatmap showcasing data from Duterte's Drug War killings (2016).", github: "https://github.com/Koala3353/ejk-heatmap-ph", preview: "https://koala3353.github.io/ejk-heatmap-ph/", category: "Web" },
      { title: "TLB Kitchen API", description: "Python Flask API replacing MongoDB Data API with custom endpoints for pastries management.", github: "https://github.com/Koala3353/tlbk-api", category: "Web" },
      { title: "Multipurpose Discord Bot", description: "Feature-rich discord bot with multiple functionalities from utilities to games and more.", github: "https://github.com/Koala3353/multipurpose-discord-bot", category: "Bots" },
      { title: "RPG Discord Bot", description: "RPG Discord bot made for Hackclub's game jam with the theme of loopholes.", github: "https://github.com/Koala3353/rpg-discord-bot", category: "Bots" },
    ],
  },
  {
    year: "2024",
    label: "SENIOR HIGH SCHOOL",
    subtitle: "Transitioned into web development and application design while competing in first robotics competition.",
    projects: [
      { title: "FLL Website", description: "Platform for Spark Hobby Kit, providing tools and inspiration to unleash creative potential. FLL 2024 submission.", github: "https://github.com/Koala3353/FLL-website", preview: "https://koala3353.github.io/FLL-website/", category: "Web" },
      { title: "SPARK Music App", description: "AI-powered chord detection engine helping users learn and practice chords accurately. FLL 2024 submission.", github: "https://github.com/Koala3353/SPARK-app", category: "AI" },
      { title: "Bakery Website", description: "Paid client website for a bakery displaying pastries and cakes, with products retrieved from a MongoDB database.", github: "https://github.com/Koala3353/bakery-website", preview: "https://koala3353.github.io/bakery-website/", category: "Web" },
      { title: "Portfolio Website", description: "Personal portfolio showcasing projects and expertise (previous version).", github: "https://github.com/Koala3353/portfolio", preview: "https://koala3353.github.io/portfolio/", category: "Web" },
      { title: "Klick N Code", description: "Business website/shop showcasing services, projects, and statistics for freelance development business.", github: "https://github.com/Koala3353/website-shop", preview: "https://koala3353.github.io/klickncode/", category: "Web" },
      { title: "Dashboard Template", description: "Reusable dashboard template designed for Discord bots needing an online dashboard interface.", github: "https://github.com/Koala3353/dashboard-template", preview: "https://koala3353.github.io/dashboard-template/", category: "Web" },
    ],
  },
  {
    year: "2023",
    label: "GRADE 11",
    subtitle: "Achieved proficiency in Discord bot development with high-value client projects.",
    projects: [
      { title: "3v3 Rank Discord Bot", description: "Paid bot facilitating 3v3 ranked matches with a queue system where up to six users can join or leave.", github: "https://github.com/Koala3353/Xero_Competitive", category: "Bots" },
      { title: "TRF Discord Bot", description: "Paid bot sending daily questionnaires and uploading responses to Airtable for an online community.", github: "https://github.com/Koala3353/TRF_Bot", category: "Bots" },
    ],
  },
  {
    year: "2022",
    label: "GRADE 10 · MOST PRODUCTIVE YEAR",
    subtitle: "Integrated databases and delivered numerous Discord bot solutions for international clients.",
    projects: [
      { title: "Resource Tracker Discord Bot", description: "Paid bot for managing RPG resources, currency, and rare items with admin controls for in-game events.", github: "https://github.com/Koala3353/role-playing-resource-tracker", category: "Bots" },
      { title: "BetDUX Discord Bot", description: "Paid bot for BetDEX that retrieves sports betting odds and manages user predictions with a leaderboard.", github: "https://github.com/Koala3353/BetDUX", category: "Bots" },
      { title: "Kaijuto Era Discord Bot", description: "Paid bot rewarding users with currency for gaming time, featuring a customizable shop with SQLite and Steam integration.", github: "https://github.com/Koala3353/Kaijuto-Era", category: "Bots" },
      { title: "Invite Tracker Discord Bot", description: "Paid referral system bot for Discord servers using SQLite to store and track invite counts.", github: "https://github.com/Koala3353/Invite-Tracker", category: "Bots" },
      { title: "Google Sheet Credentials Maker", description: "Java utility that creates the necessary credentials to use the Google Sheets API.", github: "https://github.com/Koala3353/Google-Sheet-Credentials-Maker", category: "Tools" },
      { title: "F1X Discord Bot", description: "Paid bot simulating a bank where users can apply for loans and admins can manage user balances.", github: "https://github.com/Koala3353/F1X-Bot", category: "Bots" },
    ],
  },
  {
    year: "2021",
    label: "WHERE IT ALL BEGAN",
    subtitle: "Started my programming journey with Java and Discord bots — the first builds that kicked everything off.",
    projects: [
      { title: "Ignite Discord Bot", description: "Multipurpose bot for a church (GCCP) managed Discord server with every feature imaginable.", github: "https://github.com/Koala3353/Ignite", category: "Bots" },
      { title: "ELO Discord Bot", description: "Paid bot that tracks and manages users' Elo ratings with commands to view and manipulate rankings.", github: "https://github.com/Koala3353/elo-bot", category: "Bots" },
      { title: "Fighting Discord Bot", description: "Paid RPG bot allowing users to collect items and join raids to fight custom-created monsters.", github: "https://github.com/Koala3353/fight-bot", category: "Bots" },
      { title: "Userphone Discord Bot", description: "Social bot promoting cross-server communication between strangers from different Discord servers.", github: "https://github.com/Koala3353/Userphone", category: "Bots" },
    ],
  },
];

const categories: Category[] = ["All", "Web", "AI", "Bots", "Tools"];

/* ── Components ── */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      className="glass-card rounded-2xl p-6 flex flex-col h-full hover:border-white/15 transition-colors"
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-accent/40 font-mono text-xs font-bold">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-muted uppercase tracking-wider font-medium">
          {project.category}
        </span>
      </div>
      <h3 className="text-lg font-bold text-foreground mb-2">{project.title}</h3>
      <p className="text-sm text-foreground/60 leading-relaxed mb-4 flex-1">
        {project.description}
      </p>
      <div className="flex gap-2 mt-auto">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-foreground/70 hover:text-foreground hover:bg-white/10 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          GitHub
        </a>
        {project.preview && (
          <a
            href={project.preview}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/20 text-accent hover:bg-accent/20 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Preview
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const [active, setActive] = useState<Category>("All");

  const filteredGroups = yearGroups
    .map((group) => ({
      ...group,
      projects:
        active === "All"
          ? group.projects
          : group.projects.filter((p) => p.category === active),
    }))
    .filter((group) => group.projects.length > 0);

  return (
    <div className="page-top section-padding px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-accent font-mono text-sm tracking-widest uppercase mb-4">
            My Work
          </p>
          <h1 className="font-bold tracking-tight mb-4">Projects Portfolio</h1>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            A hands-on archive of what I&apos;ve built — from full-stack
            operations platforms to hackathon-winning widgets. Spanning 2021 to
            today.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {[
            { value: "30+", label: "Projects Shipped" },
            { value: "5+", label: "Years Building" },
            { value: "2x", label: "Hackathon Bounties" },
            { value: "10+", label: "Tools & Languages" },
          ].map((stat) => (
            <div key={stat.label} className="glass-card rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-accent">{stat.value}</p>
              <p className="text-xs text-muted mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-2 mb-14 justify-center"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                active === cat
                  ? "bg-accent text-white"
                  : "bg-white/5 text-muted hover:text-foreground hover:bg-white/10 border border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Year Sections */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filteredGroups.map((group) => (
              <motion.section
                key={group.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className="mb-16"
              >
                {/* Year Header */}
                <div className="text-center mb-8">
                  {group.label && (
                    <span className="inline-block px-3 py-1 mb-3 text-[10px] font-bold text-muted uppercase tracking-widest rounded-full bg-white/5 border border-white/10">
                      {group.label}
                    </span>
                  )}
                  <h2 className="font-bold tracking-tight text-foreground">
                    {group.year}
                  </h2>
                  <p className="text-muted text-sm mt-1 max-w-xl mx-auto">
                    {group.subtitle}
                  </p>
                </div>

                {/* Project Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {group.projects.map((project, i) => (
                    <ProjectCard key={project.title} project={project} index={i} />
                  ))}
                </div>
              </motion.section>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-2xl p-8 md:p-12 text-center mt-8"
        >
          <h2 className="font-bold tracking-tight mb-3">
            Interested in working together?
          </h2>
          <p className="text-muted mb-6">
            Reach out and let&apos;s build something impactful.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-medium rounded-lg hover:bg-accent/90 transition-colors"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>
    </div>
  );
}
