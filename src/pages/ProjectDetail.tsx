import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { MapPin, Maximize, BedDouble, Compass, Building2, Home, Layers, HardHat, Calendar, Download, Phone, Mail, Clock } from "lucide-react";
import { useState } from "react";

const defaultFeatures = [
  "Earthquake-resistant RCC structure designed by BUET professor",
  "High-speed passenger elevator with generator backup",
  "24/7 security with CCTV surveillance",
  "Standby generator for common areas",
  "Intercom & video door phone system",
  "Landscaped rooftop garden with community space",
  "Underground car parking facility",
  "Fire detection & suppression system",
  "Premium bathroom fittings & sanitary ware",
  "Imported tiles & high-quality finishes",
];

const defaultProgress = [
  { label: "Foundation", value: 100 },
  { label: "Structure", value: 85 },
  { label: "Brickwork", value: 60 },
  { label: "Plumbing & Electrical", value: 40 },
  { label: "Finishing", value: 15 },
  { label: "Overall Progress", value: 55 },
];

const defaultGlance = [
  { icon: "address", label: "Address", value: "Block-M, Sector-03, Aftabnagar R/A, Dhaka" },
  { icon: "size", label: "Size", value: "2080 SFT" },
  { icon: "bedroom", label: "Bedroom", value: "04" },
  { icon: "facing", label: "Project Facing", value: "South" },
  { icon: "floor", label: "Floor", value: "G+6" },
  { icon: "apartments", label: "Apartments", value: "1" },
  { icon: "total", label: "Total Apartments", value: "6" },
  { icon: "designer", label: "Structural Designer", value: "Prof. Shafiul Bari (BUET)" },
  { icon: "handover", label: "Handover Date", value: "December 2026" },
];

interface ProjectData {
  name: string;
  tagline: string;
  status: "ongoing" | "completed";
  overview: string;
  features: string[];
  progress: { label: string; value: number }[];
  glance: { icon: string; label: string; value: string }[];
  gallery: string[];
  mapQuery: string;
  brochureUrl?: string;
}

const makeProject = (name: string, status: "ongoing" | "completed"): ProjectData => ({
  name,
  tagline: "A Legacy of Luxury Living",
  status,
  overview: `${name} is a prestigious residential project by Regent Design & Development Ltd. Designed with meticulous attention to detail, this development offers an unparalleled living experience combining modern architecture with timeless elegance. Every aspect of the project has been carefully planned to provide residents with comfort, convenience, and a sense of belonging.`,
  features: defaultFeatures,
  progress: defaultProgress,
  glance: defaultGlance,
  gallery: [],
  mapQuery: "Aftabnagar,+Dhaka",
});

const projectsData: Record<string, ProjectData> = {
  // Ongoing
  "regent-grand-heritage": makeProject("Regent Grand Heritage", "ongoing"),
  "regent-hasina": makeProject("Regent Hasina", "ongoing"),
  "regent-sapphire": makeProject("Regent Sapphire", "ongoing"),
  "regent-spring-dale": makeProject("Regent Spring Dale", "ongoing"),
  "regent-tara": makeProject("Regent Tara", "ongoing"),
  "regent-palace": makeProject("Regent Palace", "ongoing"),
  "regent-spring-field": makeProject("Regent Spring Field", "ongoing"),
  "regent-rizia": makeProject("Regent Rizia", "ongoing"),
  // Completed
  "regent-jannat": makeProject("Regent Jannat", "completed"),
  "regent-south-pearl": makeProject("Regent South Pearl", "completed"),
  "regent-east-castle": makeProject("Regent East Castle", "completed"),
  "regent-south-lake": makeProject("Regent South Lake", "completed"),
  "regent-east-queen": makeProject("Regent East Queen", "completed"),
  "regent-sufia": makeProject("Regent Sufia", "completed"),
  "regent-parbata-grand": makeProject("Regent Parbata Grand", "completed"),
  "regent-islam": makeProject("Regent Islam", "completed"),
};

