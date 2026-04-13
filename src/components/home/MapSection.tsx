import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import SectionHeading from "../SectionHeading";
import { projectLocations } from "@/data/projectLocations";
import "leaflet/dist/leaflet.css";

// Custom marker icons
const createIcon = (color: string) =>
  L.divIcon({
    className: "",
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28],
    html: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="${color}" stroke="hsl(0 0% 8%)" stroke-width="1.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3" fill="hsl(0 0% 8%)" stroke="none"/></svg>`,
  });

const ongoingIcon = createIcon("hsl(194 89% 57%)");
const completedIcon = createIcon("hsl(142 71% 45%)");

const MapSection = () => {
  const [filter, setFilter] = useState<"all" | "ongoing" | "completed">("all");

  const filtered = projectLocations.filter(
    (p) => filter === "all" || p.status === filter
  );

  const center: [number, number] = [23.8050, 90.4050];

  return (
    <section className="section-padding bg-background">
      <div className="container-regent">
        <SectionHeading
          subtitle="Find Us"
          title="PROJECT LOCATIONS"
          description={`Explore our ${projectLocations.length} projects across prime areas of Dhaka.`}
        />

        {/* Filter tabs */}
        <div className="flex justify-center gap-3 mb-8">
          {(["all", "ongoing", "completed"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 text-[10px] uppercase tracking-[0.2em] border transition-all ${
                filter === f
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/40"
              }`}
            >
              {f === "all" ? `All (${projectLocations.length})` : `${f} (${projectLocations.filter((p) => p.status === f).length})`}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full h-[550px] relative border-t border-b border-border">
        <MapContainer
          center={center}
          zoom={12}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
          className="z-10"
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          {filtered.map((project) => (
            <Marker
              key={project.slug}
              position={[project.lat, project.lng]}
              icon={project.status === "ongoing" ? ongoingIcon : completedIcon}
            >
              <Popup>
                <div className="text-xs min-w-[160px]">
                  <p className="font-semibold text-sm text-gray-900">{project.name}</p>
                  <p className="text-gray-600 mt-0.5">{project.location}</p>
                  <span
                    className={`inline-block mt-1 px-2 py-0.5 text-[10px] uppercase tracking-wider rounded-full ${
                      project.status === "ongoing"
                        ? "bg-cyan-100 text-cyan-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {project.status}
                  </span>
                  <Link
                    to={`/projects/${project.slug}`}
                    className="block mt-2 text-cyan-600 hover:underline text-[11px]"
                  >
                    View Project →
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
};

export default MapSection;
