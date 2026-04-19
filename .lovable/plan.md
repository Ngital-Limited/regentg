
## Plan: Add a Videos page

I'll mirror the existing Blog pattern (data file + listing page + detail page) so the Videos section feels native to the site.

### 1. Data layer — `src/data/videoData.ts`
A typed list of videos:
```ts
export interface Video {
  slug: string;
  title: string;
  description: string;
  category: string;        // e.g. "Project Tour", "Corporate", "Event"
  date: string;
  duration: string;        // "2:45"
  thumbnail: string;       // poster image
  source: "youtube" | "vimeo" | "file";
  videoId?: string;        // for YouTube/Vimeo
  videoUrl?: string;       // for self-hosted MP4
}
```
Seed with a few placeholder entries (you can replace with your real videos after).

### 2. Listing page — `src/pages/Videos.tsx`
- Same hero treatment as Blog ("MEDIA / VIDEOS")
- Featured video on top (large player thumbnail with play overlay)
- Grid of remaining videos (3 cols desktop, 1 col mobile) with thumbnail + play icon overlay, category chip, title, duration
- Optional category filter chips (Project Tour, Corporate, Events)
- Click → navigate to `/videos/:slug`

### 3. Detail page — `src/pages/VideoDetail.tsx`
- Embedded player (YouTube/Vimeo iframe, or `<video>` for MP4) — responsive 16:9
- Title, date, category, description below
- "Related Videos" grid (3 others) at bottom
- BreadcrumbList + VideoObject JSON-LD via `SEO` for rich results

### 4. Routing — `src/components/AnimatedRoutes.tsx`
Add:
```tsx
<Route path="/videos" element={<PageTransition><Videos /></PageTransition>} />
<Route path="/videos/:slug" element={<PageTransition><VideoDetail /></PageTransition>} />
```

### 5. Navigation — `src/components/Navbar.tsx`
Insert `{ label: "Videos", path: "/videos" }` between **Blog** and **Sustainability**.

### 6. SEO — `public/sitemap.xml`
Add `/videos` and each `/videos/<slug>` URL.

### Open question
How do you want to host the videos?
- **YouTube/Vimeo embeds** (recommended — fast, no bandwidth cost, autoplay-friendly)
- **Self-hosted MP4** (uploaded to project / cloud — heavier, but no third-party branding)
- **Mix of both** (the data model above already supports this)

If you confirm the hosting choice and share video URLs/IDs + thumbnails, I'll wire them in directly. Otherwise I'll scaffold with placeholders that you can swap.
