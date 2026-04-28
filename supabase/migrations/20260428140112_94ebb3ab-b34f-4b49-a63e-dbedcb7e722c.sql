
-- Add SEO fields to projects
ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS meta_title text,
  ADD COLUMN IF NOT EXISTS meta_description text,
  ADD COLUMN IF NOT EXISTS og_image_path text;

-- Page SEO for static routes (home, about, projects index, blog index, contact, career, etc.)
CREATE TABLE IF NOT EXISTS public.page_seo (
  path text PRIMARY KEY,
  label text NOT NULL,
  meta_title text,
  meta_description text,
  og_image_path text,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER page_seo_updated_at
BEFORE UPDATE ON public.page_seo
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.page_seo ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Page SEO is publicly viewable"
ON public.page_seo FOR SELECT TO public USING (true);

CREATE POLICY "Admins can manage page SEO"
ON public.page_seo FOR ALL TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Seed default rows for known static pages
INSERT INTO public.page_seo (path, label, meta_title, meta_description) VALUES
  ('/', 'Home', 'Regent Design & Development Ltd | Premium Real Estate in Bangladesh', 'Premium real estate developer in Bangladesh delivering luxury residential and commercial projects with architectural excellence.'),
  ('/about', 'About', 'About Regent Design & Development Ltd', 'Learn about Regent Design & Development Ltd — a leading Bangladeshi real estate developer committed to architectural excellence and customer trust.'),
  ('/projects', 'Projects', 'Our Projects | Regent Design & Development Ltd', 'Explore our portfolio of luxury residential and commercial real estate projects across Bangladesh.'),
  ('/blog', 'Blog', 'Insights & News | Regent Design & Development Ltd', 'News, insights, and updates from Regent Design & Development Ltd.'),
  ('/news', 'News', 'News | Regent Design & Development Ltd', 'Latest news and announcements from Regent Design & Development Ltd.'),
  ('/contact', 'Contact', 'Contact Us | Regent Design & Development Ltd', 'Get in touch with Regent Design & Development Ltd for inquiries about our projects, careers, or partnerships.'),
  ('/career', 'Career', 'Careers | Regent Design & Development Ltd', 'Join our team. Explore career opportunities at Regent Design & Development Ltd.'),
  ('/leaders', 'Leaders', 'Our Leadership | Regent Design & Development Ltd', 'Meet the leadership team behind Regent Design & Development Ltd.'),
  ('/our-clients', 'Our Clients', 'Our Clients | Regent Design & Development Ltd', 'The clients and partners who have trusted Regent Design & Development Ltd.'),
  ('/our-landowners', 'Our Landowners', 'Our Landowners | Regent Design & Development Ltd', 'The landowners who have partnered with Regent Design & Development Ltd.'),
  ('/videos', 'Videos', 'Videos | Regent Design & Development Ltd', 'Video gallery showcasing our projects and company.')
ON CONFLICT (path) DO NOTHING;
