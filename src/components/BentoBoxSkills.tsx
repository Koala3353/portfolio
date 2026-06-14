"use client";

import { motion } from "framer-motion";
import { Code2, Cog, Bot } from "lucide-react";

const skills = [
  {
    title: "Development",
    icon: <Code2 className="w-6 h-6 text-accent mb-4" />,
    items: ["React", "Next.js", "HTML/CSS", "Git", "Google Apps Script", "Python"],
    className: "col-span-1 md:col-span-2 row-span-1",
  },
  {
    title: "Operations & Logic",
    icon: <Cog className="w-6 h-6 text-accent mb-4" />,
    items: ["Market Research", "Capacity Modeling", "Process Optimization", "Financial Modeling"],
    className: "col-span-1 md:col-span-1 row-span-2",
  },
  {
    title: "AI Workflows",
    icon: <Bot className="w-6 h-6 text-accent mb-4" />,
    items: ["Claude Code", "Gemini", "Claude Cowork", "Agentic Automation"],
    className: "col-span-1 md:col-span-2 row-span-1",
  },
];

export default function BentoBoxSkills() {
  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-12 tracking-tight">
          Multidimensional <span className="text-muted">Capabilities</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`glass-card rounded-3xl p-8 flex flex-col justify-between hover:border-white/20 transition-colors duration-300 ${skill.className}`}
            >
              <div>
                {skill.icon}
                <h3 className="text-xl font-semibold mb-4 text-foreground">{skill.title}</h3>
              </div>
              <ul className="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm px-3 py-1 rounded-full bg-white/5 border border-white/10 text-foreground/80"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
