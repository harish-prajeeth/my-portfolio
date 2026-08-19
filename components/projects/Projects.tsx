"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/data";
import Pipeline from "./Pipeline";
import LightSpotlightCard from "../shared/LightSpotlightCard";

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="section">
      <div className="section-inner">
        <span className="eyebrow">Production Systems & Projects</span>
        <h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
          Engineered for scale & edge deployment
        </h2>

        {/* Featured Projects Grid */}
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {featured.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <LightSpotlightCard
                spotlightColor="rgba(16, 185, 129, 0.25)"
                className="glow-border flex flex-col justify-between h-full p-8"
              >
                <div>
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-2xl font-semibold text-white">
                      {p.name}
                    </h3>
                    <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 font-mono text-[11px] text-gold shadow-[0_0_12px_rgba(212,175,55,0.25)]">
                      ★ featured
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{p.tagline}</p>

                  {p.pipeline && <Pipeline stages={p.pipeline} />}

                  <ul className="mt-6 space-y-2.5">
                    {p.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex gap-2.5 text-sm leading-relaxed text-muted"
                      >
                        <span className="mt-1 text-emerald">▸</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-5 border-t border-white/10 flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-emerald/20 bg-emerald/5 px-3 py-1 font-mono text-[11px] text-emerald"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {p.links && p.links.length > 0 && (
                    <div className="flex items-center gap-3">
                      {p.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="group inline-flex items-center gap-2 rounded-lg border border-emerald/40 bg-emerald/10 px-4 py-2 font-mono text-xs font-medium text-emerald transition-all duration-300 hover:bg-emerald hover:text-bg hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                        >
                          <span>{link.label}</span>
                          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </LightSpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* Additional Projects Grid */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {rest.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <LightSpotlightCard
                spotlightColor="rgba(212, 175, 55, 0.18)"
                className="flex flex-col justify-between h-full p-6"
              >
                <div>
                  <h3 className="font-display text-lg font-medium text-white">{p.name}</h3>
                  <p className="mt-1 text-xs text-muted">{p.tagline}</p>
                  <ul className="mt-4 space-y-2">
                    {p.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex gap-2 text-xs leading-relaxed text-muted"
                      >
                        <span className="mt-0.5 text-emerald">▸</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-3 border-t border-white/10 flex flex-col gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-white/10 bg-black/20 px-2.5 py-0.5 font-mono text-[10px] text-muted"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {p.links && p.links.length > 0 && (
                    <div className="flex items-center gap-2">
                      {p.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="group inline-flex items-center gap-1.5 rounded border border-white/15 bg-surface px-3 py-1 font-mono text-[11px] text-white/90 transition-all duration-300 hover:border-emerald hover:text-emerald"
                        >
                          <span>{link.label}</span>
                          <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </LightSpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
