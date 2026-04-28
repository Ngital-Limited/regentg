# Replace Google Maps with Leaflet in Project Detail Map

## Context

The homepage `MapSection.tsx` already uses **Leaflet** (free, OpenStreetMap-based) — no change needed there.

The actual paid Google Maps usage is in `src/components/ProjectMap.tsx`, used on every project detail page (`/projects/:slug`). It currently embeds a Google Maps iframe (`google.com/maps?...&output=embed`) and links out to Google Maps.

## Goal

Replace the Google Maps iframe with a Leaflet map for a single project pin, keeping the **exact same outer design**: same card frame, aspect ratio, dark gradient overlay, footer with location label and external link button.

## Changes

### `src/components/ProjectMap.tsx`

1. Remove the `<iframe>` Google Maps embed.
2. Replace with a Leaflet map matching the homepage style:
   - Tile layer: `https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png` (same dark CARTO basemap as homepage — free).
   - Centered on `[lat, lng]`, zoom 16.
   - `scrollWheelZoom: false` (consistent with homepage), zoom controls enabled.
   - Single custom SVG pin marker in brand primary color (`hsl(194, 89%, 57%)`), matching the homepage marker style.
   - Tooltip on the marker showing `projectName`.
3. Initialize map with `useEffect` + `useRef` (same pattern as `MapSection.tsx`); cleanup on unmount.
4. Keep the existing dark gradient overlay (`pointer-events-none`) on top of the map for brand cohesion.
5. Keep the footer row unchanged: MapPin icon, project name, address, and the "Open in Google Maps" external link button (this is just a free outbound link — not a paid API call, safe to keep so users can get directions). If preferred, we can switch the link to OpenStreetMap (`https://www.openstreetmap.org/?mlat=...&mlon=...#map=17/...`) — see open question.
6. Import `"leaflet/dist/leaflet.css"` (already used elsewhere, dependency present).

### Files touched
- `src/components/ProjectMap.tsx` — rewrite map rendering, keep wrapper/footer markup.

### Files NOT changed
- `src/components/home/MapSection.tsx` — already Leaflet.
- `src/pages/ProjectDetail.tsx` — `ProjectMap` props/API stay identical (`lat`, `lng`, `projectName`, `address`).

## Open question

The "Open in Google Maps" button at the bottom is just an outbound link (no API key, no billing). Keep it, or replace with an "Open in OpenStreetMap" link to fully remove Google branding?
