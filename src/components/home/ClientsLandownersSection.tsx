import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Users, Landmark, ArrowRight } from "lucide-react";
import SectionHeading from "../SectionHeading";

const cards = [
  {
    icon: Users,
    title: "Our Clients",
    subtitle: "For Apartment Buyers",
    desc: "Discover 10 reasons why you should purchase an apartment from Regent.",
    link: "/our-clients",
  },
  {
    icon: Landmark,
    title: "Our Landowners",
    subtitle: "For Joint Venture Partners",
    desc: "Explore 12 reasons why landowners should choose Regent for land development.",
    link: "/our-landowners",
  },
];

const ClientsLandownersSection = () => {
  return (
    <section className="section-padding bg-regent-charcoal">
      <div className="container-regent">
        <SectionHeading subtitle="Who We Serve" title="CLIENTS & LANDOWNERS" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <Link
                to={card.link}
                className="block p-8 md:p-10 border border-border bg-card hover:border-primary/30 transition-all group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <card.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-primary text-[10px] uppercase tracking-[0.3em]">{card.subtitle}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-light tracking-wide text-foreground uppercase mb-3 group-hover:text-primary transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{card.desc}</p>
                <div className="flex items-center gap-2 text-primary text-xs uppercase tracking-[0.2em]">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsLandownersSection;
