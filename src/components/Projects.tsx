import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "TaskFlow",
    description: "Full-stack task manager with user registration, login, and CRUD operations. RESTful API with Express and MongoDB, responsive React UI.",
    tech: ["React", "Node.js", "Express", "MongoDB", "REST API"],
    icon: "📋",
  },
  {
    title: "DevBlog",
    description: "Blogging platform where users create, edit, and delete posts. Server-side routing and templating with SQLite backend.",
    tech: ["HTML", "CSS", "JavaScript", "Node.js", "Express", "SQLite3"],
    icon: "📝",
  },
  {
    title: "ShopLite",
    description: "E-commerce prototype with product listing, cart management, and order placement. REST APIs integrated with React frontend.",
    tech: ["React", "Node.js", "Express", "PostgreSQL", "REST API"],
    icon: "🛒",
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
          <p className="font-orbitron text-xs tracking-[0.3em] text-primary mb-3">03 // PROJECTS</p>
          <h2 className="font-orbitron text-4xl sm:text-5xl font-bold text-glow">Scored Goals</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
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
                href={`https://github.com/harish-prajeeth`}
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
