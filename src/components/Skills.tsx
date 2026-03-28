import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import {
  Code2, BarChart3, Cpu, Database, UserCheck,
  Brain, Award, Trophy, Zap, Code, ExternalLink,
  Calendar, BookOpen, Layers, Lightbulb, Eye,
  GitMerge, Network, Workflow, PieChart, FlaskConical,
  MessageSquare, Target, TrendingUp, LineChart,
  Settings2, Link2, Bot, FileSearch, Presentation,
  GitBranch,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";

/* ============================================================
   DESIGN TOKENS
   ============================================================ */
const ACCENTS = {
  cyan:    { text: "hsl(191 97% 68%)",  border: "rgba(7,212,245,0.22)",   borderH: "rgba(7,212,245,0.55)",   bg: "rgba(7,212,245,0.07)",   glow: "rgba(7,212,245,0.18)",   hex: "#07D4F5" },
  amber:   { text: "hsl(38 95% 62%)",   border: "rgba(245,158,11,0.22)",  borderH: "rgba(245,158,11,0.55)",  bg: "rgba(245,158,11,0.07)",  glow: "rgba(245,158,11,0.18)",  hex: "#F59E0B" },
  violet:  { text: "hsl(262 83% 75%)",  border: "rgba(167,139,250,0.22)", borderH: "rgba(167,139,250,0.55)", bg: "rgba(167,139,250,0.07)", glow: "rgba(167,139,250,0.18)", hex: "#A78BFA" },
  emerald: { text: "hsl(160 70% 55%)",  border: "rgba(52,211,153,0.22)",  borderH: "rgba(52,211,153,0.55)",  bg: "rgba(52,211,153,0.07)",  glow: "rgba(52,211,153,0.18)",  hex: "#34D399" },
  rose:    { text: "hsl(0 86% 70%)",    border: "rgba(248,113,113,0.22)", borderH: "rgba(248,113,113,0.55)", bg: "rgba(248,113,113,0.07)", glow: "rgba(248,113,113,0.18)", hex: "#F87171" },
  sky:     { text: "hsl(205 90% 68%)",  border: "rgba(56,189,248,0.22)",  borderH: "rgba(56,189,248,0.55)",  bg: "rgba(56,189,248,0.07)",  glow: "rgba(56,189,248,0.18)",  hex: "#38BDF8" },
  orange:  { text: "hsl(25 95% 65%)",   border: "rgba(249,115,22,0.22)",  borderH: "rgba(249,115,22,0.55)",  bg: "rgba(249,115,22,0.07)",  glow: "rgba(249,115,22,0.18)",  hex: "#F97316" },
} as const;
type AccentKey = keyof typeof ACCENTS;

/* ============================================================
   DEVICON HELPER
   ============================================================ */
const DI = (name: string, variant = "original") =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-${variant}.svg`;

const SkillLogo = ({
  logo, icon: Icon, size = 13, color,
}: { logo?: string; icon?: React.ElementType; size?: number; color?: string; }) => {
  if (logo) return (
    <img src={logo} alt="" width={size} height={size}
      className="object-contain flex-shrink-0"
      style={{ filter: "drop-shadow(0 0 2px rgba(255,255,255,0.12))" }}
      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
    />
  );
  if (Icon) return <Icon size={size} style={{ color }} strokeWidth={1.7} className="flex-shrink-0" />;
  return null;
};

/* ============================================================
   STATIC DATA — 7 skill groups, items ordered short→long
   for compact card fill (flex-wrap packs naturally)
   ============================================================ */
interface SkillItem { label: string; logo?: string; icon?: React.ElementType; }

const SKILL_GROUPS: {
  title: string; icon: React.ElementType; accent: AccentKey;
  desc: string; items: SkillItem[];
}[] = [
  {
    title: "Programming & Tools",
    icon: Code2, accent: "cyan",
    desc: "Core languages, tooling & dev environment",
    items: [
      // short first → pack rows tightly
      { label: "Python",           logo: DI("python")          },
      { label: "SQL",              icon: Database               },
      { label: "OOP",              icon: Layers                 },
      { label: "VS Code",          logo: DI("vscode")          },
      { label: "Git / GitHub",     logo: DI("github", "original-wordmark") },
      { label: "Jupyter",          logo: DI("jupyter")         },
      { label: "API Integration",  icon: Link2                  },
    ],
  },
  {
    title: "Data Analytics",
    icon: BarChart3, accent: "amber",
    desc: "Business insight through data exploration",
    items: [
      { label: "EDA",              icon: FlaskConical           },
      { label: "Power BI",         icon: BarChart3              },
      { label: "DAX",              icon: Code2                  },
      { label: "Tableau",          logo: DI("tableau")         },
      { label: "Seaborn",          icon: PieChart               },
      { label: "Matplotlib",       logo: DI("matplotlib")      },
      { label: "Advanced Excel",   logo: DI("microsoftoffice") },
      { label: "Data Wrangling",   icon: Workflow               },
    ],
  },
  {
    title: "Business Analytics",
    icon: TrendingUp, accent: "orange",
    desc: "Metrics, KPIs & decision intelligence",
    items: [
      { label: "Trend Analysis",      icon: LineChart            },
      { label: "KPI Development",     icon: TrendingUp           },
      { label: "Business Metrics",    icon: BarChart3            },
      { label: "Decision Analytics",  icon: Target               },
    ],
  },
  {
    title: "Professional Skills",
    icon: UserCheck, accent: "rose",
    desc: "Collaboration, communication & critical thinking",
    items: [
      { label: "Problem Solving",          icon: Lightbulb        },
      { label: "Research Writing",         icon: FileSearch       },
      { label: "Analytical Thinking",      icon: Target           },
      { label: "Attention to Detail",      icon: Eye              },
      { label: "Cross-Team Collaboration", icon: GitMerge         },
    ],
  },
  {
    title: "AI Systems",
    icon: Brain, accent: "sky",
    desc: "Intelligent systems, LLMs & generative AI",
    items: [
      { label: "Computer Vision",      icon: Eye                 },
      { label: "NLP",                  icon: MessageSquare       },
      { label: "RAG",                  icon: Network             },
      { label: "LLM Integration",      icon: Brain               },
      { label: "Gen AI",        icon: Cpu                 },
      { label: "AI Agents",            icon: Bot                 },
      { label: "Prompt Engineering",   icon: FileSearch          },
    ],
  },
  {
    title: "Data Engineering",
    icon: Database, accent: "emerald",
    desc: "Pipelines, schemas & data infrastructure",
    items: [
      { label: "MySQL",               logo: DI("mysql")         },
      { label: "Data Modeling",       icon: Layers               },
      { label: "ETL Pipelines",       icon: Workflow             },
      { label: "Data Integration & Transformation",    icon: Link2                },
    ],
  },
  {
    title: "Machine Learning",
    icon: Cpu, accent: "violet",
    desc: "End-to-end modeling from feature to deploy",
    items: [
      { label: "Pandas",                       logo: DI("pandas")        },
      { label: "XGBoost",                      icon: Target               },
      { label: "NumPy",                        logo: DI("numpy")         },
      { label: "Scikit-learn",                 logo: DI("scikitlearn")   },
      { label: "TensorFlow",                   logo: DI("tensorflow")    },
      { label: "Feature Engineering",          icon: GitMerge             },
      { label: "Predictive Modeling",          icon: LineChart            },
      { label: "Model Evaluation",      icon: Settings2            },
    ],
  },
];

/* ============================================================
   CERTIFICATIONS & TRAININGS (unchanged content)
   ============================================================ */
interface CertItem {
  title: string; provider: string; date: string;
  icon: React.ElementType; link: string;
  description: string; skills: string[];
  category: string; accent: AccentKey;
}
const CERTIFICATIONS: CertItem[] = [
  {
    title: "Introduction to Data Science", provider: "Cisco Networking Academy", date: "Mar 2026", icon: Database,
    link: "https://www.credly.com/badges/4280b4bc-539e-48fd-8f9e-41bb1a955efa/public_url",
    description: "Gained foundational knowledge of data analytics, data science concepts, and the role of data in AI and machine learning.",
    skills: ["Data Analysis", "Data Collection & Validation", "Data Science Fundamentals", "AI & ML Awareness"
    ],
    category: "AI/ML", accent: "rose",
  },
  {
    title: "SQL (Intermediate) Skill Certification", provider: "HackerRank", date: "Dec 2025", icon: Database,
    link: "https://www.hackerrank.com/certificates/0B86E4E417BD",
    description: "Validated intermediate SQL proficiency — joins, subqueries, aggregations, real-world querying.",
    skills: ["SQL Joins", "Subqueries", "Aggregations", "Data Filtering", "Query Optimization"],
    category: "Database", accent: "cyan",
  },
  {
    title: "SQL: A Practical Introduction for Querying Databases", provider: "IBM (via Coursera)", date: "Jun 2025", icon: Database,
    link: "https://coursera.org/verify/0AA2BI2BIW5N",
    description: "Hands-on SQL training covering queries, joins, subqueries, and data manipulation.",
    skills: ["SQL Queries", "Joins", "Database Design", "Subqueries"],
    category: "Database", accent: "sky",
  },
  {
    title: "Introduction to Generative AI for Data Analysis", provider: "Microsoft (via Coursera)", date: "Feb 2025", icon: Brain,
    link: "https://coursera.org/verify/2XQ5NLT0SQQF",
    description: "Leveraging generative AI tools for advanced data analysis workflows.",
    skills: ["Generative AI", "Prompt Engineering", "Analytics"],
    category: "AI/ML", accent: "violet",
  },
  {
    title: "Microsoft Certified: Azure AI Fundamentals", provider: "Microsoft", date: "Aug 2024", icon: Award,
    link: "https://learn.microsoft.com/api/credentials/share/en-us/ArpitBhuker-3178/31F48FBCE2815B7A?sharingId=2125ED997921F9FC",
    description: "Official Microsoft certification covering AI workloads, ML concepts, and Azure AI services.",
    skills: ["Azure AI", "ML Basics", "Responsible AI"],
    category: "Cloud & AI", accent: "amber",
  },
  {
    title: "Machine Learning for All", provider: "University of London (via Coursera)", date: "Oct 2023", icon: Brain,
    link: "https://coursera.org/verify/9MMCYXAEW57S",
    description: "Fundamental ML — supervised learning, unsupervised learning, and model evaluation.",
    skills: ["ML Concepts", "Model Evaluation", "Predictive Analytics"],
    category: "AI/ML", accent: "emerald",
  },
];

interface TrainingCert { label: string; url: string; }
interface TrainingItem {
  type: string; title: string; provider: string; timeline: string;
  description: string; icon: React.ElementType;
  skillsDeveloped: string[]; skillsLabel: string;
  category: string; accent: AccentKey;
  link?: string; certificates: TrainingCert[];
}
const TRAININGS: TrainingItem[] = [
  {
    type: "Simulation", title: "GenAI Powered Data Analytics Job Simulation",
    provider: "TATA Group (via Forage)", timeline: "Jan 2026", icon: BarChart3,
    description: "Applied GenAI and analytics to real problems — EDA, risk prediction, data storytelling, AI-driven strategy.",
    skillsDeveloped: ["Exploratory Data Analysis","Predictive Analytics","AI Strategy","Data Interpretation","Analytical Reporting","Decision Making"],
    skillsLabel: "Skills Gained", category: "Job Simulation", accent: "cyan",
    certificates: [{ label: "Certificate", url: "https://www.theforage.com/completion-certificates/ifobHAoMjQs9s6bKS/gMTdCXwDdLYoXZ3wG_ifobHAoMjQs9s6bKS_68c26611cd7d6aa0db5280d3_1769105362734_completion_certificate.pdf" }],
  },
  {
    type: "Workshop", title: "Generative AI Mastermind",
    provider: "Outskill", timeline: "Oct 2025", icon: Brain,
    description: "Strategic implementation of cutting-edge Generative AI models and LLMs.",
    skillsDeveloped: ["Generative AI","Large Language Models (LLMs)","AI Strategy","Prompt Engineering","Deep Learning Concepts"],
    skillsLabel: "Skills Gained", category: "Workshop", accent: "violet",
    certificates: [{ label: "Certificate", url: "https://drive.google.com/file/d/1aoGiKgCAHrZVoIJCAZk5YwwEadaxBiGu/view?usp=sharing" }],
  },
  {
    type: "Simulation", title: "Data Visualisation: Empowering Business with Effective Insights",
    provider: "TATA Group (via Forage)", timeline: "Sep 2025", icon: BarChart3,
    description: "Transforming business data into meaningful insights using modern BI and visualization tools.",
    skillsDeveloped: ["Data Visualization","Power BI","Business Intelligence","Business Insights","Data Storytelling"],
    skillsLabel: "Skills Gained", category: "Job Simulation", accent: "amber",
    certificates: [{ label: "Certificate", url: "https://www.theforage.com/completion-certificates/ifobHAoMjQs9s6bKS/MyXvBcppsW2FkNYCX_ifobHAoMjQs9s6bKS_68c26611cd7d6aa0db5280d3_1758705776107_completion_certificate.pdf" }],
  },
  {
    type: "Workshop", title: "DSA Workshop",
    provider: "GeeksforGeeks Chandigarh University-Student Chapter", timeline: "Dec 2024", icon: Code,
    description: "Core Data Structures and Algorithms — CS fundamentals and competitive problem-solving.",
    skillsDeveloped: ["Data Structures","Algorithms","Problem Solving","Competitive Programming Basics"],
    skillsLabel: "Skills Gained", category: "Workshop", accent: "sky",
    certificates: [{ label: "Certificate", url: "https://drive.google.com/file/d/1tFVyZrIg-GibPOTGuYGmfUcNeY284SJF/view?usp=sharing" }],
  },
  {
    type: "Training", title: "AI Mentorship Program",
    provider: "Teachnook", timeline: "Feb – Mar 2024", icon: Brain,
    link: "https://github.com/arpitbhuker/AI-Driven-Financial-Fraud-Detection-System",
    description: "Fraud detection model deployment, performance tuning, and compliance with financial data.",
    skillsDeveloped: ["Fraud Detection","ML Deployment","Model Evaluation","XGBoost","EDA","Imbalanced Learning","Python"],
    skillsLabel: "Skills Gained", category: "Training", accent: "emerald",
    certificates: [
      { label: "Internship Certificate", url: "https://drive.google.com/file/d/1LPQbkCsNrrLEkH6VPVDpKbkFjXZeMHEd/view?usp=drive_link" },
      { label: "Program Completion",     url: "https://drive.google.com/file/d/1TCDZfZ3GWsXosVafmyVmaPSJOYmLl3z7/view?usp=drive_link" },
    ],
  },
  {
    type: "Workshop", title: "Microsoft Office using AI Tools Workshop",
    provider: "be10x", timeline: "Oct 2023", icon: Zap,
    description: "Leveraging AI tools to enhance productivity within the Microsoft Office suite.",
    skillsDeveloped: ["Microsoft Office Suite","AI Productivity Tools","Workflow Automation","AI Integration"],
    skillsLabel: "Skills Gained", category: "Workshop", accent: "rose",
    certificates: [{ label: "Certificate", url: "https://drive.google.com/file/d/1E8-NnhymP49FP9YGK0Zvc9LCrAZlM315/view?usp=sharing" }],
  },
];

const CERT_CATEGORIES  = ["All", "AI/ML", "Cloud & AI", "Database"] as const;
const TRAINING_FILTERS = ["All", "Training", "Workshop", "Simulation"] as const;

const STATS = [
  { number: "10+", label: "Projects",           icon: Trophy,   accent: "cyan"    as AccentKey },
  { number: "6+",  label: "Certifications",     icon: Award,    accent: "amber"   as AccentKey },
  { number: "6+",  label: "Training/Workshops", icon: BookOpen, accent: "violet"  as AccentKey },
  { number: "3+",  label: "Years Learning",     icon: Brain,    accent: "emerald" as AccentKey },
];

/* ============================================================
   GEOMETRY — computed once at module level
   ============================================================ */
const N = 7;
const DEG = 360 / N;
const toRad = (d: number) => (d * Math.PI) / 180;

// Desktop SVG: 1100 × 760, center (550,370), orbit R=278
const D_W = 1100, D_H = 760, D_CX = 550, D_CY = 370, D_R = 320, D_CARD_W = 225;
// Tablet SVG:  740  × 740, center (370,370), orbit R=218
const T_W = 740,  T_H = 740, T_CX = 370, T_CY = 370, T_R = 255, T_CARD_W = 170;
const CARD_HALF_H = 54; // approx half-height for center calculation

interface NodeGeom {
  angle: number;
  // Desktop
  dCx: number; dCy: number; dLeft: number; dTop: number;
  dLeftPct: string; dTopPct: string; dWidPct: string;
  // Tablet
  tCx: number; tCy: number; tLeft: number; tTop: number;
  tLeftPct: string; tTopPct: string; tWidPct: string;
}

const NODES: NodeGeom[] = Array.from({ length: N }, (_, i) => {
  const angle = -90 + i * DEG;
  const r = toRad(angle);

  const dCx = D_CX + D_R * Math.cos(r);
  const dCy = D_CY + D_R * Math.sin(r);
  const dLeft = dCx - D_CARD_W / 2;
  const dTop  = dCy - CARD_HALF_H;

  const tCx = T_CX + T_R * Math.cos(r);
  const tCy = T_CY + T_R * Math.sin(r);
  const tLeft = tCx - T_CARD_W / 2;
  const tTop  = tCy - CARD_HALF_H;

  return {
    angle,
    dCx, dCy, dLeft, dTop,
    dLeftPct: `${(dLeft / D_W * 100).toFixed(2)}%`,
    dTopPct:  `${(dTop  / D_H * 100).toFixed(2)}%`,
    dWidPct:  `${(D_CARD_W / D_W * 100).toFixed(2)}%`,
    tCx, tCy, tLeft, tTop,
    tLeftPct: `${(tLeft / T_W * 100).toFixed(2)}%`,
    tTopPct:  `${(tTop  / T_H * 100).toFixed(2)}%`,
    tWidPct:  `${(T_CARD_W / T_W * 100).toFixed(2)}%`,
  };
});

/* ============================================================
   CIRCUIT BACKGROUND (consistent with Skills theme)
   ============================================================ */
const CircuitBackground = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <div className="absolute inset-0" style={{
      backgroundImage: `
        repeating-linear-gradient(45deg,  rgba(7,212,245,0.022) 0px, rgba(7,212,245,0.022) 1px, transparent 1px, transparent 54px),
        repeating-linear-gradient(-45deg, rgba(7,212,245,0.016) 0px, rgba(7,212,245,0.016) 1px, transparent 1px, transparent 54px)
      `,
    }} />
    <div className="absolute inset-0" style={{
      backgroundImage: `repeating-linear-gradient(0deg, rgba(7,212,245,0.018) 0px, rgba(7,212,245,0.018) 1px, transparent 1px, transparent 82px)`,
    }} />
    <motion.div
      className="absolute inset-x-0"
      style={{ height: "1px", background: "linear-gradient(90deg, transparent 0%, rgba(7,212,245,0.08) 20%, rgba(7,212,245,0.20) 50%, rgba(7,212,245,0.08) 80%, transparent 100%)" }}
      animate={{ top: ["-2%", "102%"] }}
      transition={{ duration: 14, repeat: Infinity, ease: "linear", repeatDelay: 6 }}
    />
    <div className="absolute pointer-events-none" style={{ width: "45%", height: "50%", top: 0, left: "-5%", background: "radial-gradient(ellipse, rgba(7,212,245,0.038) 0%, transparent 65%)", filter: "blur(70px)" }} />
    <div className="absolute pointer-events-none" style={{ width: "38%", height: "44%", top: "28%", right: "-4%", background: "radial-gradient(ellipse, rgba(167,139,250,0.028) 0%, transparent 65%)", filter: "blur(68px)" }} />
    <div className="absolute pointer-events-none" style={{ width: "32%", height: "32%", bottom: 0, left: "32%", background: "radial-gradient(ellipse, rgba(52,211,153,0.022) 0%, transparent 65%)", filter: "blur(62px)" }} />
  </div>
);

/* ============================================================
   SHARED CARD INNER CONTENT
   Used identically by star and heptagon views
   ============================================================ */
const CardContent = ({
  group, isInView, delay, size = "md",
}: {
  group: typeof SKILL_GROUPS[number];
  isInView: boolean;
  delay: number;
  size?: "sm" | "md";
}) => {
  const a    = ACCENTS[group.accent];
  const Icon = group.icon;
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative w-full h-full rounded-xl overflow-hidden"
      style={{
        background:     "rgba(5,5,8,0.84)",
        border:         `1px solid ${hovered ? a.borderH : a.border}`,
        backdropFilter: "blur(14px)",
        boxShadow:      hovered ? `0 0 28px ${a.glow}, 0 6px 28px rgba(0,0,0,0.65)` : `0 2px 16px rgba(0,0,0,0.55)`,
        transform:      hovered ? "translateY(-3px) scale(1.025)" : "none",
        transition:     "all 0.28s cubic-bezier(0.22,1,0.36,1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-4 right-4 h-px pointer-events-none"
        style={{ background: `linear-gradient(90deg,transparent,${a.text},transparent)`, opacity: hovered ? 0.55 : 0.20 }} />
      {/* Hover inner glow */}
      <div className="absolute inset-0 pointer-events-none rounded-xl transition-opacity duration-300"
        style={{ background: `radial-gradient(ellipse 80% 50% at 10% 0%, ${a.bg} 0%, transparent 60%)`, opacity: hovered ? 1 : 0 }} />

      <div className={`relative z-10 ${size === "sm" ? "p-3" : "p-3.5"}`}>
        {/* Header */}
        <div className="flex items-center gap-2 mb-2.5">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: a.bg, border: `1px solid ${a.border}` }}>
            <Icon size={12} style={{ color: a.text }} strokeWidth={1.8} />
          </div>
          <span className={`font-bold leading-tight text-foreground ${size === "sm" ? "text-[10px]" : "text-[11px]"}`}>
            {group.title}
          </span>
        </div>

        {/* Skill chips */}
        <div className="flex flex-wrap gap-1">
          {group.items.map((skill, si) => (
            <motion.span
              key={skill.label}
              className="flex items-center gap-1 rounded-md font-medium"
              style={{
                fontSize: size === "sm" ? "9px" : "10px",
                padding: size === "sm" ? "2px 6px" : "2.5px 7px",
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${a.border}`,
                color: a.text,
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.25, delay: delay + 0.04 * si }}
              whileHover={{ background: a.bg, scale: 1.06 }}
            >
              <SkillLogo logo={skill.logo} icon={skill.icon} size={size === "sm" ? 9 : 10} color={a.text} />
              {skill.label}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   STAR VIEW — Desktop (lg+)
   7 cards, SVG 1100×760, center lines, no labels on lines
   ============================================================ */
