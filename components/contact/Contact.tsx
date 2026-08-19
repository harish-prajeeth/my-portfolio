"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "@/lib/data";
import LightSpotlightCard from "../shared/LightSpotlightCard";

const LINKS = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "GitHub", value: "github.com/harish-prajeeth", href: profile.github },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/harish-prajeeth-a-s",
    href: profile.linkedin,
  },
  { label: "Resume", value: "download PDF", href: "/resume.pdf" },
];

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    setTimeout(() => {
      setStatus("sent");
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    }, 900);
  };

  return (
    <section id="contact" className="section">
      <div className="section-inner">
        <span className="eyebrow">Contact & Transmission</span>
        <h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
          Open a direct channel
        </h2>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          {/* Interactive Link Terminal */}
          <div className="card overflow-hidden border border-emerald/30 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
            <div className="flex items-center gap-2 border-b border-white/10 bg-black/40 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red/80 shadow-[0_0_8px_#ef4444]" />
              <span className="h-3 w-3 rounded-full bg-gold/80 shadow-[0_0_8px_#d4af37]" />
              <span className="h-3 w-3 rounded-full bg-emerald/80 shadow-[0_0_8px_#10b981]" />
              <span className="ml-3 font-mono text-xs text-muted">
                ~/contact-terminal
              </span>
            </div>
            <div className="p-6 font-mono text-sm">
              {LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group mb-3.5 flex items-center justify-between gap-4 rounded-xl border border-transparent px-4 py-3 transition-all duration-300 last:mb-0 hover:border-emerald/30 hover:bg-emerald/10 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                >
                  <span className="font-semibold text-emerald">{l.label}</span>
                  <span className="truncate text-muted group-hover:text-white transition-colors">
                    {l.value} →
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Message Transmission Form */}
          <LightSpotlightCard className="p-7">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="mb-1.5 block font-mono text-xs text-muted">
                  name
                </label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-[var(--r-sm)] border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-emerald focus:shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="mb-1.5 block font-mono text-xs text-muted">
                  email
                </label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-[var(--r-sm)] border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-emerald focus:shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="mb-1.5 block font-mono text-xs text-muted">
                  message
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="w-full resize-none rounded-[var(--r-sm)] border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-emerald focus:shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                  placeholder="Let's talk about..."
                />
              </div>
              <button
                type="submit"
                disabled={status !== "idle"}
                className="group relative mt-2 overflow-hidden rounded-[var(--r-sm)] bg-emerald px-6 py-3.5 font-display font-medium text-bg shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all duration-300 hover:shadow-[0_0_35px_rgba(16,185,129,0.7)] hover:-translate-y-0.5 disabled:opacity-70"
              >
                <AnimatePresence mode="wait">
                  {status === "idle" && (
                    <motion.span key="idle" exit={{ opacity: 0 }} className="flex items-center justify-center gap-2">
                      Transmit message
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </motion.span>
                  )}
                  {status === "sending" && (
                    <motion.span
                      key="sending"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-bg border-t-transparent" />
                      Transmitting…
                    </motion.span>
                  )}
                  {status === "sent" && (
                    <motion.span
                      key="sent"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      Sent ✓ opening mail client
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </form>
          </LightSpotlightCard>
        </div>
      </div>
    </section>
  );
}
