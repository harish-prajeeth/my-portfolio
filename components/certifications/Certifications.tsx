"use client";

import { motion } from "framer-motion";
import { certifications } from "@/lib/data";
import LightSpotlightCard from "../shared/LightSpotlightCard";

export default function Certifications() {
  return (
    <section id="certifications" className="section">
      <div className="section-inner">
        <span className="eyebrow">Certifications</span>
        <h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
          Verified milestones
        </h2>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {certifications.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <LightSpotlightCard className="flex items-start justify-between gap-4 p-6">
                <div>
                  <h3 className="font-display text-base font-semibold text-white">
                    {c.title}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-muted">{c.org}</p>
                </div>
                <span className="whitespace-nowrap rounded-full border border-gold/30 bg-gold/10 px-3 py-1 font-mono text-xs text-gold shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                  {c.date}
                </span>
              </LightSpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
