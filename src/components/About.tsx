import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Calendar, Award } from "lucide-react";
import arpitProfile2 from "@/assets/arpit-profile-2.png";

// Child component for each education card
const EducationCard = ({ item, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = item.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
        }`}
    >
      <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-primary rounded-full border-4 border-background flex items-center justify-center z-10">
        <Icon size={16} className="text-primary-foreground" />
      </div>

      <div
        className={`ml-0 sm:ml-4 md:ml-0 ${index % 2 === 0 ? "md:mr-8" : "md:ml-8"
          } md:w-5/12 w-full`}
      >
        <div className="rounded-xl p-6 w-full relative overflow-hidden group
          bg-[#0A2A43]/60 backdrop-blur-xl
          border border-[#00E5FF]/20
          shadow-[0_0_25px_rgba(0,229,255,0.08)]
          transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
          hover:scale-[1.05]
          hover:border-[#00E5FF]/40 hover:shadow-[0_0_35px_rgba(0,229,255,0.15)]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/10 to-[#007EFF]/10
            rounded-xl pointer-events-none
            opacity-0 group-hover:opacity-40
            transition-opacity duration-500
            -z-10"
          />
          <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
            <span className="text-primary font-semibold flex items-center">
              <Calendar size={16} className="mr-2" />
              {item.year}
            </span>
            <span className="text-lg font-bold text-accent">{item.percentage}</span>
          </div>
          <h4 className="text-xl font-bold mb-1">{item.degree}</h4>
          <p className="text-muted-foreground mb-2">{item.school}</p>
          {item.subjects && (
            <p className="text-sm text-muted-foreground break-words">
              <strong>Key Subjects:</strong> {item.subjects}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const educationData = [
    {
      year: "2020",
      school: "Gitanjali School",
      degree: "10th Grade",
      percentage: "84.6%",
      icon: GraduationCap,
    },
    {
      year: "2022",
      school: "Sharde Public School",
      degree: "12th Grade",
      percentage: "85.2%",
      icon: GraduationCap,
    },
    {
      year: "2022-2026",
      school: "Chandigarh University",
      degree: "B.E. CSE (AI & ML)",
      percentage: "CGPA: 8.06",
      subjects:
        "ML,DL, DBMS, Data Mining, Data Structures, Computer Vision, NLP",
      icon: Award,
    },
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-glow"></div>

      <div className="container mx-auto px-4 sm:px-6 md:px-6 relative z-10" ref={ref}>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            About <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-start mb-20">
          {/* Left: Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full flex justify-center"
          >
            <div className="relative w-80 sm:w-96 md:w-[28rem] h-80 sm:h-96 md:h-[28rem] flex items-center justify-center">

              {/* Circle shadow/frame */}
              <div
                className="rounded-full absolute w-full h-full"
                style={{
                  boxShadow: "0 25px 50px rgba(0,0,0,0.7)",
                  background: "rgba(0,0,0,0.15)",
                  overflow: "hidden",
                }}
              >
                <img
                  src={arpitProfile2}
                  alt="Arpit in professional attire"
                  className="object-cover absolute"
                  style={{
                    width: "140%",
                    height: "140%",
                    left: "50%",
                    bottom: "-5%",
                    transform: "translateX(-50%)",
                  }}
                />
              </div>

              {/* Pop-out image */}
              <img
                src={arpitProfile2}
                alt="Arpit popping out"
                className="object-cover absolute pointer-events-none"
                style={{
                  width: "140%",
                  height: "140%",
                  left: "50%",
                  bottom: "-5%",
                  transform: "translateX(-50%)",
                  clipPath: "inset(-20% 0 20% 0)",
                }}
              />
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8 w-full px-0 sm:px-2"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4 text-primary">Overview</h3>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 break-words text-justify">
                I work across applied AI, machine learning, and data analysis, building systems that turn raw data into
                reliable, usable outcomes. My work focuses on designing end-to-end pipelines, developing predictive models,
                and extracting meaningful patterns that support real decisions. I approach problems with a hands-on mindset,
                starting from data understanding and preparation through to evaluation and system-level reliability in
                practical use.
              </p>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed break-words text-justify">
                Alongside core work in AI and data-focused systems, I have built projects in areas such as computer vision,
                intelligent detection, and analytics automation. I have also handled front-end development and deployment
                while building and maintaining my portfolio, giving me experience across the full project lifecycle. These
                experiences broaden my perspective while keeping my work grounded in structured thinking and data-driven
                problem-solving.
              </p>

            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 text-primary">What I Bring to the Table</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                {[
                  "Applied Machine Learning & Modeling",
                  "Analytical & Systems Thinking",
                  "Data Analysis & Visualization",
                  "Technical Communication & Collaboration",
                  "Python & Data-Centric Tooling",
                  "Adaptability & Continuous Learning",
                ].map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    className="flex items-center space-x-2 w-full relative overflow-hidden group
    bg-[#0A2A43]/60 backdrop-blur-xl
    border border-[#00E5FF]/20
    shadow-[0_0_20px_rgba(0,229,255,0.05)]
    p-3 rounded-lg transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
    hover:scale-[1.05]
    hover:border-[#00E5FF]/40 hover:shadow-[0_0_30px_rgba(0,229,255,0.15)]"
                  >
                    {/* Gradient Glow */}
                    <div className="absolute inset-0 
      bg-gradient-to-br from-[#00E5FF]/10 to-[#007EFF]/10
      rounded-lg pointer-events-none
      opacity-0 group-hover:opacity-40 
      transition-opacity duration-500
      -z-10"
                    />
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-foreground font-medium">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Education Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full px-2 sm:px-0"
        >
          <h3 className="text-3xl font-bold text-center mb-12">
            Educational <span className="gradient-text">Journey</span>
          </h3>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary via-accent to-primary opacity-50"></div>

            <div className="space-y-12">
              {educationData.map((item, index) => (
                <EducationCard key={index} item={item} index={index} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
