import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import ImageUpload, { publicUrl } from "@/components/admin/ImageUpload";
import MultiImageUpload from "@/components/admin/MultiImageUpload";
import BrochureUpload from "@/components/admin/BrochureUpload";
import { slugify } from "@/lib/slug";

type Project = {
  id: string;
  slug: string;
  name: string;
  status: string | null;
  location: string | null;
  short_description: string | null;
  description: string | null;
  cover_image_path: string | null;
  gallery_paths: string[] | null;
  brochure_path: string | null;
  units: number | null;
  floors: number | null;
  area_sqft: number | null;
  handover_date: string | null;
  amenities: string[] | null;
  latitude: number | null;
  longitude: number | null;
  meta_title: string | null;
  meta_description: string | null;
  og_image_path: string | null;
  is_active: boolean;
  display_order: number;
};

const empty: Partial<Project> = {
  name: "",
  slug: "",
  status: "Ongoing",
  location: "",
  short_description: "",
  description: "",
  cover_image_path: null,
  gallery_paths: [],
  brochure_path: null,
  units: null,
  floors: null,
  area_sqft: null,
  handover_date: null,
  amenities: [],
  latitude: null,
  longitude: null,
  meta_title: "",
  meta_description: "",
  og_image_path: null,
  is_active: true,
  display_order: 0,
};

const AdminProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Project> | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("display_order", { ascending: true })
      .order("name", { ascending: true });
    if (error) toast.error(error.message);
    else setProjects((data as Project[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSave = async () => {
    if (!editing?.name) return toast.error("Name is required");
    setSaving(true);
    const slug = editing.slug?.trim() || slugify(editing.name);
    const payload = {
      ...editing,
      slug,
      gallery_paths: editing.gallery_paths || [],
      amenities: editing.amenities || [],
    };
    const { error } = editing.id
      ? await supabase.from("projects").update(payload).eq("id", editing.id)
      : await supabase.from("projects").insert(payload as any);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Saved");
    setEditing(null);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project? This cannot be undone.")) return;
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light tracking-wide">Projects</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage real estate listings, images, and brochures.
          </p>
        </div>
        <Button onClick={() => setEditing({ ...empty })}>
          <Plus className="h-4 w-4 mr-2" /> New Project
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="grid gap-3">
          {projects.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-4 p-3 border border-border rounded-md bg-card"
            >
              <div className="w-16 h-16 rounded overflow-hidden bg-muted flex-shrink-0">
                {p.cover_image_path && (
                  <img
                    src={publicUrl("project-images", p.cover_image_path)!}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium truncate">{p.name}</h3>
                  {!p.is_active && (
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground border border-border px-1.5 py-0.5 rounded">
                      Hidden
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {p.status} · {p.location || "—"} · /{p.slug}
                </p>
              </div>
              <Button size="icon" variant="ghost" onClick={() => setEditing(p)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" onClick={() => handleDelete(p.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {projects.length === 0 && (
            <p className="text-center text-sm text-muted-foreground py-8">
              No projects yet. Click "New Project" to add one.
            </p>
          )}
        </div>
      )}

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing?.id ? "Edit Project" : "New Project"}</DialogTitle>
          </DialogHeader>

          {editing && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Name *</Label>
                  <Input
                    value={editing.name || ""}
                    onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Slug (URL)</Label>
                  <Input
                    value={editing.slug || ""}
                    placeholder={editing.name ? slugify(editing.name) : "auto-generated"}
                    onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Status</Label>
                  <Input
                    value={editing.status || ""}
                    placeholder="Ongoing / Completed / Upcoming"
                    onChange={(e) => setEditing({ ...editing, status: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Location</Label>
                  <Input
                    value={editing.location || ""}
                    onChange={(e) => setEditing({ ...editing, location: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label>Short description</Label>
                <Textarea
                  rows={2}
                  value={editing.short_description || ""}
                  onChange={(e) =>
                    setEditing({ ...editing, short_description: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Full description</Label>
                <Textarea
                  rows={6}
                  value={editing.description || ""}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                />
              </div>

              <ImageUpload
                bucket="project-images"
                value={editing.cover_image_path}
                onChange={(p) => setEditing({ ...editing, cover_image_path: p })}
                label="Cover image"
              />

              <MultiImageUpload
                bucket="project-images"
                value={editing.gallery_paths || []}
                onChange={(paths) => setEditing({ ...editing, gallery_paths: paths })}
              />

              <BrochureUpload
                value={editing.brochure_path}
                onChange={(p) => setEditing({ ...editing, brochure_path: p })}
              />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label>Units</Label>
                  <Input
                    type="number"
                    value={editing.units ?? ""}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        units: e.target.value ? Number(e.target.value) : null,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Floors</Label>
                  <Input
                    type="number"
                    value={editing.floors ?? ""}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        floors: e.target.value ? Number(e.target.value) : null,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Area (sqft)</Label>
                  <Input
                    type="number"
                    value={editing.area_sqft ?? ""}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        area_sqft: e.target.value ? Number(e.target.value) : null,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Handover</Label>
                  <Input
                    type="date"
                    value={editing.handover_date || ""}
                    onChange={(e) =>
                      setEditing({ ...editing, handover_date: e.target.value || null })
                    }
                  />
                </div>
              </div>

              <div>
                <Label>Amenities (comma separated)</Label>
                <Input
                  value={(editing.amenities || []).join(", ")}
                  placeholder="Pool, Gym, Parking, Rooftop Garden"
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      amenities: e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Latitude</Label>
                  <Input
                    type="number"
                    step="0.000001"
                    value={editing.latitude ?? ""}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        latitude: e.target.value ? Number(e.target.value) : null,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Longitude</Label>
                  <Input
                    type="number"
                    step="0.000001"
                    value={editing.longitude ?? ""}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        longitude: e.target.value ? Number(e.target.value) : null,
                      })
                    }
                  />
                </div>
              </div>

              <div className="border-t border-border pt-4 space-y-4">
                <h4 className="text-xs uppercase tracking-wider text-muted-foreground">SEO</h4>
                <div>
                  <Label>Meta title</Label>
                  <Input
                    value={editing.meta_title || ""}
                    placeholder={editing.name || "e.g. Regent Heights | Premium Apartments"}
                    onChange={(e) => setEditing({ ...editing, meta_title: e.target.value })}
                  />
                  <p className="text-[11px] text-muted-foreground mt-1">
                    {(editing.meta_title || "").length}/60 characters recommended
                  </p>
                </div>
                <div>
                  <Label>Meta description</Label>
                  <Textarea
                    rows={2}
                    value={editing.meta_description || ""}
                    placeholder={editing.short_description || "Brief description for search results"}
                    onChange={(e) =>
                      setEditing({ ...editing, meta_description: e.target.value })
                    }
                  />
                  <p className="text-[11px] text-muted-foreground mt-1">
                    {(editing.meta_description || "").length}/160 characters recommended
                  </p>
                </div>
                <ImageUpload
                  bucket="project-images"
                  value={editing.og_image_path}
                  onChange={(p) => setEditing({ ...editing, og_image_path: p })}
                  label="Social share image (OG)"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Display order</Label>
                  <Input
                    type="number"
                    value={editing.display_order ?? 0}
                    onChange={(e) =>
                      setEditing({ ...editing, display_order: Number(e.target.value) })
                    }
                  />
                </div>
                <div className="flex items-end gap-3">
                  <Switch
                    checked={!!editing.is_active}
                    onCheckedChange={(v) => setEditing({ ...editing, is_active: v })}
                  />
                  <Label className="mb-2">Active (visible publicly)</Label>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>
              Cancel
            </Button>
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

export default AdminProjects;
