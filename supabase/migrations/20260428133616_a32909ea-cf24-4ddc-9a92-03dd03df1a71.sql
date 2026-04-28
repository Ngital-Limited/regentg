-- =========================================================================
-- PHASE 1.1: Security hardening
-- =========================================================================

-- 1. Lock down has_role() execution
-- The function is SECURITY DEFINER and only meant to be invoked from inside
-- RLS policies (where the policy itself runs as superuser). Revoke EXECUTE
-- from public/anon/authenticated so it cannot be called from a client.
-- =========================================================================
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM anon;
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM authenticated;

-- 2. Restrict listing on the public 'brochures' bucket
-- Drop the previous unrestricted SELECT and replace it with two scoped rules:
--   - Anyone may SELECT a specific object (needed for direct downloads via URL)
--     but the storage list endpoint requires SELECT to enumerate; we still
--     allow that for direct access using the download URL.
--   - To prevent enumeration, we constrain anon SELECT to objects that are
--     referenced from the projects table, while admins keep full access.
-- =========================================================================
DROP POLICY IF EXISTS "Brochures are publicly readable" ON storage.objects;

-- Public can read only brochure files that are linked from an active project
CREATE POLICY "Public can read linked brochure files"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'brochures'
    AND EXISTS (
      SELECT 1 FROM public.projects p
      WHERE p.brochure_path = storage.objects.name
        AND p.is_active = true
    )
  );

-- Admins can read everything in the brochures bucket (for management UI)
CREATE POLICY "Admins can read all brochures"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'brochures' AND public.has_role(auth.uid(), 'admin'));
