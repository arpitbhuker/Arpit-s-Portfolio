import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Calendar, Brain, BarChart3, Trophy, PieChart, TrendingUp, Eye, Database, Grid2x2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const categoryIcons: Record<string, any> = {
  "AI/ML": Brain,
  "Data Science": Database,
  "Data Analytics": PieChart,
  "Business Intelligence": BarChart3,
  All: Grid2x2,
};

const categoryFilters = ["All", "AI/ML", "Data Science", "Data Analytics", "Business Intelligence"];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedCategory, setSelectedCategory] = useState("All");

  const projects = [
  {
    id: 1,
    title: "Gesture Control System",
    category: "AI/ML",
    timeline: "Jul – Aug 2025",
    image: "@/assets/gesture.png",
    summary:
      "Built a real-time gesture recognition system in Python using OpenCV to control presentations using two hand gestures, delivering smooth navigation at 20–30 FPS.",
    achievements: [
      "Achieved stable 20–30 FPS for seamless interaction",
      "Eliminated manual slide-switching interruptions",
      "Enhanced audience engagement with touch-free control"
    ],
    tech: ["Python", "OpenCV", "cvzone", "pywin32"],
    link: "https://github.com/arpitbhuker/PPT-Gesture-Control"
  },
  {
    id: 2,
    title: "Netflix Data Analysis",
    category: "Data Science",
    timeline: "Feb – Mar 2025",
    image: "@/assets/netflix.png",
    summary:
      "Analyzed 8,800+ Netflix titles to uncover genre, country, and rating trends, producing 15+ compelling visual insights for content strategy.",
    achievements: [
      "Discovered movies cover 65% of content portfolio",
      "Revealed 3× content growth from 2010–2020",
      "Delivered insights shaping future content targeting"
    ],
    tech: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    link: "https://github.com/arpitbhuker/Netflix-Data-Analysis"
  },
  {
    id: 3,
    title: "Electric Vehicles Data Analysis",
    category: "Data Analytics",
    timeline: "Jun – Jul 2024",
    image: "@/assets/ev.png",
    summary:
      "Developed an interactive Tableau dashboard analyzing 50,000+ EV registrations to monitor adoption trends across states and manufacturers.",
    achievements: [
      "Reduced reporting effort by 35% via automation",
      "Visualized EV concentration with geo-heatmaps",
      "Enabled real-time tracking for stakeholder decisions"
    ],
    tech: ["Tableau", "Excel"],
    link: "https://github.com/arpitbhuker/Electric-Vehicles-Data-Analysis"
  },
  {
    id: 4,
    title: "Amazon Sales Analytics Dashboard",
    category: "Business Intelligence",
    timeline: "Jan – Feb 2024",
    image: "@/assets/amazon.png",
    summary:
      "Created a Power BI analytics system for Amazon product performance using KPI tracking and DAX-driven visualizations.",
    achievements: [
      "Improved decision-making efficiency by 40%",
      "Centralized trends for product/category analysis",
      "Enabled near-real-time business visibility"
    ],
    tech: ["Power BI", "DAX", "Power Query", "Excel"],
    link: "https://github.com/arpitbhuker/Amazon-Sales-Dashboard"
  },
  {
    id: 5,
    title: "AI-Driven Financial Fraud Detection System",
    category: "AI/ML",
    timeline: "Jan – Apr 2024",
    image: "@/assets/fraud.png",
    summary:
      "Built ML models like XGBoost and Random Forest for fraud detection using 1M+ records achieving high accuracy and explainability.",
    achievements: [
      "Achieved 98% detection accuracy in testing",
      "Enabled explainability using SHAP for transparency",
      "Strengthened compliance with early risk alerts"
    ],
    tech: ["Python", "Machine Learning", "XGBoost", "SMOTE", "SHAP"],
    link:
      "https://github.com/arpitbhuker/AI-Driven-Financial-Fraud-Detection-System"
  },
  {
    id: 6,
    title: "Twitter Analytics Dashboard",
    category: "Data Analytics",
    timeline: "Mar – Apr 2025",
    image: "@/assets/twitter.png",
    summary:
      "Developed a real-time Twitter insights dashboard to analyze engagement, impressions, click behavior, and hashtag performance.",
    achievements: [
      "Optimized engagement strategy using data signals",
      "Delivered responsive mobile-friendly analytics",
      "Enabled informed campaign performance tracking"
    ],
    tech: ["Power BI", "DAX", "Power Query", "Excel"],
    link: "https://github.com/arpitbhuker/Twitter-Analytics-Dashboard"
  }
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
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 35px rgba(255,255,255,0.15)",
                }}
                className="group glass-card rounded-2xl overflow-hidden transition-all border border-gray-700/50"
              >
                {/* Banner */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-44 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="p-6 space-y-4">
                  
                  {/* Category + Timeline */}
                  <div className="flex justify-between items-center">
                    <Badge variant="secondary" className="text-xs px-2 py-1 flex items-center gap-1">
                      <Icon size={14} /> {project.category}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar size={16} className="mr-1" />
                      {project.timeline}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold">{project.title}</h3>

                  <p className="text-sm text-muted-foreground">
                    {project.summary}
                  </p>

                  {/* Achievements */}
                  <ul className="text-sm list-disc list-inside text-muted-foreground space-y-1">
                    {project.achievements.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>

                  {/* Tech badges */}
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
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;