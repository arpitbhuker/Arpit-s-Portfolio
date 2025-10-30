import { motion, useInView } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import {
  Code2,
  BarChart3,
  Cpu,
  MessageSquareCode,
  Database,
  UserCheck,
  Brain,
  Award,
  Trophy,
  Zap,
  Code,
  ExternalLink,
  Layers,
  Calendar,
  BookOpen,
} from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTraining, setSelectedTraining] = useState("All");

  const certifications = [
    {
      title: "Data Visualisation: Empowering Business with Effective Insights",
      provider: "TCS (via Forage)",
      date: "Sep 2025",
      icon: BarChart3,
      link: "https://www.theforage.com/completion-certificates/ifobHAoMjQs9s6bKS/MyXvBcppsW2FkNYCX_ifobHAoMjQs9s6bKS_68c26611cd7d6aa0db5280d3_1758705776107_completion_certificate.pdf",
      description:
        "Training on data visualization techniques and business intelligence using modern visualization tools",
      skills: ["Data Visualization", "Power BI", "Business Insights"],
      category: "Data Analytics",
    },
    {
      title: "SQL: A Practical Introduction for Querying Databases",
      provider: "IBM (via Coursera)",
      date: "Jun 2025",
      icon: Database,
      link: "https://coursera.org/verify/0AA2BI2BIW5N",
      description:
        "Hands-on SQL training covering database queries, joins, subqueries, and data manipulation techniques",
      skills: ["SQL Queries", "Joins", "Database Design", "Subqueries"],
      category: "Database",
    },
    {
      title: "Introduction to Generative AI for Data Analysis",
      provider: "Microsoft (via Coursera)",
      date: "Feb 2025",
      icon: Brain,
      link: "https://coursera.org/verify/2XQ5NLT0SQQF",
      description:
        "Comprehensive course on leveraging generative AI tools and techniques for advanced data analysis workflows",
      skills: ["Generative AI", "Prompt Engineering", "Analytics"],
      category: "AI/ML",
    },
    {
      title: "Microsoft Certified: Azure AI Fundamentals",
      provider: "Microsoft",
      date: "Aug 2024",
      icon: Award,
      link: "https://learn.microsoft.com/api/credentials/share/en-us/ArpitBhuker-3178/31F48FBCE2815B7A?sharingId=2125ED997921F9FC",
      description:
        "Official Microsoft certification covering AI workloads, ML concepts, and Azure AI services",
      skills: ["Azure AI", "ML Basics", "Responsible AI"],
      category: "Cloud & AI",
    },
    {
      title: "Machine Learning for All",
      provider: "University of London (via Coursera)",
      date: "Oct 2023",
      icon: Brain,
      link: "https://coursera.org/verify/9MMCYXAEW57S",
      description:
        "Fundamental machine learning concepts including supervised learning, unsupervised learning, and model evaluation",
      skills: ["ML Concepts", "Model Evaluation", "Predictive Analytics"],
      category: "AI/ML",
    },
  ];

  const categories = ["All", "AI/ML", "Cloud & AI", "Database", "Data Analytics"];
  const filteredCerts = useMemo(() => {
    if (selectedCategory === "All") return certifications;
    return certifications.filter((c) => c.category === selectedCategory);
  }, [selectedCategory]);

  const trainingAndWorkshops = [
    {
      type: "Workshop",
      title: "Generative AI Mastermind",
      provider: "Outskill",
      timeline: "Oct 2025",
      description:
        "A comprehensive mastermind program successfully completed, covering foundational concepts and strategic implementation of cutting-edge Generative AI models.",
      icon: Brain,
      skillsDeveloped: [
        "Generative AI",
        "Large Language Models (LLMs)",
        "AI Strategy",
        "Prompt Engineering",
        "Deep Learning Concepts"
      ],
      skillsLabel: "Skills Gained",
      category: "Course/Mastermind",
      certificates: [
        {
          label: "Certificate",
          url: "https://drive.google.com/file/d/1aoGiKgCAHrZVoIJCAZk5YwwEadaxBiGu/view?usp=sharing"
        }
      ]
    },
    {
      type: "Workshop",
      title: "DSA Workshop",
      provider: "GeeksforGeeks Chandigarh University-Student Chapter",
      timeline: "Dec 2024",
      description:
        "Virtual workshop on core Data Structures and Algorithms, enhancing foundational computer science knowledge and competitive problem-solving skills.",
      icon: Code,
      skillsDeveloped: [
        "Data Structures",
        "Algorithms",
        "Problem Solving",
        "Competitive Programming Basics"
      ],
      skillsLabel: "Skills Gained",
      category: "Workshop",
      certificates: [
        {
          label: "Certificate",
          url: "https://drive.google.com/file/d/1tFVyZrIg-GibPOTGuYGmfUcNeY284SJF/view?usp=sharing"
        }
      ]
    },
    {
      type: "Training",
      title: "AI Mentorship Program",
      provider: "Teachnook",
      timeline: "Feb - Mar 2024",
      description:
        "Mentorship-based program focusing on fraud detection model deployment, performance tuning, and compliance.",
      icon: Brain,
      link: "https://github.com/arpitbhuker/AI-Driven-Financial-Fraud-Detection-System",
      skillsDeveloped: [
        "Fraud Detection",
        "ML Deployment",
        "Model Evaluation",
        "XGBoost",
        "EDA",
        "Imbalanced Learning",
        "Python"
      ],
      skillsLabel: "Skills Gained",
      category: "Training",
      certificates: [
        {
          label: "Internship Certificate",
          url: "https://drive.google.com/file/d/1LPQbkCsNrrLEkH6VPVDpKbkFjXZeMHEd/view?usp=drive_link"
        },
        {
          label: "Program Completion",
          url: "https://drive.google.com/file/d/1TCDZfZ3GWsXosVafmyVmaPSJOYmLl3z7/view?usp=drive_link"
        }
      ]
    },
    {
      type: "Workshop",
      title: "Microsoft Office using AI Tools Workshop",
      provider: "be10x",
      timeline: "Oct 2023",
      description:
        "A 1-day practical workshop focused on utilizing Artificial Intelligence tools and techniques to significantly enhance productivity and operational efficiency within the Microsoft Office suite.",
      icon: Zap,
      skillsDeveloped: [
        "Microsoft Office Suite",
        "AI Productivity Tools",
        "Workflow Automation",
        "AI Integration"
      ],
      skillsLabel: "Skills Gained",
      category: "Workshop",
      certificates: [
        {
          label: "Certificate",
          url: "https://drive.google.com/file/d/1E8-NnhymP49FP9YGK0Zvc9LCrAZlM315/view?usp=sharing"
        }
      ]
    }
  ];

  const trainingFilters = ["All", "Training", "Workshop"];

  const filteredTraining = useMemo(() => {
    if (selectedTraining === "All") return trainingAndWorkshops;
    return trainingAndWorkshops.filter((item) => item.type === selectedTraining);
  }, [selectedTraining]);

  const Card = ({ item, index }) => {
    const Icon = item.icon || Layers;
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08 * index }}
        className="p-7 rounded-2xl
