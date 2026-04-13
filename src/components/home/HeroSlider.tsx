import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    title: "REGENT GRAND HERITAGE",
    subtitle: "Luxury Living Redefined",
    description: "Experience the pinnacle of architectural excellence in the heart of Dhaka.",
    image: "/hero/hero-1.jpg",
  },
  {
    title: "REGENT SAPPHIRE",
    subtitle: "Where Elegance Meets Comfort",
    description: "A masterpiece of modern design crafted for discerning homeowners.",
    image: "/hero/hero-1.jpg",
  },
  {
    title: "BUILDING TRUST SINCE ESTABLISHMENT",
    subtitle: "400+ Apartments Delivered",
    description: "Regent Design & Development Ltd — your trusted partner in real estate.",
    image: "/hero/hero-1.jpg",
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
      {/* Background layers */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
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
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>
      </AnimatePresence>

      {/* Decorative grid */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container-regent text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <span className="text-primary text-xs md:text-sm uppercase tracking-[0.4em]">
                {slides[current].subtitle}
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-[0.1em] text-foreground">
                {slides[current].title}
              </h1>
              <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
                {slides[current].description}
              </p>
              <div className="flex gap-4 justify-center pt-4">
                <a href="/projects" className="px-8 py-3 bg-primary text-primary-foreground text-sm uppercase tracking-[0.2em] hover:bg-primary/90 transition-all">
                  Our Projects
                </a>
                <a href="/contact" className="px-8 py-3 border border-foreground/30 text-foreground text-sm uppercase tracking-[0.2em] hover:border-primary hover:text-primary transition-all">
                  Contact Us
                </a>
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

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
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
