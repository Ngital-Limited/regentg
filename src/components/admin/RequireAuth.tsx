import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

interface Props {
  children: ReactNode;
  requireAdmin?: boolean;
}

/**
 * Protects admin routes.
 * - If still loading auth state, shows spinner
 * - If not signed in, redirects to /admin/login
 * - If signed in but not admin (when requireAdmin), shows access-denied screen
 */
const RequireAuth = ({ children, requireAdmin = true }: Props) => {
  const { user, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-light tracking-wide text-foreground mb-3">
            ACCESS PENDING
          </h1>
          <div className="w-16 h-[2px] bg-primary mx-auto mb-6" />
          <p className="text-sm text-muted-foreground mb-6">
            Your account ({user.email}) is signed in but not yet authorised as an
            admin. Please ask an existing administrator to grant you access.
          </p>
          <button
            onClick={async () => {
              const { supabase } = await import("@/integrations/supabase/client");
              await supabase.auth.signOut();
            }}
            className="text-xs uppercase tracking-[0.3em] text-primary hover:underline"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default RequireAuth;
