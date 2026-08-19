"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Pipeline({ stages }: { stages: string[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="mt-5">
      <div className="flex flex-wrap items-center gap-1.5">
        {stages.map((stage, i) => {
          const isActive = active === i;
          return (
            <div key={stage} className="flex items-center gap-1.5">
              <button
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={`relative rounded-full px-3.5 py-1.5 font-mono text-[11px] transition-all duration-300 ${
                  isActive
                    ? "bg-emerald text-bg font-semibold shadow-[0_0_15px_rgba(16,185,129,0.6)]"
                    : "border border-white/10 bg-black/20 text-muted hover:border-emerald/40 hover:text-white"
                }`}
              >
                {stage}
              </button>
              {i < stages.length - 1 && (
                <span className={`transition-colors ${isActive ? "text-emerald font-bold" : "text-emerald/30"}`}>
                  →
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Pipeline Progress Light Flow Bar */}
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-3.5 h-1.5 w-full overflow-hidden rounded-full bg-white/5 p-0.5 border border-white/10"
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald via-gold to-cyan shadow-[0_0_12px_rgba(16,185,129,0.8)] transition-all duration-500 ease-out"
          style={{ width: `${((active + 1) / stages.length) * 100}%` }}
        />
      </motion.div>
    </div>
  );
}
