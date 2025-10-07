import { motion } from "framer-motion";
import { ChevronDown, Download, Github, Linkedin, Mail, Cpu } from "lucide-react"; // Added Cpu icon
import { Button } from "@/components/ui/button";
import React from "react";
import arpitProfile1 from "@/assets/arpit-profile-1.png";

const Hero = () => {
  const scrollToNext = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-dark"></div>

      {/* 🌌 Top-left Floating 3D Portfolio Icon */}
      <div className="absolute top-6 left-6 flex items-center gap-2 z-20 select-none md:hidden lg:flex">
        {/* 3D Dynamic Icon */}
        <motion.div
          className="relative w-8 h-8 flex items-center justify-center bg-primary/10 rounded-full border border-primary/20 shadow-lg"
          initial={{ opacity: 0, x: -30, rotateY: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          style={{
            boxShadow: "0 0 15px rgba(0, 200, 255, 0.4)",
            perspective: "800px",
          }}
        >
          {/* Icon rotation animation */}
          <motion.div
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <Cpu className="text-primary w-5 h-5" strokeWidth={1.8} />
          </motion.div>
        </motion.div>

        {/* Portfolio Text */}
        <span className="text-lg font-semibold text-gray-200 tracking-wide">
          Portfolio
        </span>
      </div>

      {/* Wrapper for the rest of the page content */}
      <div
        className="relative z-10 
  md:mt-10 /* for tablets, push content down */
  lg:mt-0 /* reset for larger screens */
"
      >
        {/* Your navigation bar, images, and other components go here */}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-7 items-center max-w-6xl mx-auto">
          {/* Left: Bio Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            {/* Availability Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-4"
            >
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20">
                Available for Opportunities
              </span>
            </motion.div>

            {/* Typewriter Heading */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-4xl md:text-6xl font-bold mb-2"
            >
              <span className="whitespace-pre text-4xl md:text-6xl font-bold leading-snug">
                <TypewriterText text="Hi, I'm " delay={140} />
                <span className="gradient-text">
                  <TypewriterText text="Arpit" delay={160} startDelay={1000} />
                </span>
              </span>
            </motion.h1>

            {/* Professional Tagline */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.9 }}
              className="block text-lg md:text-2xl font-medium text-gray-300 mt-4 mb-7"
            >
              <TypewriterText
                text="AI/ML | Data Science | Data Analysis"
                delay={40}
                startDelay={1850}
              />
            </motion.span>

            {/* Contact Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 3.4 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8"
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground hover-3d group"
                onClick={() =>
                  window.open("https://www.linkedin.com/in/arpitbhuker/", "_blank")
                }
              >
                <Linkedin
                  size={20}
                  className="mr-2 group-hover:scale-110 transition-transform"
                />
                LinkedIn
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-primary/50 text-primary hover:bg-primary/10 hover-3d group"
                onClick={() =>
                  window.open("https://github.com/arpitbhuker", "_blank", "noopener,noreferrer")
                }
              >
                <Github
                  size={20}
                  className="mr-2 group-hover:scale-110 transition-transform"
                />
                GitHub
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-primary/50 text-primary hover:bg-primary/10 hover-3d group"
                onClick={() => window.open("mailto:arpitkumarbhuker@gmail.com", "_blank")}
              >
                <Mail
                  size={20}
                  className="mr-2 group-hover:scale-110 transition-transform"
                />
                Email
              </Button>
            </motion.div>

            {/* Resume Download */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 3.9 }}
              className="glass-card p-4 rounded-lg inline-block"
            >
              <p className="text-sm text-muted-foreground mb-3">Download Resume</p>
              <div className="flex gap-3">
                <a
                  href="https://drive.google.com/file/d/16WquphI0oOZWZcamtRQOGq_tXWfakQI1/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary hover:bg-primary/10 group"
                  >
                    <Download size={16} className="mr-2 group-hover:animate-bounce" />
                    PDF
                  </Button>
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Profile Picture 3D */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <motion.div
              whileHover={{ rotateY: 15, rotateX: 8, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="relative w-80 h-[420px] [perspective:1200px] shadow-2xl rounded-2xl overflow-visible group"
            >
              <div className="absolute inset-0 -z-20 rounded-2xl border border-primary/20 transform -rotate-6 scale-95"></div>
              <div className="absolute inset-0 -z-10 rounded-2xl border border-accent/30 transform rotate-6 scale-105"></div>

              <motion.img
                src={arpitProfile1}
                alt="Arpit"
                initial={{ y: 0 }}
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="w-full h-full object-cover relative z-10 rounded-2xl transition-transform duration-700 ease-out group-hover:scale-110"
                style={{
                  transform: "translateZ(50px)",
                  filter: "drop-shadow(0 15px 20px rgba(0,0,0,0.4))",
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 4.3 }}
        onClick={scrollToNext}
        className="hidden lg:block absolute bottom-8 left-1/2 transform -translate-x-1/2 text-primary hover:text-primary/80 transition-colors animate-bounce"
      >
        <ChevronDown size={32} />
      </motion.button>
    </section>
  );
};

// ✨ Typewriter Animation Component
const TypewriterText = ({
  text,
  delay = 100,
  startDelay = 0,
}: {
  text: string;
  delay?: number;
  startDelay?: number;
}) => {
  const [displayedText, setDisplayedText] = React.useState("");

  React.useEffect(() => {
    setDisplayedText("");
    let i = 0;
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayedText((prev) => {
          if (i < text.length) {
            const next = prev + text.charAt(i);
            i++;
            return next;
          } else {
            clearInterval(interval);
            return prev;
          }
        });
      }, delay);
    }, startDelay);

    return () => clearTimeout(startTimeout);
  }, [text, delay, startDelay]);

  return <span>{displayedText}</span>;
};

export default Hero;
