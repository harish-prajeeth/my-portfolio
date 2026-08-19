"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certs" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a
        href="#hero"
        className="fixed left-6 top-6 z-40 hidden font-mono text-sm font-medium tracking-tight text-white/90 sm:block"
      >
        HP<span className="text-emerald">.</span>
      </a>
      <nav className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex">
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="group flex items-center gap-2.5"
          >
            <span
              className={`font-mono text-[11px] opacity-0 transition-opacity group-hover:opacity-100 ${
                active === s.id ? "text-emerald" : "text-muted"
              }`}
            >
              {s.label}
            </span>
            <span
              className={`h-1.5 w-1.5 rounded-full transition-all ${
                active === s.id
                  ? "scale-150 bg-emerald"
                  : "bg-white/20 group-hover:bg-white/50"
              }`}
            />
          </a>
        ))}
      </nav>
    </>
  );
}
