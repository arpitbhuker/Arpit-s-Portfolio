import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Code,
  Database,
  BarChart3,
  Brain,
  Users,
  Award,
  Trophy,
  BookOpen,
  ExternalLink,
} from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [flippedCard, setFlippedCard] = useState<string | null>(null);

  const certifications = [
    {
      title: "Data Visualisation: Empowering Business with Effective Insights",
      provider: "TCS (via Forage)",
      date: "Sep 2025",
      icon: BarChart3,
      link: "https://www.theforage.com/completion-certificates/ifobHAoMjQs9s6bKS/MyXvBcppsW2FkNYCX_ifobHAoMjQs9s6bKS_68c26611cd7d6aa0db5280d3_1758705776107_completion_certificate.pdf",
      description:
        "Training on data visualization techniques and business intelligence using modern visualization tools",
    },
    {
      title: "SQL: A Practical Introduction for Querying Databases",
      provider: "IBM (via Coursera)",
      date: "Jun 2025",
      icon: Database,
      link: "https://coursera.org/verify/0AA2BI2BIW5N",
      description:
        "Hands-on SQL training covering database queries, joins, subqueries, and data manipulation techniques",
    },
    {
      title: "Introduction to Generative AI for Data Analysis",
      provider: "Microsoft (via Coursera)",
      date: "Feb 2025",
      icon: Brain,
      link: "https://coursera.org/verify/2XQ5NLT0SQQF",
      description:
        "Comprehensive course on leveraging generative AI tools and techniques for advanced data analysis workflows",
    },
    {
      title: "Microsoft Certified: Azure AI Fundamentals",
      provider: "Microsoft",
      date: "Aug 2024",
      icon: Award,
      link: "https://learn.microsoft.com/api/credentials/share/en-us/ArpitBhuker-3178/31F48FBCE2815B7A?sharingId=2125ED997921F9FC",
      description:
        "Official Microsoft certification covering AI workloads, ML concepts, and Azure AI services",
    },
    {
      title: "Machine Learning for All",
      provider: "University of London (via Coursera)",
      date: "Oct 2023",
      icon: Brain,
      link: "https://coursera.org/verify/9MMCYXAEW57S",
      description:
        "Fundamental machine learning concepts including supervised learning, unsupervised learning, and model evaluation",
    },
  ];

  const training = [
    {
      title: "AI Mentorship Program",
      provider: "Teachnook",
      timeline: "Feb - Mar 2024",
      description: "Developed and validated AI models for fraud detection",
      icon: Brain,
      link: "https://github.com/arpitbhuker/AI-Driven-Financial-Fraud-Detection-System",
      certificates: [
        {
          label: "Internship Completion Certificate",
          url: "https://drive.google.com/file/d/1LPQbkCsNrrLEkH6VPVDpKbkFjXZeMHEd/view?usp=drive_link",
        },
        {
          label: "Course Completion Certificate",
          url: "https://drive.google.com/file/d/1TCDZfZ3GWsXosVafmyVmaPSJOYmLl3z7/view?usp=drive_link",
        },
      ],
      fullDescription:
        "Intensive mentorship program covering advanced AI/ML concepts, model development, and real-world application. Built and validated sophisticated AI models for financial fraud detection with focus on model interpretability and compliance requirements.",
    },
  ];

  const skillGroups = [
    {
      title: "Programming & Tools",
      items: [
        { name: "Python", icon: Code },
        { name: "SQL", icon: Database },
        { name: "C++", icon: Code },
        { name: "Jupyter Notebook", icon: Code },
        { name: "VSCode", icon: Code },
        { name: "Git/GitHub", icon: Code },
        { name: "CI/CD", icon: Code },
        { name: "Azure AI / Cloud", icon: Brain },
      ],
    },
    {
      title: "Data Analysis & Visualization",
      items: [
        { name: "EDA", icon: BarChart3 },
        { name: "Data Cleaning", icon: BarChart3 },
        { name: "Data Wrangling", icon: BarChart3 },
        { name: "Stats Analysis", icon: BarChart3 },
        { name: "Dashboard Storytelling", icon: BarChart3 },
        { name: "Power BI", icon: BarChart3 },
        { name: "Tableau", icon: BarChart3 },
        { name: "matplotlib", icon: BarChart3 },
        { name: "seaborn", icon: BarChart3 },
      ],
    },
    {
      title: "Machine Learning",
      items: [
        { name: "Supervised Learning", icon: Brain },
        { name: "Unsupervised Learning", icon: Brain },
        { name: "Predictive Modeling", icon: Brain },
        { name: "Feature Engineering", icon: Brain },
        { name: "Model Deployment", icon: Brain },
        { name: "TensorFlow", icon: Brain },
        { name: "scikit-learn", icon: Brain },
        { name: "NumPy", icon: Brain },
        { name: "Pandas", icon: Brain },
      ],
    },
    {
      title: "AI / NLP",
      items: [
        { name: "NLP", icon: Brain },
        { name: "Text Summarization", icon: Brain },
        { name: "Sentiment Analysis", icon: Brain },
        { name: "LLMs / OpenAI APIs", icon: Brain },
        { name: "Computer Vision", icon: Brain },
      ],
    },
    {
      title: "Databases & ETL",
      items: [
        { name: "MySQL", icon: Database },
        { name: "DBMS", icon: Database },
        { name: "ETL Pipelines", icon: Database },
        { name: "Data Quality", icon: Database },
        { name: "Excel", icon: Database },
      ],
    },
    {
      title: "Soft Skills",
      items: [
        { name: "Analytical Thinking", icon: Brain },
        { name: "Problem Solving", icon: Brain },
        { name: "Logical Thinking", icon: Brain },
        { name: "Attention to Detail", icon: Users },
        { name: "Teamwork", icon: Users },
        { name: "Collaboration", icon: Users },
        { name: "Presentation Skills", icon: Users },
        { name: "Research Skills", icon: BookOpen },
        { name: "Documentation & Reporting", icon: Users },
      ],
    },
  ];
  

  const Card3D = ({ item, index, delay = 0, type = "skill" }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (type === "skill" || type === "certification") return;
      setIsFlipped((prev) => !prev);
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{
          opacity: isInView ? 1 : 0,
          y: isInView ? 0 : 50,
          rotateX: isHovered ? -8 : 0,
          rotateY: isHovered ? 10 : 0,
          scale: isHovered ? 1.08 : 1,
          translateZ: isHovered ? 30 : 0,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={`relative ${
          type === "skill"
            ? "h-36 md:h-34" // 🔥 taller on mobile now
            : type === "certification"
            ? "h-80 md:h-80"
            : "h-80 md:h-80"
        } perspective-1500 overflow-visible rounded-xl transition-all duration-300`}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          zIndex: isHovered ? 10 : 1,
          boxShadow: isHovered
            ? "0 0 18px rgba(79, 172, 254, 0.35), 0 0 18px rgba(0, 242, 254, 0.35)"
            : "0 2px 8px rgba(0,0,0,0.3)",
        }}
      >
        <motion.div
          className={`relative w-full h-full preserve-3d ${
            type === "skill" ? "cursor-default" : "cursor-pointer"
          }`}
          animate={{
            rotateY:
              type !== "skill" && type !== "certification" && isFlipped ? 180 : 0,
          }}
          transition={{ duration: 0.6 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front */}
          <div className="absolute inset-0 w-full h-full backface-hidden">
            <div className="glass-card p-5 md:p-6 rounded-xl h-full relative overflow-hidden transition-all duration-300 flex flex-col">
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <item.icon className="text-primary" size={28} />
              </div>
              <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2">
                {item.name || item.title}
              </h3>
              {item.provider && (
                <p className="text-sm text-muted-foreground mb-1 md:mb-2">
                  {item.provider}
                </p>
              )}
              {item.date && (
                <p className="text-xs text-accent mb-1">{item.date}</p>
              )}
              {item.timeline && (
                <p className="text-xs text-accent mb-1">{item.timeline}</p>
              )}
              {item.description && (
                <p className="text-sm text-muted-foreground flex-1">
                  {item.description}
                </p>
              )}

              {type === "certification" && item.link && (
                <div className="mt-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(item.link, "_blank");
                    }}
                  >
                    <ExternalLink size={14} className="mr-2" />
                    View Certificate
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Back (Training Flip) */}
          {type === "training" && (
            <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
              <div className="glass-card p-6 rounded-xl h-full flex flex-col">
                <h3 className="text-lg font-bold mb-4 text-primary">
                  {item.title || item.name}
                </h3>
                <div className="space-y-3 flex-1">
                  <div>
                    <h4 className="font-semibold text-sm mb-1 text-accent">
                      Details
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {item.fullDescription ||
                        item.description ||
                        `A core ${item.category || "skill"} applied across projects.`}
                    </p>
                  </div>
                </div>
                {(item.link || item.certificates) && (
                  <div className="mt-4 space-y-2">
                    {item.link && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(item.link, "_blank");
                        }}
                      >
                        <ExternalLink size={14} className="mr-2" />
                        View Project
                      </Button>
                    )}
                    {item.certificates &&
                      item.certificates.map((cert, idx) => (
                        <Button
                          key={idx}
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(cert.url, "_blank");
                          }}
                        >
                          <ExternalLink size={14} className="mr-2" />
                          {cert.label}
                        </Button>
                      ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    );
  };

  return (
    <TooltipProvider>
      <section id="skills" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow"></div>
        <div className="container mx-auto px-6 relative z-10" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Skills & <span className="gradient-text">Expertise</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A comprehensive toolkit for modern data science and AI/ML
              development
            </p>
          </motion.div>

          <Tabs defaultValue="skills" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-12 glass-card">
              <TabsTrigger value="skills" className="text-lg">
                Skills
              </TabsTrigger>
              <TabsTrigger value="certifications" className="text-lg">
                Certifications
              </TabsTrigger>
              <TabsTrigger value="training" className="text-lg">
                Training
              </TabsTrigger>
            </TabsList>

            {/* ✅ Skills */}
            <TabsContent value="skills" className="space-y-12">
              {skillGroups
                .filter((group) => group.items.length > 0)
                .map((group, gIdx) => (
                  <div key={group.title}>
                    <motion.h3
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.2 + gIdx * 0.1 }}
                      className="text-2xl font-bold mb-6 text-primary"
                    >
                      {group.title}
                    </motion.h3>
                    {group.items.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-4">
                        {group.items.map((skill, index) => (
                          <Card3D
                            key={skill.name}
                            item={{ ...skill, category: group.title }}
                            index={index}
                            delay={0.3 + gIdx * 0.1}
                            type="skill"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
            </TabsContent>

            {/* ✅ Certifications */}
            <TabsContent value="certifications">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                {certifications.map((cert, index) => (
                  <Card3D
                    key={cert.title}
                    item={cert}
                    index={index}
                    type="certification"
                  />
                ))}
              </div>
            </TabsContent>

            {/* ✅ Training */}
            <TabsContent value="training">
              <div className="grid md:grid-cols-2 gap-5 md:gap-6">
                {training.map((course, index) => (
                  <Card3D
                    key={course.title}
                    item={course}
                    index={index}
                    type="training"
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* ✅ Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { number: "6+", label: "Projects", icon: Trophy },
              { number: "5+", label: "Certifications", icon: Award },
              { number: "1+", label: "Trainings", icon: BookOpen },
              { number: "3+", label: "Years Learning", icon: Brain },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="text-center glass-card p-6 rounded-xl hover-3d"
                >
                  <Icon className="mx-auto mb-4 text-primary" size={32} />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                    className="text-3xl font-bold text-primary mb-2"
                  >
                    {stat.number}
                  </motion.div>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              );
            })}
          </motion.div>
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
    </TooltipProvider>
  );
};

export default Skills;
