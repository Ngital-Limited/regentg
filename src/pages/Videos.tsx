import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Play, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { videos } from "@/data/videoData";

const Videos = () => {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(videos.map((v) => v.category)))],
    []
  );
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? videos : videos.filter((v) => v.category === active);
  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <SEO
        title="Videos"
        description="Watch project walkthroughs, corporate films, and event highlights from Regent Design & Development Ltd."
        path="/videos"
      />

      {/* Hero */}
      <section className="pt-28 md:pt-32 pb-16 md:pb-20 px-4 bg-regent-charcoal">
        <div className="container-regent text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-primary text-xs uppercase tracking-[0.3em]">Media / Videos</span>
            <h1 className="text-3xl md:text-6xl font-light tracking-wide mt-4 text-foreground">VIDEOS</h1>
            <div className="w-16 h-[2px] bg-primary mt-6 mx-auto" />
            <p className="text-muted-foreground mt-6 max-w-xl mx-auto text-sm leading-relaxed">
              Project walkthroughs, corporate films, and event highlights from Regent.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category filter */}
      <section className="pt-10 px-4 bg-background">
        <div className="container-regent flex flex-wrap items-center justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`text-[10px] uppercase tracking-[0.2em] px-4 py-2 border transition-all ${
                active === c
                  ? "border-primary text-primary bg-primary/10"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Video */}
      {featured && (
        <section className="section-padding bg-background">
          <div className="container-regent">
            <Link to={`/videos/${featured.slug}`}>
              <motion.article
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-border overflow-hidden group cursor-pointer hover:border-primary/30 transition-all"
              >
                <div className="relative overflow-hidden aspect-video lg:aspect-auto">
                  <img
                    src={featured.thumbnail}
                    alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    width={800}
                    height={512}
                  />
                  <div className="absolute inset-0 bg-background/30 group-hover:bg-background/20 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/90 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-7 h-7 md:w-8 md:h-8 text-primary-foreground fill-primary-foreground ml-1" />
                    </div>
                  </div>
                </div>
                <div className="p-5 md:p-8 lg:p-12 flex flex-col justify-center space-y-4 md:space-y-5">
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-medium bg-primary/10 px-3 py-1">
                      {featured.category}
                    </span>
                    <span className="text-[11px] text-muted-foreground">{featured.date}</span>
                  </div>
                  <h2 className="text-lg md:text-xl lg:text-2xl font-light text-foreground group-hover:text-primary transition-colors leading-snug tracking-wide">
                    {featured.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{featured.description}</p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" />
                      {featured.duration}
                    </span>
                    <span className="text-primary text-xs uppercase tracking-[0.15em] flex items-center gap-1 group-hover:gap-2 transition-all">
                      Watch Now <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </motion.article>
            </Link>
          </div>
        </section>
      )}

      {/* Video Grid */}
      <section className="pb-20 px-4 bg-background">
        <div className="container-regent">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((v, i) => (
              <Link key={v.slug} to={`/videos/${v.slug}`}>
                <motion.article
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="border border-border bg-card overflow-hidden group cursor-pointer hover:border-primary/30 transition-all h-full"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={v.thumbnail}
                      alt={v.title}
                      loading="lazy"
                      width={800}
                      height={512}
                      className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-background/30 group-hover:bg-background/20 transition-colors flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-primary/90 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 text-primary-foreground fill-primary-foreground ml-0.5" />
                      </div>
                    </div>
                    <span className="absolute bottom-2 right-2 text-[10px] text-foreground bg-background/80 backdrop-blur px-2 py-0.5 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {v.duration}
                    </span>
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-medium bg-primary/10 px-2 py-0.5">
                        {v.category}
                      </span>
                      <span className="text-[10px] text-muted-foreground">{v.date}</span>
                    </div>
                    <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-relaxed">
                      {v.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{v.description}</p>
                    <div className="flex items-center justify-end pt-2">
                      <span className="text-primary text-[10px] uppercase tracking-[0.15em] flex items-center gap-1 group-hover:gap-2 transition-all">
                        Watch <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Videos;
