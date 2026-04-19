import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import ContactButton from "@/components/ContactButton";
import SectionHeading from "@/components/SectionHeading";
import { motion } from "framer-motion";
import { Leaf, Sun, Droplets, Recycle, TreePine, Wind, Building2, HeartHandshake } from "lucide-react";
import { Link } from "react-router-dom";

const pillars = [
  {
    icon: Building2,
    title: "Green Buildings",
    desc: "Energy-efficient designs, optimized orientation, and natural cross-ventilation reduce dependency on artificial cooling and lighting.",
  },
  {
    icon: Sun,
    title: "Renewable Energy",
    desc: "Solar-ready rooftops, LED lighting in common areas, and high-efficiency HVAC systems lower the carbon footprint of every project.",
  },
  {
    icon: Droplets,
    title: "Water Stewardship",
    desc: "Rainwater harvesting, low-flow fixtures, and reuse of treated greywater protect Dhaka's most precious resource.",
  },
  {
    icon: Recycle,
    title: "Responsible Materials",
    desc: "Locally sourced stone, certified timber, and recycled aggregates minimize embodied carbon across the supply chain.",
  },
  {
    icon: TreePine,
    title: "Landscaped Living",
    desc: "Rooftop gardens, native planting, and shaded community spaces bring biodiversity back into the urban fabric.",
  },
  {
    icon: HeartHandshake,
    title: "Community Wellbeing",
    desc: "Safe, inclusive, and accessible spaces designed to nurture long-term resident health, comfort, and social connection.",
  },
];

const stats = [
  { value: "30%", label: "Reduction in Common-Area Energy Use" },
  { value: "100%", label: "BNBC-Compliant Earthquake-Safe Structures" },
  { value: "40+", label: "Projects with Landscaped Rooftops" },
  { value: "1981", label: "Building Responsibly Since" },
];

const initiatives = [
  {
    title: "Designed for Daylight",
    desc: "Every floor plan is optimized for natural light and ventilation, reducing artificial energy demand throughout the day.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Rooftop Reimagined",
    desc: "Heat-protective roof treatments and landscaped community spaces transform rooftops into functional green retreats.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Built to Last",
    desc: "BUET-certified structural engineering ensures every Regent home stands resilient for generations to come.",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1200&q=80",
  },
];

const Sustainability = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <SEO title="Sustainability" description="Regent's commitment to sustainable building — green design, water stewardship, responsible materials, and community wellbeing." path="/sustainability" />
      {/* Hero */}
      <section className="pt-28 md:pt-32 pb-16 md:pb-20 px-4 bg-regent-charcoal">
        <div className="container-regent text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-primary text-xs uppercase tracking-[0.3em]">Our Commitment</span>
            <h1 className="text-3xl md:text-6xl font-light tracking-wide mt-4 text-foreground">
              SUSTAINABILITY
            </h1>
            <p className="text-muted-foreground text-sm md:text-base mt-4 max-w-2xl mx-auto">
              Building responsibly for the people of today and the generations of tomorrow.
            </p>
            <div className="w-16 h-[2px] bg-primary mt-6 mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 md:py-28">
        <div className="container-regent grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[11px] uppercase tracking-[0.3em] text-primary mb-4">A Greener Skyline</p>
            <h2 className="text-3xl md:text-4xl font-extralight uppercase tracking-[0.1em] text-foreground mb-6 leading-tight">
              Designing Homes That Respect The Planet
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              At Regent Design & Development Ltd, sustainability is not an afterthought — it is woven into every
              decision we make, from site selection to material sourcing, from structural design to handover.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We believe great architecture must serve both people and planet. Our projects are engineered to
              minimize environmental impact while maximizing comfort, safety, and long-term value for residents.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="border border-border/60 bg-card/50 p-6 md:p-8 text-center hover:border-primary/40 transition-colors"
              >
                <div className="text-3xl md:text-4xl font-light text-primary mb-2">{s.value}</div>
                <div className="text-[10px] md:text-xs uppercase tracking-[0.18em] text-muted-foreground leading-snug">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-20 md:py-28 bg-card/40 border-y border-border/40">
        <div className="container-regent">
          <SectionHeading
            subtitle="Our Pillars"
            title="Six Principles, One Vision"
            description="The foundation of every sustainable Regent project."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group relative border border-border/60 bg-background/40 p-8 hover:border-primary/50 transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-500">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg uppercase tracking-[0.14em] text-foreground mb-3 font-light">
                      {p.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Initiatives */}
      <section className="py-20 md:py-28">
        <div className="container-regent">
          <SectionHeading
            subtitle="In Action"
            title="Initiatives That Matter"
            description="From design philosophy to daily living, sustainability shapes every Regent project."
          />

          <div className="space-y-16 md:space-y-24 mt-16">
            {initiatives.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className={`grid md:grid-cols-2 gap-8 md:gap-16 items-center ${
                  i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden border border-border/40">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-[0.3em] text-primary">
                    0{i + 1} — Initiative
                  </span>
                  <h3 className="text-2xl md:text-3xl font-extralight uppercase tracking-[0.1em] text-foreground mt-3 mb-5">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-card/40 border-t border-border/40">
        <div className="container-regent">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden border border-primary/30 bg-background/60 px-8 py-16 md:px-16 md:py-20 text-center"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.18),transparent_60%)]" />
            <div className="relative">
              <Wind className="w-10 h-10 text-primary mx-auto mb-6" />
              <h2 className="text-2xl md:text-4xl font-extralight uppercase tracking-[0.12em] text-foreground mb-5">
                Build a Greener Future With Us
              </h2>
              <p className="max-w-2xl mx-auto text-muted-foreground leading-relaxed mb-8">
                Discover how Regent's sustainable approach can shape your next home or partnership.
                Connect with our team to learn more.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-xs uppercase tracking-[0.22em] hover:bg-primary/90 transition-colors"
              >
                Get In Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ContactButton />
    </div>
  );
};

export default Sustainability;
