import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { slugify } from "@/lib/slug";

type Video = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  category: string | null;
  youtube_id: string;
  is_published: boolean;
  display_order: number;
  meta_title: string | null;
  meta_description: string | null;
};

const empty: Partial<Video> = {
  title: "",
  slug: "",
  description: "",
  category: "",
  youtube_id: "",
  is_published: true,
  display_order: 0,
  meta_title: "",
  meta_description: "",
};

const extractYoutubeId = (input: string) => {
  const m =
    input.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/) ||
    input.match(/^([\w-]{11})$/);
  return m ? m[1] : input;
};

const AdminVideos = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Video> | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("videos")
      .select("*")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    else setVideos((data as Video[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSave = async () => {
    if (!editing?.title) return toast.error("Title is required");
    if (!editing?.youtube_id) return toast.error("YouTube ID/URL is required");
    setSaving(true);
    const slug = editing.slug?.trim() || slugify(editing.title);
    const payload = {
      ...editing,
      slug,
      youtube_id: extractYoutubeId(editing.youtube_id),
    };
    const { error } = editing.id
      ? await supabase.from("videos").update(payload).eq("id", editing.id)
      : await supabase.from("videos").insert(payload as any);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Saved");
    setEditing(null);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this video?")) return;
    const { error } = await supabase.from("videos").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light tracking-wide">Videos</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage YouTube videos shown on the public Videos page.
          </p>
        </div>
        <Button onClick={() => setEditing({ ...empty })}>
          <Plus className="h-4 w-4 mr-2" /> New Video
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="grid gap-3">
          {videos.map((v) => (
            <div key={v.id} className="flex items-center gap-4 p-3 border border-border rounded-md bg-card">
              <div className="w-24 h-14 rounded overflow-hidden bg-muted flex-shrink-0">
                <img
                  src={`https://i.ytimg.com/vi/${v.youtube_id}/mqdefault.jpg`}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium truncate">{v.title}</h3>
                  <span
                    className={`text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded border ${
                      v.is_published ? "border-primary/30 text-primary" : "border-amber-500/40 text-amber-500"
                    }`}
                  >
                    {v.is_published ? "Published" : "Draft"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {v.category || "—"} · {v.youtube_id}
                </p>
              </div>
              <Button size="icon" variant="ghost" onClick={() => setEditing(v)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" onClick={() => handleDelete(v.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {videos.length === 0 && (
            <p className="text-center text-sm text-muted-foreground py-8">
              No videos yet. Click "New Video" to add one.
            </p>
          )}
        </div>
      )}

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing?.id ? "Edit Video" : "New Video"}</DialogTitle>
          </DialogHeader>

          {editing && (
            <div className="space-y-4">
              <div>
                <Label>Title *</Label>
                <Input
                  value={editing.title || ""}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Slug (URL)</Label>
                  <Input
                    value={editing.slug || ""}
                    placeholder={editing.title ? slugify(editing.title) : "auto-generated"}
                    onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Category</Label>
                  <Input
                    value={editing.category || ""}
                    placeholder="Corporate / Project Tour / Events"
                    onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label>YouTube URL or ID *</Label>
                <Input
                  value={editing.youtube_id || ""}
                  placeholder="https://www.youtube.com/watch?v=N3_4QtpgoZs or N3_4QtpgoZs"
                  onChange={(e) => setEditing({ ...editing, youtube_id: e.target.value })}
                />
                {editing.youtube_id && (
                  <p className="text-[11px] text-muted-foreground mt-1">
                    Will save as: <code>{extractYoutubeId(editing.youtube_id)}</code>
                  </p>
                )}
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  rows={3}
                  value={editing.description || ""}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                />
              </div>

              <div className="border-t border-border pt-4 space-y-4">
                <h4 className="text-xs uppercase tracking-wider text-muted-foreground">SEO</h4>
                <div>
                  <Label>Meta title</Label>
                  <Input
                    value={editing.meta_title || ""}
                    placeholder={editing.title || ""}
                    onChange={(e) => setEditing({ ...editing, meta_title: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Meta description</Label>
                  <Textarea
                    rows={2}
                    value={editing.meta_description || ""}
                    onChange={(e) => setEditing({ ...editing, meta_description: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Display order</Label>
                  <Input
                    type="number"
                    value={editing.display_order ?? 0}
                    onChange={(e) => setEditing({ ...editing, display_order: Number(e.target.value) })}
                  />
                </div>
                <div className="flex items-end gap-3">
                  <Switch
                    checked={!!editing.is_published}
                    onCheckedChange={(v) => setEditing({ ...editing, is_published: v })}
                  />
                  <Label className="mb-2">
                    {editing.is_published ? "Published" : "Draft"}
                  </Label>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminVideos;
