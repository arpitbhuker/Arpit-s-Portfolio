import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  ExternalLink, Calendar, Brain, BarChart3, PieChart,
  TrendingUp, Github, Eye, Database, Code, Grid2x2,
  ChevronDown, ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import gestureImg         from "@/assets/gesture.png";
import netflixImg         from "@/assets/netflix.png";
import evImg              from "@/assets/ev.png";
import amazonImg          from "@/assets/amazon.png";
import fraudImg           from "@/assets/fraud.png";
import twitterImg         from "@/assets/twitter.png";
import portfolioImg       from "@/assets/portfolio.png";
import phishnetImg        from "@/assets/phishnet.png";
import shoppingBehaviorImg from "@/assets/shopping_behavior.png";
import aiDataAgentImg     from "@/assets/aidataagent.png";
import excelImg           from "@/assets/excel.png";

/* ============================================================
   DESIGN TOKENS — no cyan/blue, matching Skills section palette
   ============================================================ */
const ACCENTS = {
  violet:  { text: "hsl(262 83% 75%)",  border: "rgba(167,139,250,0.22)", borderH: "rgba(167,139,250,0.55)", bg: "rgba(167,139,250,0.07)", glow: "rgba(167,139,250,0.18)", hex: "#A78BFA", badge: "rgba(167,139,250,0.12)" },
  emerald: { text: "hsl(160 70% 55%)",  border: "rgba(52,211,153,0.22)",  borderH: "rgba(52,211,153,0.55)",  bg: "rgba(52,211,153,0.07)",  glow: "rgba(52,211,153,0.18)",  hex: "#34D399", badge: "rgba(52,211,153,0.12)"  },
  amber:   { text: "hsl(38 95% 62%)",   border: "rgba(245,158,11,0.22)",  borderH: "rgba(245,158,11,0.55)",  bg: "rgba(245,158,11,0.07)",  glow: "rgba(245,158,11,0.18)",  hex: "#F59E0B", badge: "rgba(245,158,11,0.12)"  },
  rose:    { text: "hsl(0 86% 70%)",    border: "rgba(248,113,113,0.22)", borderH: "rgba(248,113,113,0.55)", bg: "rgba(248,113,113,0.07)", glow: "rgba(248,113,113,0.18)", hex: "#F87171", badge: "rgba(248,113,113,0.12)" },
  orange:  { text: "hsl(25 95% 65%)",   border: "rgba(249,115,22,0.22)",  borderH: "rgba(249,115,22,0.55)",  bg: "rgba(249,115,22,0.07)",  glow: "rgba(249,115,22,0.18)",  hex: "#F97316", badge: "rgba(249,115,22,0.12)"  },
  lime:    { text: "hsl(84 81% 55%)",   border: "rgba(132,204,22,0.22)",  borderH: "rgba(132,204,22,0.55)",  bg: "rgba(132,204,22,0.07)",  glow: "rgba(132,204,22,0.18)",  hex: "#84CC16", badge: "rgba(132,204,22,0.12)"  },
} as const;
type AccentKey = keyof typeof ACCENTS;

/* ============================================================
   CATEGORY → ACCENT MAPPING
   ============================================================ */
const CAT_ACCENT: Record<string, AccentKey> = {
  "Applied AI":           "violet",
  "Computer Vision":      "rose",
  "Data Analysis":        "emerald",
  "Business Intelligence":"amber",
  "Web Development":      "orange",
};

const CAT_ICONS: Record<string, React.ElementType> = {
  "Applied AI":           Brain,
  "Computer Vision":      Eye,
  "Data Analysis":        PieChart,
  "Business Intelligence":BarChart3,
  "Web Development":      Code,
  "All":                  Grid2x2,
};

const CATEGORY_FILTERS = [
  "All", "Applied AI", "Computer Vision",
  "Data Analysis", "Business Intelligence", "Web Development",
] as const;

/* ============================================================
   PROJECT DATA — exact content from source, no additions
   ============================================================ */
