import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";

import {
  ChevronDown,
  Download,
  Github,
  Linkedin,
  Mail,
  Cpu,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";

import arpitProfile from "@/assets/arpit-profile-1.png";
import resumePDF from "@/assets/Resume.pdf";
import { LINKS } from "@/lib/constants";


/* ================================
   TYPEWRITER TEXT
================================ */

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

    const t = setTimeout(() => {
      let i = 0;

      const iv = setInterval(() => {
        i++;
        setDisplayedText(text.slice(0, i));
        if (i >= text.length) clearInterval(iv);
      }, delay);

      return () => clearInterval(iv);
    }, startDelay);

    return () => clearTimeout(t);
  }, [text, delay, startDelay]);

  return <span className={className}>{displayedText}</span>;
};


/* ================================
   PARTICLE FIELD
================================ */

const PARTICLE_COLORS = [
  [7, 212, 245],
  [77, 184, 247],
  [125, 211, 252],
];

const ParticleField = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 120 }, (_, i) => {
        const [r, g, b] = PARTICLE_COLORS[i % 3];
        const alpha = 0.35 + Math.random() * 0.5;

        return {
          id:       i,
          x:        Math.random() * 100,
          y:        Math.random() * 100,
          size:     1.2 + Math.random() * 2.8,
          alpha,
          duration: 8 + Math.random() * 9,
          delay:    Math.random() * 7,
          color:    `rgba(${r},${g},${b},${alpha})`,
          glow:     `rgba(${r},${g},${b},${alpha * 0.6})`,
        };
      }),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left:      `${p.x}%`,
            top:       `${p.y}%`,
            width:     p.size,
            height:    p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 4}px ${p.glow}`,
          }}
          animate={{
            y:       [0, -20, 0],
            opacity: [0.2, p.alpha, 0.2],
          }}
          transition={{
            duration: p.duration,
            delay:    p.delay,
            repeat:   Infinity,
            ease:     "easeInOut",
          }}
        />
      ))}
    </div>
  );
};


/* ================================
   3D TILT CARD
================================ */

const TiltCard = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), {
    stiffness: 180,
    damping:   22,
  });

  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), {
    stiffness: 180,
    damping:   22,
  });

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      x.set((e.clientX - rect.left) / rect.width  - 0.5);
      y.set((e.clientY - rect.top)  / rect.height - 0.5);
    },
    [x, y]
  );

  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective:    1200,
      }}
      className="relative"
    >
      {children}
    </motion.div>
  );
};


/* ================================
   HERO SECTION
================================ */

const Hero = () => {
  const scrollToNext = () =>
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });

  // ✅ FIXED: split into two objects — ms for TypewriterText, seconds for Framer Motion
  // Previously all in one T object which mixed units silently
  const TW = { hi: 0, name: 900, role: 1800, stack: 2750 }; // milliseconds
  const FM = { buttons: 4.4, resume: 4.9, scroll: 4.1 };    // seconds

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Dark base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, hsl(0 0% 1%) 0%, hsl(0 0% 2%) 60%, hsl(0 0% 3%) 100%)",
        }}
      />

      <ParticleField />

      {/* Bottom glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 35% at 50% 120%, rgba(7,212,245,0.055) 0%, transparent 65%)",
        }}
      />

      {/* Portfolio logo */}
      <motion.div
        className="absolute top-6 left-6 flex items-center gap-2 z-20 select-none hidden lg:flex"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        <div
          className="w-8 h-8 flex items-center justify-center bg-primary/10 rounded-full border border-primary/20"
          style={{ boxShadow: "0 0 14px rgba(7,212,245,0.22)" }}
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

      {/* MAIN GRID */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-7 items-center max-w-6xl mx-auto">

          {/* ── LEFT: Bio ── */}
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
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  background: "rgba(7,212,245,0.07)",
                  border:     "1px solid rgba(7,212,245,0.18)",
                  color:      "hsl(191 97% 68%)",
                }}
              >
                <span className="status-dot" />
                Available for Opportunities
              </span>
            </motion.div>

            {/* Heading */}
            <h1 className="text-4xl md:text-6xl font-bold mb-2 leading-snug">
              <TypewriterText
                text="Hi, I'm "
                delay={140}
                startDelay={TW.hi}
              />
              <span className="gradient-text">
                <TypewriterText
                  text="Arpit"
                  delay={160}
                  startDelay={TW.name}
                />
              </span>
            </h1>

            {/* Role + Stack */}
            <div className="flex flex-col items-center lg:items-start gap-1 mt-4 mb-7">
              <span className="text-xl md:text-2xl font-semibold text-gray-300">
                <TypewriterText
                  text="AI/ML Engineer | Data Analyst"
                  delay={40}
                  startDelay={TW.role}
                />
              </span>
              <span className="text-sm md:text-base text-gray-400">
                <TypewriterText
                  text="• Python • SQL • Machine Learning • Power BI"
                  delay={40}
                  startDelay={TW.stack}
                />
              </span>
            </div>

            {/* CTA Buttons — 2×2 grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: FM.buttons }}
              className="grid grid-cols-2 gap-3 w-full max-w-[360px] mx-auto lg:mx-0 mb-8"
            >
              <Button
                size="default"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground hover-3d"
                onClick={() => window.open(LINKS.linkedin, "_blank")}
              >
                <Linkedin size={18} className="mr-2" />
                LinkedIn
              </Button>

              <Button
                variant="outline"
                size="default"
                className="w-full border-primary/50 text-primary hover:bg-primary/10 hover-3d"
                onClick={() =>
                  window.open(LINKS.github, "_blank", "noopener,noreferrer")
                }
              >
                <Github size={18} className="mr-2" />
                GitHub
              </Button>

              <Button
                variant="outline"
                size="default"
                className="w-full border-primary/50 text-primary hover:bg-primary/10 hover-3d"
                onClick={() => window.open(LINKS.email.gmailCompose, "_blank")}
              >
                <Mail size={18} className="mr-2" />
                Email
              </Button>

              <a href={resumePDF} download="Arpit_Resume.pdf" className="w-full">
                <Button
                  size="default"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground hover-3d"
                >
                  <Download size={18} className="mr-2" />
                  Resume
                </Button>
              </a>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Photo ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <TiltCard>
              <div className="relative flex items-center justify-center">

                {/* Wide ambient glow behind figure */}
                <div
                  className="absolute pointer-events-none"
                  style={{
                    inset:      "-40px -30px -10px -30px",
                    background:
                      "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(7,212,245,0.16) 0%, rgba(77,184,247,0.14) 40%, transparent 70%)",
                    filter:     "blur(28px)",
                    zIndex:     0,
                  }}
                />

                {/* Photo */}
                <motion.img
                  src={arpitProfile}
                  alt="Arpit Bhuker — AI/ML Engineer & Data Analyst"
                  loading="eager"
                  className="w-[330px] sm:w-[340px] md:w-[360px] lg:w-[390px] object-cover"
                  style={{
                    transform: "translateZ(30px)",
                    filter:    "drop-shadow(0 28px 45px rgba(0,0,0,0.9))",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, black 60%, rgba(0,0,0,0.6) 82%, transparent 100%)",
                    maskImage:
                      "linear-gradient(to bottom, black 60%, rgba(0,0,0,0.6) 82%, transparent 100%)",
                  }}
                  initial={{ opacity: 0, scale: 0.92, y: 40 }}
                  animate={{ opacity: 1, scale: 1,    y: 0  }}
                  transition={{ duration: 1.1, ease: "easeOut" }}
                  whileHover={{ scale: 1.03 }}
                />

              </div>
            </TiltCard>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: FM.scroll }}
        onClick={scrollToNext}
        aria-label="Scroll to next section"
        className="hidden lg:block absolute bottom-8 left-1/2 -translate-x-1/2 text-primary animate-bounce z-20 cursor-pointer"
      >
        <ChevronDown size={32} />
      </motion.button>
    </section>
  );
};

export default Hero;