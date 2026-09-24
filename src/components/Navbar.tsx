"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CaretDown, CircleHalf, List, MagnifyingGlass, Moon, Sun, X } from "@phosphor-icons/react";
import { primaryNav, secondaryNav } from "@/lib/site";
import { useTheme } from "./theme";
import CommandMenu from "./CommandMenu";

function ThemeButton() {
  const { pref, cycle } = useTheme();
  const Icon = pref === "light" ? Sun : pref === "dark" ? Moon : CircleHalf;
  return (
    <button
      onClick={cycle}
      className="grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-fg"
      aria-label={`Theme: ${pref}. Click to change.`}
      title={`Theme: ${pref}`}
    >
      <Icon size={18} />
    </button>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  const closeCmd = useCallback(() => setCmdOpen(false), []);
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  // Close menus on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing UI to navigation
    setMobileOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  // Global shortcuts: Cmd/Ctrl+K for the command menu, Escape closes menus
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdOpen((o) => !o);
      } else if (e.key === "Escape") {
        setMoreOpen(false);
        setMobileOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  // Lock page scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const moreActive = secondaryNav.some((l) => l.href !== "/contact" && isActive(l.href));

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/75 backdrop-blur-xl">
        <nav className="container-page flex h-16 items-center justify-between gap-4" aria-label="Primary">
          <Link href="/" className="font-semibold tracking-tight text-fg">
            Keene Brigado
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {primaryNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`relative rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                  isActive(link.href) ? "text-fg" : "text-muted hover:text-fg"
                }`}
              >
                {isActive(link.href) && (
                  <motion.span
                    layoutId={reduce ? undefined : "nav-pill"}
                    className="absolute inset-0 -z-10 rounded-full bg-surface-2"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                {link.label}
              </Link>
            ))}

            <div ref={moreRef} className="relative">
              <button
                onClick={() => setMoreOpen((o) => !o)}
                aria-expanded={moreOpen}
                aria-haspopup="true"
                className={`flex items-center gap-1 rounded-full px-3.5 py-1.5 text-sm transition-colors hover:text-fg ${
                  moreActive ? "text-fg" : "text-muted"
                }`}
              >
                More
                <CaretDown size={12} className={`transition-transform ${moreOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={reduce ? false : { opacity: 0, y: -4, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.98 }}
                    transition={{ duration: 0.16 }}
                    className="surface absolute right-0 top-full mt-2 w-48 origin-top-right p-1.5"
                  >
                    {secondaryNav
                      .filter((l) => l.href !== "/contact")
                      .map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          aria-current={isActive(link.href) ? "page" : undefined}
                          className={`block rounded-xl px-3 py-2 text-sm transition-colors ${
                            isActive(link.href) ? "bg-surface-2 text-fg" : "text-muted hover:bg-surface-2 hover:text-fg"
                          }`}
                        >
                          {link.label}
                        </Link>
                      ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCmdOpen(true)}
              className="hidden h-9 items-center gap-2 rounded-full border border-line px-3 text-sm text-subtle transition-colors hover:text-fg lg:flex"
              aria-label="Open command menu"
            >
              <MagnifyingGlass size={15} />
              <kbd className="font-mono text-xs">⌘K</kbd>
            </button>
            <button
              onClick={() => setCmdOpen(true)}
              className="grid size-9 place-items-center rounded-full text-muted hover:bg-surface-2 hover:text-fg lg:hidden"
              aria-label="Open command menu"
            >
              <MagnifyingGlass size={18} />
            </button>
            <ThemeButton />
            <Link href="/contact" className="btn btn-primary ml-2 hidden h-9 px-4 text-sm md:inline-flex">
              Get in touch
            </Link>
            <button
              className="grid size-9 place-items-center rounded-full text-fg md:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <List size={20} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden
            />
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              initial={reduce ? { opacity: 0 } : { x: "100%" }}
              animate={reduce ? { opacity: 1 } : { x: 0 }}
              exit={reduce ? { opacity: 0 } : { x: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 38 }}
              className="fixed inset-y-0 right-0 z-50 flex w-[min(20rem,85vw)] flex-col border-l border-line bg-surface md:hidden"
            >
              <div className="flex h-16 items-center justify-between px-5">
                <span className="text-sm text-muted">Menu</span>
                <button
                  autoFocus
                  onClick={() => setMobileOpen(false)}
                  className="grid size-9 place-items-center rounded-full hover:bg-surface-2"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3">
                {[{ href: "/", label: "Home" }, ...primaryNav, ...secondaryNav.filter((l) => l.href !== "/contact")].map(
                  (link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={isActive(link.href) ? "page" : undefined}
                      className={`rounded-xl px-4 py-3 text-lg transition-colors ${
                        isActive(link.href) ? "bg-surface-2 text-fg" : "text-muted hover:text-fg"
                      }`}
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </div>
              <div className="p-5">
                <Link href="/contact" className="btn btn-primary w-full">
                  Get in touch
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CommandMenu open={cmdOpen} onClose={closeCmd} />
    </>
  );
}
