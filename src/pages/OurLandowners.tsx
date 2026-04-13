import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  ShieldCheck, PenTool, FileText, BarChart3, Wallet, Handshake,
  Scale, Rocket, HardHat, HeartHandshake, FileCheck, Clock, Send,
} from "lucide-react";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Superior Construction Quality",
    desc: "We ensure the highest construction standards, which significantly increases the market value of the apartments compared to others in the same area. All materials undergo PSI testing through BUET to guarantee superior strength and durability.",
  },
  {
    icon: PenTool,
    title: "Expert Design Team",
    desc: "Our Structural, Architectural and other technical designs are prepared by highly skilled professionals from BUET.",
  },
  {
    icon: FileText,
    title: "Strict Compliance with Agreement",
    desc: "The terms and conditions of the Joint Venture Agreement and Power of Attorney are strictly adhered to, ensuring transparency and security for landowners.",
  },
  {
    icon: BarChart3,
    title: "Regular Progress Updates",
    desc: "Landowners are kept informed of the construction progress at every stage of development.",
  },
  {
    icon: Wallet,
    title: "Independent Project Financing",
    desc: "Our construction work is not dependent on apartment sales, ensuring timely or even early handover of the project.",
  },
  {
    icon: Handshake,
    title: "Support in Apartment Sales",
    desc: "Upon request, we actively assist landowners in selling their share of apartments to potential buyers.",
  },
  {
    icon: Scale,
    title: "Rigorous Legal Vetting",
    desc: "Before executing the Power of Attorney, we conduct thorough legal vetting of land documents through specialist property lawyers. Any missing documents, errors, or ownership issues are identified and rectified, ensuring hassle-free mortgage processing or property loan approvals for landowners later.",
  },
  {
    icon: Rocket,
    title: "Immediate Mobilization",
    desc: "We start mobilization and construction activities immediately after executing the Power of Attorney — unlike many developers who delay work for years.",
  },
  {
    icon: HardHat,
    title: "Professional Supervision",
    desc: "Highly qualified engineers and staff supervise the construction process to ensure strict adherence to quality and safety standards.",
  },
  {
    icon: HeartHandshake,
    title: "Post-Handover Support",
    desc: "After the official handover, we provide necessary logistical support to landowners. We also help form a Building Association Committee to manage utilities, maintenance, and common services efficiently.",
  },
  {
    icon: FileCheck,
    title: "Registration & Mutation Support",
    desc: "We assist landowners with property registration and mutation processes whenever needed.",
  },
  {
    icon: Clock,
    title: "Timely or Early Project Handover",
    desc: "We have consistently handed over projects not only on time but often ahead of the scheduled delivery date.",
  },
];

const OurLandowners = () => {
  const [form, setForm] = useState({
    name: "", mobile: "", email: "", landSize: "",
    frontRoad: "", landFacing: "", landLocation: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 md:pt-32 pb-16 md:pb-20 px-4 bg-regent-charcoal">
        <div className="container-regent text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-primary text-xs uppercase tracking-[0.3em]">For Landowners</span>
            <h1 className="text-2xl md:text-5xl font-light tracking-wide mt-4 text-foreground uppercase">Our Landowners</h1>
            <div className="w-16 h-[2px] bg-primary mt-6 mx-auto" />
            <p className="text-muted-foreground mt-6 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              12 Reasons Why Landowners Should Choose REGENT for Joint Venture "Land Development"
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
            <span className="text-primary text-xs uppercase tracking-[0.3em]">Land Development Inquiry</span>
            <h2 className="text-2xl md:text-4xl font-light tracking-wide mt-4 text-foreground uppercase">Contact Us</h2>
            <div className="w-12 h-[2px] bg-primary mt-4 mx-auto" />
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              { key: "name", label: "Name", type: "text" },
              { key: "mobile", label: "Mobile", type: "tel" },
              { key: "email", label: "Email", type: "email" },
              { key: "landSize", label: "Land Size", type: "text" },
              { key: "frontRoad", label: "Front Road", type: "text" },
              { key: "landFacing", label: "Land Facing", type: "text" },
              { key: "landLocation", label: "Land Location", type: "text" },
            ].map((field) => (
              <input
                key={field.key}
                type={field.type}
                placeholder={field.label}
                value={form[field.key as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                maxLength={field.type === "email" ? 255 : 200}
                required={["name", "mobile", "email", "landLocation"].includes(field.key)}
                className="w-full bg-transparent border-b border-border py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            ))}
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

export default OurLandowners;
