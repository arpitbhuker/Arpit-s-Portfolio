import { motion, useInView } from "framer-motion";
import { useRef, useMemo } from "react";
import { Quote } from "lucide-react";

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const quotes = [
    {
      text: "Data is a precious thing and will last longer than the systems themselves.",
      author: "Tim Berners-Lee (WWW Inventor)",
    },
    {
      text: "Machine learning is the last invention that humanity will ever need to make.",
      author: "Nick Bostrom (Philosopher)",
    },
    {
      text: "AI is not just another technology; it’s a new layer of civilization.",
      author: "Lex Fridman (AI Researcher)",
    },
    {
      text: "Without data, you're just another person with an opinion.",
      author: "W. Edwards Deming (Statistician)",
    },
    {
      text: "The future belongs to those who understand data.",
      author: "Andrej Karpathy (AI Scientist)",
    },
  ];

  const randomQuote = useMemo(
    () => quotes[Math.floor(Math.random() * quotes.length)],
    []
  );

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-glow opacity-30"></div>

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="
  group relative rounded-xl overflow-hidden
  flex flex-col justify-between
  text-center
  backdrop-blur-xl
  bg-[#0A2A43]/40
  border border-[#00E5FF]/20
  shadow-[0_4px_18px_rgba(0,229,255,0.08)]
  transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
  hover:scale-105 hover:shadow-[0_12px_36px_rgba(0,229,255,0.25)]
">
  <div
  className="
    absolute inset-0 rounded-xl pointer-events-none
    bg-gradient-to-br from-[#00E5FF]/10 to-[#007EFF]/10
    opacity-0 group-hover:opacity-40
    transition-opacity duration-500 ease-out
    z-0
  "
/>


            {/* ✅ New Darker Gradient Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-700 to-blue-800 opacity-[0.14] blur-xl pointer-events-none z-0"></div>

            {/* Content (elevated above glow) */}
            {/* Content */}
            <div className="relative z-10">
              <blockquote className="text-lg italic text-muted-foreground mb-4 leading-relaxed relative px-8">
                <Quote
                  className="absolute -top-2 -left-2 text-primary/40"
                  size={24}
                />
                "{randomQuote.text}"
                <Quote
                  className="absolute -bottom-2 -right-2 text-primary/40 rotate-180"
                  size={24}
                />
              </blockquote>

              <cite className="text-primary font-medium">
                — {randomQuote.author}
              </cite>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
