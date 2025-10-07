import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, User, Briefcase, Code, Mail, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const menuItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "skills", label: "Skills", icon: Code },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = menuItems.map(item => document.getElementById(item.id));
      const scrollPos = window.scrollY + 100;

      sections.forEach((section) => {
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 hidden md:block">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="glass-card px-6 py-3 rounded-full"
        >
          <div className="flex items-center space-x-6">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-2 rounded-full transition-all duration-300 group ${
                    activeSection === item.id
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Icon size={18} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute inset-0 bg-primary/10 rounded-full"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(true)}
          className="fixed top-4 right-4 z-50 glass-card"
        >
          <Menu size={20} />
        </Button>

        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
                onClick={() => setIsOpen(false)}
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 120 }}
                className="fixed right-0 top-0 h-full w-80 bg-card border-l border-border z-50 p-6"
              >
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-bold gradient-text">Navigation</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                  >
                    <X size={20} />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                          activeSection === item.id
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-muted"
                        }`}
                      >
                        <Icon size={20} />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Navigation;