import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

const FUNCTIONS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/handle-email-unsubscribe`;
const ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

type Status = "loading" | "ready" | "already" | "invalid" | "submitting" | "success" | "error";

const Unsubscribe = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }
    (async () => {
      try {
        const res = await fetch(`${FUNCTIONS_URL}?token=${encodeURIComponent(token)}`, {
          headers: { apikey: ANON_KEY },
        });
        const data = await res.json();
        if (!res.ok) {
          setStatus("invalid");
          return;
        }
        if (data.valid === false && data.reason === "already_unsubscribed") {
          setStatus("already");
          return;
        }
        setStatus("ready");
      } catch {
        setStatus("invalid");
      }
    })();
  }, [token]);

  const handleConfirm = async () => {
    if (!token) return;
    setStatus("submitting");
    try {
      const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", {
        body: { token },
      });
      if (error) throw error;
      if (data?.success) {
        setStatus("success");
      } else if (data?.reason === "already_unsubscribed") {
        setStatus("already");
      } else {
        setStatus("error");
        setError(data?.error || "Failed to unsubscribe");
      }
    } catch (e: any) {
      setStatus("error");
      setError(e?.message || "Failed to unsubscribe");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full border border-border/60 bg-card p-10 text-center">
        <h1 className="text-xl font-light uppercase tracking-[0.2em] text-foreground mb-4">
          Email Preferences
        </h1>
        {status === "loading" && (
          <p className="text-sm text-muted-foreground">Validating your link…</p>
        )}
        {status === "invalid" && (
          <p className="text-sm text-muted-foreground">
            This unsubscribe link is invalid or has expired.
          </p>
        )}
        {status === "already" && (
          <p className="text-sm text-muted-foreground">
            You have already unsubscribed from these emails.
          </p>
        )}
        {status === "ready" && (
          <>
            <p className="text-sm text-muted-foreground mb-6">
              Click below to confirm you want to unsubscribe from notification emails.
            </p>
            <Button
              onClick={handleConfirm}
              className="w-full bg-primary text-primary-foreground uppercase tracking-[0.2em] text-xs hover:bg-primary/90"
            >
              Confirm Unsubscribe
            </Button>
          </>
        )}
        {status === "submitting" && (
          <p className="text-sm text-muted-foreground">Processing…</p>
        )}
        {status === "success" && (
          <p className="text-sm text-foreground">
            You have been unsubscribed successfully.
          </p>
        )}
        {status === "error" && (
          <p className="text-sm text-destructive">{error || "Something went wrong."}</p>
        )}
      </div>
    </div>
  );
};

export default Unsubscribe;