const StarView = ({ isInView }: { isInView: boolean }) => (
  <div className="hidden lg:block relative w-full mx-auto" style={{ maxWidth: "1100px" }}>
    <div style={{ paddingBottom: `${(D_H / D_W) * 100}%`, position: "relative" }}>

      {/* SVG: lines + center node only */}
      <svg viewBox={`0 0 ${D_W} ${D_H}`}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ overflow: "visible" }}>
        <defs>
          {SKILL_GROUPS.map((g, i) => (
            <linearGradient key={i} id={`dg${i}`} gradientUnits="userSpaceOnUse"
              x1={D_CX} y1={D_CY} x2={NODES[i].dCx} y2={NODES[i].dCy}>
              <stop offset="0%"   stopColor="hsl(191 97% 55%)" stopOpacity="0.7" />
              <stop offset="100%" stopColor={ACCENTS[g.accent].hex}  stopOpacity="0.4" />
            </linearGradient>
          ))}
        </defs>

        {/* Lines */}
        {SKILL_GROUPS.map((_, i) => (
          <motion.line key={i}
            x1={D_CX} y1={D_CY} x2={NODES[i].dCx} y2={NODES[i].dCy}
            stroke={`url(#dg${i})`} strokeWidth="1.5"
            strokeDasharray="6 4" strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}

        {/* Endpoint dots */}
        {SKILL_GROUPS.map((g, i) => (
          <motion.circle key={i} cx={NODES[i].dCx} cy={NODES[i].dCy} r={3.5}
            fill={ACCENTS[g.accent].hex}
            style={{ filter: `drop-shadow(0 0 5px ${ACCENTS[g.accent].hex})` }}
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.9 + i * 0.1 }}
          />
        ))}

        {/* Center: pulse + rings + solid */}
        <motion.circle cx={D_CX} cy={D_CY} r={50}
          fill="none" stroke="rgba(7,212,245,0.13)" strokeWidth="1"
          animate={isInView ? { r: [50, 64, 50], opacity: [0.6, 0.1, 0.6] } : {}}
          transition={{ duration: 3.2, repeat: Infinity, delay: 0.8 }}
        />
        <motion.circle cx={D_CX} cy={D_CY} r={37}
          fill="rgba(7,212,245,0.04)" stroke="rgba(7,212,245,0.28)" strokeWidth="1.5"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.12 }}
          style={{ transformOrigin: `${D_CX}px ${D_CY}px` }}
        />
        <motion.circle cx={D_CX} cy={D_CY} r={24}
          fill="rgba(7,212,245,0.10)" stroke="rgba(7,212,245,0.50)" strokeWidth="1.5"
          style={{ filter: "drop-shadow(0 0 10px rgba(7,212,245,0.40))", transformOrigin: `${D_CX}px ${D_CY}px` }}
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.08 }}
        />
      </svg>

      {/* Center label */}
      <motion.div className="absolute flex flex-col items-center justify-center"
        style={{ left: `${(D_CX / D_W) * 100}%`, top: `${(D_CY / D_H) * 100}%`, transform: "translate(-50%,-50%)", zIndex: 20 }}
        initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.15 }}>
        <Layers size={15} style={{ color: "hsl(191 97% 68%)" }} strokeWidth={1.6} />
        <span className="text-[8px] font-bold tracking-[0.15em] mt-0.5 uppercase" style={{ color: "hsl(191 97% 68%)" }}>SKILLS</span>
      </motion.div>

      {/* Cards */}
      {SKILL_GROUPS.map((group, i) => (
        <motion.div key={group.title}
          className="absolute"
          style={{ left: NODES[i].dLeftPct, top: NODES[i].dTopPct, width: NODES[i].dWidPct, zIndex: 10 }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <CardContent group={group} isInView={isInView} delay={0.5 + i * 0.1} size="md" />
        </motion.div>
      ))}
    </div>
  </div>
);

