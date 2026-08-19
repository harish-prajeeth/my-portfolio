"use client";

import { useState } from "react";
import Loader from "@/components/shared/Loader";
import HeaderNav from "@/components/shared/HeaderNav";
import FixedCosmicBackground from "@/components/shared/FixedCosmicBackground";
import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import Skills from "@/components/skills/Skills";
import Experience from "@/components/experience/Experience";
import Projects from "@/components/projects/Projects";
import Certifications from "@/components/certifications/Certifications";
import Contact from "@/components/contact/Contact";
import Outro from "@/components/shared/Outro";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loader onDone={() => setLoading(false)} />}
      {!loading && <HeaderNav />}
      <FixedCosmicBackground />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Contact />
        <Outro />
      </main>
    </>
  );
}
