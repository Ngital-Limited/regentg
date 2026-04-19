import { useParams, Link, Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowLeft, Play, Clock } from "lucide-react";
import { videos, getVideoThumbnail } from "@/data/videoData";

const VideoDetail = () => {
  const { slug } = useParams();
  const video = videos.find((v) => v.slug === slug);

  if (!video) return <Navigate to="/videos" replace />;

  const related = videos.filter((v) => v.slug !== video.slug).slice(0, 3);

  const jsonLd = {
    "@type": "VideoObject",
    name: video.title,
    description: video.description,
    thumbnailUrl: getVideoThumbnail(video.youtubeId),
    uploadDate: video.date,
    contentUrl: `https://www.youtube.com/watch?v=${video.youtubeId}`,
    embedUrl: `https://www.youtube.com/embed/${video.youtubeId}`,
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SEO
        title={video.title}
        description={video.description}
        path={`/videos/${video.slug}`}
        type="article"
        jsonLd={jsonLd}
      />

      <section className="pt-28 md:pt-32 pb-12 px-4 bg-regent-charcoal">
        <div className="container-regent">
          <Link
            to="/videos"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Videos
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-medium bg-primary/10 px-3 py-1">
                {video.category}
              </span>
              <span className="text-[11px] text-muted-foreground">{video.date}</span>
              <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" /> {video.duration}
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-light tracking-wide text-foreground max-w-4xl">{video.title}</h1>
          </motion.div>
        </div>
      </section>

      {/* Player */}
      <section className="py-10 px-4 bg-background">
        <div className="container-regent">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative w-full aspect-video bg-black border border-border overflow-hidden"
          >
            <iframe
              src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </motion.div>

          <div className="mt-10 max-w-3xl">
            <h2 className="text-xs uppercase tracking-[0.25em] text-primary mb-4">About this video</h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{video.description}</p>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="pb-20 px-4 bg-background">
          <div className="container-regent">
            <h2 className="text-xs uppercase tracking-[0.25em] text-primary mb-8">More Videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((v) => (
                <Link key={v.slug} to={`/videos/${v.slug}`}>
                  <article className="border border-border bg-card overflow-hidden group cursor-pointer hover:border-primary/30 transition-all h-full">
                    <div className="relative overflow-hidden aspect-video">
                      <img
                        src={getVideoThumbnail(v.youtubeId)}
                        alt={v.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-background/20 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="w-4 h-4 text-primary-foreground ml-0.5" fill="currentColor" />
                        </div>
                      </div>
                    </div>
                    <div className="p-5 space-y-2">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-primary">{v.category}</span>
                      <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-relaxed">
                        {v.title}
                      </h3>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default VideoDetail;
