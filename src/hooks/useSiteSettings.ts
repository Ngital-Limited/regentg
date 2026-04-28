import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type SettingsMap = Record<string, any>;

const cache: SettingsMap = {};
const listeners = new Set<() => void>();
let loaded = false;
let loading: Promise<void> | null = null;

const fetchAll = async () => {
  if (loading) return loading;
  loading = (async () => {
    const { data } = await supabase.from("site_settings").select("key, value");
    data?.forEach((row: any) => {
      cache[row.key] = row.value;
    });
    loaded = true;
    listeners.forEach((l) => l());
  })();
  return loading;
};

export function useSiteSetting<T = any>(key: string, fallback: T): T {
  const [value, setValue] = useState<T>(cache[key] ?? fallback);

  useEffect(() => {
    const update = () => setValue(cache[key] ?? fallback);
    listeners.add(update);
    if (!loaded) {
      fetchAll().then(update);
    } else {
      update();
    }
    return () => {
      listeners.delete(update);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return value;
}
