import { useState } from "react";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import ApplyDialog from "@/components/ApplyDialog";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, MapPin, Clock, ChevronDown, GraduationCap, Calendar } from "lucide-react";

interface JobOpening {
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  deadline: string;
  overview: string;
  responsibilities: string[];
  requirements: string[];
}

const openings: JobOpening[] = [
  {
    title: "Marketing Executive",
    department: "Marketing",
    location: "Banani, Dhaka",
    type: "Full-time",
    experience: "2–4 years",
    deadline: "Open until filled",
    overview:
      "Drive Regent's brand presence across digital and offline channels. Plan campaigns, produce engaging content, and grow the funnel of qualified leads for our projects.",
    responsibilities: [
      "Plan and execute marketing campaigns across digital and traditional media",
      "Manage social media channels, website content, and email campaigns",
      "Coordinate with creative agencies, photographers, and videographers",
      "Track campaign performance and prepare monthly reporting",
      "Support events, project launches, and REHAB fair activations",
      "Generate and qualify leads in coordination with the sales team",
    ],
    requirements: [
      "BBA / MBA in Marketing or related field",
      "2–4 years of marketing experience (real estate experience a plus)",
      "Hands-on with Meta Ads, Google Ads, GA4, and basic design tools (Canva / Figma)",
      "Excellent written communication in English and Bangla",
      "Creative thinker with strong organizational and analytical skills",
    ],
  },
  {
    title: "Sales Manager",
    department: "Sales",
    location: "Banani, Dhaka",
    type: "Full-time",
    experience: "6+ years",
    deadline: "Open until filled",
    overview:
      "Lead the sales function for Regent's premium residential portfolio. Build a high-performing sales team and convert qualified inquiries into long-term customer relationships.",
    responsibilities: [
      "Drive monthly, quarterly, and annual sales targets across all projects",
      "Lead, coach, and develop a team of sales executives",
      "Conduct project presentations, site visits, and client negotiations",
      "Maintain a strong CRM pipeline and accurate sales forecasting",
      "Build and maintain relationships with high-net-worth clients and channel partners",
      "Collaborate with marketing on lead-generation strategy and campaigns",
    ],
    requirements: [
      "BBA / MBA in Sales, Marketing, or related field",
      "Minimum 6 years of sales experience, with 2+ years in real estate",
      "Proven track record of closing premium residential deals",
      "Strong negotiation, presentation, and team-leadership skills",
      "Existing network among real estate buyers / brokers is a strong plus",
    ],
  },
];

const Career = () => {
  const [openJob, setOpenJob] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleExpand = (title: string) =>
    setExpanded((prev) => (prev === title ? null : title));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SEO
        title="Careers"
        description="Join Regent Design & Development Ltd. Explore career opportunities with one of Bangladesh's most trusted real estate developers."
        path="/career"
      />
      <section className="pt-28 md:pt-32 pb-16 md:pb-20 px-4 bg-regent-charcoal">
        <div className="container-regent text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-primary text-xs capitalize tracking-[0.3em]">Join Our Team</span>
            <h1 className="text-3xl md:text-6xl font-light tracking-wide mt-4 text-foreground">CAREERS</h1>
            <div className="w-16 h-[2px] bg-primary mt-6 mx-auto" />
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-regent max-w-4xl">
          <SectionHeading
            subtitle="Opportunities"
            title="OPEN POSITIONS"
            description="Be part of a team that's shaping the skyline of Dhaka."
          />

          <div className="space-y-6">
            {openings.map((job, i) => {
              const isOpen = expanded === job.title;
              return (
                <motion.div
                  key={job.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="border border-border bg-card hover:border-primary/30 transition-all group overflow-hidden"
                >
                  <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-base font-medium text-foreground group-hover:text-primary transition-colors">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 mt-2">
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Briefcase className="w-3 h-3" />
                          {job.department}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {job.type}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        onClick={() => toggleExpand(job.title)}
                        aria-expanded={isOpen}
                        className="px-5 py-2 border border-border text-foreground/80 text-xs uppercase tracking-[0.2em] hover:border-primary hover:text-primary transition-all flex items-center gap-2"
                      >
                        {isOpen ? "Hide Details" : "View Details"}
                        <ChevronDown
                          className="w-3 h-3"
                          style={{
                            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.25s ease",
                          }}
                        />
                      </button>
                      <button
                        onClick={() => setOpenJob(job.title)}
                        className="px-6 py-2 border border-primary text-primary text-xs uppercase tracking-[0.2em] hover:bg-primary hover:text-primary-foreground transition-all"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="details"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="border-t border-border"
                      >
                        <div className="p-6 md:p-8 space-y-6">
                          <div className="flex flex-wrap gap-x-6 gap-y-2">
                            <span className="flex items-center gap-2 text-xs text-muted-foreground">
                              <GraduationCap className="w-3.5 h-3.5 text-primary" />
                              Experience: <span className="text-foreground/80">{job.experience}</span>
                            </span>
                            <span className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Calendar className="w-3.5 h-3.5 text-primary" />
                              Deadline: <span className="text-foreground/80">{job.deadline}</span>
                            </span>
                          </div>

                          <div>
                            <h4 className="text-[10px] uppercase tracking-[0.3em] text-primary mb-2">Overview</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed text-justify">
                              {job.overview}
                            </p>
                          </div>

                          <div>
                            <h4 className="text-[10px] uppercase tracking-[0.3em] text-primary mb-3">
                              Key Responsibilities
                            </h4>
                            <ul className="space-y-2">
                              {job.responsibilities.map((item, idx) => (
                                <li
                                  key={idx}
                                  className="flex gap-3 text-sm text-muted-foreground leading-relaxed"
                                >
                                  <span className="text-primary mt-1.5 w-1 h-1 rounded-full bg-primary shrink-0" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-[10px] uppercase tracking-[0.3em] text-primary mb-3">
                              Requirements
                            </h4>
                            <ul className="space-y-2">
                              {job.requirements.map((item, idx) => (
                                <li
                                  key={idx}
                                  className="flex gap-3 text-sm text-muted-foreground leading-relaxed"
                                >
                                  <span className="text-primary mt-1.5 w-1 h-1 rounded-full bg-primary shrink-0" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 p-8 border border-border bg-card text-center"
          >
            <p className="text-sm text-muted-foreground mb-4">
              Don't see a suitable position? Send your CV to:
            </p>
            <a href="mailto:info@regentgroup.com.bd" className="text-primary text-sm hover:underline">
              info@regentgroup.com.bd
            </a>
          </motion.div>
        </div>
      </section>
      <Footer />
      <ApplyDialog
        open={!!openJob}
        onOpenChange={(o) => !o && setOpenJob(null)}
        jobTitle={openJob ?? ""}
      />
    </div>
  );
};

export default Career;