interface Project {
  id: number;
  title: string;
  category: string;
  timeline: string;
  image: string;
  summary: string;
  achievements: string[];
  tech: string[];
  link: string;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "AI Data Agent: Autonomous EDA",
    category: "Applied AI",
    timeline: "Dec – Jan 2026",
    image: aiDataAgentImg,
    summary: "Built an autonomous AI-powered data analysis system that performs dataset profiling, cleaning, exploratory data analysis, visualization, and professional report generation with minimal user input.",
    achievements: [
      "Designed a modular agent-based pipeline to profile datasets, detect low-value columns, and guide EDA decisions automatically",
      "Implemented smart visualization logic to generate only high-signal charts based on variance, correlation, outliers, and cardinality",
      "Integrated an LLM-based narrative engine to produce executive-style EDA reports and export full PDF and modeling-ready notebooks",
    ],
    tech: ["Python", "Streamlit", "LLM", "Agent-based Design"],
    link: "https://github.com/arpitbhuker/AI_Data_Agent",
  },
  {
    id: 2,
    title: "PhishNet: Suspicious Link Analyzer",
    category: "Applied AI",
    timeline: "Oct – Dec 2025",
    image: phishnetImg,
    summary: "Built a phishing URL analysis system using deterministic feature extraction, protocol-aware parsing, and weighted risk scoring to identify deceptive or high-risk links.",
    achievements: [
      "Developed a multi-signal URL inspection pipeline detecting userinfo injection, deceptive subdomains, and redirect abuse",
      "Added Unicode and IDN normalization with relaxed structural validation to reliably analyze real-world phishing URLs",
      "Delivered an offline, executable-based tool for fast local link risk assessment without external threat intelligence",
    ],
    tech: ["Python", "Flask", "Feature Engineering"],
    link: "https://github.com/arpitbhuker/PhishNet",
  },
  {
    id: 3,
    title: "Customer Shopping Behavior Analysis",
    category: "Data Analysis",
    timeline: "Oct – Nov 2025",
    image: shoppingBehaviorImg,
    summary: "Analyzed retail transaction data using Python, SQL, and Power BI to understand purchasing behavior, customer segments, and sales patterns to support data-driven retail decision making.",
    achievements: [
      "Cleaned and prepared 3.9K+ customer purchase records using Python (Pandas) with feature engineering and missing value handling",
      "Performed SQL analysis in MySQL to evaluate revenue by demographics, identify discount-dependent products, and segment customers into New, Returning, and Loyal groups",
      "Built an interactive Power BI dashboard with KPIs, category-wise revenue, and demographic insights to support marketing, pricing, and inventory decisions"
    ],
    tech: ["Python", "MySQL", "Power BI", "Pandas", "SQL"],
    link: "https://github.com/arpitbhuker/Customer_Shopping_Behavior_Data_Analysis",
  },
  {
    "id": 4,
    "title": "Personal Portfolio Website",
    "category": "Web Development",
    "timeline": "Sep – Oct 2025",
    "image": portfolioImg,
    "summary": "Designed and developed a responsive personal portfolio website to present projects, skills, and certifications while exploring modern frontend architecture and interactive UI design.",
    "achievements": [
      "Built a modular React + TypeScript architecture with reusable components and responsive layouts optimized for desktop, tablet, and mobile viewing.",
      "Implemented animated UI elements and interactive skill visualizations using Framer Motion, improving engagement and demonstrating modern frontend design capabilities.",
      "Organized projects, certifications, and training into structured sections, creating a recruiter-friendly interface that highlights technical expertise and learning journey."
    ],
    "tech": ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
    "link": "https://github.com/arpitbhuker/Arpit-s-Portfolio"
  },
  {
    id: 5,
    title: "Sales Performance Analytics Dashboard",
    category: "Data Analysis",
    timeline: "Aug – Sep 2025",
    image: excelImg,
    summary: "Developed an interactive sales analytics dashboard to analyze transaction-level data and uncover revenue trends, product performance, and regional growth patterns using Excel.",
    achievements: [
      "Analyzed 30k+ sales transactions to identify revenue trends and product performance across multiple regions",
      "Defined and calculated key KPIs such as monthly revenue, category contribution, and regional growth rates using SQL and Excel",
      "Built an interactive Excel dashboard using Pivot Tables and Power Query to highlight underperforming categories and seasonal demand patterns",
    ],
    tech: ["Excel", "Pivot Tables", "Power Query", "Data Visualization"],
    link: "https://github.com/arpitbhuker/sales_performance_analytics_excel_dashboard",
  },
  {
    id: 6,
    title: "Gesture Control System",
    category: "Computer Vision",
    timeline: "Jul – Aug 2025",
    image: gestureImg,
    summary: "Developed a real-time computer vision system that tracks hand movement through a webcam and converts swipe gestures into PowerPoint slide navigation using Python.",
    achievements: [
      "Tracked single-hand motion on 900×720 video frames at ~25–30 FPS using OpenCV and CVZone",
      "Implemented 50-pixel swipe threshold with 15-frame cooldown to prevent repeated triggers",
      "Integrated Win32Com to automate PowerPoint slide transitions with low-latency gesture response",
    ],
    tech: ["Python", "OpenCV", "cvzone", "win32com"],
    link: "https://github.com/arpitbhuker/PPT-Gesture-Control",
  },
  {
    id: 7,
    title: "Netflix Data Analysis",
    category: "Data Analysis",
    timeline: "Feb – Mar 2025",
    image: netflixImg,
    summary: "Performed exploratory data analysis on Netflix’s global content dataset to uncover trends in genres, ratings, countries, and release timelines using Python-based analytics.",
    achievements: [
      "Cleaned and processed Netflix dataset using Pandas and NumPy for reliable exploratory analysis",
      "Visualized genre distribution, country contributions, and yearly release trends with Matplotlib",
      "Identified key insights on content mix, popular ratings, and dominant production countries through data-driven analysis",
    ],
    tech: ["Python", "Pandas", "NumPy", "Matplotlib"],
    link: "https://github.com/arpitbhuker/Netflix-Data-Analysis",
  },
  {
    id: 8,
    title: "Electric Vehicles Data Analysis",
    category: "Data Analysis",
    timeline: "Jun – Jul 2024",
    image: evImg,
    summary: "Built an interactive Tableau dashboard analyzing ev datasets to uncover adoption trends, manufacturer dominance, vehicle types, and model distribution for data-driven market insights.",
    achievements: [
      "Analyzed BEV vs PHEV distribution and EV growth trends using dynamic Tableau dashboards",
      "Visualized manufacturer market share and popular EV models with interactive filters and KPIs",
      "Enabled state-level and model-year exploration using drill-down analytics and slicers",
    ],
    tech: ["Tableau", "Excel"],
    link: "https://github.com/arpitbhuker/Electric-Vehicles-Data-Analysis",
  },
  {
    id: 9,
    title: "Amazon Sales Analytics Dashboard",
    category: "Business Intelligence",
    timeline: "Jan – Feb 2024",
    image: amazonImg,
    summary: "Developed an interactive Power BI dashboard to analyze Amazon sales data, tracking revenue, product performance, and category trends through KPI metrics and dynamic visualizations.",
    achievements: [
      "Transformed raw Excel sales data using Power Query for structured analysis and dashboard integration",
      "Built DAX-based KPIs to monitor revenue, profit, orders, and category performance trends",
      "Designed interactive visuals and slicers enabling product, category, and time-based sales exploration",
    ],
    tech: ["Power BI", "DAX", "Power Query", "Excel"],
    link: "https://github.com/arpitbhuker/Amazon-Sales-Dashboard",
  },
  {
    id: 10,
    title: "AI-Driven Financial Fraud Detection System",
    category: "Applied AI",
    timeline: "Jan – Apr 2024",
    image: fraudImg,
    summary: "Developed a ml–based fraud detection system analyzing large-scale financial transactions to identify suspicious patterns using advanced classification models and explainable AI techniques.",
    achievements: [
      "Preprocessed large transaction datasets and handled class imbalance using SMOTE to improve fraud detection reliability",
      "Trained and evaluated models including XGBoost and Random Forest using precision, recall, F1-score, and ROC-AUC metrics",
      "Implemented SHAP-based explainability to interpret model predictions and highlight key risk-driving features",
    ],
    tech: ["Python", "Machine Learning", "XGBoost", "SMOTE", "SHAP"],
    link: "https://github.com/arpitbhuker/AI-Driven-Financial-Fraud-Detection-System",
  },
  {
    id: 11,
    title: "Twitter Analytics Dashboard",
    category: "Business Intelligence",
    timeline: "Mar – Apr 2024",
    image: twitterImg,
    summary: "Built an interactive Power BI dashboard to analyze Twitter engagement metrics, impressions, clicks, and hashtag performance, enabling deeper insights into social media campaign effectiveness.",
    achievements: [
      "Transformed and cleaned tweet datasets using Power Query to prepare structured data for analytics and visualization",
      "Developed DAX-driven KPIs tracking impressions, engagements, profile clicks, and link interactions",
      "Designed interactive visuals and filters enabling hashtag, time, and tweet-level performance exploration",
    ],
    tech: ["Power BI", "DAX", "Power Query", "Excel"],
    link: "https://github.com/arpitbhuker/Twitter-Analytics-Dashboard",
  },
];

