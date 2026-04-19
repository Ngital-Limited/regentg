import { useParams, Link, Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Play, ArrowRight } from "lucide-react";
import { videos } from "@/data/videoData";

const SITE_URL = "https://regent.ngital.com.bd";

const getEmbedUrl = (v: { source: string; videoId?: string; videoUrl?: string }) => {
  if (v.source === "youtube" && v.videoId) return `https://www.youtube.com/embed/${v.videoId}`;
  if (v.source === "vimeo" && v.videoId) return `https://player.vimeo.com/video/${v.videoId}`;
  return v.videoUrl || "";
};

const VideoDetail = () => {
  const { slug } = useParams();
  const video = videos.find((v) => v.slug === slug);

  if (!video) return <Navigate to="/videos" replace />;

  const related = videos.filter((v) => v.slug !== video.slug).slice(0, 3);
  const embedUrl = getEmbedUrl(video);

  const jsonLd = [
    {
      "@type": "VideoObject",
      name: video.title,
      description: video.description,
      thumbnailUrl: video.thumbnail,
      uploadDate: new Date(video.date).toISOString(),
      contentUrl: embedUrl,
      embedUrl,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Videos", item: `${SITE_URL}/videos` },
        { "@type": "ListItem", position: 3, name: video.title, item: `${SITE_URL}/videos/${video.slug}` },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <SEO
        title={video.title}
        description={video.description}
        path={`/videos/${video.slug}`}
        image={video.thumbnail}
        type="article"
        jsonLd={jsonLd}
      />

      {/* Header */}
      <section className="pt-28 md:pt-32 pb-8 px-4 bg-regent-charcoal">
        <div className="container-regent">
          <Link
            to="/videos"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Videos
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-medium bg-primary/10 px-3 py-1">
                {video.category}
              </span>
              <span className="text-[11px] text-muted-foreground">{video.date}</span>
              <span className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                <Clock className="w-3 h-3" /> {video.duration}
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-light tracking-wide text-foreground leading-tight">
              {video.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Player */}
      <section className="pb-12 px-4 bg-background">
        <div className="container-regent">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative w-full aspect-video bg-regent-charcoal border border-border overflow-hidden"
          >
            {video.source === "file" ? (
              <video
                src={video.videoUrl}
                poster={video.thumbnail}
                controls
                className="w-full h-full object-cover"
              />
            ) : (
              <iframe
                src={embedUrl}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            )}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm md:text-base text-muted-foreground leading-relaxed mt-8 max-w-3xl"
          >
            {video.description}
          </motion.p>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="pb-20 px-4 bg-background">
          <div className="container-regent">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-sm uppercase tracking-[0.25em] text-foreground">Related Videos</h2>
              <Link
                to="/videos"
                className="text-primary text-[10px] uppercase tracking-[0.2em] flex items-center gap-1 hover:gap-2 transition-all"
              >
                All Videos <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((v) => (
                <Link key={v.slug} to={`/videos/${v.slug}`}>
                  <article className="border border-border bg-card overflow-hidden group cursor-pointer hover:border-primary/30 transition-all h-full">
                    <div className="relative overflow-hidden">
                      <img
                        src={v.thumbnail}
                        alt={v.title}
                        loading="lazy"
                        className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-background/30 group-hover:bg-background/20 transition-colors flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-primary/90 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="w-5 h-5 text-primary-foreground fill-primary-foreground ml-0.5" />
                        </div>
                      </div>
                    </div>
                    <div className="p-5 space-y-2">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-medium">
                        {v.category}
                      </span>
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
