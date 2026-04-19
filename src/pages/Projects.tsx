import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";

const toSlug = (name: string) => name.toLowerCase().replace(/\s+/g, "-");

type ProjectInfo = {
  name: string;
  status: "ongoing" | "completed" | "upcoming";
  location: string;
  size: string;
  bedrooms: string;
  type: string;
  image?: string;
};

const allProjects: ProjectInfo[] = [
  // Ongoing
  {
    name: "Regent Grand Heritage",
    status: "ongoing",
    location: "Shahjadpur, Gulshan",
    size: "1350-3280 SFT",
    bedrooms: "3-4",
    type: "Residential",
    image: "https://regentgroup.com.bd/wp-content/uploads/2025/02/Up-22Grand-heritage.jpg",
  },
  {
    name: "Regent Hasina",
    status: "ongoing",
    location: "Bashundhara R/A",
    size: "2180 SFT",
    bedrooms: "4",
    type: "Residential",
    image: "https://regentgroup.com.bd/wp-content/uploads/2025/02/Regent-Hasina.webp",
  },
  {
    name: "Regent Sapphire",
    status: "ongoing",
    location: "Bashundhara R/A",
    size: "2650 SFT",
    bedrooms: "4",
    type: "Residential",
    image: "https://regentgroup.com.bd/wp-content/uploads/2025/02/REGENT-SAPPHIRE-p-i.jpg",
  },
  {
    name: "Regent Spring Dale",
    status: "ongoing",
    location: "Bashundhara R/A",
    size: "2450 SFT",
    bedrooms: "4",
    type: "Residential",
    image: "https://regentgroup.com.bd/wp-content/uploads/2025/02/Spring-dale-Side-View.jpg",
  },
  {
    name: "Regent Tara",
    status: "ongoing",
    location: "Mirpur DOHS",
    size: "1650 SFT",
    bedrooms: "3",
    type: "Residential",
    image: "https://regentgroup.com.bd/wp-content/uploads/2025/02/tara-p-i.jpg",
  },
  {
    name: "Regent Palace",
    status: "ongoing",
    location: "Adabor, Mohammadpur",
    size: "1580 SFT",
    bedrooms: "3",
    type: "Residential",
    image: "https://regentgroup.com.bd/wp-content/uploads/2025/02/Palace.jpg",
  },
  {
    name: "Regent Spring Field",
    status: "ongoing",
    location: "Bashundhara R/A",
    size: "2200 SFT",
    bedrooms: "4",
    type: "Residential",
    image: "https://regentgroup.com.bd/wp-content/uploads/2025/02/Spring-Field.jpg",
  },
  {
    name: "Regent Rizia",
    status: "ongoing",
    location: "Uttara",
    size: "1700 SFT",
    bedrooms: "3-4",
    type: "Residential",
    image: "https://regentgroup.com.bd/wp-content/uploads/2026/02/F-01-HD-15.07.25-scaled.jpg",
  },
  // Completed
  {
    name: "Regent Jannat",
    status: "completed",
    location: "Aftabnagar R/A, Dhaka",
    size: "1570 & 1670 SFT",
    bedrooms: "3",
    type: "Residential",
    image: "https://regentgroup.com.bd/wp-content/uploads/2025/04/Jannat-Night.jpg",
  },
  {
    name: "Regent South Pearl",
    status: "completed",
    location: "Khilgaon",
    size: "1348 & 1361 SFT",
    bedrooms: "3",
    type: "Residential",
    image: "https://regentgroup.com.bd/wp-content/uploads/2025/04/full-image-25-06-2018.png",
  },
  {
    name: "Regent East Castle",
    status: "completed",
    location: "Shadhinata Sarani, North Badda",
    size: "1393 & 1398 SFT",
    bedrooms: "3",
    type: "Residential",
    image: "https://regentgroup.com.bd/wp-content/uploads/2025/04/REGENT-EAST-CASTLE-4.jpg",
  },
  {
    name: "Regent South Lake",
    status: "completed",
    location: "Mahanagar Housing, Hatirjheel",
    size: "1744 SFT",
    bedrooms: "3",
    type: "Residential",
    image: "https://regentgroup.com.bd/wp-content/uploads/2025/04/full-view.jpg",
  },
  {
    name: "Regent East Queen",
    status: "completed",
    location: "Badda",
    size: "1500 SFT",
    bedrooms: "3",
    type: "Residential",
  },
  {
    name: "Regent Sufia",
    status: "completed",
    location: "Bashundhara R/A",
    size: "2000 SFT",
    bedrooms: "4",
    type: "Residential",
  },
  {
    name: "Regent Parbata Grand",
    status: "completed",
    location: "Uttara",
    size: "1900 SFT",
    bedrooms: "3",
    type: "Residential",
  },
  {
    name: "Regent Islam",
    status: "completed",
    location: "Mirpur",
    size: "1550 SFT",
    bedrooms: "3",
    type: "Residential",
  },
];

