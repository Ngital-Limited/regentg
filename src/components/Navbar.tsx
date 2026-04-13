import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Our Leaders", path: "/leaders" },
  { label: "Projects", path: "/projects" },
  { label: "Our Clients", path: "/our-clients" },
  { label: "Our Landowners", path: "/our-landowners" },
  { label: "News", path: "/news" },
  { label: "Blog", path: "/blog" },
  { label: "Career", path: "/career" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 transition-all duration-500 ${
          menuOpen
            ? "z-[60] bg-transparent"
            : scrolled
              ? "z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-lg"
              : "z-50 bg-transparent"
        }`}
      >
        <div className="container-regent flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 relative z-[60]">
            <img src="/regent-dark-logo.png" alt="Regent Design & Development Ltd" className="h-12 w-auto" />
          </Link>

          {/* Hamburger / Close Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative z-[60] p-2 w-10 h-10 flex items-center justify-center"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6 text-foreground" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-[5px]"
                >
                  <span className="block w-6 h-[1.5px] bg-foreground" />
                  <span className="block w-6 h-[1.5px] bg-foreground" />
                  <span className="block w-4 h-[1.5px] bg-foreground" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Full-screen Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[55]"
          >
            {/* Blurred backdrop */}
            <div className="absolute inset-0 bg-background/70 backdrop-blur-2xl" />

            {/* Menu content */}
            <div className="relative h-full flex flex-col items-center justify-center px-4">
              <nav className="flex flex-col items-center gap-0">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, delay: 0.05 + i * 0.035 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setMenuOpen(false)}
                      className={`story-link block text-base sm:text-lg md:text-xl lg:text-2xl uppercase tracking-[0.2em] font-extralight py-2 transition-all duration-300 text-center hover:text-primary hover:tracking-[0.35em] hover:scale-105 ${
                        location.pathname === link.path
                          ? "text-primary"
                          : "text-foreground/60"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Hotline at bottom */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="absolute bottom-8 left-0 right-0 flex justify-center"
              >
                <a
                  href="tel:01810009333"
                  className="inline-flex items-center gap-3 text-base sm:text-lg text-foreground/70 hover:text-primary transition-all duration-300 tracking-[0.15em] font-light"
                >
                  <Phone className="w-5 h-5" />
                  0181 000 9333
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
