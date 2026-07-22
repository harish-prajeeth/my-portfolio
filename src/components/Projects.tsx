import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "DistilHub AI",
    description:
      "Multi-Objective Knowledge Distillation Platform — Built an Auto-AD platform compressing deep learning models for edge devices, featuring a QA suites and Docker containerization.",
    tech: ["Python", "React", "FastAPI", "ONNX", "Pytest"],
    icon: "🧠",
    urlProject: "distillation-ai-",
  },
  {
    title: "SmartCityAI",
    description:
      "Traffic Monitoring & Violation Detection System — Developed a high-performance computer vision pipeline using YOLOv11 Nano, TensorRT, and CUDA to track live vehicle speed and congestion. Automated a violation detection for wrong-way traffic and illegal parking, linking a FastAPI backend to a dashboard with PDF/CSV reports.",
    tech: ["Python", "YOLOv11", "TensorRT", "CUDA", "FastAPI"],
    icon: "🚦",
    urlProject: "SmartCityAI",
  },
  {
    title: "AI Stock Predictor",
    description:
      "Full-stack web app to track stock market data and provide simulated AI-driven price predictions and ROI simulations.",
    tech: ["Node.js", "Express", "MongoDB", "React", "Recharts"],
    icon: "📈",
    urlProject: "ai-stock-predictor",
  },
  {
    title: "Digital Doctor",
    description:
      "AI-integrated healthcare platform with role-based admin and patient dashboards, secure data management, authentication, and access control. Built with Flask, MongoDB and Node.js.",
    tech: ["Flask", "MongoDB", "Node.js", "React"],
    icon: "🩺",
    urlProject: "digital-doctor",
  },
  {
    title: "NeuroSim",
    description:
      "Decision simulation engine with a FastAPI backend producing explainable, confidence-aware recommendations rendered live in a React UI.",
    tech: ["Python", "FastAPI", "React"],
    icon: "⚡",
    urlProject: "Neurosim",
  },
  {
    title: "Jharkhand Tourism",
    description:
      "Mobile-first responsive tourism site showcasing attractions, culture, and travel info. Powered by a FastAPI content API and React UI.",
    tech: ["FastAPI", "React", "HTML", "CSS", "JavaScript"],
    icon: "🌍",
    urlProject: "Jharkand-Tourism",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-orbitron text-xs tracking-[0.3em] text-primary mb-3">03 // SELECTED PROJECTS</p>
          <h2 className="font-orbitron text-4xl sm:text-5xl font-bold text-glow">Featured Projects</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass glass-hover rounded-xl p-7 flex flex-col transition-all duration-400 group"
            >
              <div className="text-4xl mb-4">{project.icon}</div>
              <h3 className="font-orbitron text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="font-inter text-sm text-muted-foreground leading-relaxed flex-1">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {project.tech.map((t) => (
                  <span key={t} className="text-[10px] font-orbitron px-2 py-1 rounded bg-secondary text-primary/70 tracking-wider">
                    {t}
                  </span>
                ))}
              </div>
              <a
                href={`https://github.com/harish-prajeeth/${project.urlProject}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 mt-5 text-xs font-orbitron text-primary/60 hover:text-primary transition-colors tracking-wider"
              >
                <ExternalLink className="w-3.5 h-3.5" /> VIEW ON GITHUB
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
