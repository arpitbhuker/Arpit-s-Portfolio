import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Phone, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative py-16 border-t border-border/50">
      <div className="absolute inset-0 bg-gradient-dark"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Left: Branding & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4">
              <span className="gradient-text">Arpit</span>
            </h3>
            <p className="text-white mb-6 leading-relaxed">
              Always eager to collaborate on cutting-edge projects and innovative data-driven solutions.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="outline"
                size="icon"
                className="border-primary/50 hover:bg-primary/10 hover-3d"
                onClick={() => window.open("https://www.linkedin.com/in/arpitbhuker/", "_blank")}
              >
                <Linkedin size={20} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-primary/50 hover:bg-primary/10 hover-3d"
                onClick={() => window.open("https://github.com/arpitbhuker", "_blank")}
              >
                <Github size={20} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-primary/50 hover:bg-primary/10 hover-3d"
                onClick={() => window.open("mailto:arpitkumarbhuker@gmail.com", "_blank")}
              >
                <Mail size={20} />
              </Button>
            </div>
          </motion.div>

          {/* Center: Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-6 text-primary">Quick Links</h4>
            <nav className="space-y-3">
              {quickLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="block text-white hover:text-primary transition-colors duration-300"
                >
                  {link.name}
                </button>
              ))}
            </nav>
          </motion.div>

          {/* Right: Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-6 text-primary">Get In Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-white">
                <Mail size={16} className="text-primary" />
                <span className="text-sm">arpitkumarbhuker@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 text-white">
                <Phone size={16} className="text-primary" />
                <span className="text-sm">+91 8168759378</span>
              </div>
            </div>
            
            <div className="mt-6 glass-card p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-400">Available for Opportunities</span>
              </div>
              <p className="text-xs text-white">
                Open to internships and full-time roles in AI/ML & Data Science
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-border/50 text-center"
        >
          <p className="text-muted-foreground text-sm flex items-center justify-center">
            Made by Arpit
            <span className="mx-2">•</span>
            © {new Date().getFullYear()} All rights reserved
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 