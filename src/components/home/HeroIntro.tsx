"use client";

import { motion, useReducedMotion } from "motion/react";

/** Staggered entrance for the hero column. Static under reduced motion. */
export default function HeroIntro({ children, className }: { children: React.ReactNode[]; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div className={className}>
      {children.map((child, i) => (
        <motion.div
          key={i}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