bg-gradient-to-b from-[#1c3954] to-[#163146]
border border-white/15
backdrop-blur-xl shadow-lg
hover:scale-[1.07] hover:-translate-y-4
hover:shadow-[0_0_45px_rgba(0,200,255,0.45)]
flex flex-col
min-h-[310px] md:min-h-[350px]
justify-between"
      >
        <div className="flex items-center justify-between mb-3">
          <Icon className="text-cyan-300" size={28} />
          {item.date && (
            <div className="flex items-center gap-1 text-xs font-semibold text-cyan-300/90">
              <Calendar size={14} /> {item.date}
            </div>
          )}
        </div>

        <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
        <p className="text-sm text-gray-200/90 mb-2">{item.provider}</p>
        <p className="text-sm text-gray-300/80 mb-4">{item.description}</p>

        {item.skills && (
          <div className="mt-2">
            <p className="text-sm font-semibold text-cyan-300 mb-2">Skills Gained:</p>
            <div className="flex flex-wrap gap-2">
              {item.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-xs rounded-full bg-cyan-950/40 text-cyan-100 border border-cyan-400/30 
                  hover:bg-cyan-400/20 hover:border-cyan-300/40 hover:scale-[1.08] transition-all duration-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        <Button
          variant="outline"
          size="sm"
          className="mt-auto mb-2 w-full border-cyan-400/30 hover:bg-cyan-400/20"
          onClick={() => window.open(item.link, "_blank")}
        >
          <ExternalLink size={14} className="mr-2" />
          View Certificate
        </Button>
      </motion.div>
    );
  };

  return (
    <TooltipProvider>
      <section id="skills" className="py-20 relative overflow-hidden bg-gradient-to-b from-[#164567] to-[#1f4e6f]">
        <div className="container mx-auto px-6" ref={ref}>
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
            <TabsList className="grid w-full grid-cols-3 mb-12 glass-card border border-white/10">
              <TabsTrigger value="skills" className="text-lg">
                Skills
              </TabsTrigger>
              <TabsTrigger value="certifications" className="text-lg">
                Certifications
              </TabsTrigger>
              <TabsTrigger value="training" className="text-lg">
                Trainings
              </TabsTrigger>
            </TabsList>

            {/* ✅ Skills */}
            <TabsContent value="skills">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {[
                  {
                    title: "Programming & Tools",
                    icon: Code2,
                    items: ["Python", "SQL", "C++", "Git/GitHub", "CI/CD", "Azure AI / Cloud", "VSCode", "Jupyter Notebook"],
                  },
                  {
                    title: "Data Analysis & Visualization",
                    icon: BarChart3,
                    items: [
                      "Power BI",
                      "Tableau",
                      "Matplotlib",
                      "Seaborn",
                      "EDA",
                      "Data Wrangling",
                      "Statistical Analysis",
                      "Dashboard Storytelling",
                    ],
                  },
                  {
                    title: "Machine Learning",
                    icon: Cpu,
                    items: [
                      "NumPy",
                      "Pandas",
                      "scikit-learn",
                      "TensorFlow",
                      "Supervised/Unsupervised Learning",
                      "Predictive Modeling",
                      "Feature Engineering",
                      "Model Deployment",
                    ],
                  },
                  {
                    title: "Data & AI Systems",
                    icon: MessageSquareCode,
                    items: [
                      "MySQL",
                      "DBMS",
                      "NLP",
                      "LLMs / OpenAI APIs",
                      "Text Analysis",
                      "Computer Vision",
                      "ETL Pipeline",
                      "Data Quality Management",
                    ],
                  },
                  {
                    title: "Soft Skills",
                    icon: UserCheck,
                    items: [
                      "Analytical Thinking",
                      "Problem Solving",
                      "Cross-Functional Collaboration",
                      "Technical Presentation",
                      "Attention to Detail",
                    ],
                  },
                ].map((group, index) => {
                  const Icon = group.icon;
                  return (
                    <motion.div
                      key={group.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.08 * index }}
                      className="p-7 rounded-2xl
bg-gradient-to-b from-[#1c3954] to-[#163146]
border border-white/15
shadow-lg hover:scale-[1.07] hover:-translate-y-4
hover:shadow-[0_0_45px_rgba(0,200,255,0.45)]
transition-all duration-300"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <Icon className="text-cyan-300" size={26} />
                        <h3 className="text-lg font-bold text-cyan-300">
                          {group.title}
                        </h3>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {group.items.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 text-sm rounded-lg bg-cyan-950/40 border border-cyan-300/30
                            hover:bg-cyan-400/20 hover:border-cyan-200/40
                            hover:scale-110 transition-all duration-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </TabsContent>

            {/* ✅ Certifications */}
            <TabsContent value="certifications">
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? "default" : "outline"}
                    size="sm"
                    className="border-cyan-400/30 hover:bg-cyan-400/20"
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </Button>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredCerts.map((cert, i) => (
                  <Card key={cert.title} item={cert} index={i} />
                ))}
              </div>
            </TabsContent>

            {/* ✅ Training & Workshops */}
            <TabsContent value="training">
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {trainingFilters.map((cat) => (
                  <Button
                    key={cat}
                    variant={selectedTraining === cat ? "default" : "outline"}
                    size="sm"
                    className="border-cyan-400/30 hover:bg-cyan-400/20"
                    onClick={() => setSelectedTraining(cat)}
                  >
                    {cat}
                  </Button>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredTraining.map((course, i) => (
                  <motion.div
                    key={course.title}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * i }}
                    className="p-7 rounded-2xl
bg-gradient-to-b from-[#1c3954] to-[#163146]
border border-white/15 backdrop-blur-xl shadow-lg
hover:scale-[1.07] hover:-translate-y-4
hover:shadow-[0_0_45px_rgba(0,200,255,0.45)]
transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <course.icon className="text-cyan-300" size={28} />
                      <span className="text-xs font-semibold text-cyan-300/90">
                        {course.timeline}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold mb-1">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-200/90 mb-2">
                      {course.provider}
                    </p>
                    <p className="text-sm text-gray-300/80 mb-4">
                      {course.description}
                    </p>

                    {course.skillsDeveloped && (
                      <div className="mt-4">
                        <p className="text-sm font-semibold text-cyan-300 mb-2">
                          {course.skillsLabel}:
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {course.skillsDeveloped.map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1 text-xs rounded-lg bg-cyan-950/40 border border-cyan-400/30
                              hover:bg-cyan-400/20 hover:border-cyan-300/40
                              hover:scale-110 transition-all duration-200"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {course.link && (
                      <Button
                        className="w-full mb-2 border-cyan-400/30 hover:bg-cyan-400/20"
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(course.link, "_blank")}
                      >
                        <ExternalLink size={14} className="mr-2" />{" "}
                        {course.type === "Training" ? "View Project" : "View Details"}
                      </Button>
                    )}

                    {course.certificates.map((cert, idx) => (
                      <Button
                        key={idx}
                        className="w-full mb-2 border-cyan-400/30 hover:bg-cyan-400/20"
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(cert.url, "_blank")}
                      >
                        <ExternalLink size={14} className="mr-2" />
                        {cert.label}
                      </Button>
                    ))}
                  </motion.div>
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
              { number: "4+", label: "Training/Workshops", icon: BookOpen },
              { number: "3+", label: "Years Learning", icon: Brain },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="flex flex-col items-center justify-between
    text-center p-6 rounded-xl w-full relative overflow-hidden group
    bg-[#0A2A43]/60 backdrop-blur-xl
    border border-[#00E5FF]/20
    shadow-[0_4px_18px_rgba(0,229,255,0.08)]
    transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
    hover:scale-[1.05] hover:shadow-[0_10px_30px_rgba(0,229,255,0.18)]
    min-h-[160px] md:min-h-[180px]"
                >
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/10 to-[#007EFF]/10
    rounded-xl pointer-events-none
    opacity-0 group-hover:opacity-40 transition-opacity duration-500 -z-10"
                  />

                  <Icon className="mx-auto mb-3 text-primary" size={32} />

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                    className="text-3xl font-bold text-primary mb-2"
                  >
                    {stat.number}
                  </motion.div>

                  <p className="text-muted-foreground leading-tight text-sm">
                    {stat.label}
                  </p>
                </div>

              );
            })}
          </motion.div>
        </div>
      </section>
    </TooltipProvider>
  );
};

export default Skills;
