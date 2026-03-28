import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

/* =========================================================
   CONSTANTS
========================================================= */

const QUICK_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const SOCIAL_LINKS = [
  {
    icon: Linkedin,
    url: "https://www.linkedin.com/in/arpitbhuker/",
  },
  {
    icon: Github,
    url: "https://github.com/arpitbhuker",
  },
  {
    icon: Mail,
    url: "https://mail.google.com/mail/?view=cm&fs=1&to=arpitkumarbhuker@gmail.com&subject=Opportunity%20Regarding%20Your%20Portfolio",
  },
];

/* =========================================================
   HELPERS
========================================================= */

const openExternal = (url: string) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

const scrollToSection = (href: string) => {
  const element = document.getElementById(href.replace("#", ""));
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

/* =========================================================
   NAV LINK COMPONENT (modular underline hover)
========================================================= */

const FooterNavLink = ({
  name,
  href,
}: {
  name: string;
  href: string;
}) => {
  return (
    <button
      onClick={() => scrollToSection(href)}
      className="group relative block text-white/80 transition-colors duration-300 hover:text-primary"
    >
      {name}

      {/* underline */}
      <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
    </button>
  );
};

/* =========================================================
   COMPONENT
========================================================= */

const Footer = () => {
  return (
    <footer className="relative py-16 border-t border-border/50">
      <div className="absolute inset-0 bg-gradient-dark" />

      <div className="container mx-auto px-6 relative z-10">

        <div className="grid md:grid-cols-[1fr_0.8fr_1.2fr] gap-12">

          {/* Left: Branding */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4">
              <span className="gradient-text">Arpit</span>
            </h3>

            <p className="text-white/85 mb-6 leading-relaxed">
              Always eager to collaborate on cutting-edge projects and
              innovative data-driven solutions.
            </p>

            <div className="flex gap-4">
              {SOCIAL_LINKS.map(({ icon: Icon, url }, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="icon"
                  className="border-primary/50 hover:bg-primary/10 hover-3d"
                  onClick={() => openExternal(url)}
                >
                  <Icon size={20} />
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Center: Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-6 text-primary">
              Quick Links
            </h4>

            <nav className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <FooterNavLink
                  key={link.name}
                  name={link.name}
                  href={link.href}
                />
              ))}
            </nav>
          </motion.div>

          {/* Right: Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-6 text-primary">
              Get In Touch
            </h4>

            <div className="space-y-3">

              <div className="flex items-center gap-3 text-white/85">
                <Mail size={16} className="text-primary" />
                <span className="text-sm">
                  arpitkumarbhuker@gmail.com
                </span>
              </div>

              <div className="flex items-center gap-3 text-white/85">
                <Phone size={16} className="text-primary" />
                <span className="text-sm">
                  +91 8168759378
                </span>
              </div>

            </div>

            <div
              className="relative mt-6 p-4 rounded-lg overflow-hidden"
              style={{
                background: "rgba(5,5,8,0.9)",
                border: "1px solid rgba(52,211,153,0.35)",
                backdropFilter: "blur(14px)",
                boxShadow:
                  "0 0 30px rgba(52,211,153,0.10), inset 0 1px 0 rgba(255,255,255,0.03)",
              }}
            >
              {/* emerald glow background */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(52,211,153,0.18) 0%, transparent 65%)",
                  opacity: 0.7,
                }}
              />

              {/* top accent line */}
              <div
                className="absolute top-0 left-4 right-4 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(52,211,153,0.6), transparent)",
                }}
              />

              <div className="relative z-10 flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-emerald-400">
                  Available for Opportunities
                </span>
              </div>

              <p className="relative z-10 text-xs text-white/80">
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
            © {new Date().getFullYear()} Arpit
            <span className="mx-2">•</span>
            Built with passion for AI & data
          </p>
        </motion.div>

      </div>
    </footer>
  );
};

export default Footer;