
-- ============ PROJECTS: add CMS fields ============
ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS cover_image_path text,
  ADD COLUMN IF NOT EXISTS gallery_paths text[] DEFAULT '{}'::text[],
  ADD COLUMN IF NOT EXISTS description text,
  ADD COLUMN IF NOT EXISTS short_description text,
  ADD COLUMN IF NOT EXISTS units integer,
  ADD COLUMN IF NOT EXISTS floors integer,
  ADD COLUMN IF NOT EXISTS area_sqft numeric,
  ADD COLUMN IF NOT EXISTS handover_date date,
  ADD COLUMN IF NOT EXISTS amenities text[] DEFAULT '{}'::text[],
  ADD COLUMN IF NOT EXISTS latitude numeric,
  ADD COLUMN IF NOT EXISTS longitude numeric;

-- ============ BLOG: categories ============
CREATE TABLE IF NOT EXISTS public.blog_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER blog_categories_updated_at
BEFORE UPDATE ON public.blog_categories
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are publicly viewable"
ON public.blog_categories FOR SELECT
TO public USING (true);

CREATE POLICY "Admins can manage categories"
ON public.blog_categories FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- ============ BLOG: tags ============
CREATE TABLE IF NOT EXISTS public.blog_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tags are publicly viewable"
ON public.blog_tags FOR SELECT
TO public USING (true);

CREATE POLICY "Admins can manage tags"
ON public.blog_tags FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- ============ BLOG: posts ============
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  excerpt text,
  body text,
  cover_image_path text,
  category_id uuid REFERENCES public.blog_categories(id) ON DELETE SET NULL,
  author_name text,
  author_avatar_path text,
  meta_title text,
  meta_description text,
  og_image_path text,
  is_published boolean NOT NULL DEFAULT false,
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS blog_posts_published_idx
  ON public.blog_posts (is_published, published_at DESC);

CREATE TRIGGER blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published posts are publicly viewable"
ON public.blog_posts FOR SELECT
TO public
USING (is_published = true AND (published_at IS NULL OR published_at <= now()));

CREATE POLICY "Admins can view all posts"
ON public.blog_posts FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage posts"
ON public.blog_posts FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- ============ BLOG: post <-> tag link ============
CREATE TABLE IF NOT EXISTS public.blog_post_tags (
  post_id uuid NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  tag_id uuid NOT NULL REFERENCES public.blog_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

ALTER TABLE public.blog_post_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Post tags publicly viewable for published posts"
ON public.blog_post_tags FOR SELECT
TO public
USING (EXISTS (
  SELECT 1 FROM public.blog_posts p
  WHERE p.id = post_id
    AND p.is_published = true
    AND (p.published_at IS NULL OR p.published_at <= now())
));

CREATE POLICY "Admins can manage post tags"
ON public.blog_post_tags FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- ============ SITE SETTINGS (homepage editable text) ============
CREATE TABLE IF NOT EXISTS public.site_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  description text,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Site settings are publicly viewable"
ON public.site_settings FOR SELECT
TO public USING (true);

CREATE POLICY "Admins can manage site settings"
ON public.site_settings FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Seed default homepage settings
INSERT INTO public.site_settings (key, value, description) VALUES
  ('hero', '{"headline":"Crafting Iconic Living Spaces","subheadline":"Premium real estate development across Bangladesh","cta_label":"Explore Projects"}'::jsonb, 'Homepage hero section'),
  ('about', '{"title":"About Regent","body":"Regent Design & Development Ltd. is a leading real estate developer committed to architectural excellence and customer trust."}'::jsonb, 'Homepage about section'),
  ('stats', '{"projects_completed":"14","years_experience":"15","happy_families":"500","ongoing_projects":"6"}'::jsonb, 'Homepage statistics')
ON CONFLICT (key) DO NOTHING;

-- ============ STORAGE BUCKETS ============
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies: public read, admin write
CREATE POLICY "Project images publicly readable"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'project-images');

CREATE POLICY "Admins can upload project images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'project-images' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update project images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'project-images' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete project images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'project-images' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Blog images publicly readable"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'blog-images');

CREATE POLICY "Admins can upload blog images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'blog-images' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update blog images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'blog-images' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete blog images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'blog-images' AND has_role(auth.uid(), 'admin'::app_role));
