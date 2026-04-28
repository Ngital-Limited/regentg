-- =========================================================================
-- PHASE 1: Lead capture foundation
-- =========================================================================

-- 1. Roles enum + user_roles table + has_role() function
-- =========================================================================
CREATE TYPE public.app_role AS ENUM ('admin', 'team');

CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security-definer function to safely check roles inside RLS policies
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
  ON public.user_roles FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 2. Shared lead_status enum + updated_at trigger function
-- =========================================================================
CREATE TYPE public.lead_status AS ENUM ('new', 'contacted', 'closed');

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- 3. Projects table (drives brochure form + project listings)
-- =========================================================================
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  location TEXT,
  status TEXT,
  brochure_path TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active projects are publicly viewable"
  ON public.projects FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can view all projects"
  ON public.projects FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage projects"
  ON public.projects FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER projects_set_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 4. contact_submissions
-- =========================================================================
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  status public.lead_status NOT NULL DEFAULT 'new',
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form"
  ON public.contact_submissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view contact submissions"
  ON public.contact_submissions FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update contact submissions"
  ON public.contact_submissions FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete contact submissions"
  ON public.contact_submissions FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER contact_submissions_set_updated_at
  BEFORE UPDATE ON public.contact_submissions
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX idx_contact_submissions_created_at ON public.contact_submissions (created_at DESC);
CREATE INDEX idx_contact_submissions_status ON public.contact_submissions (status);

-- 5. visit_bookings
-- =========================================================================
CREATE TABLE public.visit_bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  project_name TEXT NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time TEXT NOT NULL,
  notes TEXT,
  status public.lead_status NOT NULL DEFAULT 'new',
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.visit_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can request a visit"
  ON public.visit_bookings FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view visit bookings"
  ON public.visit_bookings FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update visit bookings"
  ON public.visit_bookings FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete visit bookings"
  ON public.visit_bookings FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER visit_bookings_set_updated_at
  BEFORE UPDATE ON public.visit_bookings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX idx_visit_bookings_created_at ON public.visit_bookings (created_at DESC);
CREATE INDEX idx_visit_bookings_status ON public.visit_bookings (status);
CREATE INDEX idx_visit_bookings_preferred_date ON public.visit_bookings (preferred_date);

-- 6. brochure_leads
-- =========================================================================
CREATE TABLE public.brochure_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  project_name TEXT NOT NULL,
  status public.lead_status NOT NULL DEFAULT 'new',
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.brochure_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can request a brochure"
  ON public.brochure_leads FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view brochure leads"
  ON public.brochure_leads FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update brochure leads"
  ON public.brochure_leads FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete brochure leads"
  ON public.brochure_leads FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER brochure_leads_set_updated_at
  BEFORE UPDATE ON public.brochure_leads
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX idx_brochure_leads_created_at ON public.brochure_leads (created_at DESC);
CREATE INDEX idx_brochure_leads_status ON public.brochure_leads (status);

-- 7. job_applications
-- =========================================================================
CREATE TABLE public.job_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  position TEXT NOT NULL,
  cover_letter TEXT,
  cv_path TEXT NOT NULL,
  cv_filename TEXT,
  status public.lead_status NOT NULL DEFAULT 'new',
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a job application"
  ON public.job_applications FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view job applications"
  ON public.job_applications FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update job applications"
  ON public.job_applications FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete job applications"
  ON public.job_applications FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER job_applications_set_updated_at
  BEFORE UPDATE ON public.job_applications
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX idx_job_applications_created_at ON public.job_applications (created_at DESC);
CREATE INDEX idx_job_applications_status ON public.job_applications (status);

-- 8. Storage buckets
-- =========================================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('brochures', 'brochures', true, 26214400, ARRAY['application/pdf']::text[]),
  ('cvs', 'cvs', false, 5242880, ARRAY['application/pdf']::text[]);

-- Brochures bucket: public read, admin-only write
CREATE POLICY "Brochures are publicly readable"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'brochures');

CREATE POLICY "Admins can upload brochures"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'brochures' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update brochures"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'brochures' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete brochures"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'brochures' AND public.has_role(auth.uid(), 'admin'));

-- CVs bucket: anyone can upload (applicants), only admins can read/manage
CREATE POLICY "Anyone can upload a CV"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'cvs');

CREATE POLICY "Admins can view CVs"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'cvs' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete CVs"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'cvs' AND public.has_role(auth.uid(), 'admin'));

-- 9. Seed initial projects (existing Regent projects)
-- =========================================================================
INSERT INTO public.projects (slug, name, location, status, display_order) VALUES
  ('regent-sapphire',       'Regent Sapphire',       'Dhaka', 'Ongoing',   1),
  ('regent-tara',           'Regent Tara',           'Dhaka', 'Ongoing',   2),
  ('regent-palace',         'Regent Palace',         'Dhaka', 'Completed', 3),
  ('regent-east-castle',    'Regent East Castle',    'Dhaka', 'Completed', 4),
  ('regent-east-queen',     'Regent East Queen',     'Dhaka', 'Completed', 5),
  ('regent-islam',          'Regent Islam',          'Dhaka', 'Completed', 6),
  ('regent-parbata-grand',  'Regent Parbata Grand',  'Dhaka', 'Completed', 7),
  ('regent-south-lake',     'Regent South Lake',     'Dhaka', 'Completed', 8),
  ('regent-spring-field',   'Regent Spring Field',   'Dhaka', 'Completed', 9),
  ('regent-sufia',          'Regent Sufia',          'Dhaka', 'Completed', 10),
  ('regent-hasina',         'Regent Hasina',         'Dhaka', 'Completed', 11),
  ('regent-jannat',         'Regent Jannat',         'Dhaka', 'Completed', 12),
  ('regent-grand-heritage', 'Regent Grand Heritage', 'Dhaka', 'Completed', 13),
  ('regent-springdale',     'Regent Springdale',     'Dhaka', 'Completed', 14);
