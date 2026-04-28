import { useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthState {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
}

/**
 * Single source of truth for auth + role.
 *
 * Always sets up onAuthStateChange BEFORE getSession() to avoid race conditions.
 * Role check is deferred via setTimeout to avoid deadlocking inside the auth callback.
 */
export const useAuth = (): AuthState => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const checkAdminRole = async (userId: string) => {
      const { data, error } = await supabase.rpc("has_role", {
        _user_id: userId,
        _role: "admin",
      });
      if (!mounted) return;
      setIsAdmin(!error && data === true);
    };

    // 1. Subscribe FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (!mounted) return;
      setSession(newSession);
      setUser(newSession?.user ?? null);
      if (newSession?.user) {
        // Defer the async role check so we don't deadlock the auth listener
        setTimeout(() => checkAdminRole(newSession.user.id), 0);
      } else {
        setIsAdmin(false);
      }
    });

    // 2. THEN read existing session
    supabase.auth.getSession().then(async ({ data: { session: existingSession } }) => {
      if (!mounted) return;
      setSession(existingSession);
      setUser(existingSession?.user ?? null);
      if (existingSession?.user) {
        await checkAdminRole(existingSession.user.id);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return { user, session, isAdmin, loading };
};
