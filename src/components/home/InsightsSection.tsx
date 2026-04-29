import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import SectionHeading from "../SectionHeading";
import { newsItems } from "@/data/newsData";
import { blogPosts } from "@/data/blogData";

const InsightsSection = () => {
  const latestNews = newsItems.slice(0, 3);
  const latestBlogs = blogPosts.slice(0, 3);

  return (
    <section className="section-padding bg-background">
      <div className="container-regent">
        <SectionHeading subtitle="Stay Updated" title="REGENT INSIGHTS" />

        {/* News Row */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xs uppercase tracking-[0.3em] text-primary font-medium">Latest News</h3>
            <Link to="/news" className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {latestNews.map((item, i) => (
              <motion.div
                key={item.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="h-full"
              >
                <Link
                  to={`/news/${item.slug}`}
                  className="flex flex-col h-full group border border-border bg-card hover:border-primary/30 transition-all duration-500 overflow-hidden"
                >
                  <div className="aspect-card overflow-hidden bg-muted shrink-0">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/10 via-secondary/10 to-card" />
                    )}
                  </div>
                  <div className="p-6 space-y-3 flex flex-col flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-medium bg-primary/10 px-2 py-0.5">News</span>
                      <span className="text-[10px] text-muted-foreground">{item.date}</span>
                    </div>
                    <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-relaxed line-clamp-2">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Blog Row */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xs uppercase tracking-[0.3em] text-primary font-medium">From the Blog</h3>
            <Link to="/blog" className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {latestBlogs.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="h-full"
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="flex flex-col h-full group border border-border bg-card hover:border-primary/30 transition-all duration-500 overflow-hidden"
                >
                  <div className="aspect-card overflow-hidden bg-muted shrink-0">
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 space-y-3 flex flex-col flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-medium bg-primary/10 px-2 py-0.5">{post.category}</span>
                      <span className="text-[10px] text-muted-foreground">{post.date}</span>
                    </div>
                    <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-relaxed line-clamp-2">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground pt-1 mt-auto">
                      <Clock className="w-3 h-3" />{post.readTime}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
