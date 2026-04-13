import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const toSlug = (name: string) => name.toLowerCase().replace(/\s+/g, "-");

const projectImages: Record<string, string> = {
  "Regent Tara": "https://regentgroup.com.bd/wp-content/uploads/2025/02/tara-p-i.jpg",
  "Regent Spring Field": "https://regentgroup.com.bd/wp-content/uploads/2025/02/Spring-Field.jpg",
};

const ongoingProjects = [
  "Regent Grand Heritage", "Regent Hasina", "Regent Sapphire", "Regent Spring Dale",
  "Regent Tara", "Regent Palace", "Regent Spring Field", "Regent Rizia",
];

const completedProjects = [
  "Regent Jannat", "Regent South Pearl", "Regent East Castle", "Regent South Lake",
  "Regent East Queen", "Regent Sufia", "Regent Parbata Grand", "Regent Islam",
];

const Projects = () => {
  const [tab, setTab] = useState<"ongoing" | "completed">("ongoing");
  const projects = tab === "ongoing" ? ongoingProjects : completedProjects;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20 px-4 bg-regent-charcoal">
        <div className="container-regent text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-primary text-xs uppercase tracking-[0.3em]">Our Portfolio</span>
            <h1 className="text-4xl md:text-6xl font-light tracking-wide mt-4 text-foreground">PROJECTS</h1>
            <div className="w-16 h-[2px] bg-primary mt-6 mx-auto" />
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-regent">
          {/* Tabs */}
          <div className="flex justify-center gap-8 mb-16">
            {(["ongoing", "completed"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`text-sm uppercase tracking-[0.2em] pb-2 border-b-2 transition-all ${
                  tab === t ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {t} Projects
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((project, i) => (
              <Link to={`/projects/${toSlug(project)}`} key={project}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] bg-card border border-border overflow-hidden">
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
                        background: `linear-gradient(${130 + i * 15}deg, hsl(194 89% ${12 + i * 2}%), hsl(240 51% ${18 + i * 2}%), hsl(0 0% ${6 + i}%))`,
                      }}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="text-primary text-[10px] uppercase tracking-[0.3em]">{tab}</span>
                    <h3 className="text-base font-light tracking-wider text-foreground mt-1">{project}</h3>
                    <div className="h-[1px] w-8 bg-primary mt-3 transition-all duration-500 group-hover:w-16" />
                  </div>
                </div>
              </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;
