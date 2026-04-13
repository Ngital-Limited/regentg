import { motion } from "framer-motion";
import { Shield, Eye, Ruler, Clock, Award, Handshake } from "lucide-react";
import SectionHeading from "../SectionHeading";

const features = [
  {
    icon: Shield,
    title: "QUALITY MATERIALS",
    description: "Our apartments are built with the finest quality materials, ensuring durability, luxury, and long-lasting value.",
  },
  {
    icon: Eye,
    title: "BUILD TO PERFECTION",
    description: "At RDDL, we turn Vision into Reality—our buildings are crafted exactly as envisioned in our 3D brochures, ensuring what you see is what you get.",
  },
  {
    icon: Ruler,
    title: "ARCHITECTURAL DESIGN",
    description: "RDDL apartments showcase modern architectural design that seamlessly blends aesthetics, functionality, and innovation. With thoughtfully planned layouts, expansive windows for natural light, and premium finishes.",
  },
  {
    icon: Clock,
    title: "ON TIME HANDOVER",
    description: "Our track record of delivering over 400 apartments across Dhaka on schedule reflects our unwavering commitment to meeting deadlines without compromising quality.",
  },
  {
    icon: Award,
    title: "CREDIBILITY",
    description: "At RDDL we don't just build apartments — we build trust. RDDL has established credibility amongst homebuyers through consistent quality and transparent dealings.",
  },
  {
    icon: Handshake,
    title: "CUSTOMER SATISFACTION",
    description: "We prioritize our clients' needs at every step — from consultation to handover — ensuring a seamless, transparent, and personalized home-buying experience.",
  },
];

const WhyRegent = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-regent">
        <SectionHeading
          subtitle="Why Choose Us"
          title="WHAT MAKES US UNIQUE"
          description="Six pillars that define the Regent experience and set us apart in the industry."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group p-8 border border-border bg-card hover:border-primary/30 transition-all duration-500"
            >
              <feature.icon className="w-8 h-8 text-primary mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-sm uppercase tracking-[0.2em] text-foreground mb-4 font-medium">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyRegent;
