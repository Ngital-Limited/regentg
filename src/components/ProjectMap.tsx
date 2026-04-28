import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MapPin, ExternalLink } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface ProjectMapProps {
  lat: number;
  lng: number;
  projectName: string;
  address?: string;
}

const ProjectMap = ({ lat, lng, projectName, address }: ProjectMapProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  // Outbound link to Google Maps (no API key required, universally accessible)
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [lat, lng],
      zoom: 16,
      scrollWheelZoom: false,
      zoomControl: true,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
    }).addTo(map);

    const pinColor = "hsl(194, 89%, 57%)";
    const icon = L.divIcon({
      className: "",
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
      html: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="${pinColor}" stroke="hsl(0,0%,8%)" stroke-width="1.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3" fill="hsl(0,0%,8%)" stroke="none"/></svg>`,
    });

    L.marker([lat, lng], { icon, title: projectName })
      .bindTooltip(projectName, {
        direction: "top",
        offset: [0, -32],
        className: "leaflet-tooltip-custom",
        permanent: false,
      })
      .addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [lat, lng, projectName]);

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
          <div ref={containerRef} className="absolute inset-0 h-full w-full z-10" />
          {/* Subtle dark overlay for brand cohesion (non-interactive) */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent z-[400]" />
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
