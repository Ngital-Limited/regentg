import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import { motion } from "framer-motion";
import { Target, Eye, Users, Clock, Building2, Home, Ruler, UsersRound, CalendarCheck } from "lucide-react";

const stats = [
  { icon: CalendarCheck, value: "44+", label: "Years of Group Legacy", desc: "Building on the Regent Group's trusted foundation established in 1981." },
  { icon: Clock, value: "100%", label: "On-Time Project Handover", desc: "A proven track record of delivering every single project on or ahead of schedule." },
  { icon: Building2, value: "50+", label: "Joint-Venture Projects", desc: "Successfully completed projects in prime locations across Dhaka." },
  { icon: Home, value: "1,500+", label: "Happy Families Housed", desc: "Crafting dream homes and earning the trust of thousands of satisfied clients and customers." },
  { icon: Ruler, value: "5M+", label: "Square Feet Developed", desc: "Demonstrating our extensive experience in creating quality residential and commercial spaces." },
  { icon: UsersRound, value: "100+", label: "In-House Professionals", desc: "A dedicated team of expert engineers, architects, and technical staff ensuring excellence." },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <SEO title="About Us" description="Discover Regent Design & Development Ltd — a legacy of trust, quality, and on-time real estate delivery in Bangladesh since 1981." path="/about" />
      {/* Hero */}
      <section className="pt-28 md:pt-32 pb-16 md:pb-20 px-4 bg-regent-charcoal">
        <div className="container-regent text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-primary text-xs uppercase tracking-[0.3em]">About Us</span>
            <h1 className="text-3xl md:text-6xl font-light tracking-wide mt-4 text-foreground">
              SHAPING MODERN LIFESTYLES
            </h1>
            <p className="text-muted-foreground text-sm md:text-base mt-4 max-w-2xl mx-auto">
              Through Quality, Innovation, and On-Time Delivery
            </p>
            <div className="w-16 h-[2px] bg-primary mt-6 mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-padding bg-background">
        <div className="container-regent max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-foreground text-lg md:text-xl leading-relaxed mb-8 font-light text-center">
              With A Legacy Of Trust Dating Back To 1981, We Build Dream Homes And Create Lasting Value Through An Unwavering Commitment To Quality And On-Time Delivery.
            </p>
            <div className="w-12 h-[1px] bg-primary/40 mx-auto mb-8" />
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6 text-justify">
              Founded on the principles of Honesty, Service, and Commitment, Regent Group began its journey in 1981. Since then, it has expanded its operations across a wide range of sectors, including Paper Mills, Ship Breaking, Textiles, Heimtex Mills and Shipping. Regent is the Founder of the Real Estate Housing Project "Purbachal Regent Town"— located adjacent to RAJUK's New Purbachal Town and "Regent Textile Mills Ltd"— a 100% export-oriented composite textile mill based in Chittagong.
            </p>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6 text-justify">
              Driven by a vision of diversification and growth, Regent Group entered the real estate sector with an experienced, dynamic and thoughtful team dedicated to Creating a Lifestyle with Timely Handover of Projects. In response to evolving market demands, Regent has established several sister companies offering a wide range of services — from residential and commercial developments to ready flats and plot sales.
            </p>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed text-justify">
              With an unwavering commitment to quality and reliability, Regent Group has consistently delivered projects without delays, building the dream homes of those who place their trust in us.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="section-padding bg-regent-charcoal">
        <div className="container-regent">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-8 border border-border bg-card/50 group hover:border-primary/30 transition-colors duration-300"
              >
                <stat.icon className="w-6 h-6 text-primary mb-4" />
                <h3 className="text-3xl md:text-4xl font-light text-primary mb-2">{stat.value}</h3>
                <p className="text-sm uppercase tracking-[0.15em] text-foreground font-medium mb-3">{stat.label}</p>
                <p className="text-muted-foreground text-xs leading-relaxed">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Story - RDDL */}
      <section className="section-padding bg-background">
        <div className="container-regent max-w-4xl">
          <SectionHeading subtitle="Our Company" title="REGENT DESIGN & DEVELOPMENT LTD" />
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6 text-justify">
              Regent Design & Development Ltd (RDDL) is one of the fastest-growing flagship companies of Regent Group, successfully developing joint-venture projects across prime areas of Dhaka. Guided by our mission to "Creating a Lifestyle with Timely Handover of Projects"— RDDL is steadily expanding both in size and scope.
            </p>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6 text-justify">
              With a strong track record of delivering high-quality projects ahead of schedule, RDDL continues to make a positive impact through every development. Our ability to adapt and transform each opportunity into a successful venture has allowed us to not only navigate but emerge stronger from challenging market conditions.
            </p>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed text-justify">
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

      {/* Leadership Preview */}
      <section className="section-padding bg-background">
        <div className="container-regent">
          <SectionHeading subtitle="Leadership" title="OUR LEADERS" description="Visionary leadership driving Regent Group's legacy of trust and excellence." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {[
              { name: "Mr. Golam Akbar Khondakar", role: "Founder Chairman", image: "/leaders/golam-akbar-khondakar.webp" },
              { name: "Barrister Tareque Akbar Khondakar", role: "Managing Director", image: "/leaders/tareque-akbar-khondakar.webp" },
              { name: "Galib Akbar Khondakar", role: "Deputy Managing Director", image: "/leaders/galib-akbar-khondakar.webp" },
            ].map((leader, i) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="aspect-square overflow-hidden border border-border mb-6">
                  <img src={leader.image} alt={leader.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-sm font-medium text-foreground mb-1">{leader.name}</h3>
                <p className="text-xs uppercase tracking-[0.2em] text-primary">{leader.role}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <Link
              to="/leaders"
              className="inline-block text-xs uppercase tracking-[0.2em] text-primary border border-primary/30 px-8 py-3 hover:bg-primary/10 transition-colors duration-300"
            >
              View Full Profiles →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