const INITIAL_VISIBLE = 4;

/* ============================================================
   BACKGROUND — diagonal mesh + floating data-node particles
   Different from Skills (circuit traces) and About (dot grid)
   ============================================================ */
const ProjectsBackground = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {/* Diagonal mesh — wider spacing than Skills */}
    <div className="absolute inset-0" />
    {/* Faint horizontal lines */}
    <div className="absolute inset-0" />
    
    {/* Ambient blobs — violet + amber + emerald */}
    <div className="absolute pointer-events-none" style={{ width: "42%", height: "48%", top: "5%", right: "-5%", background: "radial-gradient(ellipse, rgba(167,139,250,0.040) 0%, transparent 65%)", filter: "blur(72px)" }} />
    <div className="absolute pointer-events-none" style={{ width: "38%", height: "42%", bottom: "8%", left: "-4%", background: "radial-gradient(ellipse, rgba(245,158,11,0.030) 0%, transparent 65%)", filter: "blur(68px)" }} />
    <div className="absolute pointer-events-none" style={{ width: "30%", height: "35%", top: "40%", left: "35%", background: "radial-gradient(ellipse, rgba(52,211,153,0.022) 0%, transparent 65%)", filter: "blur(60px)" }} />
  </div>
);

/* ============================================================
   CATEGORY FILTER BAR
   ============================================================ */
