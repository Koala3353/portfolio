"use client";

import { motion } from "framer-motion";
import { useState } from "react";

/* ── Animation Variants ── */
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

/* ── Social Links Data ── */
const socials = [
  {
    label: "Email",
    href: "mailto:brigadokeene@gmail.com",
    display: "brigadokeene@gmail.com",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/keene-brigado",
    display: "keene-brigado",
    external: true,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/Koala3353",
    display: "Koala3353",
    external: true,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("loading");

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbySc20ht17M5_nN1J_4khKAyDJewNazERoj2cZBrfu64L1DLm5v_uB4M3hfZbDVeLAx/exec",
        {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // With no-cors, we can't read the response, but if it didn't throw, it likely succeeded.
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <main className="page-top section-padding px-6">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto"
      >
        {/* ── Two-Column Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* ── Left Column: Info & Social ── */}
          <motion.div variants={item} className="flex flex-col justify-center">
            <p className="font-mono text-sm text-accent mb-4 tracking-wide">
              <span className="text-muted">~/</span>contact
            </p>

            <h1 className="font-bold tracking-tight mb-6">
              Let&apos;s{" "}
              <span className="text-accent">Connect</span>
            </h1>

            <p className="text-foreground/80 leading-relaxed text-lg mb-10 max-w-lg">
              I&apos;m actively seeking internships at fast-paced,
              origin-story-driven companies where I can leverage code,
              operations, and AI to scale impact.
            </p>

            {/* Social Links */}
            <div className="flex flex-col gap-3">
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.external ? "_blank" : undefined}
                  rel={social.external ? "noopener noreferrer" : undefined}
                  variants={item}
                  className="group flex items-center gap-4 glass-card rounded-xl px-5 py-4 hover:border-accent/30 transition-all duration-300"
                >
                  <span className="text-accent">{social.icon}</span>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted font-mono uppercase tracking-wider">
                      {social.label}
                    </span>
                    <span className="text-foreground group-hover:text-accent transition-colors text-sm">
                      {social.display}
                    </span>
                  </div>
                  <svg
                    className="w-4 h-4 ml-auto text-muted group-hover:text-accent group-hover:translate-x-1 transition-all"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* ── Right Column: Contact Form Terminal ── */}
          <motion.div
            variants={item}
            className="glass-card rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(41,151,255,0.06)] border border-white/10"
          >
            {/* Terminal Header */}
            <div className="bg-white/5 border-b border-white/10 p-4 flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 text-center flex items-center justify-center gap-2 text-muted font-mono text-sm">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>init_outreach.sh</span>
              </div>
            </div>

            {/* Form Body */}
            <form
              onSubmit={handleSubmit}
              className="p-6 md:p-8 flex flex-col gap-5"
            >
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="text-xs font-mono text-muted uppercase tracking-wider"
                >
                  <span className="text-accent">const</span> name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={status === "loading"}
                  required
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors w-full disabled:opacity-50"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-xs font-mono text-muted uppercase tracking-wider"
                >
                  <span className="text-accent">const</span> email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={status === "loading"}
                  required
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors w-full disabled:opacity-50"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-xs font-mono text-muted uppercase tracking-wider"
                >
                  <span className="text-accent">const</span> message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell me about your project or opportunity..."
                  value={formData.message}
                  onChange={handleChange}
                  disabled={status === "loading"}
                  required
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors w-full resize-none disabled:opacity-50"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className={`mt-2 font-medium px-6 py-3 rounded-lg transition-colors w-full flex items-center justify-center gap-2 min-h-[44px] ${
                  status === "success"
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : status === "error"
                    ? "bg-red-500/20 text-red-400 border border-red-500/30"
                    : "bg-accent hover:bg-accent/90 text-white disabled:bg-accent/50 disabled:cursor-not-allowed"
                }`}
              >
                {status === "loading" ? (
                  <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : status === "success" ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Message Sent!
                  </>
                ) : status === "error" ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Error sending message
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                    Send Message
                  </>
                )}
              </button>

              {/* Note */}
              <p className="text-xs text-muted/60 text-center font-mono">
                {status === "success"
                  ? "Thanks for reaching out! I'll get back to you soon."
                  : "Form submissions are forwarded to my email."}
              </p>
            </form>
          </motion.div>
        </div>

        {/* ── Terminal Footer ── */}
        <motion.div
          variants={item}
          className="mt-16 border-t border-white/10 pt-8 font-mono text-sm text-muted"
        >
          <p>
            <span className="text-accent">~</span> $ echo &quot;Looking forward
            to building together.&quot;
          </p>
          <p className="mt-2 text-foreground/60">
            Looking forward to building together.
          </p>
        </motion.div>
      </motion.div>
    </main>
  );
}
