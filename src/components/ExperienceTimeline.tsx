"use client";

import { motion } from "framer-motion";

type TimelineItem = {
  year: string;
  title: string;
  organization: string;
  description: string;
  category: "work" | "education" | "award";
};

const timelineData: TimelineItem[] = [
  {
    year: "Mar 2026",
    title: "Sales Operations Consultant",
    organization: "Ritual Matcha Co.",
    description: "Architected an end-to-end automated inventory and procurement system using Google Apps Script, achieving 100% real-time stock visibility and eliminating manual purchase orders.",
    category: "work",
  },
  {
    year: "Mar 2026",
    title: "National Semifinalist (Top 24)",
    organization: "L'Oréal Brandstorm 2026",
    description: "Spearheaded strategy as Team Leader, placing in the top 0.5% of 30,000+ innovators nationwide. Represented Ateneo de Manila as one of the youngest teams.",
    category: "award",
  },
  {
    year: "Jan 2026",
    title: "Growth Analyst Intern",
    organization: "GoRocky",
    description: "Engineered a strategic financial model for a joint venture projecting ₱1.7M monthly EBITDA, and orchestrated a 50+ member digital migration with zero downtime.",
    category: "work",
  },
  {
    year: "Dec 2025",
    title: "2x Bounty Winner",
    organization: "Ship or Be Shipped 2025 Hackathon",
    description: "Developed and pitched a production-ready React widget for Ripe providing real-time stablecoin-to-fiat transparency against legacy banking rates.",
    category: "award",
  },
  {
    year: "Oct 2025",
    title: "ACTS '25 Semifinalist (Top 25)",
    organization: "Nestlé Philippines",
    description: "Led a team in developing innovative business solutions promoting transformational sustainability for the Ateneo Challenge for Transformational Sustainability.",
    category: "award",
  },
  {
    year: "Jul 2025",
    title: "BS Management Engineering",
    organization: "Ateneo de Manila University",
    description: "Started university journey. Later recognized on the Director's List (Mar 2025) as a top academic and extracurricular leader.",
    category: "education",
  },
  {
    year: "Jun 2025",
    title: "Data Processing Consultant",
    organization: "Amada Corporation",
    description: "Reduced reporting cycle time by 94% by architecting an automated validation workflow that eliminated manual entry bottlenecks.",
    category: "work",
  },
  {
    year: "Feb 2025",
    title: "5th Place, Innovation Project",
    organization: "FLL Philippines 2025",
    description: "Software Architect for BlueHaven, a climate-tech solution integrating IoT sensors, Python/Tkinter visualization, and OpenAI analytics for marine ecosystems.",
    category: "award",
  },
  {
    year: "Aug 2024",
    title: "Top 25-80 Bracket (Out of 2,000)",
    organization: "Hack Club Arcade Showcase",
    description: "Showcased AI-powered technical projects to a global developer community, gaining live feedback and placement for creativity and technical execution.",
    category: "award",
  },
  {
    year: "May 2024",
    title: "7th Place Internationally",
    organization: "FLL Open European Championship",
    description: "Lead Developer for an EdTech solution integrating AI chord detection, computer vision, and dynamic dashboards via MongoDB and GSAP. (Represented the Philippines after placing 1st Nationally in Feb 2024).",
    category: "award",
  },
  {
    year: "Mar 2021",
    title: "Founder & Principal Developer",
    organization: "Klick n Code",
    description: "Generated $3,000+ revenue scaling custom Discord bots, full-stack websites, and automation solutions for international retail and gaming clients.",
    category: "work",
  },
];

export default function ExperienceTimeline() {
  return (
    <section className="py-24 px-6 max-w-4xl mx-auto relative">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-16 tracking-tight text-center">
          Experience & <span className="text-muted">Trajectory</span>
        </h2>

        <div className="relative border-l-2 border-white/10 ml-4 md:ml-0 md:left-1/2 md:-translate-x-[1px] space-y-12">
          {timelineData.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${
                  isEven ? "md:justify-start" : "md:justify-end"
                }`}
              >
                {/* Glowing Node */}
                <div className="absolute left-[-9px] md:left-1/2 md:-ml-[9px] top-1 md:top-1/2 md:-mt-[9px] w-4 h-4 rounded-full bg-background border-2 border-accent shadow-[0_0_15px_rgba(41,151,255,0.8)] z-10" />

                {/* Content Card */}
                <div
                  className={`ml-8 md:ml-0 md:w-[45%] glass-panel rounded-2xl p-6 hover:bg-white/[0.03] transition-colors ${
                    isEven ? "md:pr-8" : "md:pl-8"
                  }`}
                >
                  <div className="flex flex-col gap-1 mb-3">
                    <span className="text-accent font-mono text-sm tracking-widest uppercase">
                      {item.year}
                    </span>
                    <h3 className="text-xl font-bold text-foreground">
                      {item.title}
                    </h3>
                    <span className="text-muted font-medium text-sm">
                      {item.organization}
                    </span>
                  </div>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
