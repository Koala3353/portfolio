"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Layers, Terminal } from "lucide-react";
import React, { useRef } from "react";

const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={`glass-card rounded-3xl p-8 relative overflow-hidden group ${className}`}
    >
      <div style={{ transform: "translateZ(50px)" }} className="h-full flex flex-col">
        {children}
      </div>
    </motion.div>
  );
};

export default function ProjectGrid() {
  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-12 tracking-tight">
          Featured <span className="text-muted">Engineering</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 auto-rows-[400px]">
          {/* Project 1: Budge */}
          <div className="lg:col-span-3 h-full" style={{ perspective: "1000px" }}>
            <TiltCard className="h-full">
              <div className="flex items-center justify-between mb-6">
                <Layers className="w-8 h-8 text-accent" />
                <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                  <ExternalLink className="w-5 h-5 text-foreground/80" />
                </a>
              </div>
              <h3 className="text-3xl font-bold mb-4">Budge</h3>
              <p className="text-foreground/80 text-lg mb-8 max-w-md">
                A full-stack web application designed with an emphasis on seamless UI/UX and core feature accessibility. 
                Built to be highly performant, ensuring fluid interactions and state management across all user touchpoints.
              </p>
              <div className="mt-auto flex flex-wrap gap-2">
                {["React", "Next.js", "Tailwind", "Framer Motion"].map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-foreground/70">
                    {tag}
                  </span>
                ))}
              </div>
            </TiltCard>
          </div>

          {/* Project 2: Corporate Web Portal Integration */}
          <div className="lg:col-span-2 h-full" style={{ perspective: "1000px" }}>
            <TiltCard className="h-full">
              <div className="flex items-center justify-between mb-6">
                <Terminal className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Ritual Matcha Portals</h3>
              <p className="text-foreground/80 mb-6">
                Architected and deployed a multi-module Corporate Web Portal Integration. Successfully optimized preexisting codebases and implemented complex features—including real-time inventory tracking, PO receiving pipelines, and automated lot code generation—without breaking legacy systems.
              </p>
              <div className="mt-auto flex flex-wrap gap-2">
                {["Google Apps Script", "JavaScript", "Legacy Integration", "Operations"].map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-foreground/70">
                    {tag}
                  </span>
                ))}
              </div>
            </TiltCard>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
