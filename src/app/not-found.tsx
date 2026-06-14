"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SnakeGame from "@/components/SnakeGame";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto w-full flex flex-col items-center justify-center flex-1">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-glow mb-4">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground/90">
            Lost in the terminal
          </h2>
          <p className="text-muted text-lg max-w-md mx-auto mb-8">
            The page you're looking for doesn't exist. But hey, as long as you're here, why not play a quick game?
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-foreground font-medium rounded-lg hover:bg-white/10 transition-colors"
          >
            ← Back to Home
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-[500px]"
        >
          <SnakeGame />
        </motion.div>

      </div>
    </div>
  );
}
