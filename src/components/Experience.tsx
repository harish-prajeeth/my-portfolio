import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    role: "Machine Learning Intern",
    company: "Gradtwin, Chennai",
    period: "Jun 2026 – Jul 2026",
    bullets: [
      "Compressed a large teacher model into a lightweight student model while preserving accuracy for faster inference, model while targeting a Full-Stack, or ML Developer role.",
      "Built the end-to-end training pipeline in Python: data prep, teacher–student loss configuration, and evaluation.",
      "Recognized by HR for dedication, professionalism, and technical contribution.",
    ],
    icon: "🤖",
  },
  {
    role: "Data Analytics Intern",
    company: "IBM Cognos Analytics, Coimbatore",
    period: "Mar 2026 – Apr 2026",
    bullets: [
      "Built multi-source datasets and authored reports aligned with enterprise BI standards.",
      "Supported decision-making dashboards to visualize operational KPIs.",
      "Collaborated on AI-powered analytics at IBM Cognos Analytics Ltd.",
    ],
    icon: "📊",
  },
  {
    role: "Web Development Intern",
    company: "Litz Tech, Coimbatore",
    period: "Jul 2025 (15 days)",
    bullets: [
      "Shipped responsive client-facing pages with HTML5, CSS3, and JavaScript for production.",
      "Collaborated with a 4-developer team on Git/GitHub, fixed UI defects, and optimized landing page performance.",
    ],
    icon: "💻",
  },
];

const education = {
  degree: "B.E. Computer Science & Engineering",
  institution: "Nadar Saraswathi College of Engineering and Technology, Theni",
  period: "Expected May 2027",
  coursework: [
    "DSA",
    "DBMS",
    "Networks",
    "Software Engineering",
    "Web Technologies",
    "Advanced Python",
    "Computer Vision",
  ],
};

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
          <h2 className="font-orbitron text-4xl sm:text-5xl font-bold text-glow">Projects Completed</h2>
        </motion.div>

        <div className="space-y-6">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.role}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass glass-hover rounded-xl p-8 transition-all duration-400"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 text-xl">
                  {exp.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-orbitron text-xl font-bold text-foreground">{exp.role}</h3>
                  <p className="font-orbitron text-sm text-primary mt-1">{exp.company}</p>
                  <div className="flex flex-wrap gap-4 mt-2 font-inter text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-primary/60" /> {exp.period}
                    </span>
                  </div>
                  <ul className="mt-5 space-y-3 font-inter text-sm text-muted-foreground">
                    {exp.bullets.map((b, j) => (
                      <li key={j} className="flex gap-3">
                        <span className="text-primary mt-1">▸</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45 }}
            className="glass glass-hover rounded-xl p-8 transition-all duration-400"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🎓</span>
              </div>
              <div>
                <h3 className="font-orbitron text-xl font-bold text-foreground">{education.degree}</h3>
                <p className="font-orbitron text-sm text-primary mt-1">{education.institution}</p>
                <p className="font-inter text-xs text-muted-foreground mt-2 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-primary/60" /> {education.period}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {education.coursework.map((c) => (
                    <span key={c} className="text-[10px] font-inter px-2.5 py-1 rounded-full bg-secondary text-muted-foreground border border-border">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
