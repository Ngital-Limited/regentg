import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, X, MessageCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ContactButton = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  return (
    <div ref={ref} className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-[88vw] max-w-sm border border-border bg-card shadow-2xl"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <p className="text-[11px] uppercase tracking-[0.25em] text-primary font-medium">
                Get In Touch
              </p>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <a
                href="tel:01810009333"
                className="flex items-start gap-3 group hover:text-primary transition-colors"
              >
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Phone className="w-4 h-4" />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-0.5">
                    Hotline
                  </p>
                  <p className="text-sm text-foreground group-hover:text-primary">0181 000 9333</p>
                </div>
              </a>

              <a
                href="mailto:info@regentgroup.com.bd"
                className="flex items-start gap-3 group hover:text-primary transition-colors"
              >
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Mail className="w-4 h-4" />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-0.5">
                    Email
                  </p>
                  <p className="text-sm text-foreground group-hover:text-primary break-all">
                    info@regentgroup.com.bd
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-3">
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 text-primary shrink-0">
                  <MapPin className="w-4 h-4" />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-0.5">
                    Head Office
                  </p>
                  <p className="text-sm text-foreground leading-relaxed">
                    Delta Dahlia, Level-5, 36 Kemal Ataturk Avenue, Banani, Dhaka-1213.
                  </p>
                </div>
              </div>

              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground px-4 py-3 text-[11px] uppercase tracking-[0.22em] hover:bg-primary/90 transition-colors mt-2"
              >
                Contact Page
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close contact details" : "Open contact details"}
        className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="msg"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
};

export default ContactButton;
