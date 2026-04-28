import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import AdminPagePlaceholder from "@/components/admin/AdminPagePlaceholder";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Trash2, Copy, Check } from "lucide-react";

interface RoleRow {
  id: string;
  user_id: string;
  role: "admin" | "team";
  created_at: string;
}

const AdminTeam = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [roles, setRoles] = useState<RoleRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [newUserId, setNewUserId] = useState("");
  const [granting, setGranting] = useState(false);
  const [copied, setCopied] = useState(false);

  const loadRoles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("user_roles")
      .select("id, user_id, role, created_at")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Failed to load team", description: error.message, variant: "destructive" });
    } else {
      setRoles((data ?? []) as RoleRow[]);
    }
    setLoading(false);
  };

  useEffect(() => { loadRoles(); }, []);

  const handleGrant = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newUserId.trim();
    if (!trimmed.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
      toast({ title: "Invalid User ID", description: "Must be a UUID format.", variant: "destructive" });
      return;
    }
    setGranting(true);
    const { error } = await supabase
      .from("user_roles")
      .insert({ user_id: trimmed, role: "admin" });
    setGranting(false);
    if (error) {
      toast({ title: "Failed to grant access", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Admin access granted" });
    setNewUserId("");
    loadRoles();
  };

  const handleRevoke = async (id: string, isSelf: boolean) => {
    if (isSelf) {
      const ok = confirm("This will revoke your own admin access. You will be signed out of the dashboard. Continue?");
      if (!ok) return;
    }
    const { error } = await supabase.from("user_roles").delete().eq("id", id);
    if (error) {
      toast({ title: "Failed to revoke", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Access revoked" });
    loadRoles();
  };

  const copyMyId = async () => {
    if (!user) return;
    await navigator.clipboard.writeText(user.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AdminPagePlaceholder
      title="Team Access"
      description="Grant or revoke admin access. Team members must sign up at /admin/login first, share their User ID with you, then you grant them access here."
    >
      {/* My User ID box (helps the FIRST admin grant themselves access) */}
      <div className="bg-card border border-border rounded-lg p-5 mb-6">
        <Label className="text-xs uppercase tracking-wider text-muted-foreground">
          Your User ID
        </Label>
        <div className="flex items-center gap-2 mt-2">
          <code className="flex-1 text-xs bg-background px-3 py-2 rounded border border-border font-mono break-all">
            {user?.id}
          </code>
          <Button size="sm" variant="outline" onClick={copyMyId}>
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Share this with team members so they can ask you to grant them access — or use it yourself if your account isn't yet listed below.
        </p>
      </div>

      {/* Grant new admin */}
      <form onSubmit={handleGrant} className="bg-card border border-border rounded-lg p-5 mb-6">
        <Label htmlFor="newUserId" className="text-xs uppercase tracking-wider text-muted-foreground">
          Grant Admin Access
        </Label>
        <div className="flex flex-col sm:flex-row gap-2 mt-2">
          <Input
            id="newUserId"
            value={newUserId}
            onChange={(e) => setNewUserId(e.target.value)}
            placeholder="Paste team member's User ID (UUID)"
            className="font-mono text-xs"
          />
          <Button type="submit" disabled={granting}>
            {granting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Grant Admin
          </Button>
        </div>
      </form>

      {/* Existing admins list */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="px-5 py-3 border-b border-border">
          <h2 className="text-sm font-medium text-foreground">
            Current Admins ({roles.length})
          </h2>
        </div>
        {loading ? (
          <div className="p-8 text-center">
            <Loader2 className="h-5 w-5 animate-spin text-primary mx-auto" />
          </div>
        ) : roles.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground">
            No admins yet. Use the form above with your own User ID to grant yourself access.
          </div>
        ) : (
          <div className="divide-y divide-border">
            {roles.map((r) => {
              const isSelf = r.user_id === user?.id;
              return (
                <div key={r.id} className="flex items-center justify-between px-5 py-3 gap-4">
                  <div className="min-w-0 flex-1">
                    <code className="text-xs font-mono text-foreground break-all">
                      {r.user_id}
                    </code>
                    {isSelf && (
                      <span className="ml-2 text-xs text-primary uppercase tracking-wider">(You)</span>
                    )}
                    <div className="text-xs text-muted-foreground mt-1">
                      {r.role} · added {new Date(r.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRevoke(r.id, isSelf)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AdminPagePlaceholder>
  );
};

export default AdminTeam;
