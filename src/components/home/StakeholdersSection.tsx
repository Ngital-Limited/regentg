import { motion } from "framer-motion";
import SectionHeading from "../SectionHeading";

const StakeholdersSection = () => {
  const stakeholders = ["Our Clients", "Financial Partners", "Consultants", "Suppliers", "Government Bodies", "Community"];

  return (
    <section className="section-padding bg-regent-charcoal">
      <div className="container-regent">
        <SectionHeading subtitle="Together We Build" title="OUR STAKEHOLDERS" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stakeholders.map((s, i) => (
            <motion.div
              key={s}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="p-6 border border-border bg-card/30 text-center hover:border-primary/30 transition-all"
            >
              <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{s}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StakeholdersSection;
