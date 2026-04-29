import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SectionHeading from "../SectionHeading";

const StakeholdersSection = () => {
  const stakeholders = [
    { label: "Our Clients", path: "/our-clients" },
    { label: "Our Landowners", path: "/our-landowners" },
  ];

  return (
    <section className="section-padding bg-regent-charcoal">
      <div className="container-regent">
        <SectionHeading subtitle="Together We Build" title="OUR STAKEHOLDERS" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {stakeholders.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Link
                to={s.path}
                className="block p-6 border border-border bg-card/30 text-center hover:border-primary/30 transition-all"
              >
                <p className="uppercase tracking-[0.15em] text-muted-foreground text-base">{s.label}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StakeholdersSection;
