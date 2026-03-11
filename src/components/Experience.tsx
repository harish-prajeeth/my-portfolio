import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";

const Experience = () => {
  return (
    <section id="experience" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-orbitron text-xs tracking-[0.3em] text-primary mb-3">04 // EXPERIENCE</p>
          <h2 className="font-orbitron text-4xl sm:text-5xl font-bold text-glow">Matches Played</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass glass-hover rounded-xl p-8 transition-all duration-400"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Briefcase className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-orbitron text-xl font-bold text-foreground">Web Development Intern</h3>
              <p className="font-orbitron text-sm text-primary mt-1">Litz Tech</p>
              <div className="flex flex-wrap gap-4 mt-2 font-inter text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-primary/60" /> July 2025 (15 days)
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary/60" /> Coimbatore, India
                </span>
              </div>
              <ul className="mt-5 space-y-3 font-inter text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary mt-1">▸</span>
                  Built responsive web pages using HTML5, CSS3, and JavaScript for client-facing applications.
                </li>
                <li className="flex gap-3">
                  <span className="text-primary mt-1">▸</span>
                  Collaborated with a cross-functional team of 4 developers using Git and GitHub.
                </li>
                <li className="flex gap-3">
                  <span className="text-primary mt-1">▸</span>
                  Debugged UI issues and improved page load performance on key landing pages.
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="glass glass-hover rounded-xl p-8 mt-6 transition-all duration-400"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-xl">🎓</span>
            </div>
            <div>
              <h3 className="font-orbitron text-xl font-bold text-foreground">B.E. Computer Science & Engineering</h3>
              <p className="font-orbitron text-sm text-primary mt-1">Nadar Saraswathi College of Engineering and Technology</p>
              <p className="font-inter text-xs text-muted-foreground mt-2">Expected May 2027 · Theni, Tamil Nadu</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {["Data Structures", "Algorithms", "DBMS", "Networks", "Software Engineering", "Web Technologies"].map((c) => (
                  <span key={c} className="text-[10px] font-inter px-2.5 py-1 rounded-full bg-secondary text-muted-foreground border border-border">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
