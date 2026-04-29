import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import ContactButton from "@/components/ContactButton";
import ShareButton from "@/components/ShareButton";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, User, Calendar, ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blogData";

const BlogDetail = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);
  const postIndex = blogPosts.findIndex((p) => p.slug === slug);

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

  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SEO
        title={post.title}
        description={(post.excerpt || post.title).slice(0, 160)}
        path={`/blog/${slug}`}
        image={post.image}
        type="article"
      />

      {/* Hero Image */}
      <section className="relative pt-20 print-omit">
        <div className="aspect-[21/9] max-h-[500px] w-full overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
            width={800}
            height={512}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>
      </section>

      {/* Article Content */}
      <section className="relative -mt-32 z-10 pb-20 print-area">
        <div className="container-regent max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Back link */}
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors mb-8 print-omit"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Blog
            </Link>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-medium bg-primary/10 px-3 py-1">
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="w-3.5 h-3.5" /> {post.date}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <User className="w-3.5 h-3.5" /> {post.author}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5" /> {post.readTime}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-light tracking-wide text-foreground leading-tight mb-8 md:mb-10">
              {post.title}
            </h1>

            {/* Divider + Share */}
            <div className="mb-10 flex items-center justify-between gap-4 flex-wrap print-omit">
              <div className="w-16 h-[2px] bg-primary" />
              <ShareButton title={post.title} text={post.excerpt} />
            </div>

            {/* Print-only hero image */}
            <img
              src={post.image}
              alt={post.title}
              className="hidden print:block w-full mb-6"
              aria-hidden="true"
            />

            {/* Article Body */}
            <article className="space-y-6">
              {post.content.map((paragraph, i) => {
                if (paragraph.startsWith("## ")) {
                  return (
                    <h2
                      key={i}
                      className="text-lg md:text-xl font-medium text-foreground tracking-wide mt-10 mb-2"
                    >
                      {paragraph.replace("## ", "")}
                    </h2>
                  );
                }
                return (
                  <p
                    key={i}
                    className="text-sm md:text-base text-muted-foreground leading-[1.85] tracking-wide"
                  >
                    {paragraph}
                  </p>
                );
              })}
            </article>

            {/* Post Navigation */}
            <div className="mt-16 pt-10 border-t border-border/50 flex justify-between items-center print-omit">
              {postIndex > 0 ? (
                <Link
                  to={`/blog/${blogPosts[postIndex - 1].slug}`}
                  className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] block">Previous</span>
                    <span className="text-xs text-foreground group-hover:text-primary transition-colors line-clamp-1 max-w-[200px]">
                      {blogPosts[postIndex - 1].title}
                    </span>
                  </div>
                </Link>
              ) : <div />}
              {postIndex < blogPosts.length - 1 ? (
                <Link
                  to={`/blog/${blogPosts[postIndex + 1].slug}`}
                  className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-right"
                >
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] block">Next</span>
                    <span className="text-xs text-foreground group-hover:text-primary transition-colors line-clamp-1 max-w-[200px]">
                      {blogPosts[postIndex + 1].title}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : <div />}
            </div>
          </motion.div>

          {/* Related Posts */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20 print-omit"
          >
            <h3 className="text-xs uppercase tracking-[0.3em] text-primary mb-8">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  to={`/blog/${related.slug}`}
                  className="group border border-border/50 overflow-hidden hover:border-primary/30 transition-all"
                >
                  <div className="overflow-hidden">
                    <img
                      src={related.image}
                      alt={related.title}
                      loading="lazy"
                      className="w-full aspect-card object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-primary">{related.category}</span>
                    <h4 className="text-xs font-medium text-foreground group-hover:text-primary transition-colors leading-relaxed line-clamp-2">
                      {related.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ContactButton />
    </div>
  );
};

export default BlogDetail;
