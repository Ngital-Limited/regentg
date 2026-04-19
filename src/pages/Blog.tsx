import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowRight, Clock, User } from "lucide-react";
import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blogData";

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <SEO title="Blog & Insights" description="Real estate insights, buying guides, and industry updates from Regent Design & Development Ltd." path="/blog" />
      {/* Hero */}
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

      {/* Featured Post */}
      <section className="section-padding bg-background">
        <div className="container-regent">
          <Link to={`/blog/${blogPosts[0].slug}`}>
            <motion.article
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-border overflow-hidden group cursor-pointer hover:border-primary/30 transition-all"
            >
              <div className="overflow-hidden">
                <img
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  className="w-full h-full object-cover aspect-video lg:aspect-auto group-hover:scale-105 transition-transform duration-700"
                  width={800}
                  height={512}
                />
              </div>
              <div className="p-5 md:p-8 lg:p-12 flex flex-col justify-center space-y-4 md:space-y-5">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-medium bg-primary/10 px-3 py-1">{blogPosts[0].category}</span>
                  <span className="text-[11px] text-muted-foreground">{blogPosts[0].date}</span>
                </div>
                <h2 className="text-lg md:text-xl lg:text-2xl font-light text-foreground group-hover:text-primary transition-colors leading-snug tracking-wide">
                  {blogPosts[0].title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{blogPosts[0].excerpt}</p>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" />{blogPosts[0].author}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{blogPosts[0].readTime}</span>
                  </div>
                  <span className="text-primary text-xs uppercase tracking-[0.15em] flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read More <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </motion.article>
          </Link>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-20 px-4 bg-background">
        <div className="container-regent">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post, i) => (
              <Link key={post.slug} to={`/blog/${post.slug}`}>
                <motion.article
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="border border-border bg-card overflow-hidden group cursor-pointer hover:border-primary/30 transition-all h-full"
                >
                  <div className="overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      width={800}
                      height={512}
                      className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-medium bg-primary/10 px-2 py-0.5">{post.category}</span>
                      <span className="text-[10px] text-muted-foreground">{post.date}</span>
                    </div>
                    <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-relaxed">
                      {post.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                        <Clock className="w-3 h-3" />{post.readTime}
                      </span>
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

      <Footer />
    </div>
  );
};

export default Blog;
