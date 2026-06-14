"use client";

import { motion } from "framer-motion";

export default function TextReveal({
  text,
  className = "",
  delay = 0,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}) {
  const words = text.split(" ");

  return (
    <Tag className={className}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.04, delayChildren: delay } },
        }}
        className="inline"
      >
        {words.map((word, wi) => (
          <span key={wi} className="inline-block whitespace-pre">
            {word.split("").map((char, ci) => (
              <motion.span
                key={`${wi}-${ci}`}
                variants={{
                  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
                  visible: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                  },
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
            {wi < words.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
