import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { projectImageUrl } from "@/lib/storage";

type DbProject = {
  id: string;
  slug: string;
  name: string;
  status: string | null;
  location: string | null;
  area_sqft: number | null;
  units: number | null;
  cover_image_path: string | null;
};

const statusOptions = ["All", "Ongoing", "Completed", "Upcoming"];

const Projects = () => {
  const [searchParams] = useSearchParams();
  const initialStatus = (() => {
    const s = (searchParams.get("status") || "").toLowerCase();
    if (s === "ongoing") return "Ongoing";
    if (s === "completed") return "Completed";
    if (s === "upcoming") return "Upcoming";
    return "All";
  })();

  const [projects, setProjects] = useState<DbProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState(initialStatus);
  const [locationFilter, setLocationFilter] = useState("All");
  const [sizeFilter, setSizeFilter] = useState("All");

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("projects")
        .select("id, slug, name, status, location, area_sqft, units, cover_image_path")
        .eq("is_active", true)
        .order("display_order", { ascending: true })
        .order("name", { ascending: true });
      setProjects((data as DbProject[]) || []);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    const s = (searchParams.get("status") || "").toLowerCase();
    if (s === "ongoing") setStatusFilter("Ongoing");
    else if (s === "completed") setStatusFilter("Completed");
    else if (s === "upcoming") setStatusFilter("Upcoming");
    else setStatusFilter("All");
  }, [searchParams]);

  const locations = useMemo(() => {
    const locs = [...new Set(projects.map((p) => p.location).filter(Boolean) as string[])];
    return ["All", ...locs.sort()];
  }, [projects]);

  const sizeOptions = ["All", "Under 1600 SFT", "1600-2000 SFT", "2000-2500 SFT", "Above 2500 SFT"];

  const matchesSize = (sqft: number | null, filter: string) => {
    if (filter === "All" || !sqft) return filter === "All";
    switch (filter) {
      case "Under 1600 SFT": return sqft < 1600;
      case "1600-2000 SFT": return sqft >= 1600 && sqft <= 2000;
      case "2000-2500 SFT": return sqft > 2000 && sqft <= 2500;
      case "Above 2500 SFT": return sqft > 2500;
      default: return true;
    }
  };

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (statusFilter !== "All" && (p.status || "").toLowerCase() !== statusFilter.toLowerCase()) return false;
      if (locationFilter !== "All" && p.location !== locationFilter) return false;
      if (sizeFilter !== "All" && !matchesSize(p.area_sqft, sizeFilter)) return false;
      return true;
    });
  }, [projects, statusFilter, locationFilter, sizeFilter]);

  const clearFilters = () => {
    setStatusFilter("All");
    setLocationFilter("All");
    setSizeFilter("All");
  };

  const statusColor = (status: string | null) => {
    switch ((status || "").toLowerCase()) {
      case "ongoing": return "text-primary bg-secondary";
      case "completed": return "bg-green-500/20 text-green-400";
      case "upcoming": return "bg-yellow-500/20 text-yellow-400";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <SEO title="Our Projects" description="Explore Regent's ongoing and completed residential real estate projects across Dhaka, Bangladesh — built with BUET-certified structural integrity." path="/projects" />
      {/* Hero */}
      <section className="pt-28 md:pt-32 pb-12 md:pb-16 px-4 bg-regent-charcoal">
        <div className="container-regent text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-primary text-xs uppercase tracking-[0.3em]">Our Portfolio</span>
            <h1 className="text-3xl md:text-6xl font-light tracking-wide mt-4 text-foreground">PROJECTS</h1>
            <div className="w-16 h-[2px] bg-primary mt-6 mx-auto" />
            <p className="text-muted-foreground mt-4 text-sm max-w-lg mx-auto">
              Explore our portfolio of ongoing, completed, and upcoming projects shaping what's next.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-[72px] z-30 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container-regent py-4 md:py-6">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-8">
            {[
              { label: "Status", value: statusFilter, setter: setStatusFilter, options: statusOptions },
              { label: "Location", value: locationFilter, setter: setLocationFilter, options: locations },
              { label: "Size", value: sizeFilter, setter: setSizeFilter, options: sizeOptions },
            ].map((filter) => (
              <div key={filter.label} className="relative">
                <label className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
                  {filter.label}
                </label>
                <select
                  value={filter.value}
                  onChange={(e) => filter.setter(e.target.value)}
                  className="w-full pb-3 pt-1 bg-transparent border-b border-border text-sm text-foreground focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer pr-8"
                >
                  {filter.options.map((opt) => (
                    <option key={opt} value={opt} className="bg-background text-foreground">{opt}</option>
                  ))}
                </select>
                <svg className="absolute right-0 bottom-3 w-4 h-4 text-foreground pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="section-padding bg-background">
        <div className="container-regent">
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm text-muted-foreground">
              Showing <span className="text-foreground font-medium">{filtered.length}</span> of {projects.length} projects
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No projects match your filters</p>
              <button onClick={clearFilters} className="mt-4 text-primary text-sm hover:underline">Clear all filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((project, i) => {
                const img = projectImageUrl(project.cover_image_path);
                return (
                  <Link to={`/projects/${project.slug}`} key={project.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      className="group cursor-pointer"
                    >
                      <div className="relative aspect-[4/5] bg-card border border-border overflow-hidden">
                        {img ? (
                          <img
                            src={img}
                            alt={project.name}
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
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />

                        {project.status && (
                          <div className="absolute top-4 left-4">
                            <span className={`text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full ${statusColor(project.status)}`}>
                              {project.status}
                            </span>
                          </div>
                        )}

                        <div className="absolute bottom-0 left-0 right-0 p-5">
                          <h3 className="text-base font-light tracking-wider text-foreground">{project.name}</h3>
                          {project.location && (
                            <p className="text-[11px] text-muted-foreground mt-1">{project.location}</p>
                          )}
                          <div className="h-[1px] w-8 bg-primary mt-3 transition-all duration-500 group-hover:w-16" />
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;
