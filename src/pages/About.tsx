import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import { motion } from "framer-motion";
import { Target, Eye, Users } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 bg-regent-charcoal">
        <div className="container-regent text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-primary text-xs uppercase tracking-[0.3em]">About Us</span>
            <h1 className="text-4xl md:text-6xl font-light tracking-wide mt-4 text-foreground">
              SHAPING MODERN LIFESTYLES
            </h1>
            <p className="text-muted-foreground text-sm md:text-base mt-4 max-w-2xl mx-auto">
              Through Quality, Innovation, and On-Time Delivery
            </p>
            <div className="w-16 h-[2px] bg-primary mt-6 mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Company Story */}
      <section className="section-padding bg-background">
        <div className="container-regent max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
              Regent Design & Development Ltd (RDDL) is one of the fastest-growing flagship companies of Regent Group, successfully developing joint-venture projects across prime areas of Dhaka. Guided by our mission to "Creating a Lifestyle with Timely Handover of Projects"— RDDL is steadily expanding both in size and scope.
            </p>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
              With a strong track record of delivering high-quality projects ahead of schedule, RDDL continues to make a positive impact through every development. Our ability to adapt and transform each opportunity into a successful venture has allowed us to not only navigate but emerge stronger from challenging market conditions.
            </p>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              RDDL upholds an enduring commitment to quality, timely project handovers and apartment owner satisfaction — the foundation of every apartment we build. Combining your dream with our expertise, we create the perfect balance between vision and execution. Each of our apartments stands as a masterpiece of craftsmanship, built with meticulous attention to detail and a standard of finish that is second to none.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="section-padding bg-regent-charcoal">
        <div className="container-regent">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: "Our Mission", text: "Creating a Lifestyle with Timely Handover" },
              { icon: Eye, title: "Our Vision", text: "To Become the Leading & Most Trusted Real Estate Developer of Bangladesh" },
              { icon: Users, title: "Our Values", text: "Quality, Transparency, Timely Delivery, Innovation, and Customer-Centric approach in everything we do." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 border border-border bg-card"
              >
                <item.icon className="w-8 h-8 text-primary mb-6" />
                <h3 className="text-sm uppercase tracking-[0.2em] text-foreground mb-4 font-medium">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership placeholder */}
      <section className="section-padding bg-background">
        <div className="container-regent">
          <SectionHeading subtitle="Leadership" title="OUR TEAM" description="Guided by experienced leaders who share a passion for excellence." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Chairman", "Managing Director", "Director"].map((role, i) => (
              <motion.div
                key={role}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="aspect-[3/4] bg-card border border-border mb-6 flex items-center justify-center">
                  <span className="text-muted-foreground text-xs uppercase tracking-[0.2em]">Photo</span>
                </div>
                <p className="text-xs uppercase tracking-[0.2em] text-primary">{role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
