import { motion } from "framer-motion";
import SectionHeading from "../SectionHeading";

const AboutSection = () => {
  return (
    <section className="section-padding bg-regent-charcoal">
      <div className="container-regent">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <SectionHeading subtitle="About Us" title="REGENT DESIGN & DEVELOPMENT LTD" align="left" />
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Regent Design & Development Ltd (RDDL) is one of the leading real estate companies in Bangladesh.
              With a proven track record of delivering over 400 apartments across Dhaka, we have established
              ourselves as a trusted name in the industry.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
              Our commitment to quality, innovation, and timely delivery has made us the preferred choice
              for discerning homebuyers who seek nothing but the best.
            </p>
            <a href="/about" className="inline-block px-8 py-3 border border-primary text-primary text-sm uppercase tracking-[0.2em] hover:bg-primary hover:text-primary-foreground transition-all">
              Learn More
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative aspect-square"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-regent-charcoal border border-border" />
            <div className="absolute inset-8 border border-primary/20 flex items-center justify-center">
              <div className="text-center space-y-2">
                <span className="text-5xl md:text-7xl font-light text-primary">400+</span>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Apartments Delivered</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
