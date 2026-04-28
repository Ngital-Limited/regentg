import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import ContactButton from "@/components/ContactButton";
import ShareButton from "@/components/ShareButton";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, User, Calendar, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { blogImageUrl } from "@/lib/storage";
import { usePreview } from "@/hooks/usePreview";
import PreviewBanner from "@/components/PreviewBanner";

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string | null;
  cover_image_path: string | null;
  author_name: string | null;
  published_at: string | null;
  created_at: string;
  is_published?: boolean;
  meta_title?: string | null;
  meta_description?: string | null;
  og_image_path?: string | null;
  blog_categories: { name: string; slug: string } | null;
};

const formatDate = (d: string | null) =>
  d ? new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "";

const BlogDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [related, setRelated] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { isPreview, authLoading } = usePreview();

  useEffect(() => {
    if (!slug || authLoading) return;
    setLoading(true);
    (async () => {
      let q = supabase
        .from("blog_posts")
        .select("id, slug, title, excerpt, body, cover_image_path, author_name, published_at, created_at, is_published, meta_title, meta_description, og_image_path, blog_categories(name, slug)")
        .eq("slug", slug);
      if (!isPreview) q = q.eq("is_published", true);
      const { data } = await q.maybeSingle();
      setPost((data as Post) || null);

      if (data) {
        const { data: rel } = await supabase
          .from("blog_posts")
          .select("id, slug, title, excerpt, body, cover_image_path, author_name, published_at, created_at, blog_categories(name, slug)")
          .eq("is_published", true)
          .neq("slug", slug)
          .order("published_at", { ascending: false, nullsFirst: false })
          .limit(3);
        setRelated((rel as Post[]) || []);
      }
      setLoading(false);
    })();
  }, [slug, isPreview, authLoading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-20 flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-3xl font-light text-foreground">Article Not Found</h1>
          <Link to="/blog" className="text-primary text-sm mt-6 inline-flex items-center gap-2 hover:gap-3 transition-all">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const coverUrl = blogImageUrl(post.cover_image_path);
  const date = formatDate(post.published_at || post.created_at);
  const paragraphs = (post.body || "").split(/\n\n+/);

  return (
    <div className="min-h-screen bg-background">
      {isPreview && (
        <PreviewBanner
          status={post.is_published ? "published" : "draft"}
          label={post.title}
        />
      )}
      <Navbar />
      <SEO
        title={post.meta_title || post.title}
        description={(post.meta_description || post.excerpt || post.title).slice(0, 160)}
        path={`/blog/${slug}`}
        image={blogImageUrl(post.og_image_path) || coverUrl || undefined}
        type="article"
        skipPageOverride
      />

      <section className="relative pt-20">
        <div className="aspect-[21/9] max-h-[500px] w-full overflow-hidden bg-muted">
          {coverUrl && (
            <img
              src={coverUrl}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>
      </section>

      <section className="relative -mt-32 z-10 pb-20">
        <div className="container-regent max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Blog
            </Link>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              {post.blog_categories && (
                <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-medium bg-primary/10 px-3 py-1">
                  {post.blog_categories.name}
                </span>
              )}
              {date && (
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5" /> {date}
                </span>
              )}
              {post.author_name && (
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <User className="w-3.5 h-3.5" /> {post.author_name}
                </span>
              )}
            </div>

            <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-light tracking-wide text-foreground leading-tight mb-8 md:mb-10">
              {post.title}
            </h1>

            <div className="mb-10 flex items-center justify-between gap-4 flex-wrap">
              <div className="w-16 h-[2px] bg-primary" />
              <ShareButton title={post.title} text={post.excerpt || ""} />
            </div>

            <article className="space-y-6">
              {paragraphs.map((paragraph, i) => {
                if (paragraph.startsWith("## ")) {
                  return (
                    <h2 key={i} className="text-lg md:text-xl font-medium text-foreground tracking-wide mt-10 mb-2">
                      {paragraph.replace("## ", "")}
                    </h2>
                  );
                }
                return (
                  <p key={i} className="text-sm md:text-base text-muted-foreground leading-[1.85] tracking-wide whitespace-pre-line">
                    {paragraph}
                  </p>
                );
              })}
            </article>
          </motion.div>

          {related.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-20"
            >
              <h3 className="text-xs uppercase tracking-[0.3em] text-primary mb-8">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((r) => {
                  const rImg = blogImageUrl(r.cover_image_path);
                  const path = r.blog_categories?.slug === "news" ? `/news/${r.slug}` : `/blog/${r.slug}`;
                  return (
                    <Link
                      key={r.id}
                      to={path}
                      className="group border border-border/50 overflow-hidden hover:border-primary/30 transition-all"
                    >
                      <div className="overflow-hidden bg-muted aspect-video">
                        {rImg && (
                          <img
                            src={rImg}
                            alt={r.title}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        )}
                      </div>
                      <div className="p-4 space-y-2">
                        {r.blog_categories && (
                          <span className="text-[10px] uppercase tracking-[0.2em] text-primary">{r.blog_categories.name}</span>
                        )}
                        <h4 className="text-xs font-medium text-foreground group-hover:text-primary transition-colors leading-relaxed line-clamp-2">
                          {r.title}
                        </h4>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
      <ContactButton />
    </div>
  );
};

export default BlogDetail;