/* ============================================================
   HEPTAGON VIEW — Tablet (md, hidden lg+)
   7 cards arranged in a heptagonal ring around a center node
   ============================================================ */
const HeptagonView = ({ isInView }: { isInView: boolean }) => (
  <div className="hidden md:block lg:hidden relative w-full mx-auto" style={{ maxWidth: "740px" }}>
    <div style={{ paddingBottom: `${(T_H / T_W) * 100}%`, position: "relative" }}>

      {/* SVG: lines + center */}
      <svg viewBox={`0 0 ${T_W} ${T_H}`}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ overflow: "visible" }}>
        <defs>
          {SKILL_GROUPS.map((g, i) => (
            <linearGradient key={i} id={`tg${i}`} gradientUnits="userSpaceOnUse"
              x1={T_CX} y1={T_CY} x2={NODES[i].tCx} y2={NODES[i].tCy}>
              <stop offset="0%"   stopColor="hsl(191 97% 55%)" stopOpacity="0.65" />
              <stop offset="100%" stopColor={ACCENTS[g.accent].hex}  stopOpacity="0.35" />
            </linearGradient>
          ))}
        </defs>

        {/* Lines */}
        {SKILL_GROUPS.map((_, i) => (
          <motion.line key={i}
            x1={T_CX} y1={T_CY} x2={NODES[i].tCx} y2={NODES[i].tCy}
            stroke={`url(#tg${i})`} strokeWidth="1.5"
            strokeDasharray="5 4" strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 0.85, delay: 0.3 + i * 0.1 }}
          />
        ))}

        {/* Endpoint dots */}
        {SKILL_GROUPS.map((g, i) => (
          <motion.circle key={i} cx={NODES[i].tCx} cy={NODES[i].tCy} r={3}
            fill={ACCENTS[g.accent].hex}
            style={{ filter: `drop-shadow(0 0 4px ${ACCENTS[g.accent].hex})` }}
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.28, delay: 0.88 + i * 0.1 }}
          />
        ))}

        {/* Center node */}
        <motion.circle cx={T_CX} cy={T_CY} r={42}
          fill="none" stroke="rgba(7,212,245,0.12)" strokeWidth="1"
          animate={isInView ? { r: [42, 54, 42], opacity: [0.6, 0.1, 0.6] } : {}}
          transition={{ duration: 3, repeat: Infinity, delay: 0.7 }}
        />
        <motion.circle cx={T_CX} cy={T_CY} r={30}
          fill="rgba(7,212,245,0.04)" stroke="rgba(7,212,245,0.28)" strokeWidth="1.5"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{ transformOrigin: `${T_CX}px ${T_CY}px` }}
        />
        <motion.circle cx={T_CX} cy={T_CY} r={19}
          fill="rgba(7,212,245,0.10)" stroke="rgba(7,212,245,0.50)" strokeWidth="1.5"
          style={{ filter: "drop-shadow(0 0 8px rgba(7,212,245,0.40))", transformOrigin: `${T_CX}px ${T_CY}px` }}
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.35, delay: 0.07 }}
        />
      </svg>

      {/* Center label */}
      <motion.div className="absolute flex flex-col items-center justify-center"
        style={{ left: `${(T_CX / T_W) * 100}%`, top: `${(T_CY / T_H) * 100}%`, transform: "translate(-50%,-50%)", zIndex: 20 }}
        initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.12 }}>
        <Layers size={13} style={{ color: "hsl(191 97% 68%)" }} strokeWidth={1.6} />
        <span className="text-[7px] font-bold tracking-[0.14em] mt-0.5 uppercase" style={{ color: "hsl(191 97% 68%)" }}>SKILLS</span>
      </motion.div>

      {/* Cards */}
      {SKILL_GROUPS.map((group, i) => (
        <motion.div key={group.title}
          className="absolute"
          style={{ left: NODES[i].tLeftPct, top: NODES[i].tTopPct, width: NODES[i].tWidPct, zIndex: 10 }}
          initial={{ opacity: 0, scale: 0.82 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.48, delay: 0.5 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <CardContent group={group} isInView={isInView} delay={0.5 + i * 0.1} size="sm" />
        </motion.div>
      ))}
    </div>
  </div>
);

/* ============================================================
   MOBILE VIEW — simple stacked cards
   ============================================================ */
const MobileView = () => (
  <div className="md:hidden grid grid-cols-1 gap-4">
    {SKILL_GROUPS.map((group, i) => {
      const a    = ACCENTS[group.accent];
      const Icon = group.icon;
      return (
        <motion.div key={group.title}
          className="rounded-xl p-4"
          style={{ background: "rgba(5,5,8,0.84)", border: `1px solid ${a.border}`, backdropFilter: "blur(12px)" }}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: i * 0.06 }}>
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: a.bg, border: `1px solid ${a.border}` }}>
              <Icon size={15} style={{ color: a.text }} strokeWidth={1.7} />
            </div>
            <div>
              <span className="font-bold text-sm text-foreground">{group.title}</span>
              <p className="text-[10px] mt-0.5" style={{ color: "hsl(210 10% 46%)" }}>{group.desc}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {group.items.map((skill) => (
              <span key={skill.label}
                className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg"
                style={{ background: a.bg, color: a.text, border: `1px solid ${a.border}` }}>
                <SkillLogo logo={skill.logo} icon={skill.icon} size={12} color={a.text} />
                {skill.label}
              </span>
            ))}
          </div>
        </motion.div>
      );
    })}
  </div>
);

