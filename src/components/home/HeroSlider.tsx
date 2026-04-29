import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, CircleCheckBig, Loader } from "lucide-react";
import { Link } from "react-router-dom";

const slides = [
  {
    titleLine1: "CRAFTING",
    titleLine2: "LUXURY SPACES",
    subtitle: "Designing Tomorrow's Landmarks",
    image: "https://images.unsplash.com/photo-1776109377198-7c9e7d632a4a",
  },
  {
    titleLine1: "BUILDING",
    titleLine2: "WITH TRUST",
    subtitle: "Excellence In Every Detail",
    image: "https://images.unsplash.com/photo-1776108450800-524c042a6c40",
  },
  {
    titleLine1: "REDEFINING",
    titleLine2: "MODERN LIVING",
    subtitle: "Innovation Meets Timeless Design",
    image: "https://images.unsplash.com/photo-1776110793538-d539dc12285b",
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  // Preload all slide images so transitions never flash a black background
  useEffect(() => {
    slides.forEach((s) => {
      const img = new Image();
      img.src = s.image;
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((p) => (p - 1 + slides.length) % slides.length);
  const next = () => setCurrent((p) => (p + 1) % slides.length);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-regent-charcoal">
      {/* Stacked slides — crossfade via opacity so no empty/black frame appears */}
      {slides.map((slide, i) => (
        <motion.div
          key={i}
          initial={false}
          animate={{
            opacity: i === current ? 1 : 0,
            scale: i === current ? 1 : 1.05,
          }}
          transition={{ opacity: { duration: 1.2 }, scale: { duration: 6, ease: "linear" } }}
          className="absolute inset-0"
          style={{ zIndex: i === current ? 1 : 0 }}
        >
          <img
            src={slide.image}
            alt={slide.titleLine1 + " " + slide.titleLine2}
            loading={i === 0 ? "eager" : "lazy"}
            className="w-full h-full object-cover"
          />
        </motion.div>
      ))}

      {/* Overlay layers — ensure slider text stays readable on any image */}
      {/* Light global overlay — keeps overall image visible */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/80 pointer-events-none" />

      <div className="relative z-10 h-full flex flex-col justify-end pb-20 md:pb-28 px-4">
        <div className="container-regent">
          <div className="min-h-[100px] md:min-h-[140px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-x-0 bottom-0 space-y-2 md:space-y-3"
              >
                <span className="relative text-primary text-[10px] md:text-[11px] uppercase tracking-[0.25em] md:tracking-[0.3em] font-medium block [text-shadow:0_2px_8px_rgba(0,0,0,0.6)]">
                  {slides[current].subtitle}
                </span>
                <h1 className="relative text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-light tracking-wide text-foreground uppercase leading-tight [text-shadow:0_4px_16px_rgba(0,0,0,0.7)]">
                  {slides[current].titleLine1}<br />
                  {slides[current].titleLine2}
                </h1>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-4 md:gap-6 pt-4 md:pt-6">
            <Link
              to="/projects?status=completed"
              className="flex items-center gap-1.5 md:gap-2 text-foreground/70 hover:text-primary transition-colors group"
            >
              <CircleCheckBig className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
              <span className="text-[10px] md:text-xs uppercase tracking-[0.1em] md:tracking-[0.15em]">Completed</span>
            </Link>
            <Link
              to="/projects?status=ongoing"
              className="flex items-center gap-1.5 md:gap-2 text-foreground/70 hover:text-primary transition-colors group"
            >
              <Loader className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
              <span className="text-[10px] md:text-xs uppercase tracking-[0.1em] md:tracking-[0.15em]">Ongoing</span>
            </Link>
          </div>
        </div>
      </div>

      <button onClick={prev} className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 text-foreground/50 hover:text-primary transition-colors">
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
      </button>
      <button onClick={next} className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 text-foreground/50 hover:text-primary transition-colors">
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>

    </section>
  );
};

export default HeroSlider;
