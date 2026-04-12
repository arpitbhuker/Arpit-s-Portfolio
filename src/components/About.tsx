import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useAnimation,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Brain,
  BarChart3,
  MessageSquare,
  Code2,
  RefreshCw,
  Lightbulb,
  Database,
  PieChart,
  Cpu,
  Eye,
  FlaskConical,
  GitBranch,
} from "lucide-react";
import arpitProfile2 from "@/assets/arpit-profile-2.png";

/* ============================================================
   STATIC DATA
   ============================================================ */

const COLORS = ["amber","cyan","violet","emerald","rose"];

const SKILL_ITEMS = [
  { label: "Python", icon: Code2 },
  { label: "Machine Learning", icon: Brain },
  { label: "SQL & Databases", icon: Database },
  { label: "Advanced Excel", icon: BarChart3 },
  { label: "Power BI", icon: PieChart },

  { label: "Data Analysis", icon: BarChart3 },
  { label: "Feature Engineering", icon: Lightbulb },
  { label: "Model Evaluation", icon: Cpu },
  { label: "Computer Vision", icon: Eye },
  { label: "Natural Language Processing", icon: FlaskConical },

  { label: "Generative AI & LLMs", icon: Brain },
  { label: "API Integration", icon: GitBranch },
  { label: "Data Pipelines", icon: RefreshCw },
  { label: "Data Visualization", icon: PieChart },
  { label: "Experimentation & EDA", icon: FlaskConical },
].map((item, i) => ({
  ...item,
  color: COLORS[i % COLORS.length]
}));

// ── 5-color palette for marquee tags — all harmonious on black + cyan bg
const TAG_COLORS: Record<string, { text: string; border: string; bg: string; glow: string }> = {
  cyan:    { text: "hsl(191 97% 72%)",  border: "rgba(7,212,245,0.28)",   bg: "rgba(7,212,245,0.07)",   glow: "rgba(7,212,245,0.12)"   },
  amber:   { text: "hsl(38 95% 65%)",   border: "rgba(245,158,11,0.30)",  bg: "rgba(245,158,11,0.07)",  glow: "rgba(245,158,11,0.12)"  },
  violet:  { text: "hsl(262 83% 78%)",  border: "rgba(167,139,250,0.30)", bg: "rgba(167,139,250,0.07)", glow: "rgba(167,139,250,0.12)" },
  emerald: { text: "hsl(160 70% 58%)",  border: "rgba(52,211,153,0.28)",  bg: "rgba(52,211,153,0.07)",  glow: "rgba(52,211,153,0.12)"  },
  rose:    { text: "hsl(0 86% 73%)",    border: "rgba(248,113,113,0.28)", bg: "rgba(248,113,113,0.07)", glow: "rgba(248,113,113,0.12)" },
};

const EDUCATION_DATA = [
  {
    year:       "2020",
    degree:     "10th Grade",
    school:     "Gitanjali School",
    percentage: "84.6%",
    subjects:   undefined as string | undefined,
  },
  {
    year:       "2022",
    degree:     "12th Grade",
    school:     "Sharde Public School",
    percentage: "85.2%",
    subjects:   undefined as string | undefined,
  },
  {
    year:       "2022 – 2026",
    degree:     "B.E. CSE (AI & ML)",
    school:     "Chandigarh University",
    percentage: "CGPA: 8.06",
    subjects:   "ML · Deep Learning · DBMS · Data Mining · Data Structures · Computer Vision · NLP",
  },
];

// Education card accent colors — auto-assigned by index % length
const CARD_ACCENTS = [
  {
    year:    "#F59E0B", score:   "#FCD34D",
    border:  "rgba(245,158,11,0.22)",  borderH: "rgba(245,158,11,0.50)",
    glow:    "rgba(245,158,11,0.10)",  glowH:   "rgba(245,158,11,0.22)",
    dot:     "#F59E0B",                dotRing: "rgba(245,158,11,0.22)",
  },
  {
    year:    "#A78BFA", score:   "#C4B5FD",
    border:  "rgba(167,139,250,0.22)", borderH: "rgba(167,139,250,0.50)",
    glow:    "rgba(167,139,250,0.08)", glowH:   "rgba(167,139,250,0.20)",
    dot:     "#A78BFA",                dotRing: "rgba(167,139,250,0.22)",
  },
  {
    year:    "#34D399", score:   "#6EE7B7",
    border:  "rgba(52,211,153,0.22)",  borderH: "rgba(52,211,153,0.50)",
    glow:    "rgba(52,211,153,0.08)",  glowH:   "rgba(52,211,153,0.20)",
    dot:     "#34D399",                dotRing: "rgba(52,211,153,0.22)",
  },
  {
    year:    "#F87171", score:   "#FCA5A5",
    border:  "rgba(248,113,113,0.22)", borderH: "rgba(248,113,113,0.50)",
    glow:    "rgba(248,113,113,0.08)", glowH:   "rgba(248,113,113,0.20)",
    dot:     "#F87171",                dotRing: "rgba(248,113,113,0.22)",
  },
];

