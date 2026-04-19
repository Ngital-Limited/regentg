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
    slug: "regent-video-1",
    title: "Regent Design & Development — Featured Film",
    description:
      "An inside look at Regent Design & Development Ltd — our craftsmanship, our projects, and the people who make it all possible.",
    category: "Corporate",
    date: "2025",
    duration: "Watch",
    youtubeId: "N3_4QtpgoZs",
  },
  {
    slug: "regent-video-2",
    title: "Regent Project Showcase",
    description:
      "A cinematic walkthrough of one of Regent's signature residential developments — premium finishes, modern architecture, and timeless design.",
    category: "Project Tour",
    date: "2025",
    duration: "Watch",
    youtubeId: "hTBz-qYPpv8",
  },
  {
    slug: "regent-video-3",
    title: "Regent Residences — Living Experience",
    description:
      "Discover what life looks like inside a Regent residence — thoughtful spaces, refined details, and a community designed for excellence.",
    category: "Project Tour",
    date: "2025",
    duration: "Watch",
    youtubeId: "PDmXtaDEyeY",
  },
  {
    slug: "regent-video-4",
    title: "Behind the Build — Regent Construction",
    description:
      "A behind-the-scenes look at Regent's commitment to quality construction, structural integrity, and uncompromising standards.",
    category: "Corporate",
    date: "2025",
    duration: "Watch",
    youtubeId: "kRc6_3ULswU",
  },
  {
    slug: "regent-video-5",
    title: "Regent Event Highlights",
    description:
      "Highlights from a recent Regent event — celebrating partnerships, milestones, and the people who shape our journey.",
    category: "Events",
    date: "2025",
    duration: "Watch",
    youtubeId: "P30w9mcemXo",
  },
  {
    slug: "regent-video-6",
    title: "Regent Design Vision",
    description:
      "Explore the design philosophy behind every Regent project — where heritage, modernity, and sustainability meet.",
    category: "Corporate",
    date: "2025",
    duration: "Watch",
    youtubeId: "NXvtkQ-1xoM",
  },
];

export const getVideoThumbnail = (id: string) => ytThumb(id);
