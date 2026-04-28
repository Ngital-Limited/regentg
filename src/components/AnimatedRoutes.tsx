import { Routes, Route, useLocation, Navigate } from "react-router-dom";
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
import Career from "@/pages/Career";
import Contact from "@/pages/Contact";
import Leaders from "@/pages/Leaders";
import OurClients from "@/pages/OurClients";
import OurLandowners from "@/pages/OurLandowners";

import Videos from "@/pages/Videos";
import NotFound from "@/pages/NotFound";

// Admin
import RequireAuth from "@/components/admin/RequireAuth";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminLayout from "@/pages/admin/AdminLayout";
import AdminContact from "@/pages/admin/AdminContact";
import AdminVisits from "@/pages/admin/AdminVisits";
import AdminBrochures from "@/pages/admin/AdminBrochures";
import AdminApplications from "@/pages/admin/AdminApplications";
import AdminProjects from "@/pages/admin/AdminProjects";
import AdminBlog from "@/pages/admin/AdminBlog";
import AdminTaxonomy from "@/pages/admin/AdminTaxonomy";
import AdminHomepage from "@/pages/admin/AdminHomepage";
import AdminTeam from "@/pages/admin/AdminTeam";

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
        <Route path="/career" element={<PageTransition><Career /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/leaders" element={<PageTransition><Leaders /></PageTransition>} />
        <Route path="/our-clients" element={<PageTransition><OurClients /></PageTransition>} />
        <Route path="/our-landowners" element={<PageTransition><OurLandowners /></PageTransition>} />
        
        <Route path="/videos" element={<PageTransition><Videos /></PageTransition>} />

        {/* Admin (no page transitions, no public crawling) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<RequireAuth><AdminLayout /></RequireAuth>}>
          <Route index element={<Navigate to="/admin/contact" replace />} />
          <Route path="contact" element={<AdminContact />} />
          <Route path="visits" element={<AdminVisits />} />
          <Route path="brochures" element={<AdminBrochures />} />
          <Route path="applications" element={<AdminApplications />} />
          <Route path="homepage" element={<AdminHomepage />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="blog" element={<AdminBlog />} />
          <Route path="taxonomy" element={<AdminTaxonomy />} />
          <Route path="team" element={<AdminTeam />} />
        </Route>

        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
