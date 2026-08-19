"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { timeline, profile } from "@/lib/data";
import LightSpotlightCard from "../shared/LightSpotlightCard";

const PRINCIPLES = [
  {
    title: "Measure before you optimize",
    body: "Distillation only matters if accuracy loss is quantified — every model I compress ships with an evaluation report, not a guess.",
  },
  {
    title: "Ship the whole pipeline",
    body: "Data prep, training, inference, and the dashboard that shows it working — a model alone isn't a product.",
  },
  {
    title: "Design for the edge case",
    body: "CUDA, TensorRT, and ONNX audits exist because production hardware is never as forgiving as a notebook.",
  },
];

export default function About() {
  const [open, setOpen] = useState<string>("ml");

  return (
    <section id="about" className="section">
      <div className="section-inner">
        <span className="eyebrow">About & Background</span>
        <h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
          From coursework to production pipelines
        </h2>
        <p className="mt-6 max-w-2xl text-muted leading-relaxed text-base sm:text-lg">
          {profile.summary}
        </p>

        {/* Interactive Timeline Tabs */}
        <div className="mt-16 grid gap-3 sm:grid-cols-5">
          {timeline.map((t, i) => {
            const isOpen = open === t.id;
            return (
              <motion.button
                key={t.id}
                onClick={() => setOpen(t.id)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className={`card relative flex flex-col items-start gap-2 p-5 text-left transition-all duration-300 ${
                  isOpen
                    ? "glow-border bg-surface-2/90 shadow-[0_0_25px_rgba(16,185,129,0.3)] border-emerald"
                    : "opacity-75 hover:opacity-100 hover:border-white/20"
                }`}
              >
                <span className="font-mono text-xs font-semibold text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-base font-medium text-white">
                  {t.label}
                </span>
                {i < timeline.length - 1 && (
                  <span className="absolute -right-2 top-1/2 hidden -translate-y-1/2 text-emerald/40 sm:block font-mono">
                    →
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Timeline Detail Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={open}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="card glow-border mt-4 p-7 text-white/90 leading-relaxed text-base shadow-[0_0_30px_rgba(16,185,129,0.15)]"
          >
            <div className="flex items-center gap-3 mb-2 font-mono text-xs text-emerald">
              <span className="h-2 w-2 rounded-full bg-emerald animate-ping" />
              <span>{timeline.find((t) => t.id === open)?.label} Overview</span>
            </div>
            {timeline.find((t) => t.id === open)?.detail}
          </motion.div>
        </AnimatePresence>

        {/* Engineering Philosophy Cards with LightSpotlight */}
        <div className="mt-24">
          <span className="eyebrow">Engineering Philosophy</span>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {PRINCIPLES.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <LightSpotlightCard className="h-full p-7">
                  <h3 className="font-display text-xl font-medium text-white">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {p.body}
                  </p>
                </LightSpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