/* ============================================================
   CERT CARD
   ============================================================ */
const CertCard = ({ item, index }: { item: CertItem; index: number }) => {
  const a    = ACCENTS[item.accent];
  const Icon = item.icon;
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      className="rounded-xl p-5 flex flex-col gap-3 relative overflow-hidden"
      style={{
        background: "rgba(5,5,8,0.70)", border: `1px solid ${hovered ? a.borderH : a.border}`,
        backdropFilter: "blur(12px)",
        boxShadow: hovered ? `0 0 28px ${a.glow},0 6px 24px rgba(0,0,0,0.6)` : "0 2px 14px rgba(0,0,0,0.5)",
        transform: hovered ? "translateY(-4px)" : "none",
        transition: "all 0.28s cubic-bezier(0.22,1,0.36,1)",
      }}
      initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)} onTouchEnd={() => setTimeout(() => setHovered(false), 700)}
    >
      <div className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300"
        style={{ background: `radial-gradient(ellipse at 50% 0%,${a.bg} 0%,transparent 65%)`, opacity: hovered ? 1 : 0 }} />
      <div className="absolute top-0 left-5 right-5 h-px"
        style={{ background: `linear-gradient(90deg,transparent,${a.text},transparent)`, opacity: hovered ? 0.5 : 0.15, transition: "opacity 0.3s" }} />
      <div className="flex items-start justify-between gap-2 relative z-10">
        <div className="p-2 rounded-lg flex-shrink-0" style={{ background: a.bg, border: `1px solid ${a.border}` }}>
          <Icon size={16} style={{ color: a.text }} strokeWidth={1.6} />
        </div>
        <div className="flex items-center gap-1 text-xs font-semibold flex-shrink-0" style={{ color: a.text }}>
          <Calendar size={11} /> {item.date}
        </div>
      </div>
      <div className="relative z-10">
        <h3 className="text-sm font-semibold text-foreground leading-snug mb-0.5">{item.title}</h3>
        <p className="text-xs" style={{ color: "hsl(210 10% 52%)" }}>{item.provider}</p>
      </div>
      <p className="text-xs leading-relaxed relative z-10" style={{ color: "hsl(210 10% 48%)" }}>{item.description}</p>
      <div className="flex flex-wrap gap-1.5 relative z-10">
        {item.skills.map((s) => (
          <span key={s} className="text-[10px] px-2 py-0.5 rounded-full"
            style={{ background: a.bg, color: a.text, border: `1px solid ${a.border}` }}>{s}</span>
        ))}
      </div>
      <Button variant="outline" size="sm" className="mt-auto w-full text-xs h-8 relative z-10"
        style={{ borderColor: a.border, color: a.text, background: "transparent" }}
        onClick={() => window.open(item.link, "_blank")}>
        <ExternalLink size={12} className="mr-1.5" /> View Certificate
      </Button>
    </motion.div>
  );
};