// SVG wave geometry
const NODES = [
  { cx: 165, cy: 58  },
  { cx: 545, cy: 102 },
  { cx: 925, cy: 54  },
];
const WAVE_PATH =
  "M 30 76 C 80 76,110 58,165 58 C 250 58,340 118,545 102 C 700 90,810 50,925 54 C 975 56,1030 56,1060 56";
const STEM_HEIGHT = 44;

/* ============================================================
   SKILL MARQUEE
   Each tag gets its own accent color from TAG_COLORS.
   Color cycles by SKILL_ITEMS index so it's content-independent.
   ============================================================ */
const SkillMarquee = () => {
  const [paused, setPaused] = useState(false);
  // Triple for seamless loop
  const items = [...SKILL_ITEMS, ...SKILL_ITEMS, ...SKILL_ITEMS];

  return (
    <div
      className="relative overflow-hidden w-full py-2"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Edge fades */}
      <div
        className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, hsl(210 6% 4%), transparent)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, hsl(210 6% 4%), transparent)" }}
      />

      <div
        className="flex gap-3 w-max"
        style={{
          animation:          "marquee-scroll 36s linear infinite",
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {items.map((item, i) => {
          const Icon  = item.icon;
          // Color based on original item index (i % SKILL_ITEMS.length) so
          // the tripled copies have the same colors as the originals
          const key   = SKILL_ITEMS[i % SKILL_ITEMS.length].color as keyof typeof TAG_COLORS;
          const col   = TAG_COLORS[key];
          return (
            <span
              key={i}
              className="flex items-center gap-2 whitespace-nowrap select-none rounded-full font-medium"
              style={{
                padding:     "8px 18px",
                fontSize:    "0.9rem",
                color:       col.text,
                border:      `1px solid ${col.border}`,
                background:  col.bg,
                boxShadow:   `0 0 8px ${col.glow}`,
                transition:  "all 0.18s ease",
              }}
            >
              <Icon size={15} strokeWidth={1.8} />
              {item.label}
            </span>
          );
        })}
      </div>
    </div>
  );
};

/* ============================================================
   EDUCATION CARD
   ============================================================ */
interface EduCardProps {
  item:      typeof EDUCATION_DATA[number];
  index:     number;
  visible:   boolean;
  scrollDir: "down" | "up";
}

