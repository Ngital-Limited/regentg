export interface Video {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  duration: string;
  thumbnail: string;
  source: "youtube" | "vimeo" | "file";
  videoId?: string;
  videoUrl?: string;
}

// Helper to build YouTube thumbnail
const yt = (id: string) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

export const videos: Video[] = [
  {
    slug: "regent-grand-heritage-walkthrough",
    title: "Regent Grand Heritage — Project Walkthrough",
    description:
      "Step inside Regent Grand Heritage and explore the architecture, premium finishes, and lifestyle amenities that define this signature development.",
    category: "Project Tour",
    date: "March 5, 2026",
    duration: "3:42",
    thumbnail: yt("dQw4w9WgXcQ"),
    source: "youtube",
    videoId: "dQw4w9WgXcQ",
  },
  {
    slug: "regent-corporate-overview-2026",
    title: "Regent Design & Development — Corporate Overview 2026",
    description:
      "A look at four decades of crafting iconic residences across Dhaka, our values, and the journey ahead.",
    category: "Corporate",
    date: "February 18, 2026",
    duration: "4:18",
    thumbnail: yt("dQw4w9WgXcQ"),
    source: "youtube",
    videoId: "dQw4w9WgXcQ",
  },
  {
    slug: "regent-sapphire-aerial-tour",
    title: "Regent Sapphire — Aerial Tour",
    description:
      "An aerial cinematic tour of Regent Sapphire and its prime location in the heart of Dhaka.",
    category: "Project Tour",
    date: "January 22, 2026",
    duration: "2:55",
    thumbnail: yt("dQw4w9WgXcQ"),
    source: "youtube",
    videoId: "dQw4w9WgXcQ",
  },
  {
    slug: "ground-breaking-regent-palace",
    title: "Ground Breaking Ceremony — Regent Palace",
    description:
      "Highlights from the ground breaking ceremony of Regent Palace, attended by landowners, partners, and the Regent leadership team.",
    category: "Event",
    date: "December 12, 2025",
    duration: "5:10",
    thumbnail: yt("dQw4w9WgXcQ"),
    source: "youtube",
    videoId: "dQw4w9WgXcQ",
  },
  {
    slug: "regent-spring-dale-launch",
    title: "Regent Spring Dale — Launch Film",
    description:
      "The launch film for Regent Spring Dale, capturing the vision behind the project and its lifestyle promise.",
    category: "Project Tour",
    date: "November 8, 2025",
    duration: "2:20",
    thumbnail: yt("dQw4w9WgXcQ"),
    source: "youtube",
    videoId: "dQw4w9WgXcQ",
  },
  {
    slug: "rehab-fair-2025-highlights",
    title: "REHAB Fair 2025 — Regent Pavilion Highlights",
    description:
      "Highlights from the Regent pavilion at REHAB Fair 2025, including visitor walkthroughs and partner conversations.",
    category: "Event",
    date: "October 14, 2025",
    duration: "3:30",
    thumbnail: yt("dQw4w9WgXcQ"),
    source: "youtube",
    videoId: "dQw4w9WgXcQ",
  },
];
