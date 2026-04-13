import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import { motion } from "framer-motion";
import mouSigningImg from "@/assets/news/mou-signing-grand-heritage.png";
import mouMalekImg from "@/assets/news/mou-signing-regent-malek.png";
import groundBreakingPalaceImg from "@/assets/news/ground-breaking-regent-palace.png";

const newsItems = [
  {
    title: "MOU Signing Ceremony of Regent Grand Heritage",
    date: "September 22, 2021",
    excerpt:
      "A Memorandum of Understanding (MOU) was signed on 22 September 2021 at the head office of Regent Group in Kemal Ataturk Avenue, Banani C/A between Regent Design & Development Ltd (RDDL) and Joint Landowners of 24 Katha land of North Badda (Beside Bti Premier Plaza & Opposite to Suvastu Nazar Valley Market). Chairman of Regent Design & Development Ltd, Barrister Tareque Akbar Khondakar signed the MOU on behalf of the company. RDDL will build a luxurious condominium project with facilities such as Double Height Entry, Swimming Pool, Shops, Kids Play Zone, BBQ Zone, Walkways, Mosques, Landscaping works, Waterfalls & other facilities.",
    image: mouSigningImg,
  },
  {
    title: "MOU Signing Ceremony of Regent Malek",
    date: "September 14, 2021",
    excerpt:
      "A Memorandum of Understanding (MOU) was signed on 14 September 2021 at the head office of Regent Group in Kemal Ataturk Avenue, Banani C/A between Regent Design & Development Ltd (RDDL) and Landowners of 7 Katha land of West Agargaon. Chairman of Regent Design & Development Ltd, Barrister Tareque Akbar Khondakar signed the MOU on behalf of the company. RDDL will build a 10-Storied (B+G+9) luxurious residential building with facilities such as Mosques, Kids Play Zone, Landscaping works & other facilities.",
    image: mouMalekImg,
  },
  {
  {
    title: "Ground Breaking Ceremony of Regent Palace",
    date: "June 6, 2021",
    excerpt:
      "Piling work inauguration of Regent Palace was held on 06 June 2021 at Road no.17, Baitul Aman Housing Society, Adabor, Mohammadpur. Chairman of Regent Design & Development, Barrister Tareque Akbar Khondakar inaugurated the ceremony along with the presence of the landowners and other distinguished guests.",
    image: groundBreakingPalaceImg,
  },
  {
    title: "Regent Grand Heritage Achieves Structural Completion",
    date: "March 15, 2026",
    excerpt:
      "We are proud to announce that Regent Grand Heritage has reached its structural milestone ahead of schedule.",
  },
  {
    title: "RDDL Receives Excellence in Construction Award",
    date: "February 20, 2026",
    excerpt:
      "Regent Design & Development Ltd has been honored with the Excellence in Construction Award for 2026.",
  },
  {
    title: "New Project Launch: Regent Spring Dale",
    date: "January 10, 2026",
    excerpt:
      "We are excited to unveil our latest residential project in a prime location of Dhaka.",
  },
  {
    title: "Regent Sapphire — 80% Units Sold",
    date: "December 5, 2025",
    excerpt:
      "Overwhelming response from homebuyers for our premium Regent Sapphire development.",
  },
];

const News = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-20 px-4 bg-regent-charcoal">
        <div className="container-regent text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-primary text-xs uppercase tracking-[0.3em]">Latest Updates</span>
            <h1 className="text-4xl md:text-6xl font-light tracking-wide mt-4 text-foreground">NEWS</h1>
            <div className="w-16 h-[2px] bg-primary mt-6 mx-auto" />
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-regent">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {newsItems.map((item, i) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="border border-border bg-card overflow-hidden hover:border-primary/30 transition-all group cursor-pointer"
              >
                {item.image && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-8">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{item.date}</span>
                  <h3 className="text-lg font-light tracking-wide text-foreground mt-3 mb-3 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.excerpt}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default News;
