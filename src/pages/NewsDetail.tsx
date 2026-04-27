import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Share2, Link2, Check } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import { newsItems } from "@/data/newsData";
import { toast } from "sonner";

const NewsDetail = () => {
  const { slug } = useParams();
  const article = newsItems.find((n) => n.slug === slug);

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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SEO
        title={article.title}
        description={(article.excerpt || article.title).slice(0, 160)}
        path={`/news/${slug}`}
        image={article.image}
        type="article"
      />

      {/* Hero */}
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
            <span className="block text-primary text-[10px] uppercase tracking-[0.3em] mb-4">
              {article.date}
            </span>
            <h1 className="text-2xl md:text-5xl font-light tracking-wide text-foreground">
              {article.title}
            </h1>
            <div className="w-16 h-[2px] bg-primary mt-6" />
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-background">
        <div className="container-regent max-w-4xl">
          {article.image && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <div className="aspect-video overflow-hidden border border-border">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="text-muted-foreground leading-relaxed text-base md:text-lg space-y-5">
              {(article.content || article.excerpt).split("\n\n").map((para, idx) => (
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
