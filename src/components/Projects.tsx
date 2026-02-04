import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  ExternalLink,
  Calendar,
  Brain,
  BarChart3,
  Trophy,
  PieChart,
  TrendingUp,
  Github,
  Eye,
  Database,
  Code,
  Grid2x2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import gestureImg from "@/assets/gesture.png";
import netflixImg from "@/assets/netflix.png";
import evImg from "@/assets/ev.png";
import amazonImg from "@/assets/amazon.png";
import fraudImg from "@/assets/fraud.png";
import twitterImg from "@/assets/twitter.png";
import portfolioImg from "@/assets/portfolio.png";
import phishnetImg from "@/assets/phishnet.png";
import shoppingBehaviorImg from "@/assets/shopping_behavior.png";
import aiDataAgentImg from "@/assets/aidataagent.png";

const categoryIcons: Record<string, any> = {
  "Applied AI": Brain,
  "Computer Vision": Eye,
  "Data Analysis": PieChart,
  "Business Intelligence": BarChart3,
  "Web Development": Code,
  All: Grid2x2,
};

const categoryFilters = [
  "All",
  "Applied AI",
  "Computer Vision",
  "Data Analysis",
  "Business Intelligence",
  "Web Development",
];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedCategory, setSelectedCategory] = useState("All");

  const projects = [
    {
      id: 1,
      title: "AI Data Agent: Autonomous EDA",
      category: "Applied AI",
      timeline: "Dec - Jan 2026",
      image: aiDataAgentImg,
      summary:
        "Built an autonomous AI-powered data analysis system that performs dataset profiling, cleaning, exploratory data analysis, visualization, and professional report generation with minimal user input.",
      achievements: [
        "Designed a modular agent-based pipeline to profile datasets, detect low-value columns, and guide EDA decisions automatically",
        "Implemented smart visualization logic to generate only high-signal charts based on variance, correlation, outliers, and cardinality",
        "Integrated an LLM-based narrative engine to produce executive-style EDA reports and export full PDF and modeling-ready notebooks"
      ],
      tech: [
        "Python",
        "Streamlit",
        "LLM",
        "Agent-based Design"
      ],
      link: "https://github.com/arpitbhuker/AI_Data_Agent",
    },    
    {
      id: 2,
      title: "PhishNet: Suspicious Link Analyzer",
      category: "Applied AI",
      timeline: "Oct - Dec 2025",
      image: phishnetImg,
      summary:
      "Built a phishing URL analysis system using deterministic feature extraction, protocol-aware parsing, and weighted risk scoring to identify deceptive or high-risk links.",
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
      summary:
        "Analyzed retail transaction data using Python, SQL, and Power BI to uncover purchasing patterns, customer segments, and sales trends that support data-driven business decisions.",
      achievements: [
        "Identified key purchasing trends across customer segments",
        "Converted raw transactional data into structured business insights",
        "Delivered an interactive dashboard for clear stakeholder reporting",
      ],
      tech: ["Python", "MySQL", "Power BI", "Pandas", "SQL"],
      link: "https://github.com/arpitbhuker/Customer_Shopping_Behavior_Data_Analysis",
    },
    {
      id: 4,
      title: "Personal Portfolio Website",
      category: "Web Development",
      timeline: "Sep – Oct 2025",
      image: portfolioImg,
      summary:
        "Designed and developed a responsive personal portfolio to showcase projects, skills, and experience while exploring modern frontend workflows and performance-focused UI design.",
      achievements: [
        "Structured multiple projects into a clear, recruiter-friendly layout",
        "Improved content discoverability through modular sections",
        "Demonstrated ability to learn and apply new frontend tools independently",
      ],
      tech: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
      link: "https://github.com/arpitbhuker/Arpit-s-Portfolio",
    },
    {
      id: 5,
      title: "Gesture Control System",
      category: "Computer Vision",
      timeline: "Jul – Aug 2025",
      image: gestureImg,
      summary:
        "Built a real-time gesture recognition system in Python using OpenCV to control presentations using two hand gestures, delivering smooth navigation at 20–30 FPS.",
      achievements: [
        "Achieved stable 20–30 FPS for seamless interaction",
        "Eliminated manual slide-switching interruptions",
        "Enhanced audience engagement with touch-free control",
      ],
      tech: ["Python", "OpenCV", "cvzone", "win32com"],
      link: "https://github.com/arpitbhuker/PPT-Gesture-Control",
    },
    {
      id: 6,
      title: "Netflix Data Analysis",
      category: "Data Analysis",
      timeline: "Feb – Mar 2025",
      image: netflixImg,
      summary:
        "Analyzed 8,800+ Netflix titles to uncover genre, country, and rating trends, producing 15+ compelling visual insights for content strategy.",
      achievements: [
        "Discovered movies cover 65% of content portfolio",
        "Revealed 3× content growth from 2010–2020",
        "Delivered insights shaping future content targeting",
      ],
      tech: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
      link: "https://github.com/arpitbhuker/Netflix-Data-Analysis",
    },
    {
      id: 7,
      title: "Electric Vehicles Data Analysis",
      category: "Data Analysis",
      timeline: "Jun – Jul 2024",
      image: evImg,
      summary:
        "Developed an interactive Tableau dashboard analyzing 50,000+ EV registrations to monitor adoption trends across states and manufacturers.",
      achievements: [
        "Reduced reporting effort by 35% via automation",
        "Visualized EV concentration with geo-heatmaps",
        "Enabled real-time tracking for stakeholder decisions",
      ],
      tech: ["Tableau", "Excel"],
      link: "https://github.com/arpitbhuker/Electric-Vehicles-Data-Analysis",
    },
    {
      id: 8,
      title: "Amazon Sales Analytics Dashboard",
      category: "Business Intelligence",
      timeline: "Jan – Feb 2024",
      image: amazonImg,
      summary:
        "Created a Power BI analytics system for Amazon product performance using KPI tracking and DAX-driven visualizations.",
      achievements: [
        "Improved decision-making efficiency by 40%",
        "Centralized trends for product/category analysis",
        "Enabled near-real-time business visibility",
      ],
      tech: ["Power BI", "DAX", "Power Query", "Excel"],
      link: "https://github.com/arpitbhuker/Amazon-Sales-Dashboard",
    },
    {
      id: 9,
      title: "AI-Driven Financial Fraud Detection System",
      category: "Applied AI",
      timeline: "Jan – Apr 2024",
      image: fraudImg,
      summary:
        "Built ML models like XGBoost and Random Forest for fraud detection using 1M+ records achieving high accuracy and explainability.",
      achievements: [
        "Achieved 98% detection accuracy in testing",
        "Enabled explainability using SHAP for transparency",
        "Strengthened compliance with early risk alerts",
      ],
      tech: ["Python", "Machine Learning", "XGBoost", "SMOTE", "SHAP"],
      link: "https://github.com/arpitbhuker/AI-Driven-Financial-Fraud-Detection-System",
    },
    {
      id: 10,
      title: "Twitter Analytics Dashboard",
      category: "Business Intelligence",
      timeline: "Mar – Apr 2024",
      image: twitterImg,
      summary:
        "Developed a real-time Twitter insights dashboard to analyze engagement, impressions, click behavior, and hashtag performance.",
      achievements: [
        "Optimized engagement strategy using data signals",
        "Delivered responsive mobile-friendly analytics",
        "Enabled informed campaign performance tracking",
      ],
      tech: ["Power BI", "DAX", "Power Query", "Excel"],
      link: "https://github.com/arpitbhuker/Twitter-Analytics-Dashboard",
    },
  ];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-glow"></div>

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real-world applications showcasing data science, AI/ML, and
            analytics expertise
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categoryFilters.map((filter) => {
            const Icon = categoryIcons[filter];
            return (
              <button
                key={filter}
                className={`px-4 py-2 rounded-full flex items-center gap-2 text-sm transition-all ${
                  selectedCategory === filter
                    ? "bg-primary text-white shadow-lg"
                    : "bg-gray-700/40 hover:bg-gray-600/50"
                }`}
                onClick={() => setSelectedCategory(filter)}
              >
                <Icon size={16} />
                {filter}
              </button>
            );
          })}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {filteredProjects.map((project, index) => {
            const Icon = categoryIcons[project.category];

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 60, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.06,
                  ease: "easeOut",
                }}
                className="
                  group relative rounded-xl overflow-hidden
                  flex flex-col justify-between
                  bg-[#0A2A43]/60 backdrop-blur-xl
                  border border-[#00E5FF]/20
                  shadow-[0_4px_18px_rgba(0,229,255,0.08)]
                  transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
                  hover:scale-450
                  hover:shadow-[0_12px_36px_rgba(0,229,255,0.25)]
                "
              >
                {/* ✅ Hover Gradient Overlay — EXACT effect requested */}
                <div
                  className="
                    absolute inset-0 rounded-xl pointer-events-none
                    bg-gradient-to-br from-[#00E5FF]/10 to-[#007EFF]/10
                    opacity-0 group-hover:opacity-40
                    transition-opacity duration-500 ease-out
                    z-0
                  "
                />

                {/* ✅ Card Content (Preserved) */}
                <div className="relative z-10 flex flex-col h-full">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="
                      h-44 w-full object-cover
                      transition-transform duration-500 ease-out
                    "
                  />
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <Badge
                        variant="secondary"
                        className="text-xs flex items-center gap-1"
                      >
                        <Icon size={14} /> {project.category}
                      </Badge>

                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar size={16} className="mr-1" />
                        {project.timeline}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold group-hover:text-[#00E5FF] transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      {project.summary}
                    </p>

                    <ul className="text-sm list-disc list-inside text-muted-foreground space-y-1">
                      {project.achievements.map((a, i) => (
                        <li key={i}>{a}</li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {t}
                        </Badge>
                      ))}
                    </div>

                    <Button
                      className="w-full mt-3"
                      onClick={() => window.open(project.link, "_blank")}
                    >
                      View Project
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ✅ Collaboration CTA — Added Here */}
        <div className="mt-24 mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card
              className="p-10 rounded-3xl 
                bg-gradient-to-br from-cyan-500/10 to-blue-600/10
                border border-cyan-400/20 backdrop-blur-xl
                shadow-[0_0_20px_rgba(0,255,255,0.2)]
                hover:shadow-[0_0_35px_rgba(0,255,255,0.35)]
                transition-all duration-500
                max-w-4xl mx-auto"
            >
              <div className="space-y-6">
                <h3 className="text-3xl font-bold">
                  Let’s <span className="gradient-text">Collaborate</span> 🚀
                </h3>

                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  I love building intelligent systems that turn data into
                  decisions. If your idea involves AI, ML, analytics, or
                  automation — we’re already aligned.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <a
                    href="https://github.com/arpitbhuker"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-cyan-400 text-cyan-300
                      hover:bg-cyan-400 hover:text-black
                      hover:shadow-[0_0_25px_rgba(0,255,255,0.5)]
                      transition-all duration-300"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      View All Projects
                    </Button>
                  </a>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
