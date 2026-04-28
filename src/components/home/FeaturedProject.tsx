import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Maximize, BedDouble, Building2, Layers } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { projectImageUrl } from "@/lib/storage";
import img_RGH_Roof_Top_3_24_Aug_2023_8 from "@/assets/imported/RGH-Roof-Top-3_24-Aug-2023-8.jpg";

type FP = {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  location: string | null;
  cover_image_path: string | null;
  units: number | null;
  floors: number | null;
  area_sqft: number | null;
  handover_date: string | null;
};

const FeaturedProject = () => {
  const [project, setProject] = useState<FP | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("projects")
        .select(
          "id, name, slug, short_description, description, location, cover_image_path, units, floors, area_sqft, handover_date"
        )
        .eq("is_active", true)
        .ilike("status", "ongoing")
        .order("display_order", { ascending: true })
        .order("name", { ascending: true })
        .limit(1)
        .maybeSingle();
      setProject(data as FP | null);
    })();
  }, []);

  // Fallback to a static highlight if the DB has no ongoing projects yet
  const display = project
    ? {
        name: project.name,
        slug: project.slug,
        tagline: project.short_description || "",
        location: project.location || "Dhaka, Bangladesh",
        size: project.area_sqft ? `${project.area_sqft} SFT` : "—",
        bedrooms: project.units ? String(project.units) : "—",
        floors: project.floors ? String(project.floors) : "—",
        totalApartments: project.units ? String(project.units) : "—",
        handover: project.handover_date
          ? new Date(project.handover_date).toLocaleDateString("en-US", { year: "numeric", month: "long" })
          : "—",
        image: projectImageUrl(project.cover_image_path) || img_RGH_Roof_Top_3_24_Aug_2023_8,
        description: project.description || project.short_description || "",
      }
    : {
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
          "A Premium South-Facing Condominium in the peaceful residential area of Shahjadpur, just a stone's throw from Gulshan-2.",
      };

  const specs = [
    { icon: Maximize, label: "Size", value: display.size },
    { icon: BedDouble, label: "Bedrooms", value: display.bedrooms },
    { icon: Building2, label: "Floors", value: display.floors },
    { icon: Layers, label: "Total Apartments", value: display.totalApartments },
  ];

  return (
    <section className="relative w-full min-h-[80vh] md:min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={display.image} alt={display.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 md:via-background/85 to-background/60 md:to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
      </div>

      <div className="relative container-regent py-20 md:py-32">
        <div className="max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <span className="text-primary text-[10px] uppercase tracking-[0.3em] font-medium">Featured Project</span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-light tracking-wide text-foreground uppercase mt-4 leading-tight">
              {display.name}
            </h2>
            {display.tagline && (
              <p className="text-sm md:text-lg lg:text-xl text-muted-foreground font-light tracking-wide mt-3 italic">
                {display.tagline}
              </p>
            )}
            <div className="flex items-center gap-2 mt-6 text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <span className="text-sm">{display.location}</span>
            </div>
            {display.description && (
              <p className="text-sm text-muted-foreground leading-relaxed mt-6 max-w-xl text-justify line-clamp-5">
                {display.description}
              </p>
            )}
          </motion.div>

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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 md:gap-4"
          >
            <Link
              to={`/projects/${display.slug}`}
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
