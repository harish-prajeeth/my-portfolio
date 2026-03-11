import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Languages",
    skills: ["JavaScript", "Python", "C", "Java"],
  },
  {
    title: "Frontend",
    skills: ["HTML5", "CSS3", "React", "Responsive Design"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express", "Flask"],
  },
  {
    title: "Databases",
    skills: ["MongoDB", "PostgreSQL", "SQLite"],
  },
  {
    title: "Tools",
    skills: ["Git", "GitHub", "VS Code", "Postman"],
  },
  {
    title: "Interests",
    skills: ["RESTful APIs", "ML Models", "Microservices"],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-orbitron text-xs tracking-[0.3em] text-primary mb-3">02 // SKILLS</p>
          <h2 className="font-orbitron text-4xl sm:text-5xl font-bold text-glow">Developer Weapons</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass glass-hover rounded-xl p-6 transition-all duration-400"
            >
              <h3 className="font-orbitron text-sm font-bold text-primary mb-4 tracking-wider">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-inter text-xs px-3 py-1.5 rounded-full bg-secondary text-muted-foreground border border-border hover:border-primary/40 hover:text-primary transition-colors duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
