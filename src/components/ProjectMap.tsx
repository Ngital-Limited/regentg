import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";

// Custom animated marker icon
const createPulsingIcon = () => {
  return L.divIcon({
    className: "",
    html: `
      <div style="position:relative;width:40px;height:40px;">
        <div style="position:absolute;inset:0;border-radius:50%;background:hsl(194 89% 60% / 0.2);animation:pulse-ring 2s cubic-bezier(0.4,0,0.6,1) infinite;"></div>
        <div style="position:absolute;inset:8px;border-radius:50%;background:hsl(194 89% 60% / 0.3);animation:pulse-ring 2s cubic-bezier(0.4,0,0.6,1) infinite 0.3s;"></div>
        <div style="position:absolute;inset:14px;border-radius:50%;background:hsl(194 89% 60%);box-shadow:0 0 12px hsl(194 89% 60% / 0.6);"></div>
      </div>
      <style>
        @keyframes pulse-ring {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.4; }
        }
      </style>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
  });
};

// Animate map fly-in
const FlyToLocation = ({ lat, lng }: { lat: number; lng: number }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], 15, { duration: 2.5 });
  }, [lat, lng, map]);
  return null;
};

interface ProjectMapProps {
  lat: number;
  lng: number;
  projectName: string;
  address?: string;
}

const ProjectMap = ({ lat, lng, projectName, address }: ProjectMapProps) => {
  const icon = useRef(createPulsingIcon());

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full h-[450px] rounded-sm overflow-hidden border border-border/30"
      style={{ isolation: "isolate" }}
    >
      <MapContainer
        center={[lat, lng]}
        zoom={12}
        scrollWheelZoom={false}
        className="w-full h-full z-0"
        zoomControl={false}
        attributionControl={false}
        style={{ background: "hsl(0 0% 5%)" }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />
        <Marker position={[lat, lng]} icon={icon.current}>
          <Popup className="custom-popup">
            <div style={{ color: "#e2e8f0", fontSize: "13px", lineHeight: "1.5" }}>
              <strong style={{ color: "#3EC9F3", fontSize: "14px" }}>{projectName}</strong>
              {address && <div style={{ marginTop: "4px", opacity: 0.8 }}>{address}</div>}
            </div>
          </Popup>
        </Marker>
        <FlyToLocation lat={lat} lng={lng} />
      </MapContainer>
    </motion.div>
  );
};

export default ProjectMap;
