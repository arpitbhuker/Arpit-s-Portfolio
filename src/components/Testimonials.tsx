import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const quotes = [
    {
      text: "Data is a precious thing and will last longer than the systems themselves.",
      author: "Tim Berners-Lee (WWW Inventor)"
    },
    {
      text: "Machine learning is the last invention that humanity will ever need to make.",
      author: "Nick Bostrom (Philosopher)"
    }
  ];

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-glow opacity-30"></div>
      
      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {quotes.map((quote, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="glass-card p-8 rounded-xl text-center relative"
            >
              <Quote className="absolute top-4 left-4 text-primary/30" size={32} />
              <Quote className="absolute bottom-4 right-4 text-primary/30 rotate-180" size={32} />
              
              <blockquote className="text-lg italic text-muted-foreground mb-4 leading-relaxed">
                "{quote.text}"
              </blockquote>
              <cite className="text-primary font-medium">— {quote.author}</cite>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;