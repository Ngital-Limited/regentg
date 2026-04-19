import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactButton from "@/components/ContactButton";
import HeroSlider from "@/components/home/HeroSlider";
import ProjectCarousel from "@/components/home/ProjectCarousel";
import FeaturedProject from "@/components/home/FeaturedProject";
import AboutSection from "@/components/home/AboutSection";
import WhyRegent from "@/components/home/WhyRegent";
import AwardsSection from "@/components/home/AwardsSection";
import InsightsSection from "@/components/home/InsightsSection";
import StakeholdersSection from "@/components/home/StakeholdersSection";
import MapSection from "@/components/home/MapSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSlider />
      <ProjectCarousel />
      <AboutSection />
      <WhyRegent />
      <AwardsSection />
      <FeaturedProject />
      <InsightsSection />
      <StakeholdersSection />
      <MapSection />
      <ContactButton />
      <Footer />
    </div>
  );
};

export default Index;
