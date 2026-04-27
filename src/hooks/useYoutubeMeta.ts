import { useEffect, useState } from "react";

export interface YoutubeMeta {
  title?: string;
  thumbnail?: string;
}

const cache = new Map<string, YoutubeMeta>();

export const useYoutubeMeta = (youtubeId: string): YoutubeMeta => {
  const [meta, setMeta] = useState<YoutubeMeta>(() => cache.get(youtubeId) ?? {});

  useEffect(() => {
    let cancelled = false;
    if (cache.has(youtubeId)) {
      setMeta(cache.get(youtubeId)!);
      return;
    }
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${youtubeId}&format=json`;
    fetch(url)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data || cancelled) return;
        const next: YoutubeMeta = {
          title: data.title,
          thumbnail: data.thumbnail_url,
        };
        cache.set(youtubeId, next);
        setMeta(next);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [youtubeId]);

  return meta;
};
