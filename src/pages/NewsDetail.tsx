import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import ShareButton from "@/components/ShareButton";
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
  published_at: string | null;
  created_at: string;
  is_published?: boolean;
  meta_title?: string | null;
  meta_description?: string | null;
  og_image_path?: string | null;
};

const formatDate = (d: string | null) =>
  d ? new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "";

const NewsDetail = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const { isPreview, authLoading } = usePreview();

  useEffect(() => {
    if (!slug || authLoading) return;
    (async () => {
      let q = supabase
        .from("blog_posts")
        .select("id, slug, title, excerpt, body, cover_image_path, published_at, created_at, is_published, meta_title, meta_description, og_image_path")
        .eq("slug", slug);
      if (!isPreview) q = q.eq("is_published", true);
      const { data } = await q.maybeSingle();
      setArticle((data as Post) || null);
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

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-20 px-4 text-center">
          <h1 className="text-3xl font-light text-foreground">Article Not Found</h1>
          <Link to="/news" className="text-primary text-sm mt-4 inline-block hover:underline">
            ← Back to News
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const cover = blogImageUrl(article.cover_image_path);
  const date = formatDate(article.published_at || article.created_at);
  const paragraphs = (article.body || article.excerpt || "").split(/\n\n+/);

  return (
    <div className="min-h-screen bg-background">
      {isPreview && (
        <PreviewBanner
          status={article.is_published ? "published" : "draft"}
          label={article.title}
        />
      )}
      <Navbar />
      <SEO
        title={article.meta_title || article.title}
        description={(article.meta_description || article.excerpt || article.title).slice(0, 160)}
        path={`/news/${slug}`}
        image={blogImageUrl(article.og_image_path) || cover || undefined}
        type="article"
        skipPageOverride
      />

      <section className="relative pt-28 md:pt-32 pb-12 md:pb-16 px-4 bg-regent-charcoal">
        <div className="container-regent max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link
              to="/news"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-xs uppercase tracking-[0.2em] mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to News
            </Link>
            {date && (
              <span className="block text-primary text-[10px] uppercase tracking-[0.3em] mb-4">{date}</span>
            )}
            <h1 className="text-2xl md:text-5xl font-light tracking-wide text-foreground">
              {article.title}
            </h1>
            <div className="mt-6 flex items-center gap-4">
              <div className="w-16 h-[2px] bg-primary" />
              <ShareButton title={article.title} text={article.excerpt || ""} />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-regent max-w-4xl">
          {cover && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <div className="aspect-video overflow-hidden border border-border">
                <img src={cover} alt={article.title} className="w-full h-full object-cover" />
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="text-muted-foreground leading-relaxed text-base md:text-lg space-y-5">
              {paragraphs.map((para, idx) => (
                <p key={idx} className="whitespace-pre-line text-justify">{para}</p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NewsDetail;
