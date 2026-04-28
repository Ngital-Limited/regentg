import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowRight, Clock, User, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { blogImageUrl } from "@/lib/storage";

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image_path: string | null;
  author_name: string | null;
  published_at: string | null;
  created_at: string;
  blog_categories: { name: string; slug: string } | null;
};

const formatDate = (d: string | null) =>
  d ? new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "";

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("id, slug, title, excerpt, cover_image_path, author_name, published_at, created_at, blog_categories(name, slug)")
        .eq("is_published", true)
        .or("published_at.is.null,published_at.lte." + new Date().toISOString())
        .order("published_at", { ascending: false, nullsFirst: false })
        .order("created_at", { ascending: false });
      const filtered = ((data as any[]) || []).filter(
        (p) => p.blog_categories?.slug !== "news"
      );
      setPosts(filtered);
      setLoading(false);
    })();
  }, []);

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <SEO title="Blog & Insights" description="Real estate insights, buying guides, and industry updates from Regent Design & Development Ltd." path="/blog" />
      <section className="pt-28 md:pt-32 pb-16 md:pb-20 px-4 bg-regent-charcoal">
        <div className="container-regent text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-primary text-xs uppercase tracking-[0.3em]">Knowledge Hub</span>
            <h1 className="text-3xl md:text-6xl font-light tracking-wide mt-4 text-foreground">BLOG</h1>
            <div className="w-16 h-[2px] bg-primary mt-6 mx-auto" />
            <p className="text-muted-foreground mt-6 max-w-xl mx-auto text-sm leading-relaxed">
              Insights, guides, and stories from the world of real estate in Bangladesh.
            </p>
          </motion.div>
        </div>
      </section>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground text-sm">
          No articles published yet.
        </div>
      ) : (
        <>
          {featured && (
            <section className="section-padding bg-background">
              <div className="container-regent">
                <Link to={`/blog/${featured.slug}`}>
                  <motion.article
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-border overflow-hidden group cursor-pointer hover:border-primary/30 transition-all"
                  >
                    <div className="overflow-hidden bg-muted">
                      {blogImageUrl(featured.cover_image_path) && (
                        <img
                          src={blogImageUrl(featured.cover_image_path)!}
                          alt={featured.title}
                          className="w-full h-full object-cover aspect-video lg:aspect-auto group-hover:scale-105 transition-transform duration-700"
                        />
                      )}
                    </div>
                    <div className="p-5 md:p-8 lg:p-12 flex flex-col justify-center space-y-4 md:space-y-5">
                      <div className="flex items-center gap-4">
                        {featured.blog_categories && (
                          <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-medium bg-primary/10 px-3 py-1">
                            {featured.blog_categories.name}
                          </span>
                        )}
                        <span className="text-[11px] text-muted-foreground">{formatDate(featured.published_at || featured.created_at)}</span>
                      </div>
                      <h2 className="text-lg md:text-xl lg:text-2xl font-light text-foreground group-hover:text-primary transition-colors leading-snug tracking-wide">
                        {featured.title}
                      </h2>
                      {featured.excerpt && (
                        <p className="text-sm text-muted-foreground leading-relaxed">{featured.excerpt}</p>
                      )}
                      <div className="flex items-center justify-between pt-2">
                        {featured.author_name && (
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" />{featured.author_name}</span>
                          </div>
                        )}
                        <span className="text-primary text-xs uppercase tracking-[0.15em] flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read More <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </motion.article>
                </Link>
              </div>
            </section>
          )}

          {rest.length > 0 && (
            <section className="pb-20 px-4 bg-background">
              <div className="container-regent">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {rest.map((post, i) => (
                    <Link key={post.id} to={`/blog/${post.slug}`}>
                      <motion.article
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.08 }}
                        className="border border-border bg-card overflow-hidden group cursor-pointer hover:border-primary/30 transition-all h-full"
                      >
                        <div className="overflow-hidden bg-muted aspect-video">
                          {blogImageUrl(post.cover_image_path) && (
                            <img
                              src={blogImageUrl(post.cover_image_path)!}
                              alt={post.title}
                              loading="lazy"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                          )}
                        </div>
                        <div className="p-6 space-y-3">
                          <div className="flex items-center gap-3">
                            {post.blog_categories && (
                              <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-medium bg-primary/10 px-2 py-0.5">
                                {post.blog_categories.name}
                              </span>
                            )}
                            <span className="text-[10px] text-muted-foreground">{formatDate(post.published_at || post.created_at)}</span>
                          </div>
                          <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-relaxed">
                            {post.title}
                          </h3>
                          {post.excerpt && (
                            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{post.excerpt}</p>
                          )}
                          <div className="flex items-center justify-between pt-2">
                            <span />
                            <span className="text-primary text-[10px] uppercase tracking-[0.15em] flex items-center gap-1 group-hover:gap-2 transition-all">
                              Read More <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      </motion.article>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      <Footer />
    </div>
  );
};

export default Blog;