/* ============================================================
   TRAINING CARD
   ============================================================ */
const TrainingCard = ({ item, index }: { item: TrainingItem; index: number }) => {
  const a    = ACCENTS[item.accent];
  const Icon = item.icon;
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      className="rounded-xl p-5 flex flex-col gap-3 relative overflow-hidden"
      style={{
        background: "rgba(5,5,8,0.70)", border: `1px solid ${hovered ? a.borderH : a.border}`,
        backdropFilter: "blur(12px)",
        boxShadow: hovered ? `0 0 28px ${a.glow},0 6px 24px rgba(0,0,0,0.6)` : "0 2px 14px rgba(0,0,0,0.5)",
        transform: hovered ? "translateY(-4px)" : "none",
        transition: "all 0.28s cubic-bezier(0.22,1,0.36,1)",
      }}
      initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)} onTouchEnd={() => setTimeout(() => setHovered(false), 700)}
    >
      <div className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300"
        style={{ background: `radial-gradient(ellipse at 50% 0%,${a.bg} 0%,transparent 65%)`, opacity: hovered ? 1 : 0 }} />
      <div className="absolute top-0 left-5 right-5 h-px"
        style={{ background: `linear-gradient(90deg,transparent,${a.text},transparent)`, opacity: hovered ? 0.5 : 0.15, transition: "opacity 0.3s" }} />
      <div className="flex items-start justify-between gap-2 relative z-10">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg flex-shrink-0" style={{ background: a.bg, border: `1px solid ${a.border}` }}>
            <Icon size={15} style={{ color: a.text }} strokeWidth={1.6} />
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{ background: a.bg, color: a.text, border: `1px solid ${a.border}` }}>{item.type}</span>
        </div>
        <span className="text-xs font-semibold flex-shrink-0" style={{ color: a.text }}>{item.timeline}</span>
      </div>
      <div className="relative z-10">
        <h3 className="text-sm font-semibold text-foreground leading-snug mb-0.5">{item.title}</h3>
        <p className="text-xs" style={{ color: "hsl(210 10% 52%)" }}>{item.provider}</p>
      </div>
      <p className="text-xs leading-relaxed relative z-10" style={{ color: "hsl(210 10% 48%)" }}>{item.description}</p>
      <div className="relative z-10">
        <p className="text-[10px] font-semibold mb-1.5" style={{ color: a.text }}>{item.skillsLabel}:</p>
        <div className="flex flex-wrap gap-1.5">
          {item.skillsDeveloped.map((s) => (
            <span key={s} className="text-[10px] px-2 py-0.5 rounded-full"
              style={{ background: a.bg, color: a.text, border: `1px solid ${a.border}` }}>{s}</span>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-1.5 mt-auto relative z-10">
        {item.link && (
          <Button variant="outline" size="sm" className="w-full text-xs h-8"
            style={{ borderColor: a.border, color: a.text, background: "transparent" }}
            onClick={() => window.open(item.link, "_blank")}>
            <ExternalLink size={12} className="mr-1.5" />
            {item.type === "Training" ? "View Project" : "View Details"}
          </Button>
        )}
        {item.certificates.map((cert, idx) => (
          <Button key={idx} variant="outline" size="sm" className="w-full text-xs h-8"
            style={{ borderColor: a.border, color: a.text, background: "transparent" }}
            onClick={() => window.open(cert.url, "_blank")}>
            <ExternalLink size={12} className="mr-1.5" /> {cert.label}
          </Button>
        ))}
      </div>
    </motion.div>
  );
};

/* ============================================================
   FILTER BAR
   ============================================================ */
const FilterBar = ({ options, selected, onSelect }: {
  options: readonly string[]; selected: string; onSelect: (v: string) => void;
}) => (
  <div className="flex flex-wrap justify-center gap-2 mb-8">
    {options.map((opt) => (
      <button key={opt} onClick={() => onSelect(opt)}
        className="text-xs font-semibold px-4 py-1.5 rounded-full transition-all duration-200"
        style={selected === opt
          ? { background: "hsl(191 97% 55%)", color: "hsl(0 0% 4%)", boxShadow: "0 0 16px rgba(7,212,245,0.45)" }
          : { background: "rgba(7,212,245,0.06)", color: "hsl(191 97% 65%)", border: "1px solid rgba(7,212,245,0.20)" }
        }>{opt}</button>
    ))}
  </div>
);

/* ============================================================
   STAT CARD
   ============================================================ */
const StatCard = ({ stat, index, isInView }: {
  stat: typeof STATS[number]; index: number; isInView: boolean;
}) => {
  const a    = ACCENTS[stat.accent];
  const Icon = stat.icon;
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center p-5 rounded-xl relative overflow-hidden"
      style={{
        background: "rgba(5,5,8,0.70)", border: `1px solid ${hovered ? a.borderH : a.border}`,
        backdropFilter: "blur(10px)",
        boxShadow: hovered ? `0 0 26px ${a.glow}` : "0 2px 12px rgba(0,0,0,0.5)",
        transform: hovered ? "translateY(-5px) scale(1.04)" : "none",
        transition: "all 0.28s cubic-bezier(0.22,1,0.36,1)",
      }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)} onTouchEnd={() => setTimeout(() => setHovered(false), 700)}
    >
      <div className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300"
        style={{ background: `radial-gradient(ellipse at 50% 0%,${a.bg} 0%,transparent 65%)`, opacity: hovered ? 1 : 0 }} />
      <Icon size={26} className="mb-2 relative z-10" style={{ color: a.text }} strokeWidth={1.5} />
      <motion.div className="text-2xl font-bold mb-1 relative z-10" style={{ color: a.text }}
        initial={{ scale: 0 }} animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 1.0 + index * 0.1, type: "spring" }}>
        {stat.number}
      </motion.div>
      <p className="text-xs text-muted-foreground relative z-10">{stat.label}</p>
    </motion.div>
  );
};

