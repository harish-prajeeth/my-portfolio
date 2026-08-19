"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillGraph } from "@/lib/data";

function layout(index: number, total: number) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  const radiusX = 42;
  const radiusY = 38;
  const x = 50 + radiusX * Math.cos(angle);
  const y = 50 + radiusY * Math.sin(angle);
  return { x, y };
}

export default function Skills() {
  const [active, setActive] = useState<string | null>(null);
  const total = skillGraph.length;

  return (
    <section id="skills" className="section">
      <div className="section-inner">
        <span className="eyebrow">Interactive Skill Graph</span>
        <h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
          A interconnected stack, not a static bar
        </h2>
        <p className="mt-4 max-w-xl text-muted">
          Hover any node to inspect technology stacks. Interconnected lines represent real-world toolchain integration across active projects.
        </p>

        <div className="relative mx-auto mt-14 aspect-square w-full max-w-[640px]">
          {/* SVG Light Connections with Dynamic Energy Pulse Beams */}
          <svg
            viewBox="0 0 100 100"
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
          >
            <defs>
              <linearGradient id="lineGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.8" />
              </linearGradient>
              <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="0.8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Static Connection Lines */}
            {skillGraph.map((cat, i) => {
              const a = layout(i, total);
              const b = layout((i + 1) % total, total);
              const isConnected = active === cat.id || active === skillGraph[(i + 1) % total].id;
              return (
                <g key={cat.id}>
                  <line
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke={isConnected ? "url(#lineGlow)" : "#10B981"}
                    strokeOpacity={isConnected ? 0.8 : 0.2}
                    strokeWidth={isConnected ? 0.7 : 0.35}
                    filter={isConnected ? "url(#glowEffect)" : undefined}
                    className="transition-all duration-300"
                  />
                  {/* Energy Pulse Particle Traveling Along Connection */}
                  {isConnected && (
                    <circle r="0.8" fill="#D4AF37" filter="url(#glowEffect)">
                      <animateMotion
                        path={`M ${a.x} ${a.y} L ${b.x} ${b.y}`}
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                </g>
              );
            })}

            {/* Center Core Node */}
            <circle
              cx={50}
              cy={50}
              r={1.4}
              fill="#D4AF37"
              className="animate-pulse"
              filter="url(#glowEffect)"
            />
          </svg>

          {/* Interactive Skill Nodes */}
          {skillGraph.map((cat, i) => {
            const { x, y } = layout(i, total);
            const isActive = active === cat.id;
            return (
              <div
                key={cat.id}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${x}%`, top: `${y}%` }}
                onMouseEnter={() => setActive(cat.id)}
                onFocus={() => setActive(cat.id)}
                onMouseLeave={() => setActive((v) => (v === cat.id ? null : v))}
              >
                {/* Node Ring Light Pulse */}
                {isActive && (
                  <div
                    className="pointer-events-none absolute inset-0 -m-2 rounded-full animate-ping opacity-40"
                    style={{ background: cat.color }}
                  />
                )}

                <motion.button
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative z-10 flex items-center justify-center rounded-full px-4 py-2.5 text-xs font-medium backdrop-blur-md sm:text-sm transition-all duration-300 ${
                    isActive
                      ? "bg-surface-2 text-white font-semibold shadow-[0_0_25px_rgba(16,185,129,0.5)] border-2"
                      : "bg-surface/80 border border-white/10 text-muted hover:text-white"
                  }`}
                  style={{
                    borderColor: isActive ? cat.color : undefined,
                  }}
                >
                  <span
                    className="mr-2 h-2 w-2 rounded-full"
                    style={{ background: cat.color }}
                  />
                  {cat.label}
                </motion.button>

                {/* Tech Stack Popover Box */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.92 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.92 }}
                      transition={{ duration: 0.2 }}
                      className="card absolute left-1/2 top-full z-30 mt-3 w-max max-w-[240px] -translate-x-1/2 p-3.5 shadow-[0_0_30px_rgba(0,0,0,0.8)] border border-emerald/40"
                    >
                      <div className="flex flex-wrap justify-center gap-1.5">
                        {cat.items.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-emerald/30 bg-emerald/10 px-2.5 py-1 font-mono text-[11px] text-white shadow-[0_0_8px_rgba(16,185,129,0.2)]"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
