"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";

/**
 * Moves its children vertically as the element crosses the viewport.
 * `speed` is px of travel across the full pass: positive lags behind the page, negative runs ahead.
 * Optional `rotate` adds degrees of rotation across the pass. Static under reduced motion.
 */
export default function Parallax({
  children,
  speed = 60,
  rotate = 0,
  className,
}: {
  children: React.ReactNode;
  speed?: number;
  rotate?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const y = useTransform(smooth, [0, 1], [-speed / 2, speed / 2]);
  const r = useTransform(smooth, [0, 1], [-rotate / 2, rotate / 2]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduce ? undefined : { y, rotate: r }} className="h-full w-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
