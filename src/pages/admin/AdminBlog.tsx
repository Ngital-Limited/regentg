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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import ImageUpload, { publicUrl } from "@/components/admin/ImageUpload";
import { slugify } from "@/lib/slug";

type Category = { id: string; name: string; slug: string };
type Tag = { id: string; name: string; slug: string };

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string | null;
  cover_image_path: string | null;
  category_id: string | null;
  author_name: string | null;
  author_avatar_path: string | null;
  meta_title: string | null;
  meta_description: string | null;
  og_image_path: string | null;
  is_published: boolean;
  published_at: string | null;
};

const empty: Partial<Post> = {
  title: "",
  slug: "",
  excerpt: "",
  body: "",
  cover_image_path: null,
  category_id: null,
  author_name: "",
  author_avatar_path: null,
  meta_title: "",
  meta_description: "",
  og_image_path: null,
  is_published: false,
  published_at: null,
};

const AdminBlog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [postTags, setPostTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Post> | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const [p, c, t] = await Promise.all([
      supabase.from("blog_posts").select("*").order("created_at", { ascending: false }),
      supabase.from("blog_categories").select("*").order("name"),
      supabase.from("blog_tags").select("*").order("name"),
    ]);
    if (p.error) toast.error(p.error.message);
    setPosts((p.data as Post[]) || []);
    setCategories((c.data as Category[]) || []);
    setTags((t.data as Tag[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const openEdit = async (post: Partial<Post>) => {
    setEditing(post);
    if (post.id) {
      const { data } = await supabase
        .from("blog_post_tags")
        .select("tag_id")
        .eq("post_id", post.id);
      setPostTags(data?.map((d) => d.tag_id) || []);
    } else {
      setPostTags([]);
    }
  };

  const handleSave = async () => {
    if (!editing?.title) return toast.error("Title is required");
    setSaving(true);
    const slug = editing.slug?.trim() || slugify(editing.title);
    const payload: any = {
      ...editing,
      slug,
      published_at:
        editing.is_published && !editing.published_at
          ? new Date().toISOString()
          : editing.published_at,
    };

    let postId = editing.id;
    if (postId) {
      const { error } = await supabase.from("blog_posts").update(payload).eq("id", postId);
      if (error) {
        setSaving(false);
        return toast.error(error.message);
      }
    } else {
      const { data, error } = await supabase
        .from("blog_posts")
        .insert(payload)
        .select("id")
        .single();
      if (error || !data) {
        setSaving(false);
        return toast.error(error?.message || "Failed");
      }
      postId = data.id;
    }

    // Update tag links
    await supabase.from("blog_post_tags").delete().eq("post_id", postId);
    if (postTags.length) {
      await supabase
        .from("blog_post_tags")
        .insert(postTags.map((tag_id) => ({ post_id: postId, tag_id })));
    }

    setSaving(false);
    toast.success("Saved");
    setEditing(null);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    load();
  };

  const toggleTag = (tagId: string) => {
    setPostTags((prev) =>
      prev.includes(tagId) ? prev.filter((t) => t !== tagId) : [...prev, tagId]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light tracking-wide">Blog Posts</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage news and articles. Published posts appear on /blog.
          </p>
        </div>
        <Button onClick={() => openEdit({ ...empty })}>
          <Plus className="h-4 w-4 mr-2" /> New Post
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="grid gap-3">
          {posts.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-4 p-3 border border-border rounded-md bg-card"
            >
              <div className="w-16 h-16 rounded overflow-hidden bg-muted flex-shrink-0">
                {p.cover_image_path && (
                  <img
                    src={publicUrl("blog-images", p.cover_image_path)!}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium truncate">{p.title}</h3>
                  <span
                    className={`text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded border ${
                      p.is_published
                        ? "border-primary/30 text-primary"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    {p.is_published ? "Published" : "Draft"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground truncate">/blog/{p.slug}</p>
              </div>
              <Button size="icon" variant="ghost" onClick={() => openEdit(p)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" onClick={() => handleDelete(p.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {posts.length === 0 && (
            <p className="text-center text-sm text-muted-foreground py-8">
              No posts yet. Create your first article.
            </p>
          )}
        </div>
      )}

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing?.id ? "Edit Post" : "New Post"}</DialogTitle>
          </DialogHeader>

          {editing && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Title *</Label>
                  <Input
                    value={editing.title || ""}
                    onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Slug</Label>
                  <Input
                    value={editing.slug || ""}
                    placeholder={editing.title ? slugify(editing.title) : "auto"}
                    onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label>Excerpt (short summary)</Label>
                <Textarea
                  rows={2}
                  value={editing.excerpt || ""}
                  onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
                />
              </div>

              <ImageUpload
                bucket="blog-images"
                value={editing.cover_image_path}
                onChange={(p) => setEditing({ ...editing, cover_image_path: p })}
                label="Cover image"
              />

              <div>
                <Label>Body (Markdown supported)</Label>
                <Textarea
                  rows={12}
                  className="font-mono text-sm"
                  value={editing.body || ""}
                  onChange={(e) => setEditing({ ...editing, body: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Category</Label>
                  <Select
                    value={editing.category_id || "none"}
                    onValueChange={(v) =>
                      setEditing({ ...editing, category_id: v === "none" ? null : v })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {categories.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Author name</Label>
                  <Input
                    value={editing.author_name || ""}
                    onChange={(e) =>
                      setEditing({ ...editing, author_name: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => toggleTag(t.id)}
                      className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                        postTags.includes(t.id)
                          ? "bg-primary/10 border-primary text-primary"
                          : "border-border text-muted-foreground hover:border-primary/40"
                      }`}
                    >
                      {t.name}
                    </button>
                  ))}
                  {tags.length === 0 && (
                    <p className="text-xs text-muted-foreground">
                      No tags yet. Create tags in the Taxonomy tab.
                    </p>
                  )}
                </div>
              </div>

              <div className="border-t border-border pt-4 space-y-4">
                <h4 className="text-xs uppercase tracking-wider text-muted-foreground">
                  SEO
                </h4>
                <div>
                  <Label>Meta title</Label>
                  <Input
                    value={editing.meta_title || ""}
                    onChange={(e) =>
                      setEditing({ ...editing, meta_title: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Meta description</Label>
                  <Textarea
                    rows={2}
                    value={editing.meta_description || ""}
                    onChange={(e) =>
                      setEditing({ ...editing, meta_description: e.target.value })
                    }
                  />
                </div>
                <ImageUpload
                  bucket="blog-images"
                  value={editing.og_image_path}
                  onChange={(p) => setEditing({ ...editing, og_image_path: p })}
                  label="Social share image (OG)"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Switch
                  checked={!!editing.is_published}
                  onCheckedChange={(v) => setEditing({ ...editing, is_published: v })}
                />
                <Label>Published</Label>
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

export default AdminBlog;
