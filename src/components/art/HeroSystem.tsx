"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";

/*
  Hero illustration: three systems (code, ops, AI) wired into one hub.
  Three depth layers (grid, wiring, nodes) move at different rates on scroll.
  Lines draw in on load; small packets travel the wires. All static under reduced motion.
*/

const HUB = { x: 300, y: 300 };
const NODES = [
  { id: "code", label: "code", x: 120, y: 150 },
  { id: "ops", label: "ops", x: 490, y: 210 },
  { id: "ai", label: "ai", x: 210, y: 480 },
];

const wire = (n: { x: number; y: number }) => {
  const mx = (n.x + HUB.x) / 2;
  return `M ${n.x} ${n.y} C ${mx} ${n.y}, ${mx} ${HUB.y}, ${HUB.x} ${HUB.y}`;
};

const draw = (delay: number) => ({
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  transition: { pathLength: { duration: 1.2, delay, ease: [0.65, 0, 0.35, 1] as const }, opacity: { duration: 0.2, delay } },
});

export default function HeroSystem({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const gridY = useTransform(p, [0, 1], [0, 24]);
  const wireY = useTransform(p, [0, 1], [0, 56]);
  const nodeY = useTransform(p, [0, 1], [0, 96]);
  const spin = useTransform(p, [0, 1], [0, 35]);

  const anim = (d: number) => (reduce ? {} : draw(d));

  return (
    <div ref={ref} className={className} aria-hidden="true">
      <svg viewBox="0 0 600 600" className="h-full w-full overflow-visible" fill="none">
        <defs>
          <pattern id="hs-dots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" className="fill-line" />
          </pattern>
          <radialGradient id="hs-fade" cx="50%" cy="50%" r="50%">
            <stop offset="55%" stopColor="white" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="hs-mask">
            <rect width="600" height="600" fill="url(#hs-fade)" />
          </mask>
        </defs>

        {/* Layer 1: dot grid + orbit (slowest) */}
        <motion.g style={reduce ? undefined : { y: gridY }}>
          <rect width="600" height="600" fill="url(#hs-dots)" mask="url(#hs-mask)" />
          <motion.g style={reduce ? undefined : { rotate: spin, originX: "300px", originY: "300px" }}>
            <circle cx={HUB.x} cy={HUB.y} r="190" className="stroke-line" strokeDasharray="2 10" strokeLinecap="round" />
            <circle cx={HUB.x} cy={HUB.y - 190} r="4" className="fill-subtle" />
          </motion.g>
          <circle cx={HUB.x} cy={HUB.y} r="120" className="stroke-line" />
        </motion.g>

        {/* Layer 2: wiring */}
        <motion.g style={reduce ? undefined : { y: wireY }}>
          {NODES.map((n, i) => (
            <g key={n.id}>
              <motion.path id={`hs-wire-${n.id}`} d={wire(n)} className="stroke-subtle" strokeWidth="1.5" {...anim(0.3 + i * 0.15)} />
              {!reduce && (
                <circle r="3.5" className="fill-accent">
                  <animateMotion dur={`${3.2 + i * 0.7}s`} begin={`${1.6 + i * 0.3}s`} repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                    <mpath href={`#hs-wire-${n.id}`} />
                  </animateMotion>
                </circle>
              )}
            </g>
          ))}
          {/* Output line from hub */}
          <motion.path d="M 300 300 L 300 380 Q 300 400 320 400 L 470 400" className="stroke-accent" strokeWidth="1.5" {...anim(1)} />
          <motion.circle cx="470" cy="400" r="5" className="fill-accent" initial={reduce ? false : { scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2, type: "spring", stiffness: 300, damping: 18 }} />
        </motion.g>

        {/* Layer 3: nodes + hub (fastest, closest) */}
        <motion.g style={reduce ? undefined : { y: nodeY }}>
          {NODES.map((n, i) => (
            <motion.g
              key={n.id}
              initial={reduce ? false : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.12, type: "spring", stiffness: 260, damping: 22 }}
              style={{ originX: `${n.x}px`, originY: `${n.y}px` }}
            >
              <rect x={n.x - 38} y={n.y - 18} width="76" height="36" rx="18" className="fill-surface stroke-line" strokeWidth="1" />
              <text x={n.x} y={n.y + 5} textAnchor="middle" className="fill-fg font-mono" fontSize="14">
                {n.label}
              </text>
            </motion.g>
          ))}
          <motion.g
            initial={reduce ? false : { opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, type: "spring", stiffness: 220, damping: 18 }}
            style={{ originX: "300px", originY: "300px" }}
          >
            <rect x="262" y="262" width="76" height="76" rx="20" className="fill-surface stroke-accent" strokeWidth="1.5" />
            <path d="M 284 300 L 296 312 L 318 288" className="stroke-accent" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </motion.g>
        </motion.g>
      </svg>
    </div>
  );
}
