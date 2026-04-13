import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import L from "leaflet";
import SectionHeading from "../SectionHeading";
import { projectLocations } from "@/data/projectLocations";
import "leaflet/dist/leaflet.css";

const MapSection = () => {
  const [filter, setFilter] = useState<"all" | "ongoing" | "completed">("all");
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);

  const filtered = projectLocations.filter(
    (p) => filter === "all" || p.status === filter
  );

  // Initialize map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [23.805, 90.405],
      zoom: 12,
      scrollWheelZoom: false,
      zoomControl: true,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
    }).addTo(map);

    markersRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update markers when filter changes
  useEffect(() => {
    if (!markersRef.current) return;
    markersRef.current.clearLayers();

    filtered.forEach((project) => {
      const color = project.status === "ongoing" ? "hsl(194, 89%, 57%)" : "hsl(142, 71%, 45%)";
      const icon = L.divIcon({
        className: "",
        iconSize: [28, 28],
        iconAnchor: [14, 28],
        popupAnchor: [0, -28],
        html: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="${color}" stroke="hsl(0,0%,8%)" stroke-width="1.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3" fill="hsl(0,0%,8%)" stroke="none"/></svg>`,
      });

      const statusBadge = project.status === "ongoing"
        ? '<span style="background:#0e7490;color:#cffafe;padding:1px 6px;border-radius:9px;font-size:10px;text-transform:uppercase;letter-spacing:0.05em;">ongoing</span>'
        : '<span style="background:#166534;color:#dcfce7;padding:1px 6px;border-radius:9px;font-size:10px;text-transform:uppercase;letter-spacing:0.05em;">completed</span>';

      const popup = `
        <div style="font-family:Inter,sans-serif;min-width:160px;">
          <p style="font-weight:600;font-size:13px;margin:0 0 2px;">${project.name}</p>
          <p style="color:#666;font-size:11px;margin:0 0 4px;">${project.location}</p>
          ${statusBadge}
          <a href="/projects/${project.slug}" style="display:block;margin-top:6px;color:#0891b2;font-size:11px;text-decoration:none;">View Project →</a>
        </div>
      `;

      const marker = L.marker([project.lat, project.lng], { icon, title: project.name })
        .bindPopup(popup)
        .bindTooltip(project.name, { direction: "top", offset: [0, -28], className: "leaflet-tooltip-custom" })
        .addTo(markersRef.current!);

      marker.on("click", () => {
        marker.openPopup();
      });

      // Make popup link work with React Router
      marker.on("popupopen", () => {
        const popupEl = marker.getPopup()?.getElement();
        const link = popupEl?.querySelector("a[href]") as HTMLAnchorElement | null;
        if (link) {
          link.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.href = link.getAttribute("href") || "";
          });
        }
      });
    });
  }, [filter]);

  return (
    <section className="section-padding bg-background">
      <div className="container-regent">
        <SectionHeading
          subtitle="Find Us"
          title="PROJECT LOCATIONS"
          description={`Explore our ${projectLocations.length} projects across prime areas of Dhaka.`}
        />

        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8">
          {(["all", "ongoing", "completed"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 md:px-5 py-2 text-[9px] md:text-[10px] uppercase tracking-[0.15em] md:tracking-[0.2em] border transition-all ${
                filter === f
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/40"
              }`}
            >
              {f === "all"
                ? `All (${projectLocations.length})`
                : `${f} (${projectLocations.filter((p) => p.status === f).length})`}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full h-[350px] md:h-[550px] relative border-t border-b border-border">
        <div ref={containerRef} className="h-full w-full z-10" />
        <div className="absolute bottom-3 md:bottom-6 right-3 md:right-6 z-20 bg-background/90 backdrop-blur-sm border border-border px-3 md:px-4 py-2 md:py-3 flex flex-col gap-1.5 md:gap-2">
          <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-0.5 md:mb-1">Legend</p>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full" style={{ backgroundColor: "hsl(194, 89%, 57%)" }} />
            <span className="text-[10px] md:text-[11px] text-foreground">Ongoing</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full" style={{ backgroundColor: "hsl(142, 71%, 45%)" }} />
            <span className="text-[10px] md:text-[11px] text-foreground">Completed</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
