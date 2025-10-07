import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, Calendar, TrendingUp, Eye, BarChart3, Brain, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      id: 1,
      title: "Gesture Control System",
      tech: ["Python", "OpenCV"],
      timeline: "Jul - Aug 2025",
      icon: Eye,
      gradient: "from-blue-500 to-purple-600",
      description: "Developed a real-time gesture recognition system in Python using OpenCV to control presentations with just two hand gestures, achieving smooth 20–30 FPS performance and eliminating manual interruptions.",
      impact: "This innovation improved presentations by allowing seamless hand gesture-based navigation, completely eliminating interruptions and enhancing audience engagement.",
      category: "Computer Vision",
      link: "https://github.com/arpitbhuker/PPT-Gesture-Control"
    },
    {
      id: 2,
      title: "Netflix Data Analysis",
      tech: ["Python", "Pandas", "NumPy"],
      timeline: "Feb - Mar 2025",
      icon: BarChart3,
      gradient: "from-red-500 to-orange-600",
      description: "Analyzed a dataset of 8,800+ Netflix titles by cleaning and preprocessing data using Pandas and NumPy. Explored trends across genres and countries, revealing that movies accounted for 65% of content.",
      impact: "Over 15 visualizations were designed to highlight a threefold content growth from 2010-2020 and uncover key rating trends, providing actionable insights for content strategy.",
      category: "Data Analysis",
      link: "https://github.com/arpitbhuker/Netflix-Data-Analysis"
    },
    {
      id: 3,
      title: "Electric Vehicles Data Analysis",
      tech: ["Tableau"],
      timeline: "Jun - Jul 2024",
      icon: TrendingUp,
      gradient: "from-green-500 to-teal-600",
      description: "Created a Tableau dashboard to track EV adoption trends using 50,000+ registration records, segmented by state, manufacturer, and model. Visualized concentration and fuel-type distributions using heatmaps and breakdowns.",
      impact: "The dashboard streamlined reporting workflows, reducing manual effort by 35% and enabling stakeholders to monitor adoption trends in real time.",
      category: "Data Visualization",
      link: "https://github.com/arpitbhuker/Electric-Vehicles-Data-Analysis"
    },
    {
      id: 4,
      title: "Amazon Sales Analytics Dashboard",
      tech: ["Power BI", "DAX"],
      timeline: "Jan - Feb 2024",
      icon: Database,
      gradient: "from-orange-500 to-yellow-600",
      description: "Built a Power BI dashboard to analyze 3,000 Amazon sales records using DAX and Power Query. Enabled tracking of KPIs and trends across multiple product categories for more efficient decision-making.",
      impact: "This optimization reduced manual analysis time by 40%, improving decision-making efficiency and real-time tracking of sales performance.",
      category: "Business Intelligence",
      link: "https://github.com/arpitbhuker/Amazon-Sales-Dashboard"
    },
    {
      id: 5,
      title: "AI-Driven Financial Fraud Detection System",
      tech: ["Machine Learning", "Python"],
      timeline: "Jan - Apr 2024",
      icon: Brain,
      gradient: "from-purple-500 to-pink-600",
      description: "Developed machine learning models using XGBoost and Random Forest on 1M transaction records to detect financial fraud with 98% accuracy. Preprocessed and ETL-handled data for optimal model performance.",
      impact: "SHAP explainable AI was implemented to make the model interpretable, achieving 90% transparency coverage for compliance and significantly enhancing fraud detection reliability.",
      category: "AI/ML",
      link: "https://github.com/arpitbhuker/AI-Driven-Financial-Fraud-Detection-System"
    },
    {
      id: 6,
      title: "Twitter Analytics Dashboard",
      tech: ["Power BI"],
      timeline: "Mar - Apr 2025",
      icon: BarChart3,
      gradient: "from-blue-400 to-cyan-600",
      description: "Designed a Power BI dashboard to capture and visualize real-time Twitter data, including tweet volume, engagement, media views, URL clicks, and hashtag performance, for actionable social media insights.",
      impact: "Interactive visualizations and a responsive mobile interface enabled seamless data exploration, providing actionable insights for social media strategy and maximizing user engagement across platforms.",
      category: "Social Analytics",
      link: "https://github.com/arpitbhuker/Twitter-Analytics-Dashboard"
    }
  ];

  const ProjectCard = ({ project, index }: { project: any; index: number }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsFlipped((prev) => !prev);
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="rrelative h-[22rem] sm:h-[24rem] md:h-[20rem] perspective-1000"
      >
        <motion.div
          className="relative w-full h-full preserve-3d"
          animate={{
            scale: isHovered ? 1.05 : 1,
            rotateY: isFlipped ? 180 : 0,
          }}
          transition={{
            scale: { duration: 0.3, ease: "easeInOut" }, // smooth hover
            rotateY: { duration: 0.3 } // instant flip ⚡
          }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          onClick={handleClick}
        >
          {/* Front side */}
          <div className="absolute inset-0 w-full h-full backface-hidden">
            <div className="glass-card p-6 rounded-xl h-full flex flex-col relative overflow-hidden hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-shadow">
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-5`}></div>
              <div className="relative z-10 flex-1">
                <div className="flex items-start justify-between mb-4">
                  <project.icon className="text-primary" size={36} />
                  <Badge variant="secondary" className="text-xs">{project.category}</Badge>
                </div>

                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>

                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <Calendar size={16} className="mr-2" />
                  {project.timeline}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech: string, techIndex: number) => (
                    <Badge key={techIndex} variant="outline" className="text-xs">{tech}</Badge>
                  ))}
                </div>
              </div>

              <div className="text-center mt-4">
                <p className="text-sm text-muted-foreground">Click for details</p>
              </div>
            </div>
          </div>

          {/* Back side */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
            <div className="glass-card p-6 rounded-xl h-full flex flex-col">
              <h3 className="text-xl font-bold mb-4 text-primary">{project.title}</h3>
              <div className="flex-1 space-y-4 text-sm text-muted-foreground">
                <p>{project.description}</p>
                <p>{project.impact}</p>
              </div>

              <div className="flex gap-2 mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.link, "_blank");
                  }}
                >
                  <Github size={14} className="mr-1" /> Code
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-glow"></div>

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real-world applications showcasing data science, AI/ML, and analytics expertise
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
};

export default Projects;
