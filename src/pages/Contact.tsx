import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, Clock, Globe, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    setSubmitted(true);
    toast({ title: "Message sent successfully!", description: "We'll get back to you shortly." });
  };

  const contactDetails = [
    {
      icon: MapPin,
      label: "Head Office Address",
      value: "Delta Dahlia, Level-5, 36 Kemal Ataturk Avenue, Banani, Dhaka-1213, Bangladesh",
      href: undefined,
    },
    {
      icon: Phone,
      label: "Hotline",
      value: "0181 000 9333",
      href: "tel:01810009333",
    },
    {
      icon: Mail,
      label: "Email",
      value: "info@regentgroup.com.bd",
      href: "mailto:info@regentgroup.com.bd",
    },
    {
      icon: Clock,
      label: "Office Hours",
      value: "Saturday – Thursday: 10:00 AM – 6:00 PM",
      href: undefined,
    },
    {
      icon: Globe,
      label: "Website",
      value: "www.regentgroup.com.bd",
      href: "https://regentgroup.com.bd",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 bg-regent-charcoal">
        <div className="container-regent text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-primary text-xs uppercase tracking-[0.3em]">Get In Touch</span>
            <h1 className="text-4xl md:text-6xl font-light tracking-wide mt-4 text-foreground">CONTACT US</h1>
            <div className="w-16 h-[2px] bg-primary mt-6 mx-auto" />
            <p className="text-muted-foreground mt-4 text-sm max-w-lg mx-auto">
              We'd love to hear from you. Reach out to discuss your dream home or any queries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-background">
        <div className="container-regent">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Head Office */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center bg-primary/10 border border-primary/20">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-light tracking-wide text-foreground uppercase">Head Office</h2>
              </div>

              <div className="space-y-0">
                {contactDetails.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex items-start gap-4 p-5 border border-border/50 -mt-px first:mt-0 hover:bg-card/40 transition-colors group"
                  >
                    <div className="w-9 h-9 flex items-center justify-center bg-primary/5 border border-primary/10 shrink-0 group-hover:bg-primary/10 transition-colors">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                          className="text-sm text-foreground hover:text-primary transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm text-foreground leading-relaxed">{item.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Map */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8 aspect-video border border-border overflow-hidden relative"
              >
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=90.39%2C23.785%2C90.41%2C23.795&layer=mapnik&marker=23.79%2C90.4"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)" }}
                  allowFullScreen
                  loading="lazy"
                  title="Office Location - Banani, Dhaka"
                />
                <a
                  href="https://www.openstreetmap.org/?mlat=23.79&mlon=90.4#map=16/23.79/90.4"
                  target="_blank"
                  rel="noreferrer"
                  className="absolute bottom-3 right-3 px-3 py-1.5 bg-background/90 backdrop-blur-sm border border-border text-[10px] uppercase tracking-[0.15em] text-foreground hover:text-primary hover:border-primary transition-all"
                >
                  Open Full Map
                </a>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center bg-primary/10 border border-primary/20">
                  <Send className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-light tracking-wide text-foreground uppercase">Send a Message</h2>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="border border-primary/30 bg-primary/5 p-12 text-center"
                >
                  <CheckCircle className="w-14 h-14 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-light tracking-wide text-foreground mb-2">Thank You!</h3>
                  <p className="text-sm text-muted-foreground mb-6">Your message has been received. Our team will respond within 24 hours.</p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}
                    className="px-6 py-2.5 border border-border text-xs uppercase tracking-[0.2em] text-foreground hover:border-primary hover:text-primary transition-all"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[
                      { key: "name", label: "Full Name *", type: "text", placeholder: "Your full name" },
                      { key: "email", label: "Email Address *", type: "email", placeholder: "your@email.com" },
                      { key: "phone", label: "Phone Number", type: "tel", placeholder: "+880 1XXX XXXXXX" },
                      { key: "subject", label: "Subject", type: "text", placeholder: "How can we help?" },
                    ].map((field) => (
                      <div key={field.key}>
                        <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2 block">{field.label}</label>
                        <input
                          type={field.type}
                          value={form[field.key as keyof typeof form]}
                          onChange={(e) => setForm((p) => ({ ...p, [field.key]: e.target.value }))}
                          className="w-full bg-card/50 border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:bg-card/80 transition-all"
                          placeholder={field.placeholder}
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2 block">Message *</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                      rows={6}
                      className="w-full bg-card/50 border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:bg-card/80 transition-all resize-none"
                      placeholder="Tell us about your requirements..."
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <p className="text-[10px] text-muted-foreground/60">* Required fields</p>
                    <button
                      type="submit"
                      className="group flex items-center gap-3 px-8 py-3.5 bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] hover:bg-primary/90 transition-all"
                    >
                      <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
