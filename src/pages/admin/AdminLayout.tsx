import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  LogOut,
  MessageSquare,
  CalendarCheck,
  FileDown,
  Briefcase,
  FolderOpen,
  Users as UsersIcon,
  Home,
  Newspaper,
  Tags,
  Search,
  Video as VideoIcon,
} from "lucide-react";
import SEO from "@/components/SEO";

const navItems = [
  { to: "/admin/contact", label: "Contact", icon: MessageSquare, group: "Leads" },
  { to: "/admin/visits", label: "Site Visits", icon: CalendarCheck, group: "Leads" },
  { to: "/admin/brochures", label: "Brochure Leads", icon: FileDown, group: "Leads" },
  { to: "/admin/applications", label: "Job Applications", icon: Briefcase, group: "Leads" },
  { to: "/admin/homepage", label: "Homepage", icon: Home, group: "Content" },
  { to: "/admin/projects", label: "Projects", icon: FolderOpen, group: "Content" },
  { to: "/admin/blog", label: "Blog & News", icon: Newspaper, group: "Content" },
  { to: "/admin/videos", label: "Videos", icon: VideoIcon, group: "Content" },
  { to: "/admin/taxonomy", label: "Categories & Tags", icon: Tags, group: "Content" },
  { to: "/admin/seo", label: "Page SEO", icon: Search, group: "Content" },
  { to: "/admin/team", label: "Team Access", icon: UsersIcon, group: "Settings" },
];

const AdminLayout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Admin Dashboard" description="Regent Group admin portal" path="/admin" />

      {/* Top bar */}
      <header className="border-b border-border bg-card">
        <div className="container-regent flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-4">
            <span className="text-primary text-xs uppercase tracking-[0.3em]">
              Regent Admin
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground hidden sm:inline">
              {user?.email}
            </span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container-regent px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6">
          {/* Sidebar */}
          <aside>
            <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
              {["Leads", "Content", "Settings"].map((group) => (
                <div key={group} className="lg:mb-4">
                  <p className="hidden lg:block px-4 pt-2 pb-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
                    {group}
                  </p>
                  {navItems
                    .filter((i) => i.group === group)
                    .map(({ to, label, icon: Icon }) => (
                      <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-2.5 rounded-md text-sm whitespace-nowrap transition-colors ${
                            isActive
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          }`
                        }
                      >
                        <Icon className="h-4 w-4 flex-shrink-0" />
                        <span>{label}</span>
                      </NavLink>
                    ))}
                </div>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <main className="min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