const getGlanceIcon = (icon: string) => {
  switch (icon) {
    case "address": return <MapPin className="w-5 h-5" />;
    case "size": return <Maximize className="w-5 h-5" />;
    case "bedroom": return <BedDouble className="w-5 h-5" />;
    case "facing": return <Compass className="w-5 h-5" />;
    case "floor": return <Building2 className="w-5 h-5" />;
    case "apartments": return <Home className="w-5 h-5" />;
    case "total": return <Layers className="w-5 h-5" />;
    case "designer": return <HardHat className="w-5 h-5" />;
    case "handover": return <Calendar className="w-5 h-5" />;
    default: return <MapPin className="w-5 h-5" />;
  }
};

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = projectsData[slug || ""] || projectsData["regent-grand-heritage"];
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section – Full View */}
      <section className="relative h-screen w-full overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, hsl(240 51% 14%), hsl(194 89% 10%), hsl(0 0% 5%))",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <div className="relative h-full flex flex-col justify-end pb-20 px-4">
          <div className="container-regent">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-primary text-xs uppercase tracking-[0.3em] font-medium">
                {project.status === "ongoing" ? "Ongoing Project" : "Completed Project"}
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wide mt-4 text-foreground uppercase">
                {project.name}
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl mt-4 font-light tracking-wide">
                {project.tagline}
              </p>
              <div className="flex gap-4 mt-8">
                <a
                  href="#schedule"
                  className="px-8 py-3 bg-primary text-primary-foreground text-sm uppercase tracking-[0.2em] hover:bg-primary/90 transition-colors"
                >
                  Schedule Visit
                </a>
                <a
                  href="#overview"
                  className="px-8 py-3 border border-border text-foreground text-sm uppercase tracking-[0.2em] hover:border-primary hover:text-primary transition-colors"
                >
                  Learn More
                </a>
              </div>
            </motion.div>
          </div>
        </div>
        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
        </motion.div>
      </section>

      {/* Project Overview */}
      <section id="overview" className="section-padding bg-background">
        <div className="container-regent max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="text-primary text-xs uppercase tracking-[0.3em]">About the Project</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-wide mt-3 text-foreground">PROJECT OVERVIEW</h2>
            <div className="w-16 h-[2px] bg-primary mt-6 mx-auto" />
            <p className="text-muted-foreground mt-10 text-base md:text-lg leading-relaxed">
              {project.overview}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Project Features */}
      <section className="section-padding bg-card/50">
        <div className="container-regent">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-primary text-xs uppercase tracking-[0.3em]">What We Offer</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-wide mt-3 text-foreground">PROJECT FEATURES</h2>
            <div className="w-16 h-[2px] bg-primary mt-6 mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-4xl mx-auto">
            {project.features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex items-start gap-4 py-4 border-b border-border/50"
              >
                <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                <p className="text-foreground/90 text-sm md:text-base font-light leading-relaxed">{feature}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Progress */}
      <section className="section-padding bg-background">
        <div className="container-regent max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-primary text-xs uppercase tracking-[0.3em]">Construction Update</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-wide mt-3 text-foreground">PROJECT PROGRESS</h2>
            <div className="w-16 h-[2px] bg-primary mt-6 mx-auto" />
          </motion.div>

          <div className="space-y-8">
            {project.progress.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-foreground text-sm uppercase tracking-[0.15em] font-light">{item.label}</span>
                  <span className="text-primary text-sm font-medium">{item.value}%</span>
                </div>
                <Progress
                  value={item.value}
                  className="h-2 bg-muted"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* At a Glance */}
      <section className="section-padding bg-card/50">
        <div className="container-regent">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-primary text-xs uppercase tracking-[0.3em]">Quick Info</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-wide mt-3 text-foreground">AT A GLANCE</h2>
            <div className="w-16 h-[2px] bg-primary mt-6 mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {project.glance.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex items-center gap-4 p-6 border border-border/50 bg-background/50 hover:border-primary/30 transition-colors group"
              >
                <div className="w-12 h-12 flex items-center justify-center border border-primary/30 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all shrink-0">
                  {getGlanceIcon(item.icon)}
                </div>
                <div>
                  <span className="text-muted-foreground text-xs uppercase tracking-[0.2em]">{item.label}</span>
                  <p className="text-foreground text-sm md:text-base font-light mt-1">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Brochure */}
      <section className="py-20 bg-background">
        <div className="container-regent">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center border border-border/50 p-12 md:p-16 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-primary/30" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-primary/30" />
            <Download className="w-10 h-10 text-primary mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-light tracking-wide text-foreground">DOWNLOAD BROCHURE</h2>
            <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
              Get detailed information about floor plans, specifications, and pricing in our comprehensive project brochure.
            </p>
            <button className="mt-8 px-10 py-3 bg-primary text-primary-foreground text-sm uppercase tracking-[0.2em] hover:bg-primary/90 transition-colors inline-flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </motion.div>
        </div>
      </section>

      {/* Dynamic Project Location */}
      <section className="section-padding bg-card/50">
        <div className="container-regent">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-primary text-xs uppercase tracking-[0.3em]">Find Us</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-wide mt-3 text-foreground">PROJECT LOCATION</h2>
            <div className="w-16 h-[2px] bg-primary mt-6 mx-auto" />
          </motion.div>
        </div>
        <div className="w-full h-[450px] relative">
          <iframe
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9!2d90.43!3d23.77!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s${project.mapQuery}!5e0!3m2!1sen!2sbd`}
            width="100%"
            height="100%"
            style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`${project.name} Location`}
          />
        </div>
      </section>

      {/* Project Gallery – Full View */}
      <section className="section-padding bg-background">
        <div className="container-regent">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-primary text-xs uppercase tracking-[0.3em]">Visual Tour</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-wide mt-3 text-foreground">PROJECT GALLERY</h2>
            <div className="w-16 h-[2px] bg-primary mt-6 mx-auto" />
          </motion.div>

          {project.gallery.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.gallery.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="relative aspect-[4/3] overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedImage(i)}
                >
                  <img src={img} alt={`${project.name} gallery ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-background/0 group-hover:bg-background/30 transition-colors" />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="relative aspect-[4/3] overflow-hidden"
                >
                  <div
                    className="w-full h-full"
                    style={{
                      background: `linear-gradient(${130 + i * 25}deg, hsl(240 51% 14%), hsl(194 89% ${10 + i * 3}%), hsl(0 0% 8%))`,
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-muted-foreground/50 text-xs uppercase tracking-[0.3em]">Coming Soon</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Schedule Your Visit */}
      <section id="schedule" className="section-padding bg-card/50">
        <div className="container-regent max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-primary text-xs uppercase tracking-[0.3em]">Get in Touch</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-wide mt-3 text-foreground">SCHEDULE YOUR VISIT</h2>
            <div className="w-16 h-[2px] bg-primary mt-6 mx-auto" />
            <p className="text-muted-foreground mt-6 text-sm leading-relaxed max-w-xl mx-auto">
              Interested in this project? Schedule a site visit or contact us for more information.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: <Phone className="w-5 h-5" />, label: "Call Us", value: "0181 000 9333", href: "tel:01810009333" },
              { icon: <Mail className="w-5 h-5" />, label: "Email Us", value: "info@regentddl.com", href: "mailto:info@regentddl.com" },
              { icon: <Clock className="w-5 h-5" />, label: "Office Hours", value: "Sat–Thu, 10AM–6PM", href: null },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center p-8 border border-border/50 hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 mx-auto flex items-center justify-center border border-primary/30 text-primary mb-4">
                  {item.icon}
                </div>
                <span className="text-muted-foreground text-xs uppercase tracking-[0.2em]">{item.label}</span>
                {item.href ? (
                  <a href={item.href} className="block text-foreground mt-2 text-sm hover:text-primary transition-colors">
                    {item.value}
                  </a>
                ) : (
                  <p className="text-foreground mt-2 text-sm">{item.value}</p>
                )}
              </motion.div>
            ))}
          </div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 border border-border/50 p-8 md:p-12"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2 block">Full Name</label>
                <input
                  type="text"
                  className="w-full bg-transparent border border-border/50 px-4 py-3 text-foreground text-sm focus:border-primary outline-none transition-colors"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2 block">Phone Number</label>
                <input
                  type="tel"
                  className="w-full bg-transparent border border-border/50 px-4 py-3 text-foreground text-sm focus:border-primary outline-none transition-colors"
                  placeholder="Your phone number"
                />
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2 block">Email Address</label>
              <input
                type="email"
                className="w-full bg-transparent border border-border/50 px-4 py-3 text-foreground text-sm focus:border-primary outline-none transition-colors"
                placeholder="Your email address"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2 block">Preferred Visit Date</label>
              <input
                type="date"
                className="w-full bg-transparent border border-border/50 px-4 py-3 text-foreground text-sm focus:border-primary outline-none transition-colors"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2 block">Message</label>
              <textarea
                rows={4}
                className="w-full bg-transparent border border-border/50 px-4 py-3 text-foreground text-sm focus:border-primary outline-none transition-colors resize-none"
                placeholder="Any specific questions or requirements..."
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-primary text-primary-foreground text-sm uppercase tracking-[0.2em] hover:bg-primary/90 transition-colors"
            >
              Schedule Visit
            </button>
          </motion.form>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ProjectDetail;
