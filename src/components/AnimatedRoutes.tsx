import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./PageTransition";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import News from "@/pages/News";
import NewsDetail from "@/pages/NewsDetail";
import Blog from "@/pages/Blog";
import BlogDetail from "@/pages/BlogDetail";
import Videos from "@/pages/Videos";
import VideoDetail from "@/pages/VideoDetail";
import Career from "@/pages/Career";
import Contact from "@/pages/Contact";
import Leaders from "@/pages/Leaders";
import OurClients from "@/pages/OurClients";
import OurLandowners from "@/pages/OurLandowners";
import Sustainability from "@/pages/Sustainability";
import NotFound from "@/pages/NotFound";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
        <Route path="/projects/:slug" element={<PageTransition><ProjectDetail /></PageTransition>} />
        <Route path="/news" element={<PageTransition><News /></PageTransition>} />
        <Route path="/news/:slug" element={<PageTransition><NewsDetail /></PageTransition>} />
        <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
        <Route path="/blog/:slug" element={<PageTransition><BlogDetail /></PageTransition>} />
        <Route path="/videos" element={<PageTransition><Videos /></PageTransition>} />
        <Route path="/videos/:slug" element={<PageTransition><VideoDetail /></PageTransition>} />
        <Route path="/career" element={<PageTransition><Career /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/leaders" element={<PageTransition><Leaders /></PageTransition>} />
        <Route path="/our-clients" element={<PageTransition><OurClients /></PageTransition>} />
        <Route path="/our-landowners" element={<PageTransition><OurLandowners /></PageTransition>} />
        <Route path="/sustainability" element={<PageTransition><Sustainability /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
