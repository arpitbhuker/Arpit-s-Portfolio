import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ChevronDown, Download, Github, Linkedin, Mail, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect, useRef, useCallback } from "react";
import arpitProfile from "@/assets/arpit-profile.png";
import resumePDF from "@/assets/Resume.pdf";

// ─────────────────────────────────────────────
// TypewriterText — fixed stale closure bug
// ─────────────────────────────────────────────
interface TypewriterTextProps {
  text: string;
  delay?: number;
  startDelay?: number;
  className?: string;
}

const TypewriterText = ({
  text,
  delay = 100,
  startDelay = 0,
  className = "",
}: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");

    const startTimeout = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        index += 1;
        setDisplayedText(text.slice(0, index));
        if (index >= text.length) clearInterval(interval);
      }, delay);

      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(startTimeout);
  }, [text, delay, startDelay]);

  return <span className={className}>{displayedText}</span>;
};

// ─────────────────────────────────────────────
// 3D Tilt Card — pointer-tracked tilt effect
// ─────────────────────────────────────────────
const TiltCard = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      x.set((e.clientX - rect.left) / rect.width - 0.5);
      y.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1200 }}
      className="relative w-80 h-[420px] rounded-2xl cursor-pointer"
    >
      {children}
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// Hero Section
// ─────────────────────────────────────────────
const Hero = () => {
  const scrollToNext = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  // Stagger timing constants — single source of truth
  const T = {
    hi: 0,
    name: 900,
    role: 1800,
    stack: 2750,
    buttons: 4.4,
    resume: 4.9,
    scroll: 4.1,
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-dark" />

      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      {/* ── Portfolio Icon (top-left) ── */}
      <motion.div
        className="absolute top-6 left-6 flex items-center gap-2 z-20 select-none
                   hidden lg:flex"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
      >
        <div
          className="relative w-8 h-8 flex items-center justify-center
                      bg-primary/10 rounded-full border border-primary/20"
          style={{ boxShadow: "0 0 15px rgba(0, 200, 255, 0.35)" }}
        >
          <motion.div
            animate={{ rotateY: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <Cpu className="text-primary w-5 h-5" strokeWidth={1.8} />
          </motion.div>
        </div>
        <span className="text-lg font-semibold text-gray-200 tracking-wide">
          Portfolio
        </span>
      </motion.div>

      {/* ── Main Grid ── */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-7 items-center max-w-6xl mx-auto">

          {/* ── Left: Bio ── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-4"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Available for Opportunities
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-4xl md:text-6xl font-bold mb-2 leading-snug"
            >
              <TypewriterText text="Hi, I'm " delay={140} startDelay={T.hi} />
              <span className="gradient-text">
                <TypewriterText text="Arpit" delay={160} startDelay={T.name} />
              </span>
            </motion.h1>

            {/* Role + Stack */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              className="flex flex-col items-center lg:items-start gap-1 mt-4 mb-7"
            >
              <span className="text-xl md:text-2xl font-semibold text-gray-300">
                <TypewriterText
                  text="AI/ML Engineer | Data Analyst"
                  delay={40}
                  startDelay={T.role}
                />
              </span>
              <span className="text-sm md:text-base text-gray-400">
                <TypewriterText
                  text="• Python • SQL • Machine Learning • Power BI"
                  delay={40}
                  startDelay={T.stack}
                />
              </span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: T.buttons }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8"
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground hover-3d group"
                onClick={() =>
                  window.open("https://www.linkedin.com/in/arpitbhuker/", "_blank")
                }
              >
                <Linkedin size={20} className="mr-2 group-hover:scale-110 transition-transform" />
                LinkedIn
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-primary/50 text-primary hover:bg-primary/10 hover-3d group"
                onClick={() =>
                  window.open("https://github.com/arpitbhuker", "_blank", "noopener,noreferrer")
                }
              >
                <Github size={20} className="mr-2 group-hover:scale-110 transition-transform" />
                GitHub
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-primary/50 text-primary hover:bg-primary/10 hover-3d group"
                onClick={() => window.open("https://mail.google.com/mail/?view=cm&fs=1&to=arpitkumarbhuker@gmail.com&subject=Opportunity%20Regarding%20Your%20Portfolio","_blank")}
              >
                <Mail size={20} className="mr-2 group-hover:scale-110 transition-transform" />
                Email
              </Button>
            </motion.div>

            {/* Resume Download */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: T.resume }}
                className="glass-card p-4 rounded-lg inline-block"
              >
                <p className="text-sm text-muted-foreground mb-3">Download Resume</p>
                <a
                  href={resumePDF}
                  download="Arpit_Resume.pdf"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary hover:bg-primary/10 group"
                  >
                    <Download size={16} className="mr-2 group-hover:animate-bounce" />
                    PDF
                  </Button>
                </a>
              </motion.div>
            
          </motion.div>

          {/* ── Right: Profile Image with real 3D tilt ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <TiltCard>
              {/* Glow */}
              <div className="absolute -inset-10 bg-primary/10 blur-3xl rounded-full -z-30 pointer-events-none" />

              {/* Decorative frames */}
              <div className="absolute inset-0 -z-20 rounded-2xl border border-primary/20 -rotate-6 scale-95" />
              <div className="absolute inset-0 -z-10 rounded-2xl border border-accent/30 rotate-6 scale-105" />

              {/* Image */}
              <img
                src={arpitProfile}
                alt="Arpit Bhuker — AI/ML Engineer"
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
                style={{
                  transform: "translateZ(30px)",
                  filter: "drop-shadow(0 20px 25px rgba(0,0,0,0.5))",
                }}
                loading="eager"
              />

              {/* Subtle shimmer overlay on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary/0 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </TiltCard>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: T.scroll }}
        onClick={scrollToNext}
        aria-label="Scroll to next section"
        className="hidden lg:block absolute bottom-8 left-1/2 -translate-x-1/2 text-primary hover:text-primary/80 transition-colors animate-bounce"
      >
        <ChevronDown size={32} />
      </motion.button>
    </section>
  );
};

export default Hero;