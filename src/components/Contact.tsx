import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, MapPin, Github, Linkedin, MessageCircle, Briefcase, GraduationCap, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contactCategories = [
    { icon: Briefcase, title: "Collaboration", description: "Working together on data projects", gradient: "from-blue-500 to-purple-600" },
    { icon: Briefcase, title: "Job Opportunities", description: "Roles matching my skills", gradient: "from-green-500 to-teal-600" },
    { icon: GraduationCap, title: "Mentorship", description: "AI/ML guidance and learning", gradient: "from-orange-500 to-red-600" },
    { icon: MessageCircle, title: "General Inquiry", description: "Questions about my experience", gradient: "from-purple-500 to-pink-600" }
  ];

  const contactMethods = [
    { icon: Mail, label: "Email", link: "mailto:arpitkumarbhuker@gmail.com", gradient: "from-blue-500 to-purple-600" },
    { icon: Linkedin, label: "LinkedIn", link: "https://www.linkedin.com/in/arpitbhuker/", gradient: "from-blue-400 to-blue-700" },
    { icon: Github, label: "GitHub", link: "https://github.com/arpitbhuker", gradient: "from-gray-700 to-gray-900" },
    { icon: MessageCircle, label: "WhatsApp", link: "https://wa.me/918168759378", gradient: "from-green-400 to-green-600" }
  ];

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-glow"></div>

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Let's discuss opportunities, collaborations, or anything AI/ML related
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid lg:grid-cols-2 gap-12"
        >
          {/* Left Column: Categories + Availability */}
          <div className="space-y-8">
            {/* Contact Categories */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-primary">What can I help you with?</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {contactCategories.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <motion.div
                      key={category.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                      className="glass-card p-4 rounded-lg text-left hover-3d transition-all duration-300"
                    >
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-3`}>
                        <Icon className="text-white" size={24} />
                      </div>
                      <h4 className="font-semibold mb-1">{category.title}</h4>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Availability Status */}
            <div className="glass-card p-6 rounded-xl">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <h3 className="text-lg font-semibold text-green-400">Available for Opportunities</h3>
              </div>
              <p className="text-sm text-muted-foreground">Currently seeking internships and full-time opportunities in AI/ML & Data Science</p>
            </div>
          </div>

          {/* Right Column: Contact Info + Quick Links (lower) */}
          <div className="space-y-8 mt-12 lg:mt-4">
            {/* Contact Info */}
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 text-primary">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3"><Mail className="text-primary" size={20} /><div><p className="font-medium">Email</p><p className="text-sm text-muted-foreground">arpitkumarbhuker@gmail.com</p></div></div>
                <div className="flex items-center space-x-3"><Phone className="text-primary" size={20} /><div><p className="font-medium">Phone</p><p className="text-sm text-muted-foreground">+91 8168759378</p></div></div>
                <div className="flex items-center space-x-3"><MapPin className="text-primary" size={20} /><div><p className="font-medium">Location</p><p className="text-sm text-muted-foreground">Chandigarh, India</p></div></div>
                <div className="flex items-center space-x-3"><Clock className="text-primary" size={20} /><div><p className="font-medium">Response Time</p><p className="text-sm text-muted-foreground">Within 24 hours</p></div></div>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="grid sm:grid-cols-2 gap-4">
              {contactMethods.map((method, idx) => {
                const Icon = method.icon;
                return (
                  <motion.a
                    key={idx}
                    href={method.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center justify-center gap-2 p-4 rounded-xl font-semibold text-white bg-gradient-to-br ${method.gradient} shadow-lg hover:shadow-2xl transition-all duration-300`}
                  >
                    <Icon size={20} /> {method.label}
                  </motion.a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
