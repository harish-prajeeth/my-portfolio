import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";

const certifications = [
  {
    title: "Machine Learning Internship",
    issuer: "Completion Certificate",
    company: "Gradtwin",
    date: "Jul 2026",
    icon: "🤖",
  },
  {
    title: "Data Analytics Internship",
    issuer: "Completion Certificate",
    company: "IBM Cognos",
    date: "Apr 2026",
    icon: "📊",
  },
  {
    title: "Web Development Internship",
    issuer: "Completion Certificate",
    company: "Litz Tech",
    date: "Jul 2025",
    icon: "💻",
  },
];

const interests = [
  "Full Stack Development — REST APIs & Microservices",
  "Machine Learning — Predictive Modeling, Neural Nets, Model Distillation & Deployment",
  "APIs, Auth, Performance",
];

const Certifications = () => {
  return (
    <section id="certifications" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-orbitron text-xs tracking-[0.3em] text-primary mb-3">05 // CERTIFICATIONS</p>
          <h2 className="font-orbitron text-4xl sm:text-5xl font-bold text-glow">Certifications</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {certifications.map((cert, i) => (
            <motion.div
              key={`${cert.title}-${i}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass glass-hover rounded-xl p-6 flex flex-col items-center text-center transition-all duration-400 group"
            >
              <div className="text-3xl mb-3">{cert.icon}</div>
              <Award className="w-5 h-5 text-primary mb-3 opacity-70" />
              <h3 className="font-orbitron text-sm font-bold text-foreground mb-1 group-hover:text-primary transition-colors leading-tight">
                {cert.title}
              </h3>
              <p className="font-inter text-xs text-muted-foreground mt-1">{cert.issuer}</p>
              <p className="font-inter text-xs text-primary/70 mt-0.5">{cert.company}</p>
              <span className="mt-3 text-[10px] font-orbitron px-2.5 py-1 rounded-full bg-primary/10 text-primary tracking-wider">
                {cert.date}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Interests */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="glass rounded-xl p-8"
        >
          <h3 className="font-orbitron text-sm font-bold text-primary mb-5 tracking-wider">INTERESTS</h3>
          <ul className="space-y-3">
            {interests.map((interest, i) => (
              <li key={i} className="flex items-start gap-3 font-inter text-sm text-muted-foreground">
                <span className="text-primary mt-1 flex-shrink-0">▸</span>
                {interest}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
