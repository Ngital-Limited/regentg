import { motion } from "framer-motion";
import { MapPin, ExternalLink } from "lucide-react";

interface ProjectMapProps {
  lat: number;
  lng: number;
  projectName: string;
  address?: string;
}

const ProjectMap = ({ lat, lng, projectName, address }: ProjectMapProps) => {
  // Precise pin at exact coordinates with project name label
  const label = encodeURIComponent(projectName);
  const mapUrl = `https://www.google.com/maps?q=loc:${lat},${lng}(${label})&z=17`;
  // Embed the same coordinates with a marker
  const embedUrl = `https://www.google.com/maps?q=${lat},${lng}&z=17&output=embed`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="container-regent"
    >
      <div className="relative overflow-hidden border border-border/40 bg-card/60">
        <div className="relative aspect-[16/10] w-full md:aspect-[21/9]">
          <iframe
            title={`${projectName} location map`}
            src={embedUrl}
            className="absolute inset-0 h-full w-full grayscale-[20%] contrast-[1.05]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          {/* Subtle dark overlay for brand cohesion */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
        </div>

        <div className="flex flex-col gap-3 border-t border-border/40 bg-background/60 px-5 py-4 md:flex-row md:items-center md:justify-between md:px-8">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
              <MapPin className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-primary">Location</p>
              <h3 className="text-base font-light uppercase tracking-[0.12em] text-foreground md:text-lg">{projectName}</h3>
              {address ? <p className="text-xs leading-relaxed text-muted-foreground md:text-sm">{address}</p> : null}
            </div>
          </div>

          <a
            href={mapUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 border border-border/60 px-5 py-3 text-xs uppercase tracking-[0.22em] text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Open in Google Maps
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectMap;
