import { motion } from "framer-motion";
import { Mail, Phone, Github } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-orbitron text-xs tracking-[0.3em] text-primary mb-3">05 // CONTACT</p>
          <h2 className="font-orbitron text-4xl sm:text-5xl font-bold text-glow">Get In Touch</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-xl p-10 text-center"
        >
          <p className="font-inter text-muted-foreground mb-8 max-w-md mx-auto">
            Looking for an internship opportunity or want to collaborate on a project? Let's connect!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:harishprajeeth007@gmail.com"
              className="flex items-center gap-3 px-6 py-3 glass glass-hover rounded-lg transition-all duration-300 group"
            >
              <Mail className="w-5 h-5 text-primary" />
              <span className="font-inter text-sm text-muted-foreground group-hover:text-primary transition-colors">
                harishprajeeth007@gmail.com
              </span>
            </a>
            <a
              href="tel:+918925756476"
              className="flex items-center gap-3 px-6 py-3 glass glass-hover rounded-lg transition-all duration-300 group"
            >
              <Phone className="w-5 h-5 text-primary" />
              <span className="font-inter text-sm text-muted-foreground group-hover:text-primary transition-colors">
                +91 8925756476
              </span>
            </a>
          </div>

          <a
            href="https://github.com/harish-prajeeth"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 mt-6 px-6 py-3 glass glass-hover rounded-lg transition-all duration-300 group"
          >
            <Github className="w-5 h-5 text-primary" />
            <span className="font-inter text-sm text-muted-foreground group-hover:text-primary transition-colors">
              github.com/harish-prajeeth
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
