"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { profile } from "@/lib/data";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden pt-16"
    >
      <div className="absolute inset-0">
        <HeroScene />
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, var(--bg) 80%)",
        }}
      />

      <div className="section-inner relative z-10 flex flex-col items-center px-4 text-center">
        {/* Availability Badge with Light Pulse */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mb-6 flex items-center gap-2.5 rounded-full border border-emerald/30 bg-emerald/10 px-4 py-1.5 font-mono text-xs text-emerald shadow-[0_0_20px_rgba(16,185,129,0.25)]"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald" />
          </span>
          <span>Available for Full-Stack & AI Roles — 2026</span>
        </motion.div>

        {/* Hero Title with Shine Light Animation */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[12vw] leading-[0.95] font-bold tracking-tight text-white sm:text-[7vw] md:text-[5.5vw]"
        >
          <span className="light-shine-text">{profile.name}</span>
        </motion.h1>

        {/* Roles List */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono text-sm text-muted sm:text-base"
        >
          {profile.roles.map((role, i) => (
            <span key={role} className="flex items-center gap-3">
              {i !== 0 && <span className="text-emerald/60">/</span>}
              <span className="transition-colors hover:text-emerald">{role}</span>
            </span>
          ))}
        </motion.div>

        {/* Call To Action Buttons with Light Glow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-5"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05, translateY: -2 }}
            whileTap={{ scale: 0.97 }}
            className="group relative overflow-hidden rounded-[var(--r-sm)] bg-emerald px-8 py-3.5 font-medium text-bg font-display shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all duration-300 hover:shadow-[0_0_45px_rgba(16,185,129,0.7)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              View Projects
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
          </motion.a>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, translateY: -2 }}
            whileTap={{ scale: 0.97 }}
            className="glow-border relative rounded-[var(--r-sm)] bg-surface-2/60 px-8 py-3.5 font-medium text-white font-display backdrop-blur-md transition-all duration-300 hover:bg-emerald/10 hover:border-emerald shadow-[0_0_20px_rgba(16,185,129,0.15)]"
          >
            Get in Touch
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll Down Light Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2 font-mono text-xs tracking-widest text-muted"
      >
        <span className="text-emerald">SCROLL</span>
        <div className="h-7 w-4 rounded-full border border-emerald/40 p-1 flex justify-center">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-emerald shadow-[0_0_8px_#10b981]"
          />
        </div>
      </motion.div>
    </section>
  );
}
