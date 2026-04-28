
-- Videos table
CREATE TABLE public.videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  youtube_id TEXT NOT NULL,
  description TEXT,
  category TEXT,
  cover_image_path TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  published_at TIMESTAMPTZ DEFAULT now(),
  meta_title TEXT,
  meta_description TEXT,
  og_image_path TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published videos are publicly viewable"
  ON public.videos FOR SELECT
  TO public
  USING (is_published = true);

CREATE POLICY "Admins can view all videos"
  ON public.videos FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage videos"
  ON public.videos FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER videos_set_updated_at
  BEFORE UPDATE ON public.videos
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

-- Extend projects
ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS bedrooms TEXT,
  ADD COLUMN IF NOT EXISTS facing TEXT,
  ADD COLUMN IF NOT EXISTS structural_designer TEXT,
  ADD COLUMN IF NOT EXISTS features TEXT[] DEFAULT '{}'::text[],
  ADD COLUMN IF NOT EXISTS progress_items JSONB DEFAULT '[]'::jsonb;
