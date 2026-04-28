import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SectionHeading from "../SectionHeading";
import { supabase } from "@/integrations/supabase/client";
import { blogImageUrl } from "@/lib/storage";

type Post = {
  id: string;
  slug: string;
  title: string;
  cover_image_path: string | null;
  published_at: string | null;
  created_at: string;
  blog_categories: { name: string; slug: string } | null;
};

const formatDate = (d: string | null) =>
  d ? new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "";

const InsightsSection = () => {
  const [news, setNews] = useState<Post[]>([]);
  const [blogs, setBlogs] = useState<Post[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("id, slug, title, cover_image_path, published_at, created_at, blog_categories(name, slug)")
        .eq("is_published", true)
        .or("published_at.is.null,published_at.lte." + new Date().toISOString())
        .order("published_at", { ascending: false, nullsFirst: false })
        .order("created_at", { ascending: false })
        .limit(20);
      const all = ((data as any[]) || []) as Post[];
      setNews(all.filter((p) => p.blog_categories?.slug === "news").slice(0, 3));
      setBlogs(all.filter((p) => p.blog_categories?.slug !== "news").slice(0, 3));
    })();
  }, []);

  if (news.length === 0 && blogs.length === 0) return null;

  return (
    <section className="section-padding bg-background">
      <div className="container-regent">
        <SectionHeading subtitle="Stay Updated" title="REGENT INSIGHTS" />

        {news.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xs uppercase tracking-[0.3em] text-primary font-medium">Latest News</h3>
              <Link to="/news" className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {news.map((item, i) => {
                const img = blogImageUrl(item.cover_image_path);
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <Link
                      to={`/news/${item.slug}`}
                      className="block group border border-border bg-card hover:border-primary/30 transition-all duration-500 overflow-hidden"
                    >
                      {img ? (
                        <div className="aspect-video overflow-hidden">
                          <img src={img} alt={item.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        </div>
                      ) : (
                        <div className="aspect-video bg-gradient-to-br from-primary/10 via-secondary/10 to-card" />
                      )}
                      <div className="p-6 space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-medium bg-primary/10 px-2 py-0.5">News</span>
                          <span className="text-[10px] text-muted-foreground">{formatDate(item.published_at || item.created_at)}</span>
                        </div>
                        <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-relaxed line-clamp-2">
                          {item.title}
                        </h3>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {blogs.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xs uppercase tracking-[0.3em] text-primary font-medium">From the Blog</h3>
              <Link to="/blog" className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogs.map((post, i) => {
                const img = blogImageUrl(post.cover_image_path);
                return (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <Link
                      to={`/blog/${post.slug}`}
                      className="block group border border-border bg-card hover:border-primary/30 transition-all duration-500 overflow-hidden"
                    >
                      <div className="aspect-video overflow-hidden bg-muted">
                        {img && (
                          <img src={img} alt={post.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        )}
                      </div>
                      <div className="p-6 space-y-3">
                        <div className="flex items-center gap-3">
                          {post.blog_categories && (
                            <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-medium bg-primary/10 px-2 py-0.5">{post.blog_categories.name}</span>
                          )}
                          <span className="text-[10px] text-muted-foreground">{formatDate(post.published_at || post.created_at)}</span>
                        </div>
                        <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-relaxed line-clamp-2">
                          {post.title}
                        </h3>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default InsightsSection;
