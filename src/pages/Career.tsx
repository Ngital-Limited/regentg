import { useState } from "react";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import ApplyDialog from "@/components/ApplyDialog";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock } from "lucide-react";

const openings = [
  { title: "Senior Architect", department: "Design", location: "Banani, Dhaka", type: "Full-time" },
  { title: "Civil Engineer", department: "Construction", location: "Banani, Dhaka", type: "Full-time" },
  { title: "Marketing Executive", department: "Marketing", location: "Banani, Dhaka", type: "Full-time" },
  { title: "Sales Manager", department: "Sales", location: "Banani, Dhaka", type: "Full-time" },
];

const Career = () => {
  const [openJob, setOpenJob] = useState<string | null>(null);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SEO title="Careers" description="Join Regent Design & Development Ltd. Explore career opportunities with one of Bangladesh's most trusted real estate developers." path="/career" />
      <section className="pt-28 md:pt-32 pb-16 md:pb-20 px-4 bg-regent-charcoal">
        <div className="container-regent text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-primary text-xs uppercase tracking-[0.3em]">Join Our Team</span>
            <h1 className="text-3xl md:text-6xl font-light tracking-wide mt-4 text-foreground">CAREERS</h1>
            <div className="w-16 h-[2px] bg-primary mt-6 mx-auto" />
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-regent max-w-4xl">
          <SectionHeading subtitle="Opportunities" title="OPEN POSITIONS" description="Be part of a team that's shaping the skyline of Dhaka." />

          <div className="space-y-6">
            {openings.map((job, i) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="border border-border bg-card p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-primary/30 transition-all group"
              >
                <div>
                  <h3 className="text-base font-medium text-foreground group-hover:text-primary transition-colors">{job.title}</h3>
                  <div className="flex flex-wrap gap-4 mt-2">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground"><Briefcase className="w-3 h-3" />{job.department}</span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="w-3 h-3" />{job.location}</span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="w-3 h-3" />{job.type}</span>
                  </div>
                </div>
                <button className="px-6 py-2 border border-primary text-primary text-xs uppercase tracking-[0.2em] hover:bg-primary hover:text-primary-foreground transition-all shrink-0">
                  Apply Now
                </button>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 p-8 border border-border bg-card text-center"
          >
            <p className="text-sm text-muted-foreground mb-4">Don't see a suitable position? Send your CV to:</p>
            <a href="mailto:info@regentgroup.com.bd" className="text-primary text-sm hover:underline">info@regentgroup.com.bd</a>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Career;
