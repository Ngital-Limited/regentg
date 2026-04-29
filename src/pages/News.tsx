import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { newsItems } from "@/data/newsData";

const News = () => {
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {newsItems.map((item, i) => (
              <motion.article
                key={item.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="h-full"
              >
                <Link
                  to={`/news/${item.slug}`}
                  className="flex flex-col h-full border border-border bg-card overflow-hidden hover:border-primary/30 transition-all group cursor-pointer"
                >
                  <div className="aspect-card overflow-hidden bg-muted shrink-0">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{item.date}</span>
                    <h3 className="text-lg font-light tracking-wide text-foreground mt-3 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{item.excerpt}</p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default News;
