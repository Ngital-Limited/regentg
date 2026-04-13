import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SectionHeading from "../SectionHeading";

const projectImages: Record<string, string> = {
  "Regent Tara": "https://regentgroup.com.bd/wp-content/uploads/2025/02/tara-p-i.jpg",
  "Regent Spring Field": "https://regentgroup.com.bd/wp-content/uploads/2025/02/Spring-Field.jpg",
  "Regent Rizia": "https://regentgroup.com.bd/wp-content/uploads/2026/02/F-01-HD-15.07.25-scaled.jpg",
  "Regent Palace": "https://regentgroup.com.bd/wp-content/uploads/2025/02/Palace.jpg",
  "Regent Grand Heritage": "https://regentgroup.com.bd/wp-content/uploads/2025/02/Up-22Grand-heritage.jpg",
  "Regent Hasina": "https://regentgroup.com.bd/wp-content/uploads/2025/02/Regent-Hasina.webp",
  "Regent Sapphire": "https://regentgroup.com.bd/wp-content/uploads/2025/02/REGENT-SAPPHIRE-p-i.jpg",
  "Regent Spring Dale": "https://regentgroup.com.bd/wp-content/uploads/2025/02/Spring-dale-Side-View.jpg",
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

const PROJECTS_PER_PAGE = 3;

const ProjectCarousel = () => {
  // Show first 3 projects as a grid
  const visibleProjects = ongoingProjects.slice(0, PROJECTS_PER_PAGE);

  return (
    <section className="section-padding bg-background">
      <div className="container-regent">
        <SectionHeading
          subtitle="Our Portfolio"
          title="ONGOING PROJECTS"
          description="Explore our current developments across Dhaka, each crafted with precision and elegance."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleProjects.map((project, i) => (
            <motion.div
              key={project}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <Link
                to={`/projects/${project.toLowerCase().replace(/\s+/g, "-")}`}
                className="block relative aspect-[4/5] bg-card border border-border overflow-hidden group cursor-pointer"
              >
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

        {/* View all link */}
        <div className="text-center mt-10">
          <Link
            to="/projects"
            className="inline-block text-xs uppercase tracking-[0.2em] text-foreground/60 hover:text-primary border-b border-foreground/20 hover:border-primary pb-1 transition-colors"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectCarousel;
