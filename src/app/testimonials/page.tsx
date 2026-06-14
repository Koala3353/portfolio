"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/* ── Data ── */
interface Testimonial {
  quote: string;
  name: string;
  title: string;
  relationship: string;
  date: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "I had the pleasure of working with Keene to create my website, thelittlebakerkitchen.com, and I couldn't be happier with the result. Keene brought my vision to life exactly how I wanted, clean, engaging, and perfectly aligned with my brand. He's not only skilled in web design and development but also incredibly easy to work with. Keene communicated clearly, responded quickly, and paid close attention to every detail throughout the process. I highly recommend him to anyone looking for a dependable and creative web developer who truly cares about their client's satisfaction.",
    name: "Brent Clarence Chua",
    title: "Pastry Chef",
    relationship: "Brent was Keene's client",
    date: "Oct 22, 2025",
  },
  {
    quote:
      "I had the pleasure of supervising Keene Xander during his internship with our Facilities Management team. From day one, Keene showed a strong sense of initiative and picked up tasks quickly, often needing very little supervision. He understood instructions clearly and could work independently, which made him a real asset to our team. What stood out most was his technical capability and positive attitude—not just toward his work but also in how he collaborated with colleagues. He even contributed beyond his main duties, helping the Purchasing Department and improving the efficiency of our internal trackers. Keene's performance speaks volumes about his potential, and I'm confident he has a solid foundation for professional growth. He'd be a great addition to any team.",
    name: "Melvin Martinez",
    title: "Registered Electrical Engineer",
    relationship: "Melvin managed Keene directly",
    date: "Jul 10, 2025",
  },
];

/* ── Quote Card ── */
function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="glass-card rounded-2xl p-8 md:p-12 relative overflow-hidden"
    >
      {/* Subtle gradient accent */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      {/* Opening quote mark */}
      <span
        className="block text-accent/20 text-[8rem] md:text-[10rem] leading-none font-serif select-none -mb-16 md:-mb-20 -ml-2"
        aria-hidden="true"
      >
        &ldquo;
      </span>

      {/* Quote text */}
      <blockquote className="relative z-10">
        <p className="text-base md:text-lg lg:text-xl leading-relaxed md:leading-relaxed text-foreground/85 font-light">
          {testimonial.quote}
        </p>
      </blockquote>

      {/* Attribution */}
      <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <p className="text-lg font-bold text-foreground">
            {testimonial.name}
          </p>
          <p className="text-sm text-accent font-medium">
            {testimonial.title}
          </p>
          <p className="text-sm text-muted mt-0.5">{testimonial.relationship}</p>
        </div>
        <span className="text-sm text-muted whitespace-nowrap">
          {testimonial.date}
        </span>
      </div>
    </motion.div>
  );
}

/* ── Page ── */
export default function TestimonialsPage() {
  return (
    <div className="page-top pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12 md:mb-16"
        >
          <p className="text-accent font-mono text-sm tracking-widest uppercase mb-4">
            What People Say
          </p>
          <h1 className="font-bold tracking-tight text-glow mb-4">
            Testimonials
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
            Recommendations from clients and supervisors who&apos;ve seen the
            work firsthand.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-8 md:gap-10 mb-16 md:mb-20">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} testimonial={t} index={i} />
          ))}
        </div>

        {/* LinkedIn CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-2xl p-8 md:p-10 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
          <div className="relative z-10">
            <h2 className="font-bold tracking-tight mb-3">
              See more on{" "}
              <span className="text-accent">LinkedIn</span>
            </h2>
            <p className="text-muted mb-6 max-w-lg mx-auto">
              Read additional recommendations and endorsements on my LinkedIn
              profile.
            </p>
            <a
              href="https://linkedin.com/in/keene-brigado"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-medium rounded-lg hover:bg-accent/90 transition-colors"
            >
              View LinkedIn Recommendations
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        {/* Bottom spacer */}
        <div className="h-16 md:h-24" />
      </div>
    </div>
  );
}
