import { motion } from "framer-motion";
import SectionHeading from "../SectionHeading";

const AwardsSection = () => {
  const awards = [
    "REHAB Member",
    "ISO Certified",
    "Best Developer Award 2023",
    "BSEC Certified",
  ];

  return (
    <section className="section-padding bg-regent-charcoal">
      <div className="container-regent">
        <SectionHeading subtitle="Recognition" title="AWARDS & MEMBERSHIPS" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {awards.map((award, i) => (
            <motion.div
              key={award}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="aspect-square border border-border bg-card/50 flex items-center justify-center p-6 text-center"
            >
              <div>
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary text-lg font-light">{award.charAt(0)}</span>
                </div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{award}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
