import { motion } from "framer-motion";
import SectionHeading from "../SectionHeading";

const insights = [
  { title: "Regent Grand Heritage Tops Off", date: "March 2026", category: "News" },
  { title: "Sustainable Building Practices at RDDL", date: "February 2026", category: "Blog" },
  { title: "Why Banani is Dhaka's Premium Address", date: "January 2026", category: "Insight" },
];

const InsightsSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-regent">
        <SectionHeading subtitle="Stay Updated" title="REGENT INSIGHTS" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {insights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group border border-border bg-card hover:border-primary/30 transition-all duration-500 overflow-hidden"
            >
              <div className="aspect-video bg-gradient-to-br from-primary/10 via-secondary/10 to-card" />
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-primary">{item.category}</span>
                  <span className="text-[10px] text-muted-foreground">{item.date}</span>
                </div>
                <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-relaxed">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
