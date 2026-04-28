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

    const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const checkAdminRole = async (userId: string) => {
      for (let attempt = 0; attempt < 3; attempt += 1) {
        const { data, error } = await supabase.rpc("has_role", {
          _user_id: userId,
          _role: "admin",
        });

        if (!mounted) return;

        if (!error) {
          setIsAdmin(data === true);
          return;
        }

        const retryable = ["schema cache", "failed to fetch", "network", "timeout"].some((term) =>
          error.message.toLowerCase().includes(term)
        );

        if (attempt < 2 && retryable) {
          await wait(800 * (attempt + 1));
          continue;
        }

        setIsAdmin(false);
        return;
      }
    };

    // 1. Subscribe FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (!mounted) return;
      setSession(newSession);
      setUser(newSession?.user ?? null);
      if (newSession?.user) {
        setLoading(true);
        // Defer the async role check so we don't deadlock the auth listener
        setTimeout(async () => {
          await checkAdminRole(newSession.user.id);
          if (mounted) setLoading(false);
        }, 0);
      } else {
        setIsAdmin(false);
        setLoading(false);
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
