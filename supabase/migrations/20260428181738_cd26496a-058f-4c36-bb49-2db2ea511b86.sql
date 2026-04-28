-- Allow anyone to upload a CV to the private cvs bucket (admins read via signed URLs)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='storage' AND tablename='objects' AND policyname='Public can upload CVs'
  ) THEN
    CREATE POLICY "Public can upload CVs"
    ON storage.objects FOR INSERT
    TO public
    WITH CHECK (bucket_id = 'cvs');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='storage' AND tablename='objects' AND policyname='Admins can read CVs'
  ) THEN
    CREATE POLICY "Admins can read CVs"
    ON storage.objects FOR SELECT
    TO authenticated
    USING (bucket_id = 'cvs' AND has_role(auth.uid(), 'admin'));
  END IF;
END$$;