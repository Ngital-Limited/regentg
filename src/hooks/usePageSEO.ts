import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface PageSEOData {
  meta_title: string | null;
  meta_description: string | null;
  og_image_path: string | null;
}

// Module-level cache so multiple components hitting the same path don't refetch
const cache = new Map<string, PageSEOData>();

export function usePageSEO(path: string) {
  const [data, setData] = useState<PageSEOData | null>(cache.get(path) || null);

  useEffect(() => {
    let cancelled = false;
    if (cache.has(path)) {
      setData(cache.get(path)!);
      return;
    }
    (async () => {
      const { data: row } = await supabase
        .from("page_seo")
        .select("meta_title, meta_description, og_image_path")
        .eq("path", path)
        .maybeSingle();
      if (cancelled) return;
      if (row) {
        cache.set(path, row);
        setData(row);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [path]);

  return data;
}
