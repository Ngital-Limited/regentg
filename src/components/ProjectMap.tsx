import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

interface ProjectMapProps {
  lat: number;
  lng: number;
  projectName: string;
  address?: string;
}

const ProjectMap = ({ lat, lng, projectName, address }: ProjectMapProps) => {
  const mapUrl = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=16/${lat}/${lng}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="container-regent"
    >
      <div className="relative overflow-hidden border border-border/40 bg-card/60">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.18),transparent_28%),linear-gradient(135deg,hsl(var(--secondary)/0.18),transparent_55%)]" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--border) / 0.35) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border) / 0.35) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative flex min-h-[420px] items-center justify-center px-6 py-12 md:px-10">
          <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20 bg-primary/5" />
          <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10" />

          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative z-10 flex flex-col items-center text-center"
          >
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_0_35px_hsl(var(--primary)/0.35)]">
              <MapPin className="h-7 w-7" />
              <span className="absolute inset-0 rounded-full border border-primary/40 animate-ping" />
              <span className="absolute inset-[-14px] rounded-full border border-primary/20 animate-pulse" />
            </div>

            <div className="mt-8 max-w-md space-y-3">
              <p className="text-xs uppercase tracking-[0.32em] text-primary">Location Marker</p>
              <h3 className="text-2xl font-light uppercase tracking-[0.14em] text-foreground">{projectName}</h3>
              {address ? <p className="text-sm leading-relaxed text-muted-foreground">{address}</p> : null}
            </div>

            <a
              href={mapUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 border border-border/60 px-5 py-3 text-xs uppercase tracking-[0.22em] text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <MapPin className="h-4 w-4" />
              Open Map
            </a>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectMap;
