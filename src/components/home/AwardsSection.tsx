import { motion } from "framer-motion";
import SectionHeading from "../SectionHeading";

const awards = [
  { image: "/awards/6-1-1.png", alt: "Award 1" },
  { image: "/awards/1-1-1.png", alt: "Award 2" },
  { image: "/awards/5-1-1.png", alt: "Award 3" },
  { image: "/awards/4-1-1.png", alt: "Award 4" },
  { image: "/awards/8-1-1.png", alt: "Award 5" },
  { image: "/awards/7-1-1.png", alt: "Award 6" },
];

const AwardsSection = () => {
  return (
    <section className="section-padding bg-regent-charcoal">
      <div className="container-regent">
        <SectionHeading subtitle="Recognition" title="AWARDS & MEMBERSHIPS" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {awards.map((award, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="aspect-square border border-border bg-card/50 flex items-center justify-center p-4 hover:border-primary/40 transition-colors duration-300"
            >
              <img
                src={award.image}
                alt={award.alt}
                className="w-full h-full object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
