import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const leaders = [
  {
    name: "MR. GOLAM AKBAR KHONDAKAR",
    title: "Founder Chairman",
    org: "Regent Group",
    image: "/leaders/golam-akbar-khondakar.webp",
    bio: [
      "Mr. Golam Akbar Khondakar is the Founder Chairman of Regent Group, a diversified business conglomerate with business interests spanning Paper Mill, Textile, Real Estate, Chemical and Shipping. He holds a Bachelor's (Hons) and Master's degree in Political Science from the University of Chittagong.",
      "Born into a distinguished business family in Chittagong, Mr. Akbar carries forward the legacy of his father, the late Mohammad Al-Haj M. A. H. Khondakar, a pioneering entrepreneur with interests in the paper, leather, and oil industries since the 1950s.",
      "In addition to his business leadership, Mr. Akbar has held notable public positions. He served as the Member of Parliament for Chittagong-06 (Raozan), was appointed as Bangladesh's Ambassador to the Sultanate of Oman and is a Senate Member of the University of Chittagong. He currently serves as an Advisor to the Former Prime Minister of Bangladesh, Begum Khaleda Zia of Bangladesh Nationalist Party (BNP) & is the Convenor of Chittagong District BNP (North).",
      "A passionate traveler, Mr. Akbar has visited over 30 countries across Asia, Europe and North America gaining invaluable global insights. In his leisure time, he cherishes time with his family and actively participates in philanthropic initiatives.",
    ],
  },
  {
    name: "BARRISTER TAREQUE AKBAR KHONDAKAR\n",
    title: "Managing Director",
    org: "Regent Group & Chairman, RDDL",
    image: "/leaders/tareque-akbar-khondakar.webp",
    bio: [
      "Barrister Tareque Akbar Khondakar is the Managing Director of Regent Group and is the Chairman of Regent Design & Development Ltd. He holds an LLB (BA Hons) and LLM in Corporate & Commercial Law, both with First Class/Distinction from Queen Mary, University of London—one of the United Kingdom's top five law schools. He further completed the Bar Professional Training Course (BPTC) from The University of Law and is a Member of The Honourable Society of Lincoln's Inn.",
      "Barrister Tareque has a robust academic and professional background in legal education and practice. He served as a Part-Lecturer in Law at Queen Mary, University of London and practiced Corporate & Commercial Law at Syed Ishtiaq Ahmed & Associates, one of Bangladesh's leading law firms.",
      "In his early academic years, he was honored with the prestigious \"Daily Star Award\" for achieving the highest marks in Bangladesh in Biology, Chemistry and Mathematics in Edexcel GCE O Levels and A Levels.",
      "Beyond his legal and corporate pursuits, Barrister Tareque is the Founder of Youth Voice of Bangladesh (YVB)—a prominent youth development organization dedicated to promoting youth leadership and awareness.",
    ],
  },
  {
    name: "GALIB AKBAR KHONDAKAR",
    title: "Deputy Managing Director",
    org: "Regent Group",
    image: "/leaders/galib-akbar-khondakar.webp",
    bio: [
      "Galib Akbar Khondakar serves as the Deputy Managing Director of Regent Group, playing a key role in the group's strategic operations and business development. He holds a Bachelor of Arts in Business Studies (BBA) from the University of Wales and a Master of Business Administration (MBA) from the University of Bedfordshire.",
      "In addition to his business qualifications, Mr. Galib has a strong foundation in legal studies, having completed a Diploma-in-Law from the University of London. His early academic journey includes completing GCE O Levels and A Levels from Scholastica, Dhaka, following his formative education at The British School Muscat—one of the premier international schools in the Sultanate of Oman.",
      "With a diverse educational background and international exposure, Mr. Galib brings a global perspective to the Regent Group's continued growth and innovation.",
    ],
  },
];

const Leaders = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <SEO title="Our Leaders" description="Meet the leadership team behind Regent Design & Development Ltd — visionaries shaping Bangladesh's real estate landscape." path="/leaders" />
      {/* Hero */}
      <section className="pt-28 md:pt-32 pb-16 md:pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-regent-charcoal via-background to-background" />
        <div className="container-regent text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-primary text-xs uppercase tracking-[0.3em]">Leadership</span>
            <h1 className="text-3xl md:text-6xl font-light tracking-wide mt-4 text-foreground">
              OUR LEADERS
            </h1>
            <p className="text-muted-foreground text-sm md:text-base mt-4 max-w-2xl mx-auto">
              Visionary leadership driving Regent Group's legacy of trust and excellence
            </p>
            <div className="w-16 h-[2px] bg-primary mt-6 mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Leaders */}
      <section className="pb-20">
        {leaders.map((leader, i) => (
          <div key={leader.name} className="py-16 md:py-24">
            <div className="container-regent">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className={`flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} gap-12 md:gap-20 items-start`}
              >
                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.15 }}
                  className="w-full md:w-[380px] flex-shrink-0"
                >
                  <div className="relative group">
                    {/* Decorative accent frame */}
                    <div className="absolute -inset-3 border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-primary/60" />
                    <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-primary/60" />
                    
                    <div className="aspect-[3/4] overflow-hidden bg-muted">
                      <img
                        src={leader.image}
                        alt={leader.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Name plate overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/95 via-background/60 to-transparent p-6 pt-16">
                      <p className="text-primary text-[10px] uppercase tracking-[0.3em] font-medium">
                        {leader.title}
                      </p>
                      <p className="text-muted-foreground text-[10px] uppercase tracking-[0.2em] mt-0.5">
                        {leader.org}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Bio */}
                <div className="flex-1">
                  <motion.div
                    initial={{ opacity: 0, x: i % 2 === 1 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-[1px] bg-primary" />
                      <span className="text-primary text-[10px] uppercase tracking-[0.3em] font-medium">
                        Profile
                      </span>
                    </div>

                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide text-foreground mb-6 md:mb-8 leading-tight">
                      {leader.name}
                    </h2>

                    <div className="space-y-5">
                      {leader.bio.map((para, j) => (
                        <motion.p
                          key={j}
                          initial={{ opacity: 0, y: 15 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.4 + j * 0.1 }}
                          className="text-muted-foreground text-sm leading-[1.8] tracking-wide text-justify"
                        >
                          {para}
                        </motion.p>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Divider between leaders */}
            {i < leaders.length - 1 && (
              <div className="container-regent mt-16 md:mt-24">
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-[1px] bg-border/50" />
                  <div className="w-2 h-2 rotate-45 border border-primary/40" />
                  <div className="flex-1 h-[1px] bg-border/50" />
                </div>
              </div>
            )}
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
};

export default Leaders;
