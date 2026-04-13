import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, CircleCheckBig, Loader } from "lucide-react";
import { Link } from "react-router-dom";

const slides = [
  {
    title: "REGENT GRAND HERITAGE",
    subtitle: "Luxury Living Redefined",
    image: "https://images.unsplash.com/photo-1776109377198-7c9e7d632a4a",
  },
  {
    title: "REGENT SAPPHIRE",
    subtitle: "Where Elegance Meets Comfort",
    image: "https://images.unsplash.com/photo-1776108450800-524c042a6c40",
  },
  {
    title: "BUILDING TRUST",
    subtitle: "Your Trusted Partner in Real Estate",
    image: "https://images.unsplash.com/photo-1776110793538-d539dc12285b",
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((p) => (p - 1 + slides.length) % slides.length);
  const next = () => setCurrent((p) => (p + 1) % slides.length);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />

      <div className="relative z-10 h-full flex flex-col justify-end pb-24 md:pb-28 px-4">
        <div className="container-regent">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7 }}
              className="space-y-3"
            >
              <span className="text-primary text-[11px] uppercase tracking-[0.3em] font-medium">
                {slides[current].subtitle}
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-wide text-foreground uppercase">
                {slides[current].title}
              </h1>

              <div className="flex items-center gap-6 pt-4">
                <Link
                  to="/projects?status=completed"
                  className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors group"
                >
                  <CircleCheckBig className="w-4 h-4 text-primary" />
                  <span className="text-xs uppercase tracking-[0.15em]">Completed Projects</span>
                </Link>
                <Link
                  to="/projects?status=ongoing"
                  className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors group"
                >
                  <Loader className="w-4 h-4 text-primary" />
                  <span className="text-xs uppercase tracking-[0.15em]">Ongoing Projects</span>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <button onClick={prev} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 text-foreground/50 hover:text-primary transition-colors">
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button onClick={next} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 text-foreground/50 hover:text-primary transition-colors">
        <ChevronRight className="w-8 h-8" />
      </button>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>

      <div className="absolute bottom-8 right-8 md:right-16 z-20 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-[2px] transition-all duration-500 ${i === current ? "w-12 bg-primary" : "w-6 bg-foreground/30"}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
