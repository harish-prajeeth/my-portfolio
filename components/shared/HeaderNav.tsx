"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";

const NAV_ITEMS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certs" },
  { id: "contact", label: "Contact" },
];

export default function HeaderNav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 25,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Scroll Progress Light Beam Bar */}
      <motion.div
        className="h-[2px] w-full origin-left bg-gradient-to-r from-emerald via-gold to-cyan shadow-[0_0_12px_rgba(16,185,129,0.8)]"
        style={{ scaleX }}
      />

      <div
        className={`mx-auto flex max-w-6xl items-center justify-between px-6 py-4 transition-all duration-300 ${
          scrolled
            ? "my-2 rounded-full border border-white/10 bg-surface/80 px-6 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <a
          href="#hero"
          className="group flex items-center gap-2 font-display text-lg font-bold tracking-tight text-white"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald/20 border border-emerald/40 text-emerald transition-transform group-hover:scale-110 shadow-[0_0_12px_rgba(16,185,129,0.3)]">
            H
          </span>
          <span>
            Harish<span className="text-emerald">.</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-1 sm:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`relative px-3.5 py-1.5 font-mono text-xs transition-colors ${
                  isActive ? "text-white font-medium" : "text-muted hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavLight"
                    className="absolute inset-0 rounded-full bg-emerald/15 border border-emerald/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-emerald/20 px-4 py-1.5 font-mono text-xs font-medium text-emerald border border-emerald/40 shadow-[0_0_15px_rgba(16,185,129,0.25)] transition-all hover:bg-emerald hover:text-bg hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]"
          >
            <span className="h-2 w-2 rounded-full bg-emerald animate-ping" />
            <span>Hire Me</span>
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-8 w-8 flex-col items-center justify-center gap-1 rounded-lg border border-white/10 bg-surface-2 p-1.5 text-white sm:hidden"
            aria-label="Toggle Navigation Menu"
          >
            <span
              className={`h-0.5 w-4 bg-white transition-transform ${
                mobileMenuOpen ? "translate-y-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-4 bg-white transition-opacity ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-4 bg-white transition-transform ${
                mobileMenuOpen ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="mx-4 mt-2 rounded-2xl border border-white/15 bg-surface/95 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:hidden"
          >
            <nav className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-4 py-2.5 font-mono text-sm transition-colors ${
                      isActive
                        ? "bg-emerald/15 text-emerald font-semibold border border-emerald/30"
                        : "text-muted hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="h-1.5 w-1.5 rounded-full bg-emerald" />}
                  </a>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
