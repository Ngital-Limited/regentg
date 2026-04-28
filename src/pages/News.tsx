import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { blogImageUrl } from "@/lib/storage";

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image_path: string | null;
  published_at: string | null;
  created_at: string;
  blog_categories: { slug: string; name: string } | null;
};

const formatDate = (d: string | null) =>
  d ? new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "";

const News = () => {
  const [items, setItems] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("id, slug, title, excerpt, cover_image_path, published_at, created_at, blog_categories!inner(slug, name)")
        .eq("is_published", true)
        .eq("blog_categories.slug", "news")
        .or("published_at.is.null,published_at.lte." + new Date().toISOString())
        .order("published_at", { ascending: false, nullsFirst: false })
        .order("created_at", { ascending: false });
      setItems(((data as any[]) || []) as Post[]);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SEO title="News & Updates" description="Latest news, events, and updates from Regent Design & Development Ltd — a leading real estate developer in Bangladesh." path="/news" />
      <section className="pt-28 md:pt-32 pb-16 md:pb-20 px-4 bg-regent-charcoal">
        <div className="container-regent text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-primary text-xs uppercase tracking-[0.3em]">Latest Updates</span>
            <h1 className="text-3xl md:text-6xl font-light tracking-wide mt-4 text-foreground">NEWS</h1>
            <div className="w-16 h-[2px] bg-primary mt-6 mx-auto" />
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-regent">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : items.length === 0 ? (
            <p className="text-center py-12 text-muted-foreground text-sm">
              No news yet. Add posts in the admin under the "News" category.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {items.map((item, i) => {
                const img = blogImageUrl(item.cover_image_path);
                return (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <Link
                      to={`/news/${item.slug}`}
                      className="block border border-border bg-card overflow-hidden hover:border-primary/30 transition-all group cursor-pointer"
                    >
                      {img && (
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={img}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="p-8">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                          {formatDate(item.published_at || item.created_at)}
                        </span>
                        <h3 className="text-lg font-light tracking-wide text-foreground mt-3 mb-3 group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        {item.excerpt && (
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{item.excerpt}</p>
                        )}
                      </div>
                    </Link>
                  </motion.article>
                );
              })}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default News;
