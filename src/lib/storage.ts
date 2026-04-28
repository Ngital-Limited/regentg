import { supabase } from "@/integrations/supabase/client";

export const publicUrl = (bucket: string, path?: string | null) => {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
};

export const projectImageUrl = (path?: string | null) =>
  publicUrl("project-images", path);

export const blogImageUrl = (path?: string | null) =>
  publicUrl("blog-images", path);

export const brochureUrl = (path?: string | null) =>
  publicUrl("brochures", path);
