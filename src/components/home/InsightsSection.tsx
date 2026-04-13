import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SectionHeading from "../SectionHeading";
import { newsItems } from "@/data/newsData";

const InsightsSection = () => {
  const latestNews = newsItems.slice(0, 3);

  return (
    <section className="section-padding bg-background">
      <div className="container-regent">
        <SectionHeading subtitle="Stay Updated" title="REGENT INSIGHTS" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestNews.map((item, i) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                to={`/news/${item.slug}`}
                className="block group border border-border bg-card hover:border-primary/30 transition-all duration-500 overflow-hidden"
              >
                {item.image ? (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-primary/10 via-secondary/10 to-card" />
                )}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-primary">News</span>
                    <span className="text-[10px] text-muted-foreground">{item.date}</span>
                  </div>
                  <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-relaxed">
                    {item.title}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