const EducationCard = ({ item, index, visible, scrollDir }: EduCardProps) => {
  const accent = CARD_ACCENTS[index % CARD_ACCENTS.length];

  // Enter: left→right  (index 0 first, 100ms apart)
  // Exit:  right→left  (last index first, 80ms apart)
  const N         = EDUCATION_DATA.length;
  const enterDelay = 0.18 * index + 0.25;                   // 0ms, 100ms, 200ms
  const exitDelay = 0.16 * (N - 1 - index);         // 160ms, 80ms, 0ms

  const variants = {
    hidden: {
      opacity: 0,
      y:       scrollDir === "down" ? 20 : -20,
      scale:   0.95,
    },
    visible: {
      opacity: 1,
      y:       0,
      scale:   1,
      transition: {
        duration: 0.55,
        delay:    enterDelay,
        ease:     [0.22, 1, 0.36, 1] as [number,number,number,number],
      },
    },
    exit: {
      opacity: 0,
      y:       scrollDir === "down" ? -16 : 16,
      scale:   0.95,
      transition: {
        duration: 0.35,
        delay:    exitDelay,
        ease:     "easeIn" as const,
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate={visible ? "visible" : "exit"}
      className="rounded-xl p-3 sm:p-4 relative overflow-hidden group"
      style={{
        background:  "rgba(7,212,245,0.025)",
        border:      `1px solid ${accent.border}`,
        backdropFilter: "blur(10px)",
        boxShadow:   `0 2px 12px rgba(0,0,0,0.50)`,
        transition:  "border-color 0.25s ease, box-shadow 0.25s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = accent.borderH;
        el.style.boxShadow   = `0 0 20px ${accent.glowH}, 0 4px 18px rgba(0,0,0,0.6)`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = accent.border;
        el.style.boxShadow   = "0 2px 12px rgba(0,0,0,0.50)";
      }}
    >
      {/* Hover glow overlay */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${accent.glow} 0%, transparent 68%)` }}
      />

      {/* Year + Score */}
      <div className="flex items-center justify-between gap-1 mb-1.5">
        <span className="text-xs font-bold tracking-wider" style={{ color: accent.year }}>
          {item.year}
        </span>
        <span className="text-xs font-bold" style={{ color: accent.score }}>
          {item.percentage}
        </span>
      </div>

      {/* Degree */}
      <h4 className="font-semibold text-sm leading-tight mb-0.5 text-foreground">
        {item.degree}
      </h4>

      {/* School */}
      <p className="text-xs text-muted-foreground">{item.school}</p>

      {/* Subjects — CU only */}
      {item.subjects && (
        <p
          className="text-[10px] mt-1.5 pt-1.5 leading-relaxed"
          style={{ color: "hsl(210 10% 48%)", borderTop: `1px solid ${accent.border}` }}
        >
          {item.subjects}
        </p>
      )}
    </motion.div>
  );
};

/* ============================================================
   WAVY EDUCATION TIMELINE
   ── Instant bidirectional via scroll event listener (no IO latency)
   ── No scrollbar visible; touch-scrollable on mobile
   ── Minimal bottom spacer
   ============================================================ */
const WavyEducationTimeline = () => {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const pathRef  = useRef<SVGPathElement>(null);
  const pathCtrl = useAnimation();

  const [pathLen,   setPathLen]   = useState(1400);
  const [visible,   setVisible]   = useState(false);
  const [scrollDir, setScrollDir] = useState<"down" | "up">("down");

  // Measure SVG path length once
  useEffect(() => {
    if (pathRef.current) setPathLen(pathRef.current.getTotalLength());
  }, []);

  // ── Instant scroll listener — no IO threshold latency
  //    Checks whether the section's top edge has crossed 75% of viewport height.
  //    Also checks if section has scrolled completely past the top (hide on scroll up past it).
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const currentY  = window.scrollY;
      const dir       = currentY > lastScrollY ? "down" : "up";
      lastScrollY     = currentY;

      const rect      = el.getBoundingClientRect();
      const vpH       = window.innerHeight;

      // Section is "in view" when its top is above 78% of vh
      // AND its bottom hasn't fully scrolled above the top of the screen
      const inView = rect.top < vpH * 0.78 && rect.bottom > 80;

      if (inView !== visible) {
        setScrollDir(dir);
        setVisible(inView);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Run once on mount in case already in view
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  // Drive SVG wave draw animation
  useEffect(() => {
    if (visible && pathLen) {
      pathCtrl.start({
        strokeDashoffset: 0,
        transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
      });
    } else if (!visible && pathLen) {
      pathCtrl.start({
        strokeDashoffset: pathLen,
        // Wave erases after last card exits: last card exits at delay 0 (index 2→0ms),
        // first card at delay 160ms + 280ms duration = ~440ms → wave starts erasing after that
        transition: { duration: 0.45, delay: 0.65, ease: "easeIn" },
      });
    }
  }, [visible, pathLen, pathCtrl]);

  return (
    <div ref={wrapRef} className="relative w-full">
      {/* Outer: hidden scrollbar, touch-scrollable on mobile */}
      <div className="edu-timeline-scroll w-full" style={{ overflowX: "auto" }}>
        <div
          className="relative"
          style={{ minWidth: "580px", paddingBottom: "2px" }}
        >
          {/* SVG: wave + nodes + stems */}
          <svg
            viewBox="0 0 1090 130"
            preserveAspectRatio="xMidYMid meet"
            className="w-full"
            style={{ height: "auto", overflow: "visible", display: "block" }}
          >
            <defs>
              <linearGradient id="waveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="hsl(191 97% 55%)" />
                <stop offset="50%"  stopColor="hsl(205 90% 68%)" />
                <stop offset="100%" stopColor="hsl(199 89% 78%)" />
              </linearGradient>
            </defs>

            {/* Ghost wave */}
            <path d={WAVE_PATH} fill="none" stroke="rgba(7,212,245,0.07)" strokeWidth="2" />

            {/* Animated draw-on wave */}
            <motion.path
              ref={pathRef}
              d={WAVE_PATH}
              fill="none"
              stroke="url(#waveGrad2)"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ strokeDasharray: pathLen, strokeDashoffset: pathLen }}
              animate={pathCtrl}
            />

            {/* Nodes + stems — stagger matches card timing exactly
                Enter: wave draws first (0→0.7s), then nodes appear left→right
                       node i appears at 0.75 + i*0.10s  (same beat as card)
                Exit:  right→left, node i exits at (N-1-i)*0.08s             */}
            {NODES.map((node, i) => {
              const accent    = CARD_ACCENTS[i % CARD_ACCENTS.length];
              const N         = NODES.length;
              const nodeEnter = 0.90 + i * 0.14;          // 750ms, 850ms, 950ms
              const stemEnter = nodeEnter + 0.08;          // stem 80ms after its dot
              const nodeExit  = 0.08 * (N - 1 - i);       // 160ms, 80ms, 0ms
              return (
                <motion.g
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={
                    visible
                      ? { opacity: 1, scale: 1,
                          transition: { duration: 0.32, delay: nodeEnter, ease: "backOut" } }
                      : { opacity: 0, scale: 0,
                          transition: { duration: 0.20, delay: nodeExit } }
                  }
                  style={{ transformOrigin: `${node.cx}px ${node.cy}px` }}
                >
                  {/* Pulse ring */}
                  <motion.circle
                    cx={node.cx} cy={node.cy} r={13}
                    fill={accent.dotRing}
                    stroke={accent.dot}
                    strokeWidth="1"
                    strokeOpacity="0.38"
                    animate={visible ? { r: [13, 18, 13], opacity: [0.7, 0.22, 0.7] } : { r: 13 }}
                    transition={{ duration: 2.6, repeat: Infinity, delay: nodeEnter + 0.3 }}
                  />
                  {/* Solid dot */}
                  <circle
                    cx={node.cx} cy={node.cy} r={5}
                    fill={accent.dot}
                    style={{ filter: `drop-shadow(0 0 6px ${accent.dot})` }}
                  />
                  {/* Dashed stem — draws in just after its dot */}
                  <motion.line
                    x1={node.cx} y1={node.cy + 13}
                    x2={node.cx} y2={node.cy + STEM_HEIGHT}
                    stroke={accent.dot} strokeOpacity="0.38"
                    strokeWidth="1.5" strokeDasharray="4 3" strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={
                      visible
                        ? { pathLength: 1, transition: { duration: 0.25, delay: stemEnter } }
                        : { pathLength: 0, transition: { duration: 0.15, delay: nodeExit } }
                    }
                  />
                </motion.g>
              );
            })}
          </svg>

          {/* Cards — absolutely positioned below nodes */}
          <div className="relative w-full" style={{ marginTop: "-8px" }}>
            {EDUCATION_DATA.map((item, i) => {
              const leftPct = (NODES[i].cx / 1090) * 100;
              return (
                <div
                  key={i}
                  style={{
                    position:  "absolute",
                    left:      `${leftPct}%`,
                    top:       "0px",
                    transform: "translateX(-50%)",
                    width:     "clamp(148px, 24vw, 285px)",
                  }}
                >
                  <EducationCard
                    item={item}
                    index={i}
                    visible={visible}
                    scrollDir={scrollDir}
                  />
                </div>
              );
            })}
            {/* Spacer — sized to tallest card (CU card with subjects ≈ 158px) */}
            <div style={{ height: "162px" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   GRID BACKGROUND
   ============================================================ */
const GridBackground = () => (
  <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `
          linear-gradient(rgba(7,212,245,0.25) 1px, transparent 1px),
          linear-gradient(90deg, rgba(7,212,245,0.25) 1px, transparent 1px)
        `,
        backgroundSize: "90px 90px",
      }}
    />
  </div>
);

/* ============================================================
   MAIN SECTION
   ============================================================ */
const About = () => {
  const ref      = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });

  const { scrollYProgress } = useScroll({
    target:  ref,
    offset: ["start 70%", "end 40%"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [20, -50]);

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-20 md:py-24 overflow-hidden"
    >
      <GridBackground />

      <div className="container mx-auto px-4 md:px-6 relative z-10">

        {/* ── TITLE — unchanged ── */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center text-3xl md:text-5xl font-bold mb-12 md:mb-16"
        >
          About <span className="gradient-text">Me</span>
        </motion.h2>

        {/* ── IMAGE + OVERVIEW — unchanged ── */}
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          <motion.div
            style={{ y: imageY }}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex justify-center lg:justify-start order-1"
          >
            <div className="relative w-full max-w-[360px] sm:max-w-[390px] md:max-w-[470px] lg:max-w-[550px] -mt-32">
              <div
                className="absolute inset-0 blur-2xl"
                style={{ background: "radial-gradient(circle, rgba(7,212,245,0.04), transparent 70%)" }}
              />
              <img
                src={arpitProfile2}
                alt="Arpit Bhuker"
                loading="lazy"
                className="relative object-contain about-image-mask"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="about-card p-6 md:p-8 lg:p-10 rounded-xl order-2"
          >
            <h3 className="text-xl md:text-2xl font-bold text-primary mb-4">Overview</h3>

            <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed mb-4">
              I am in the field of applied AI, machine learning, and data analysis, where I lay 
              emphasis on the transformation of raw data into trustworthy information and realistic 
              systems. I like to work the full data life cycle, discovery and data preparation to model 
              development and testing, as well as learn about how these systems work in real-world scenarios.
            </p>

            <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed mb-4">
              Specifically, I would like to develop data-driven systems to aid in decision-making and 
              integrate analytical thinking with the applied machine learning. In addition to classical 
              ML and analytics, I am actively experimenting with Generative AI, LLM applications, AI agents, 
              and API-driven systems and testing ways in which these technologies can make data workflows and 
              intelligent automation better.
            </p>

            <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed">
              I have also acquired a systematic approach to solving problems, creating trustful pipelines
              and models that transform data into meaningful results through projects in solutions like 
              analytics automation, computer vision, intelligent detection, and data-focused tools.
            </p>
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════
            "Core Arsenal" — marquee with per-tag accent colors
        ══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-20"
        >
          <h3 className="text-xl md:text-2xl font-bold mb-2 text-center">
            <span className="gradient-text">Core</span>{" "}
            <span style={{ color: "#18a3de" }}>Arsenal</span>
          </h3>
          <p className="text-xs text-center mb-6" style={{ color: "hsl(210 10% 44%)" }}>
            Tools, techniques & thinking I bring to every problem
          </p>
          <SkillMarquee />
        </motion.div>

        {/* ══════════════════════════════════════════
            "Path to Here" — bidirectional wavy timeline
        ══════════════════════════════════════════ */}
        <div className="mt-20 md:mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h3 className="text-xl md:text-2xl font-bold mb-2">
              <span className="gradient-text">Path</span>{" "}
              <span style={{ color: "#18a3de" }}>to Here</span>
            </h3>
            <p className="text-xs" style={{ color: "hsl(210 10% 44%)" }}>
              The academic milestones that shaped how I think
            </p>
          </motion.div>
          <WavyEducationTimeline />
        </div>

      </div>

      {/* ── Styles ── */}
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        .about-card {
          background:              rgba(7,212,245,0.03);
          border:                  1px solid rgba(7,212,245,0.11);
          backdrop-filter:         blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow:              0 2px 16px rgba(0,0,0,0.5);
          transition: border-color .3s ease, box-shadow .3s ease;
        }
        .about-card:hover {
          border-color: rgba(7,212,245,0.28);
          box-shadow:   0 0 20px rgba(7,212,245,0.08), 0 4px 24px rgba(0,0,0,0.6);
        }
        .about-image-mask {
          mask-image: linear-gradient(
            to bottom, black 0%, black 65%, rgba(0,0,0,0.5) 82%, transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to bottom, black 0%, black 65%, rgba(0,0,0,0.5) 82%, transparent 100%
          );
        }
        /* Hide scrollbar everywhere, keep touch-scroll */
        .edu-timeline-scroll::-webkit-scrollbar { display: none; }
        .edu-timeline-scroll {
          -ms-overflow-style: none;
          scrollbar-width:    none;
        }
      `}</style>
    </section>
  );
};

export default About;