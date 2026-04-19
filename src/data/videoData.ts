export interface Video {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  duration: string;
  youtubeId: string;
}

const ytThumb = (id: string) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;

export const videos: Video[] = [
  {
    slug: "regent-grand-heritage-tour",
    title: "Regent Grand Heritage — Project Walkthrough",
    description:
      "Take an immersive walkthrough of Regent Grand Heritage, our flagship luxury residential development showcasing premium finishes, modern amenities, and timeless architecture.",
    category: "Project Tour",
    date: "March 2026",
    duration: "3:42",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    slug: "regent-corporate-profile",
    title: "Regent Design & Development — Corporate Profile",
    description:
      "Discover the story, vision, and craftsmanship behind one of Bangladesh's most trusted real estate developers.",
    category: "Corporate",
    date: "February 2026",
    duration: "4:15",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    slug: "rehab-fair-2024-highlights",
    title: "REHAB Fair 2024 — Event Highlights",
    description:
      "Highlights from our participation at the REHAB Fair 2024, where we showcased our latest projects to thousands of visitors.",
    category: "Events",
    date: "December 2024",
    duration: "2:08",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    slug: "client-testimonials-2025",
    title: "Client Testimonials — Living the Regent Experience",
    description:
      "Hear directly from Regent homeowners about their experience choosing and living in a Regent residence.",
    category: "Testimonials",
    date: "November 2025",
    duration: "5:21",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    slug: "sustainability-commitment",
    title: "Our Commitment to Sustainable Development",
    description:
      "Learn how Regent integrates eco-friendly materials, energy-efficient systems, and green spaces across every project.",
    category: "Sustainability",
    date: "October 2025",
    duration: "3:30",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    slug: "gulshan-luxury-residences-launch",
    title: "Gulshan Luxury Residences — Launch Event",
    description:
      "A glimpse into the grand launch of our Gulshan Luxury Residences, attended by industry leaders and esteemed guests.",
    category: "Events",
    date: "September 2025",
    duration: "2:55",
    youtubeId: "dQw4w9WgXcQ",
  },
];

export const getVideoThumbnail = (id: string) => ytThumb(id);
