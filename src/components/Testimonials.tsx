import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Quote } from "lucide-react";

/* =========================================================
   QUOTES + ACCENT COLORS
========================================================= */

const QUOTES = [
  {
    text: "Data is a precious thing and will last longer than the systems themselves.",
    author: "Tim Berners-Lee",
    color: "#84CC16", // lime
  },
  {
    text: "Machine learning is the last invention that humanity will ever need to make.",
    author: "Nick Bostrom",
    color: "#22D3EE", // emerald
  },
  {
    text: "AI is not just another technology; it's a new layer of civilization.",
    author: "Lex Fridman",
    color: "#F59E0B", // amber
  },
  {
    text: "Without data, you're just another person with an opinion.",
    author: "W. Edwards Deming",
    color: "#34D399", // cyan
  },
  {
    text: "The future belongs to those who understand data.",
    author: "Andrej Karpathy",
    color: "#F87171", // rose
  },
];

/* =========================================================
   ANIMATION CONFIG
========================================================= */

const transitionVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

/* =========================================================
   TESTIMONIAL CARD
========================================================= */

const TestimonialCard = ({ quote }: any) => {
  return (
    <motion.div
      className="relative rounded-2xl p-6 md:p-7 text-center overflow-hidden"
      style={{
        background: "rgba(5,5,8,0.72)",
        backdropFilter: "blur(16px)",
        border: `1px solid ${quote.color}40`,
        boxShadow: `0 0 22px ${quote.color}22`,
      }}

      /* Floating motion */
      animate={{ y: [0, -6, 0] }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}

      whileHover={{
        scale: 1.03,
        boxShadow: `0 0 28px ${quote.color}33`,
      }}
    >
      {/* Subtle glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${quote.color}20 0%, transparent 70%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">

        <Quote
          size={28}
          strokeWidth={2}
          style={{ color: quote.color, opacity: 0.5 }}
          className="mx-auto mb-3"
        />

        <blockquote className="text-lg md:text-xl italic text-white leading-relaxed mb-3 max-w-xl mx-auto">
          “{quote.text}”
        </blockquote>

        <cite
          className="text-sm font-medium"
          style={{ color: quote.color }}
        >
          — {quote.author}
        </cite>

      </div>
    </motion.div>
  );
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [index, setIndex] = useState(0);

  /* Quote rotation every 60 seconds */
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % QUOTES.length);
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const currentQuote = QUOTES[index];

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-24 overflow-hidden"
    >

      {/* Ambient background effect */}
      <div className="absolute inset-0 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">

        {/* Heading */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-2">
            Thoughts on <span className="gradient-text">Intelligence</span>
          </h2>

          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            Perspectives from pioneers shaping the future of AI,
            machine learning, and data science.
          </p>
        </motion.div>

        {/* Animated Quote */}
        <div className="max-w-2xl mx-auto">

          <AnimatePresence mode="wait">

            <motion.div
              key={index}
              variants={transitionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.8 }}
            >
              <TestimonialCard quote={currentQuote} />
            </motion.div>

          </AnimatePresence>

        </div>
      </div>
    </section>
  );
};

export default Testimonials;