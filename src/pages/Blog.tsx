import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const blogPosts = [
  { title: "Top 5 Reasons to Invest in Dhaka Real Estate in 2026", date: "March 10, 2026", category: "Investment", excerpt: "Discover why Dhaka remains one of the best cities for real estate investment this year." },
  { title: "Sustainable Building: The Future of Construction", date: "February 15, 2026", category: "Innovation", excerpt: "How RDDL is incorporating green building practices for a sustainable tomorrow." },
  { title: "Choosing the Perfect Apartment: A Buyer's Guide", date: "January 22, 2026", category: "Guide", excerpt: "Everything you need to know before making your next real estate purchase." },
  { title: "The Rise of Premium Living in Banani", date: "December 18, 2025", category: "Lifestyle", excerpt: "Exploring how Banani has become the epicenter of luxury living in Dhaka." },
  { title: "Interior Design Trends for Modern Apartments", date: "November 30, 2025", category: "Design", excerpt: "Stay ahead with the latest interior design trends for contemporary urban living." },
  { title: "Understanding Real Estate Regulations in Bangladesh", date: "October 15, 2025", category: "Legal", excerpt: "A comprehensive guide to navigating the legal landscape of property ownership." },
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-20 px-4 bg-regent-charcoal">
        <div className="container-regent text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-primary text-xs uppercase tracking-[0.3em]">Knowledge Hub</span>
            <h1 className="text-4xl md:text-6xl font-light tracking-wide mt-4 text-foreground">BLOG</h1>
            <div className="w-16 h-[2px] bg-primary mt-6 mx-auto" />
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-regent">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, i) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="border border-border bg-card overflow-hidden group cursor-pointer hover:border-primary/30 transition-all"
              >
                <div className="aspect-video bg-gradient-to-br from-primary/10 via-secondary/10 to-card" />
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-primary">{post.category}</span>
                    <span className="text-[10px] text-muted-foreground">{post.date}</span>
                  </div>
                  <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-relaxed">{post.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{post.excerpt}</p>
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

export default Blog;
