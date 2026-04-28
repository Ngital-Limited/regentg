import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Landmark, HeadphonesIcon, ShieldCheck, PenTool, Wallet,
  Scale, HardHat, HeartHandshake, FileCheck, Clock, Send,
} from "lucide-react";

const reasons = [
  {
    icon: Landmark,
    title: "Home Loan Assistance",
    desc: "We assist clients in processing home loans by liaising with reputed financial institutions and providing all necessary documents consistent with their legal vetting requirements.",
  },
  {
    icon: HeadphonesIcon,
    title: "Prompt Customer Service",
    desc: "We are committed to delivering timely and efficient customer service with no delays.",
  },
  {
    icon: ShieldCheck,
    title: "Superior Construction Quality",
    desc: "We ensure the highest construction standards, leading to higher resale value compared to other buildings in the same area. All materials undergo PSI testing through BUET to guarantee their strength and quality.",
  },
  {
    icon: PenTool,
    title: "Expert Design Team",
    desc: "Our Structural, Architectural and other project designs are prepared by highly skilled professionals from BUET.",
  },
  {
    icon: Wallet,
    title: "Independent Project Financing",
    desc: "Construction is not dependent on apartment sales, ensuring timely handover of all projects.",
  },
  {
    icon: Scale,
    title: "Rigorous Legal Vetting",
    desc: "Before executing Power of Attorney agreements with landowners, we conduct a thorough legal vetting of project documents by specialist property lawyers.",
  },
  {
    icon: HardHat,
    title: "Professional Supervision",
    desc: "Our buildings are constructed under the supervision of highly qualified engineers and technical staff.",
  },
  {
    icon: HeartHandshake,
    title: "Post-Handover Support",
    desc: "After handing over the project, we continue to provide logistical support when needed.",
  },
  {
    icon: FileCheck,
    title: "Registration & Mutation Assistance",
    desc: "We offer complete support for property registration and mutation processes.",
  },
  {
    icon: Clock,
    title: "Timely Handover",
    desc: "We have consistently handed over projects on or before the scheduled time — exceeding client expectations.",
  },
];

const OurClients = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <SEO title="Our Clients" description="Trusted by 400+ happy families and corporate clients across Dhaka. See why Regent is Bangladesh's preferred real estate developer." path="/our-clients" />
      <section className="pt-28 md:pt-32 pb-16 md:pb-20 px-4 bg-regent-charcoal">
        <div className="container-regent text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-primary text-xs uppercase tracking-[0.3em]">For Buyers</span>
            <h1 className="text-2xl md:text-5xl font-light tracking-wide mt-4 text-foreground uppercase">Our Clients</h1>
            <div className="w-16 h-[2px] bg-primary mt-6 mx-auto" />
            <p className="text-muted-foreground mt-6 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              10 Reasons Why You Should Purchase an Apartment from REGENT
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-regent">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reasons.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="flex gap-5 p-6 border border-border bg-card hover:border-primary/30 transition-all group"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground uppercase tracking-wider mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-regent-charcoal">
        <div className="container-regent max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-primary text-xs uppercase tracking-[0.3em]">Get In Touch</span>
            <h2 className="text-2xl md:text-4xl font-light tracking-wide mt-4 text-foreground uppercase">Contact Us</h2>
            <div className="w-12 h-[2px] bg-primary mt-4 mx-auto" />
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              maxLength={100}
              required
              className="w-full bg-transparent border-b border-border py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              maxLength={255}
              required
              className="w-full bg-transparent border-b border-border py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              maxLength={20}
              required
              className="w-full bg-transparent border-b border-border py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
            <button
              type="submit"
              className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary border border-primary px-8 py-3 hover:bg-primary hover:text-primary-foreground transition-all mt-4"
            >
              <Send className="w-4 h-4" />
              Submit
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OurClients;
