import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-30" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-orbitron text-xs tracking-[0.4em] text-primary mb-6 uppercase">
            Ego-Driven Developer
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-orbitron text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-none"
        >
          <span className="text-primary text-glow-strong" style={{ animation: "pulse-glow 2s infinite" }}>
            HARISH
          </span>
          <br />
          <span className="text-foreground">PRAJEETH</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="font-inter text-lg sm:text-xl text-muted-foreground mt-6 max-w-xl mx-auto"
        >
          Full-Stack Developer who turns ideas into winning digital goals.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="font-orbitron text-sm px-8 py-4 bg-primary text-primary-foreground font-bold tracking-wider hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)] hover:scale-105 transition-all duration-300 rounded-sm"
          >
            VIEW GOALS
          </a>
          <a
            href="#contact"
            className="font-orbitron text-sm px-8 py-4 border border-primary/30 text-primary hover:bg-primary/10 tracking-wider transition-all duration-300 rounded-sm"
          >
            CONTACT ME
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-5 h-8 border-2 border-primary/40 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-primary rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