const FilterBar = ({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (v: string) => void;
}) => (
  <div className="flex flex-wrap justify-center gap-2 mb-10">
    {CATEGORY_FILTERS.map((cat) => {
      const Icon      = CAT_ICONS[cat];
      const accentKey = CAT_ACCENT[cat];
      const a         = accentKey ? ACCENTS[accentKey] : null;
      const isActive  = selected === cat;
      return (
        <motion.button
          key={cat}
          onClick={() => onSelect(cat)}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
          style={
            isActive
              ? {
                  background: a ? a.bg : "rgba(255,255,255,0.10)",
                  border:     `1px solid ${a ? a.borderH : "rgba(255,255,255,0.4)"}`,
                  color:      a ? a.text : "#fff",
                  boxShadow:  a ? `0 0 14px ${a.glow}` : "none",
                }
              : {
                  background: "rgba(255,255,255,0.04)",
                  border:     "1px solid rgba(255,255,255,0.10)",
                  color:      "hsl(210 10% 60%)",
                }
          }
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          <Icon size={13} strokeWidth={1.8} />
          {cat}
        </motion.button>
      );
    })}
  </div>
);

/* ============================================================
   PROJECT CARD
   ============================================================ */
const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const accentKey = (CAT_ACCENT[project.category] ?? "violet") as AccentKey;
  const a         = ACCENTS[accentKey];
  const CatIcon   = CAT_ICONS[project.category];
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      className="relative rounded-xl overflow-hidden flex flex-col"
      style={{
        background:     "rgba(5,5,8,0.78)",
        border:         `1px solid ${hovered ? a.borderH : a.border}`,
        backdropFilter: "blur(14px)",
        boxShadow:      hovered
          ? `0 0 32px ${a.glow}, 0 8px 32px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.04)`
          : `0 2px 18px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.03)`,
        transform:      hovered ? "translateY(-4px)" : "translateY(0)",
        transition:     "all 0.30s cubic-bezier(0.22,1,0.36,1)",
      }}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.97 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Hover inner glow */}
      <div
        className="absolute inset-0 pointer-events-none rounded-xl transition-opacity duration-300"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 0% 0%, ${a.bg} 0%, transparent 60%)`,
          opacity:    hovered ? 1 : 0,
        }}
      />

      {/* Accent top-border */}
      <div
        className="absolute top-0 left-5 right-5 h-px pointer-events-none transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${a.text}, transparent)`,
          opacity:    hovered ? 0.55 : 0.18,
        }}
      />

      {/* ── Image — compact height so content stays in focus ── */}
      <div className="relative overflow-hidden" style={{ height: "128px", flexShrink: 0 }}>
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 ease-out"
          style={{ transform: hovered ? "scale(1.04)" : "scale(1)" }}
        />
        {/* Gradient overlay so text on image would be readable, and bottom blends into card */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(5,5,8,0.08) 0%, rgba(5,5,8,0.55) 100%)",
          }}
        />
        {/* Category badge — overlaid on image */}
        <div className="absolute bottom-2.5 left-3">
          <span
            className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full"
            style={{
              background: `rgba(5,5,8,0.80)`,
              border:     `1px solid ${a.border}`,
              color:      a.text,
              backdropFilter: "blur(8px)",
            }}
          >
            <CatIcon size={11} strokeWidth={2} />
            {project.category}
          </span>
        </div>
        {/* Timeline — top-right */}
        <div className="absolute top-2.5 right-3">
          <span
            className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full"
            style={{
              background: "rgba(5,5,8,0.75)",
              color:      "hsl(210 10% 65%)",
              backdropFilter: "blur(8px)",
            }}
          >
            <Calendar size={9} strokeWidth={2} />
            {project.timeline}
          </span>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col flex-1 p-4 gap-3">
        {/* Title */}
        <h3
          className="font-bold text-base leading-snug transition-colors duration-200"
          style={{ color: hovered ? a.text : "hsl(210 20% 95%)" }}
        >
          {project.title}
        </h3>

        {/* Summary */}
        <p className="text-xs leading-relaxed" style={{ color: "hsl(210 10% 54%)" }}>
          {project.summary}
        </p>

        {/* Achievements */}
        <ul className="space-y-1.5">
          {project.achievements.map((ach, i) => (
            <li key={i} className="flex items-start gap-2 text-xs" style={{ color: "hsl(210 10% 50%)" }}>
              <span
                className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: a.hex }}
              />
              {ach}
            </li>
          ))}
        </ul>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-[10px] px-2 py-0.5 rounded-full font-medium"
              style={{
                background: a.badge,
                color:      a.text,
                border:     `1px solid ${a.border}`,
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* CTA button */}
        <motion.button
          className="w-full mt-2 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-200"
          style={{
            background:  hovered ? a.bg : "rgba(255,255,255,0.04)",
            border:      `1px solid ${hovered ? a.borderH : a.border}`,
            color:       a.text,
            boxShadow:   hovered ? `0 0 16px ${a.glow}` : "none",
          }}
          whileTap={{ scale: 0.97 }}
          onClick={() => window.open(project.link, "_blank", "noopener,noreferrer")}
        >
          <ExternalLink size={13} strokeWidth={2} />
          View Project
        </motion.button>
      </div>
    </motion.article>
  );
};

