import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Maximize, BedDouble, Building2, Layers } from "lucide-react";
import img_RGH_Roof_Top_3_24_Aug_2023_8 from "@/assets/imported/RGH-Roof-Top-3_24-Aug-2023-8.jpg";

const FeaturedProject = () => {
  const project = {
    name: "Regent Grand Heritage",
    slug: "regent-grand-heritage",
    tagline: "Where Luxury Meets Everyday Convenience",
    location: "Pragati Sarani Road, Shahjadpur, North Badda, Dhaka",
    size: "1350 - 3280 SFT",
    bedrooms: "03 - 04",
    floors: "B+G+9",
    totalApartments: "90",
    handover: "December 2028",
    image: img_RGH_Roof_Top_3_24_Aug_2023_8,
    description:
      "A Premium South-Facing Condominium in the peaceful residential area of Shahjadpur, just a stone's throw from Gulshan-2. Spanning 10 levels of refined living, this Architectural Gem offers a seamless blend of Elegance, Comfort and Modern Functionality.",
  };

  const specs = [
    { icon: Maximize, label: "Size", value: project.size },
    { icon: BedDouble, label: "Bedrooms", value: project.bedrooms },
    { icon: Building2, label: "Floors", value: project.floors },
    { icon: Layers, label: "Total Apartments", value: project.totalApartments },
  ];

  return (
    <section className="relative w-full min-h-[80vh] md:min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 md:via-background/85 to-background/60 md:to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
      </div>

      {/* Content */}
      <div className="relative container-regent py-20 md:py-32">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-primary text-[10px] uppercase tracking-[0.3em] font-medium">
              Featured Project
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-light tracking-wide text-foreground uppercase mt-4 leading-tight">
              {project.name}
            </h2>

            <p className="text-sm md:text-lg lg:text-xl text-muted-foreground font-light tracking-wide mt-3 italic">
              {project.tagline}
            </p>

            <div className="flex items-center gap-2 mt-6 text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <span className="text-sm">{project.location}</span>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mt-6 max-w-xl text-justify">
              {project.description}
            </p>
          </motion.div>

          {/* Specs Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-0 mt-8 md:mt-10 border border-border/50"
          >
            {specs.map((spec, idx) => (
              <div
                key={spec.label}
                className={`p-4 md:p-5 border-border/50 bg-background/60 backdrop-blur-sm ${idx % 2 === 0 ? 'border-r' : ''} ${idx < 2 ? 'border-b' : ''}`}
              >
                <spec.icon className="w-4 h-4 text-primary mb-2" />
                <p className="uppercase tracking-[0.15em] text-muted-foreground text-base font-medium mb-1">{spec.label}</p>
                <p className="text-sm font-medium text-foreground">{spec.value}</p>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 md:gap-4"
          >
            <Link
              to={`/projects/${project.slug}`}
              className="group inline-flex items-center justify-center gap-3 px-6 md:px-8 py-3 md:py-3.5 bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] hover:bg-primary/90 transition-all"
            >
              Explore Project
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-3.5 border border-border text-xs uppercase tracking-[0.2em] text-foreground hover:border-primary hover:text-primary transition-all"
            >
              View All Projects
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProject;
