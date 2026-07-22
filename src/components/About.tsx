import { motion } from "framer-motion";
import { MapPin, GraduationCap, Code2 } from "lucide-react";

const stats = [
  { label: "Projects Built", value: "6+" },
  { label: "Tech Stack", value: "15+" },
  { label: "Internships", value: "3" },
  { label: "Graduating", value: "2027" },
];

const About = () => {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-orbitron text-xs tracking-[0.3em] text-primary mb-3">01 // ABOUT</p>
          <h2 className="font-orbitron text-4xl sm:text-5xl font-bold text-glow">AI/ML Engineer</h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 glass rounded-xl p-8"
          >
            <p className="font-inter text-muted-foreground leading-relaxed text-base">
              <strong className="text-foreground font-semibold">Computer Science undergraduate</strong> pursuing a B.E. in Computer Science &amp; Engineering, specializing in <span className="text-primary font-semibold">Artificial Intelligence, Machine Learning, and Full-Stack Development</span>. Experienced in building intelligent, scalable applications using <strong className="text-foreground font-semibold">React, Node.js, Express.js, Python, FastAPI, Flask, MongoDB, and SQL</strong>.
            </p>
            <p className="font-inter text-muted-foreground leading-relaxed text-base mt-4">
              Completed <span className="text-primary font-semibold">three internships</span> across <strong className="text-foreground font-semibold">AI/ML model optimization, enterprise business intelligence, and full-stack web development</strong>, delivering real-world solutions from concept to deployment. Developed projects including a <strong className="text-foreground font-semibold">knowledge distillation platform for edge AI</strong>, <strong className="text-foreground font-semibold">computer vision systems</strong>, and <strong className="text-foreground font-semibold">AI-powered web applications</strong>, with a strong focus on performance, usability, and scalability.
            </p>

            <div className="flex flex-col gap-2.5 mt-6 text-sm font-inter">
              <span className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary shrink-0" /> Theni, Tamil Nadu
              </span>
              <span className="flex items-center gap-2 text-muted-foreground">
                <GraduationCap className="w-4 h-4 text-primary shrink-0" /> B.E. Computer Science &amp; Engineering (Expected 2027)
              </span>
              <span className="flex items-center gap-2 text-muted-foreground">
                <Code2 className="w-4 h-4 text-primary shrink-0" /> AI &amp; Machine Learning Engineer
              </span>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 grid grid-cols-2 gap-4"
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="glass glass-hover rounded-xl p-6 text-center transition-all duration-400"
              >
                <p className="font-orbitron text-3xl font-bold text-primary">{stat.value}</p>
                <p className="font-inter text-xs text-muted-foreground mt-2 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