/* ============================================================
   SHOW MORE / LESS BUTTON
   ============================================================ */
const ExpandToggle = ({
  expanded,
  remaining,
  onToggle,
}: {
  expanded: boolean;
  remaining: number;
  onToggle: () => void;
}) => (
  <motion.div
    className="flex justify-center mt-8"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.4, delay: 0.3 }}
  >
    <motion.button
      className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200"
      style={{
        background:  "rgba(167,139,250,0.07)",
        border:      "1px solid rgba(167,139,250,0.25)",
        color:       "hsl(262 83% 75%)",
        boxShadow:   "0 0 0 0 transparent",
      }}
      whileHover={{
        background: "rgba(167,139,250,0.13)",
        borderColor: "rgba(167,139,250,0.50)",
        boxShadow:  "0 0 18px rgba(167,139,250,0.20)",
        scale:      1.03,
      }}
      whileTap={{ scale: 0.97 }}
      onClick={onToggle}
    >
      {expanded ? (
        <>
          <ChevronUp size={16} strokeWidth={2} />
          Show Less
        </>
      ) : (
        <>
          <ChevronDown size={16} strokeWidth={2} />
          {remaining} More Projects
        </>
      )}
    </motion.button>
  </motion.div>
);

/* ============================================================
   COLLABORATE CTA — compact, no excess padding
   ============================================================ */
