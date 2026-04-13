import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Building2, HardHat } from "lucide-react";
import { Link } from "react-router-dom";

const slides = [
  {
    title: "REGENT GRAND HERITAGE",
    subtitle: "Luxury Living Redefined",
    description: "Experience the pinnacle of architectural excellence in the heart of Dhaka.",
    image: "https://images.unsplash.com/photo-1776109377198-7c9e7d632a4a",
    completedProjects: "15+ Completed Projects",
    ongoingProjects: "6 Ongoing Projects",
  },
  {
    title: "REGENT SAPPHIRE",
    subtitle: "Where Elegance Meets Comfort",
    description: "A masterpiece of modern design crafted for discerning homeowners.",
    image: "https://images.unsplash.com/photo-1776108450800-524c042a6c40",
    completedProjects: "15+ Completed Projects",
    ongoingProjects: "6 Ongoing Projects",
  },
  {
    title: "BUILDING TRUST SINCE ESTABLISHMENT",
    subtitle: "400+ Apartments Delivered",
    description: "Regent Design & Development Ltd — your trusted partner in real estate.",
    image: "https://images.unsplash.com/photo-1776110793538-d539dc12285b",
    completedProjects: "15+ Completed Projects",
    ongoingProjects: "6 Ongoing Projects",
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
      {/* Background image */}
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

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />

      {/* Content pinned to bottom */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-24 md:pb-28 px-4">
        <div className="container-regent">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-primary text-xs md:text-sm uppercase tracking-[0.3em] font-medium">
                {slides[current].subtitle}
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wide mt-4 text-foreground uppercase">
                {slides[current].title}
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl mt-4 font-light tracking-wide max-w-2xl">
                {slides[current].description}
              </p>

              {/* Project links with icons */}
              <div className="flex items-center gap-8 mt-8">
                <Link
                  to="/projects?status=completed"
                  className="flex items-center gap-3 text-foreground/80 hover:text-primary transition-colors group"
                >
                  <Building2 className="w-5 h-5 text-primary" />
                  <span className="text-sm uppercase tracking-[0.15em] group-hover:tracking-[0.2em] transition-all">
                    {slides[current].completedProjects}
                  </span>
                </Link>
                <Link
                  to="/projects?status=ongoing"
                  className="flex items-center gap-3 text-foreground/80 hover:text-primary transition-colors group"
                >
                  <HardHat className="w-5 h-5 text-primary" />
                  <span className="text-sm uppercase tracking-[0.15em] group-hover:tracking-[0.2em] transition-all">
                    {slides[current].ongoingProjects}
                  </span>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Nav Arrows */}
      <button onClick={prev} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 text-foreground/50 hover:text-primary transition-colors">
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button onClick={next} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 text-foreground/50 hover:text-primary transition-colors">
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>

      {/* Dots */}
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
