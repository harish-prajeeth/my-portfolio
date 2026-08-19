"use client";

import { motion } from "framer-motion";
import { experience } from "@/lib/data";
import LightSpotlightCard from "../shared/LightSpotlightCard";

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="section-inner">
        <span className="eyebrow">Professional Experience</span>
        <h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
          Three internships, one throughline
        </h2>

        <div className="relative mt-16">
          {/* Animated Timeline Line with Gradient Light */}
          <div className="absolute left-[15px] top-0 h-full w-0.5 bg-gradient-to-b from-emerald via-gold to-transparent sm:left-[19px] shadow-[0_0_12px_rgba(16,185,129,0.5)]" />

          <div className="flex flex-col gap-10">
            {experience.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="relative pl-10 sm:pl-14"
              >
                {/* Glowing Node Marker */}
                <span className="absolute left-0 top-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-emerald bg-surface font-mono text-xs font-bold text-emerald shadow-[0_0_15px_rgba(16,185,129,0.5)] sm:h-10 sm:w-10">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <LightSpotlightCard className="p-7">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-xl font-semibold text-white">
                      {exp.role}
                    </h3>
                    <span className="font-mono text-xs font-medium text-gold border border-gold/30 bg-gold/10 px-2.5 py-1 rounded-full shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                      {exp.period}
                    </span>
                  </div>
                  <div className="mt-1 font-mono text-sm text-emerald/90">
                    {exp.org} — <span className="text-muted">{exp.location}</span>
                  </div>
                  <ul className="mt-5 space-y-2.5">
                    {exp.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex gap-2.5 text-sm leading-relaxed text-muted"
                      >
                        <span className="mt-1 text-emerald font-bold">▸</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="mt-5 inline-block rounded-full border border-emerald/30 bg-emerald/10 px-3.5 py-1 font-mono text-[11px] text-emerald shadow-[0_0_12px_rgba(16,185,129,0.2)]">
                    {exp.stage}
                  </span>
                </LightSpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