/* ============================================================
   MAIN SECTION
   ============================================================ */
const Skills = () => {
  const ref      = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30% 0px" });
  const [selectedCert,     setSelectedCert]     = useState<string>("All");
  const [selectedTraining, setSelectedTraining] = useState<string>("All");

  const filteredCerts = useMemo(
    () => selectedCert === "All" ? CERTIFICATIONS : CERTIFICATIONS.filter((c) => c.category === selectedCert),
    [selectedCert]
  );
  const filteredTrainings = useMemo(
    () => selectedTraining === "All" ? TRAININGS : TRAININGS.filter((t) => t.type === selectedTraining),
    [selectedTraining]
  );

  return (
    <TooltipProvider>
      <section id="skills" ref={ref} className="relative py-20 md:py-24 overflow-hidden">

        <CircuitBackground />

        <div className="container mx-auto px-4 md:px-6 relative z-10">

          {/* Title */}
          <motion.div className="text-center mb-14"
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}>
            <h2 className="text-3xl md:text-5xl font-bold mb-3">
              Skills & <span className="gradient-text">Expertise</span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              A comprehensive toolkit for modern data science and AI/ML development
            </p>
          </motion.div>

          <Tabs defaultValue="skills" className="w-full">

            {/* Mobile tabs */}
            <div className="md:hidden mb-10 overflow-x-auto">
              <TabsList className="inline-flex w-auto min-w-full h-10"
                style={{ background: "rgba(7,212,245,0.05)", border: "1px solid rgba(7,212,245,0.18)", borderRadius: "0.75rem" }}>
                <TabsTrigger value="skills"         className="flex-1 text-xs whitespace-nowrap px-4" style={{ color: "hsl(191 97% 65%)" }}>Skills</TabsTrigger>
                <TabsTrigger value="certifications" className="flex-1 text-xs whitespace-nowrap px-4" style={{ color: "hsl(191 97% 65%)" }}>Certs</TabsTrigger>
                <TabsTrigger value="training"       className="flex-1 text-xs whitespace-nowrap px-4" style={{ color: "hsl(191 97% 65%)" }}>Training</TabsTrigger>
              </TabsList>
            </div>

            {/* Desktop/tablet tabs */}
            <TabsList className="hidden md:grid w-full grid-cols-3 mb-12 h-11"
              style={{ background: "rgba(7,212,245,0.05)", border: "1px solid rgba(7,212,245,0.18)", borderRadius: "0.75rem" }}>
              <TabsTrigger value="skills"         className="text-sm" style={{ color: "hsl(191 97% 65%)" }}>Skills</TabsTrigger>
              <TabsTrigger value="certifications" className="text-sm" style={{ color: "hsl(191 97% 65%)" }}>Certifications</TabsTrigger>
              <TabsTrigger value="training"       className="text-sm" style={{ color: "hsl(191 97% 65%)" }}>Training & Workshops</TabsTrigger>
            </TabsList>

            {/* SKILLS TAB — 3 views */}
            <TabsContent value="skills" className="mt-0">
              <StarView     isInView={isInView} />
              <HeptagonView isInView={isInView} />
              <MobileView />
            </TabsContent>

            {/* CERTIFICATIONS TAB */}
            <TabsContent value="certifications">
              <FilterBar options={CERT_CATEGORIES} selected={selectedCert} onSelect={setSelectedCert} />
              <AnimatePresence mode="wait">
                <motion.div key={selectedCert}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}>
                  {filteredCerts.map((cert, i) => <CertCard key={cert.title} item={cert} index={i} />)}
                </motion.div>
              </AnimatePresence>
            </TabsContent>

            {/* TRAINING TAB */}
            <TabsContent value="training">
              <FilterBar options={TRAINING_FILTERS} selected={selectedTraining} onSelect={setSelectedTraining} />
              <AnimatePresence mode="wait">
                <motion.div key={selectedTraining}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}>
                  {filteredTrainings.map((t, i) => <TrainingCard key={t.title} item={t} index={i} />)}
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          </Tabs>

          {/* Stats */}
          <motion.div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.6 }}>
            {STATS.map((stat, i) => <StatCard key={stat.label} stat={stat} index={i} isInView={isInView} />)}
          </motion.div>
        </div>

        <style>{`
          #skills [data-state="active"][role="tab"] {
            background:  rgba(7,212,245,0.16) !important;
            color:       hsl(191,97%,72%)      !important;
            box-shadow:  none  !important;
          }
        `}</style>
      </section>
    </TooltipProvider>
  );
};

export default Skills;