"use client";

import { motion } from "framer-motion";
import { Mail, Terminal as TerminalIcon } from "lucide-react";

export default function ContactTerminal() {
  return (
    <section className="py-24 px-6 max-w-4xl mx-auto flex justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="glass-card rounded-2xl w-full max-w-2xl overflow-hidden shadow-[0_0_50px_rgba(41,151,255,0.05)] border border-white/10"
      >
        {/* Terminal Header */}
        <div className="bg-white/5 border-b border-white/10 p-4 flex items-center gap-3">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex-1 text-center flex items-center justify-center gap-2 text-muted font-mono text-sm">
            <TerminalIcon className="w-4 h-4" />
            <span>init_outreach.sh</span>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-8 md:p-12 flex flex-col items-center text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 tracking-tight">
            Ready to Build the <span className="text-accent">Future</span>?
          </h2>
          <p className="text-foreground/80 mb-8 max-w-md mx-auto leading-relaxed">
            I am actively seeking internships at fast-paced, origin-story-driven companies (like NEXPO) where I can leverage code, operations, and AI to scale impact.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <a
              href="mailto:brigadokeene@gmail.com"
              className="flex items-center justify-center gap-2 bg-foreground text-background px-6 py-3 rounded-lg font-medium hover:bg-foreground/90 transition-colors"
            >
              <Mail className="w-5 h-5" />
              Email Me
            </a>
            <a
              href="https://linkedin.com/in/keene-brigado"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-foreground px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              LinkedIn
            </a>
            <a
              href="https://github.com/Koala3353"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-foreground px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </a>
          </div>

          <div className="mt-12 text-left w-full border-t border-white/10 pt-6 font-mono text-xs text-muted flex flex-col gap-2">
            <p><span className="text-accent">~</span> $ echo "Let's connect."</p>
            <p className="opacity-70">Looking forward to bridging the gap together.</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
