import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type NavItem =
  | { label: string; path: string }
  | { label: string; children: { label: string; path: string }[] };

const navItems: NavItem[] = [
  { label: "Home", path: "/" },
  {
    label: "About",
    children: [
      { label: "About Us", path: "/about" },
      { label: "Our Leaders", path: "/leaders" },
    ],
  },
  {
    label: "Our Stakeholders",
    children: [
      { label: "Clients", path: "/our-clients" },
      { label: "Landowners", path: "/our-landowners" },
    ],
  },
  {
    label: "Projects",
    children: [
      { label: "Ongoing", path: "/projects?status=ongoing" },
      { label: "Completed", path: "/projects?status=completed" },
    ],
  },
  {
    label: "News",
    children: [
      { label: "Video Bulletin", path: "/videos" },
      { label: "News Bulletin", path: "/news" },
    ],
  },
  { label: "Blog", path: "/blog" },
  { label: "Career", path: "/career" },
  { label: "Contact", path: "/contact" },
];

const isActivePath = (current: string, target: string) => {
  const targetPath = target.split("?")[0];
  if (targetPath === "/") return current === "/";
  return current === targetPath || current.startsWith(`${targetPath}/`);
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setOpenGroup(null);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
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
        <div className="container-regent flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-3 relative z-[60]">
            <img
              src="/regent-dark-logo.png"
              alt="Regent Design & Development Ltd"
              className="h-10 md:h-12 w-auto"
            />
          </Link>

          {/* Refined Menu Opener */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative z-[60] group flex items-center gap-3 pl-4 pr-2 py-2"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span className="hidden sm:inline-block text-[10px] uppercase tracking-[0.3em] text-foreground/80 group-hover:text-primary transition-colors">
              {menuOpen ? "Close" : "Menu"}
            </span>
            <span className="relative w-10 h-10 flex items-center justify-center border border-border group-hover:border-primary transition-colors">
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <X className="w-4 h-4 text-foreground" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="lines"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-[5px]"
                  >
                    <span className="block w-5 h-[1.5px] bg-foreground group-hover:bg-primary transition-colors" />
                    <span className="block w-3 h-[1.5px] bg-foreground group-hover:bg-primary transition-colors ml-2" />
                    <span className="block w-5 h-[1.5px] bg-foreground group-hover:bg-primary transition-colors" />
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
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
            {/* Layered backdrop */}
            <div className="absolute inset-0 bg-background/85 backdrop-blur-2xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(var(--primary)/0.18),transparent_55%)]" />

            <div className="relative h-full overflow-y-auto">
              <div className="min-h-full flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-32 py-24 md:py-28">
                <nav className="flex flex-col items-start gap-1">
                  {navItems.map((item, i) => {
                    const hasChildren = "children" in item;
                    const isOpen = hasChildren && openGroup === item.label;
                    const groupActive =
                      hasChildren &&
                      item.children.some((c) => isActivePath(location.pathname, c.path));

                    return (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -15 }}
                        transition={{ duration: 0.3, delay: 0.05 + i * 0.035 }}
                        className="w-full"
                      >
                        {hasChildren ? (
                          <>
                            <button
                              onClick={() =>
                                setOpenGroup(isOpen ? null : item.label)
                              }
                              aria-expanded={isOpen}
                              className={`group w-full flex items-center justify-between gap-4 py-1.5 md:py-2 text-left text-sm sm:text-lg md:text-xl lg:text-2xl uppercase tracking-[0.18em] md:tracking-[0.22em] font-extralight transition-all duration-500 ease-out hover:text-primary ${
                                isOpen || groupActive
                                  ? "text-primary"
                                  : "text-foreground/60"
                              }`}
                            >
                              <span className="flex items-center gap-3">
                                <span className="text-[10px] tabular-nums opacity-60 font-mono tracking-widest">
                                  0{i + 1}
                                </span>
                                {item.label}
                              </span>
                              <ChevronDown
                                className="w-4 h-4 md:w-5 md:h-5 shrink-0"
                                style={{
                                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                                  transition: "transform 0.3s ease",
                                }}
                              />
                            </button>
                            <AnimatePresence initial={false}>
                              {isOpen && (
                                <motion.div
                                  key="sub"
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3, ease: "easeInOut" }}
                                  className="overflow-hidden"
                                >
                                  <div className="pl-10 md:pl-14 py-2 flex flex-col gap-1 border-l border-primary/30 ml-2 md:ml-3">
                                    {item.children.map((child, ci) => {
                                      const active = isActivePath(
                                        location.pathname,
                                        child.path
                                      );
                                      return (
                                        <motion.div
                                          key={child.path}
                                          initial={{ opacity: 0, x: -10 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{
                                            duration: 0.25,
                                            delay: 0.05 + ci * 0.05,
                                          }}
                                        >
                                          <Link
                                            to={child.path}
                                            onClick={() => setMenuOpen(false)}
                                            className={`block py-1.5 text-xs sm:text-sm md:text-base uppercase tracking-[0.2em] font-light transition-all duration-300 hover:text-primary hover:tracking-[0.28em] ${
                                              active
                                                ? "text-primary"
                                                : "text-foreground/55"
                                            }`}
                                          >
                                            {child.label}
                                          </Link>
                                        </motion.div>
                                      );
                                    })}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        ) : (
                          <Link
                            to={item.path}
                            onClick={() => setMenuOpen(false)}
                            className={`group w-full flex items-center gap-3 py-1.5 md:py-2 text-sm sm:text-lg md:text-xl lg:text-2xl uppercase tracking-[0.18em] md:tracking-[0.22em] font-extralight transition-all duration-500 ease-out hover:text-primary hover:tracking-[0.28em] md:hover:tracking-[0.32em] ${
                              isActivePath(location.pathname, item.path)
                                ? "text-primary"
                                : "text-foreground/60"
                            }`}
                          >
                            <span className="text-[10px] tabular-nums opacity-60 font-mono tracking-widest">
                              0{i + 1}
                            </span>
                            {item.label}
                          </Link>
                        )}
                      </motion.div>
                    );
                  })}
                </nav>

                {/* Hotline */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="mt-12 md:mt-16 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8"
                >
                  <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    Hotline
                  </span>
                  <a
                    href="tel:01810009333"
                    className="inline-flex items-center gap-2 md:gap-3 text-base sm:text-lg md:text-xl text-primary hover:text-primary/80 transition-all duration-300 tracking-[0.12em] font-light"
                  >
                    <Phone className="w-4 h-4 md:w-5 md:h-5" />
                    0181 000 9333
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
