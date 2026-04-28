import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "../SectionHeading";
import img_Palace from "@/assets/imported/Palace.jpg";
import img_REGENT_SAPPHIRE_p_i from "@/assets/imported/REGENT-SAPPHIRE-p-i.jpg";
import img_Regent_Hasina from "@/assets/imported/Regent-Hasina.webp";
import img_Spring_Field from "@/assets/imported/Spring-Field.jpg";
import img_Spring_dale_Side_View from "@/assets/imported/Spring-dale-Side-View.jpg";
import img_Up_22Grand_heritage from "@/assets/imported/Up-22Grand-heritage.jpg";
import img_tara_p_i from "@/assets/imported/tara-p-i.jpg";
import img_F_01_HD_15_07_25_scaled from "@/assets/imported/F-01-HD-15.07.25-scaled.jpg";

const projectImages: Record<string, string> = {
  "Regent Tara": img_tara_p_i,
  "Regent Spring Field": img_Spring_Field,
  "Regent Rizia": img_F_01_HD_15_07_25_scaled,
  "Regent Palace": img_Palace,
  "Regent Grand Heritage": img_Up_22Grand_heritage,
  "Regent Hasina": img_Regent_Hasina,
  "Regent Sapphire": img_REGENT_SAPPHIRE_p_i,
  "Regent Spring Dale": img_Spring_dale_Side_View,
};

const ongoingProjects = [
  "Regent Grand Heritage",
  "Regent Hasina",
  "Regent Sapphire",
  "Regent Spring Dale",
  "Regent Tara",
  "Regent Palace",
  "Regent Spring Field",
  "Regent Rizia",
];

const ProjectCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const amount = 320;
      scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
    }
  };

  return (
    <section className="section-padding bg-background">
      <div className="container-regent">
        <SectionHeading
          subtitle="Our Portfolio"
          title="ONGOING PROJECTS"
          description="Explore Our Current Developments Across Dhaka, Each Crafted With Precision And Elegance."
        />

        <div className="relative">
          <button onClick={() => scroll("left")} className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-card border border-border rounded-full text-foreground hover:text-primary transition-colors hidden md:block">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={() => scroll("right")} className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-card border border-border rounded-full text-foreground hover:text-primary transition-colors hidden md:block">
            <ChevronRight className="w-5 h-5" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {ongoingProjects.map((project, i) => (
              <motion.div
                key={project}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex-shrink-0 w-[85%] sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] snap-start"
              >
                <Link to={`/projects/${project.toLowerCase().replace(/\s+/g, "-")}`} className="block relative aspect-[4/5] bg-card border border-border overflow-hidden group cursor-pointer">
                  {projectImages[project] ? (
                    <img
                      src={projectImages[project]}
                      alt={project}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div
                      className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                      style={{
                        background: `linear-gradient(${135 + i * 20}deg, hsl(194 89% ${15 + i * 3}%), hsl(240 51% ${20 + i * 3}%), hsl(0 0% ${8 + i * 2}%))`,
                      }}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="text-primary text-[10px] uppercase tracking-[0.3em]">Ongoing</span>
                    <h3 className="text-lg font-light tracking-wider text-foreground mt-1">{project}</h3>
                    <div className="h-[1px] w-8 bg-primary mt-3 transition-all duration-500 group-hover:w-16" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectCarousel;
