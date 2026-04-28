/**
 * CMS Content Loader
 *
 * Loads Markdown files from /content/ at build time using Vite's import.meta.glob.
 * All content is statically bundled — no runtime fetching, no API calls.
 *
 * When the Decap CMS commits a change, Hostinger Horizons rebuilds the site
 * and the new content is bundled into the static output.
 */
import matter from "gray-matter";

export type Frontmatter = Record<string, unknown>;

export interface ContentEntry<T = Frontmatter> {
  slug: string;
  data: T;
  body: string;
}

/**
 * Load + parse a glob of Markdown files.
 * Vite's import.meta.glob with { query: '?raw', eager: true } gives us
 * the raw file contents at build time as strings.
 */
function loadCollection<T>(
  modules: Record<string, string>,
): ContentEntry<T>[] {
  return Object.entries(modules)
    .map(([path, raw]) => {
      const slug = path.split("/").pop()!.replace(/\.md$/, "");
      const parsed = matter(raw);
      return {
        slug,
        data: parsed.data as T,
        body: parsed.content.trim(),
      };
    })
    .sort((a, b) => {
      // Sort by date desc if a date field exists, else alphabetical
      const da = (a.data as any).date;
      const db = (b.data as any).date;
      if (da && db) return new Date(db).getTime() - new Date(da).getTime();
      return a.slug.localeCompare(b.slug);
    });
}

// ---------- Blog ----------
export interface BlogFrontmatter {
  title: string;
  date: string;
  category: string;
  author: string;
  readTime: string;
  excerpt: string;
  image: string;
}
const blogFiles = import.meta.glob("/content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;
export const blogPosts = loadCollection<BlogFrontmatter>(blogFiles);

// ---------- News ----------
export interface NewsFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  image?: string;
}
const newsFiles = import.meta.glob("/content/news/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;
export const newsItems = loadCollection<NewsFrontmatter>(newsFiles);

// ---------- Videos ----------
export interface VideoFrontmatter {
  title: string;
  description: string;
  category: string;
  date: string;
  duration: string;
  youtubeId: string;
}
const videoFiles = import.meta.glob("/content/videos/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;
export const videos = loadCollection<VideoFrontmatter>(videoFiles);

// ---------- Projects ----------
export interface ProjectGlance {
  icon: string;
  label: string;
  value: string;
}
export interface ProjectProgress {
  label: string;
  value: number;
}
export interface ProjectFrontmatter {
  name: string;
  tagline?: string;
  status: "ongoing" | "completed" | "upcoming";
  type?: string;
  location: string;
  size?: string;
  bedrooms?: string;
  image?: string;
  heroImage?: string;
  brochureUrl?: string;
  date?: string;
  lat?: number;
  lng?: number;
  features?: string[];
  glance?: ProjectGlance[];
  progress?: ProjectProgress[];
  gallery?: string[];
}
const projectFiles = import.meta.glob("/content/projects/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;
export const projects = loadCollection<ProjectFrontmatter>(projectFiles);

// ---------- Settings (single file) ----------
export interface SiteSettings {
  companyName: string;
  hotline: string;
  hotlineHref: string;
  email: string;
  address: string;
  officeHours: string;
  website: string;
  mapEmbedUrl: string;
  social: {
    facebook?: string;
    youtube?: string;
    linkedin?: string;
    instagram?: string;
  };
}
import settingsRaw from "/content/settings.json";
export const settings: SiteSettings = settingsRaw as SiteSettings;
