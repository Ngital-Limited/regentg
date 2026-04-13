import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-regent-charcoal border-t border-border">
      <div className="container-regent py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <img src="/regent-logo.webp" alt="Regent" className="h-14 w-auto" />
            <p className="text-muted-foreground text-sm leading-relaxed">
              Regent Design & Development Ltd is a leading real estate company in Bangladesh,
              building trust and excellence since establishment.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] text-primary mb-6 font-medium">Quick Links</h4>
            <div className="flex flex-col gap-3">
              {["About", "Projects", "News", "Blog", "Career", "Contact"].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] text-primary mb-6 font-medium">Ongoing Projects</h4>
            <div className="flex flex-col gap-3">
              {["Regent Grand Heritage", "Regent Hasina", "Regent Sapphire", "Regent Spring Dale"].map((p) => (
                <span key={p} className="text-sm text-muted-foreground">{p}</span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] text-primary mb-6 font-medium">Contact Us</h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-1 shrink-0" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Delta Dahlia, Level-5, 36 Kemal Ataturk Avenue, Banani, Dhaka-1213, Bangladesh.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a href="tel:01810009333" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  0181 000 9333
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a href="mailto:info@regentgroup.com.bd" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  info@regentgroup.com.bd
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Regent Design & Development Ltd. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Building Trust, Delivering Excellence.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
