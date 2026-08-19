"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const BOOT_LINES = [
  "booting harish.dev",
  "loading modules: react, node, python",
  "compiling knowledge-distillation pipeline",
  "calibrating computer vision stack",
  "ready",
];

export default function Loader({ onDone }: { onDone: () => void }) {
  const [lineIndex, setLineIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (lineIndex >= BOOT_LINES.length) {
      const t = setTimeout(() => {
        setVisible(false);
        setTimeout(onDone, 700);
      }, 350);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setLineIndex((i) => i + 1), 260);
    return () => clearTimeout(t);
  }, [lineIndex, onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          <div className="w-[min(520px,86vw)] font-mono text-sm text-muted">
            {BOOT_LINES.slice(0, lineIndex).map((line, i) => (
              <div key={i} className="mb-1 flex gap-2">
                <span className="text-emerald">$</span>
                <span className={i === BOOT_LINES.length - 1 ? "text-gold" : ""}>
                  {line}
                </span>
              </div>
            ))}
            <span className="inline-block h-4 w-2 animate-pulse bg-emerald align-middle" />
          </div>
          <div className="mt-8 h-px w-[min(320px,60vw)] overflow-hidden bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald to-gold"
              initial={{ width: "0%" }}
              animate={{ width: `${(lineIndex / BOOT_LINES.length) * 100}%` }}
              transition={{ duration: 0.25 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
