import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Play, X, Loader2 } from "lucide-react";
import { useYoutubeMeta } from "@/hooks/useYoutubeMeta";
import { supabase } from "@/integrations/supabase/client";

type Video = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  category: string | null;
  youtube_id: string;
};

const ytThumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
const ytThumbHD = (id: string) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;

const VideoCard = ({ video, index, onPlay }: { video: Video; index: number; onPlay: (v: Video) => void }) => {
  const meta = useYoutubeMeta(video.youtube_id);
  const title = video.title || meta.title || "";
  const thumb = meta.thumbnail || ytThumbHD(video.youtube_id);

  return (
    <motion.button
      onClick={() => onPlay(video)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group relative overflow-hidden border border-border bg-card cursor-pointer hover:border-primary/40 transition-all flex flex-col text-left"
      aria-label={`Play video: ${title}`}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={thumb}
          alt={title}
          loading="lazy"
          onError={(e) => {
            const img = e.currentTarget;
            if (!img.dataset.fallback) {
              img.dataset.fallback = "1";
              img.src = ytThumb(video.youtube_id);
            }
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-background/30 group-hover:bg-background/10 transition-colors flex items-center justify-center">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Play className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground ml-1" fill="currentColor" />
          </div>
        </div>
      </div>
      <div className="p-4 md:p-5">
        {video.category && (
          <span className="text-[10px] uppercase tracking-[0.2em] text-primary block mb-2">
            {video.category}
          </span>
        )}
        <h3 className="text-sm md:text-base font-light text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
      </div>
    </motion.button>
  );
};

const Videos = () => {
  const [playing, setPlaying] = useState<Video | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("videos")
        .select("id, slug, title, description, category, youtube_id")
        .eq("is_published", true)
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: false });
      setVideos((data as Video[]) || []);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SEO
        title="Video"
        description="Watch project walkthroughs, corporate films, and event highlights from Regent Design & Development Ltd."
        path="/videos"
      />

      {/* Hero */}
      <section className="pt-28 md:pt-32 pb-16 md:pb-20 px-4 bg-regent-charcoal">
        <div className="container-regent text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-primary text-xs uppercase tracking-[0.3em]">Media Gallery</span>
            <h1 className="text-3xl md:text-6xl font-light tracking-wide mt-4 text-foreground">VIDEO</h1>
            <div className="w-16 h-[2px] bg-primary mt-6 mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 px-4 bg-background">
        <div className="container-regent">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : videos.length === 0 ? (
            <p className="text-center text-muted-foreground py-12 text-sm">No videos available yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video, i) => (
                <VideoCard key={video.id} video={video} index={i} onPlay={setPlaying} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Inline Lightbox Player */}
      {playing && (
        <div
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          onClick={() => setPlaying(null)}
        >
          <button
            onClick={() => setPlaying(null)}
            className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:border-primary transition-colors"
            aria-label="Close video"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl aspect-video bg-black border border-border overflow-hidden"
          >
            <iframe
              src={`https://www.youtube.com/embed/${playing.youtube_id}?autoplay=1&rel=0`}
              title={playing.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Videos;