const CollaborateCTA = () => (
  <motion.div
    className="mt-16 mb-4"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    viewport={{ once: true }}
  >
    <div
      className="relative rounded-2xl p-8 md:p-10 overflow-hidden max-w-3xl mx-auto"
      style={{
        background:     "rgba(5,5,8,0.72)",
        border:         "1px solid rgba(167,139,250,0.22)",
        backdropFilter: "blur(16px)",
        boxShadow:      "0 0 40px rgba(167,139,250,0.08), 0 8px 32px rgba(0,0,0,0.5)",
      }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(167,139,250,0.08) 0%, transparent 70%)",
        }}
      />
      {/* Top accent */}
      <div
        className="absolute top-0 left-8 right-8 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.40), transparent)" }}
      />

      <div className="relative z-10 text-center space-y-4">
        <h3 className="text-2xl md:text-3xl font-bold">
          Let's{" "}
          <span
            style={{
              background: "linear-gradient(135deg, hsl(262 83% 75%), hsl(38 95% 62%))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Collaborate
          </span>{" "}
          🚀
        </h3>

        <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
          I love building intelligent systems that turn data into decisions.
          If your idea involves AI, ML, analytics, or automation — we're already aligned.
        </p>

        <div className="pt-2">
          <motion.a
            href="https://github.com/arpitbhuker"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold"
            style={{
              background: "rgba(167,139,250,0.10)",
              border:     "1px solid rgba(167,139,250,0.28)",
              color:      "hsl(262 83% 75%)",
            }}
            whileHover={{
              background: "rgba(167,139,250,0.18)",
              borderColor: "rgba(167,139,250,0.55)",
              boxShadow:  "0 0 24px rgba(167,139,250,0.25)",
              scale:      1.03,
            }}
            whileTap={{ scale: 0.97 }}
          >
            <Github size={16} strokeWidth={2} />
            View All Projects on GitHub
          </motion.a>
        </div>
      </div>
    </div>
  </motion.div>
);

/* ============================================================
   MAIN SECTION
   ============================================================ */
const Projects = () => {
  const ref      = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expanded,         setExpanded]         = useState(false);

  const filtered = selectedCategory === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  // Reset collapse when filter changes
  const handleFilter = (cat: string) => {
    setSelectedCategory(cat);
    setExpanded(false);
  };

  const visible   = expanded ? filtered : filtered.slice(0, INITIAL_VISIBLE);
  const remaining = filtered.length - INITIAL_VISIBLE;
  const showToggle = filtered.length > INITIAL_VISIBLE;

  return (
    <section id="projects" ref={ref} className="relative py-20 md:py-24 overflow-hidden">

      <ProjectsBackground />

      <div className="container mx-auto px-4 md:px-6 relative z-10">

        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-3">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Real-world applications showcasing data science, AI/ML, and analytics expertise
          </p>
        </motion.div>

        {/* Filter bar */}
        <FilterBar selected={selectedCategory} onSelect={handleFilter} />

        {/* Project grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <AnimatePresence>
              {visible.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>

        {/* Expand / collapse toggle */}
        {showToggle && (
          <ExpandToggle
            expanded={expanded}
            remaining={remaining}
            onToggle={() => setExpanded((v) => !v)}
          />
        )}

        {/* Collaborate CTA */}
        <CollaborateCTA />

      </div>

      {/* Tab active override (for consistency if tabs ever added) */}
      <style>{`
        #projects .project-filter-active {
          background: rgba(167,139,250,0.12);
          border-color: rgba(167,139,250,0.45);
          color: hsl(262,83%,75%);
        }
      `}</style>
    </section>
  );
};

export default Projects;