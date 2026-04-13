import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Youtube, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-regent-charcoal border-t border-border">
      {/* Hotline Banner */}
      <div className="border-b border-border/50">
        <div className="container-regent py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 flex items-center justify-center bg-primary/10 border border-primary/20 rounded-full">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-1">Call Our Hotline</p>
              <a
                href="tel:01810009333"
                className="text-3xl md:text-4xl font-light tracking-wider text-foreground hover:text-primary transition-colors"
              >
                0181 000 9333
              </a>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="mailto:info@regentgroup.com.bd"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4 text-primary" />
              info@regentgroup.com.bd
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-regent py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-5">
            <img src="/regent-dark-logo.png" alt="Regent" className="h-14 w-auto" />
            <p className="text-muted-foreground text-sm leading-relaxed">
              Regent Design & Development Ltd is a leading real estate company in Bangladesh,
              building trust and excellence since establishment.
            </p>
            <div className="flex items-center gap-3 pt-1">
              {[
                { icon: Facebook, href: "https://www.facebook.com/regentgroupbd", label: "Facebook" },
                { icon: Youtube, href: "https://www.youtube.com/@RegentGroupBD", label: "YouTube" },
                { icon: Linkedin, href: "https://www.linkedin.com/company/regentgroupbd", label: "LinkedIn" },
                { icon: Instagram, href: "https://www.instagram.com/regentgroup.bd", label: "Instagram" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 flex items-center justify-center border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/40 transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-primary mb-6 font-medium">Quick Links</h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "About", path: "/about" },
                { label: "Projects", path: "/projects" },
                { label: "Our Clients", path: "/our-clients" },
                { label: "Our Landowners", path: "/our-landowners" },
                { label: "News", path: "/news" },
                { label: "Career", path: "/career" },
                { label: "Contact", path: "/contact" },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Head Office */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-primary mb-6 font-medium">Head Office</h4>
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-primary mt-1 shrink-0" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                Delta Dahlia, Level-5, 36 Kemal Ataturk Avenue, Banani, Dhaka-1213, Bangladesh.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container-regent py-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Regent Design & Development Ltd. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground italic">
            Building Trust, Delivering Excellence.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