const statusOptions = ["All", "Ongoing", "Completed", "Upcoming"];
const typeOptions = ["All", "Residential", "Commercial"];

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [sizeFilter, setSizeFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const locations = useMemo(() => {
    const locs = [...new Set(allProjects.map((p) => p.location))];
    return ["All", ...locs.sort()];
  }, []);

  const sizeOptions = ["All", "Under 1600 SFT", "1600-2000 SFT", "2000-2500 SFT", "Above 2500 SFT"];

  const matchesSize = (projectSize: string, filter: string) => {
    if (filter === "All") return true;
    // Extract the first number from size string
    const match = projectSize.match(/(\d+)/);
    if (!match) return true;
    const size = parseInt(match[1]);
    switch (filter) {
      case "Under 1600 SFT": return size < 1600;
      case "1600-2000 SFT": return size >= 1600 && size <= 2000;
      case "2000-2500 SFT": return size > 2000 && size <= 2500;
      case "Above 2500 SFT": return size > 2500;
      default: return true;
    }
  };

  const filtered = useMemo(() => {
    return allProjects.filter((p) => {
      if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (statusFilter !== "All" && p.status !== statusFilter.toLowerCase()) return false;
      if (typeFilter !== "All" && p.type !== typeFilter) return false;
      if (locationFilter !== "All" && p.location !== locationFilter) return false;
      if (!matchesSize(p.size, sizeFilter)) return false;
      return true;
    });
  }, [searchQuery, statusFilter, typeFilter, locationFilter, sizeFilter]);

  const activeFilterCount = [statusFilter, typeFilter, locationFilter, sizeFilter].filter((f) => f !== "All").length;

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("All");
    setTypeFilter("All");
    setLocationFilter("All");
    setSizeFilter("All");
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "ongoing": return "bg-primary/20 text-primary";
      case "completed": return "bg-green-500/20 text-green-400";
      case "upcoming": return "bg-yellow-500/20 text-yellow-400";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 md:pt-32 pb-12 md:pb-16 px-4 bg-regent-charcoal">
        <div className="container-regent text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-primary text-xs uppercase tracking-[0.3em]">Our Portfolio</span>
            <h1 className="text-3xl md:text-6xl font-light tracking-wide mt-4 text-foreground">PROJECTS</h1>
            <div className="w-16 h-[2px] bg-primary mt-6 mx-auto" />
            <p className="text-muted-foreground mt-4 text-sm max-w-lg mx-auto">
              Explore {allProjects.length} projects across Dhaka — ongoing, completed & upcoming
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-[72px] z-30 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container-regent py-4 md:py-6">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-8">
            {[
              { label: "Type", value: typeFilter, setter: setTypeFilter, options: typeOptions },
              { label: "Status", value: statusFilter, setter: setStatusFilter, options: statusOptions },
              { label: "Location", value: locationFilter, setter: setLocationFilter, options: locations },
              { label: "Size", value: sizeFilter, setter: setSizeFilter, options: sizeOptions },
            ].map((filter) => (
              <div key={filter.label} className="relative">
                <select
                  value={filter.value}
                  onChange={(e) => filter.setter(e.target.value)}
                  className="w-full pb-3 pt-1 bg-transparent border-b border-border text-sm text-foreground focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer pr-8"
                >
                  <option value="All">{filter.label}</option>
                  {filter.options.filter(o => o !== "All").map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <svg className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
              Showing <span className="text-foreground font-medium">{filtered.length}</span> of {allProjects.length} projects
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No projects match your filters</p>
              <button onClick={clearFilters} className="mt-4 text-primary text-sm hover:underline">Clear all filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((project, i) => (
                <Link to={`/projects/${toSlug(project.name)}`} key={project.name}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="group cursor-pointer"
                  >
                    <div className="relative aspect-[4/5] bg-card border border-border overflow-hidden">
                      {project.image ? (
                        <img
                          src={project.image}
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

                      {/* Status Badge */}
                      <div className="absolute top-4 left-4">
                        <span className={`text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full ${statusColor(project.status)}`}>
                          {project.status}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <h3 className="text-base font-light tracking-wider text-foreground">{project.name}</h3>
                        <p className="text-[11px] text-muted-foreground mt-1">{project.location}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-[10px] text-muted-foreground">{project.size}</span>
                          <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                          <span className="text-[10px] text-muted-foreground">{project.bedrooms} Bed</span>
                        </div>
                        <div className="h-[1px] w-8 bg-primary mt-3 transition-all duration-500 group-hover:w-16" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;
