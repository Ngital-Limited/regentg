import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

type Row = {
  path: string;
  label: string;
  meta_title: string | null;
  meta_description: string | null;
  og_image_path: string | null;
};

const AdminSEO = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingPath, setSavingPath] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("page_seo")
      .select("*")
      .order("path");
    if (error) toast.error(error.message);
    setRows((data as Row[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const update = (path: string, patch: Partial<Row>) => {
    setRows((prev) => prev.map((r) => (r.path === path ? { ...r, ...patch } : r)));
  };

  const save = async (row: Row) => {
    setSavingPath(row.path);
    const { error } = await supabase
      .from("page_seo")
      .update({
        meta_title: row.meta_title,
        meta_description: row.meta_description,
      })
      .eq("path", row.path);
    setSavingPath(null);
    if (error) return toast.error(error.message);
    toast.success(`Saved ${row.label}`);
  };

  if (loading)
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-light tracking-wide">Page SEO</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Edit meta titles and descriptions for static pages. Project & blog
          pages are managed in their own sections.
        </p>
      </div>

      <div className="space-y-4">
        {rows.map((row) => (
          <div
            key={row.path}
            className="border border-border rounded-md p-4 bg-card space-y-3"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{row.label}</h3>
                <p className="text-xs text-muted-foreground font-mono">{row.path}</p>
              </div>
              <Button
                size="sm"
                onClick={() => save(row)}
                disabled={savingPath === row.path}
              >
                {savingPath === row.path && (
                  <Loader2 className="h-3 w-3 mr-2 animate-spin" />
                )}
                Save
              </Button>
            </div>
            <div>
              <Label className="text-xs">Meta title</Label>
              <Input
                value={row.meta_title || ""}
                onChange={(e) => update(row.path, { meta_title: e.target.value })}
              />
              <p className="text-[11px] text-muted-foreground mt-1">
                {(row.meta_title || "").length}/60 characters
              </p>
            </div>
            <div>
              <Label className="text-xs">Meta description</Label>
              <Textarea
                rows={2}
                value={row.meta_description || ""}
                onChange={(e) =>
                  update(row.path, { meta_description: e.target.value })
                }
              />
              <p className="text-[11px] text-muted-foreground mt-1">
                {(row.meta_description || "").length}/160 characters
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSEO;
