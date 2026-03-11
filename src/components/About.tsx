import { motion } from "framer-motion";
import { MapPin, GraduationCap, Code2 } from "lucide-react";

const stats = [
  { label: "Projects Built", value: "3+" },
  { label: "Tech Stack", value: "10+" },
  { label: "Internship", value: "1" },
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
          <h2 className="font-orbitron text-4xl sm:text-5xl font-bold text-glow">The Striker</h2>
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
              Computer Science student focused on <span className="text-primary font-semibold">Full-Stack Web Development</span>, 
              with hands-on experience building responsive frontends and RESTful backends using React, Node.js, Express, 
              and SQL/NoSQL databases. Experienced in deploying small-scale web apps and collaborating in Git-based workflows.
            </p>
            <p className="font-inter text-muted-foreground leading-relaxed text-base mt-4">
              Like a Blue Lock striker chasing the ultimate goal, I create powerful and scalable digital solutions. 
              Seeking a <span className="text-primary font-semibold">Full-Stack Developer Internship</span> to apply skills in building, 
              testing, and optimizing end-to-end web applications.
            </p>

            <div className="flex flex-wrap gap-4 mt-6 text-sm font-inter">
              <span className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" /> Theni, Tamil Nadu
              </span>
              <span className="flex items-center gap-2 text-muted-foreground">
                <GraduationCap className="w-4 h-4 text-primary" /> B.E. CSE (2027)
              </span>
              <span className="flex items-center gap-2 text-muted-foreground">
                <Code2 className="w-4 h-4 text-primary" /> Full-Stack Developer
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
