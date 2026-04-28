import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { slugify } from "@/lib/slug";

type Item = { id: string; name: string; slug: string };

const TaxonomyList = ({
  table,
  title,
}: {
  table: "blog_categories" | "blog_tags";
  title: string;
}) => {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from(table).select("id, name, slug").order("name");
    if (error) toast.error(error.message);
    setItems((data as Item[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const add = async () => {
    if (!name.trim()) return;
    setAdding(true);
    const { error } = await supabase.from(table).insert({ name: name.trim(), slug: slugify(name) });
    setAdding(false);
    if (error) return toast.error(error.message);
    setName("");
    load();
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm uppercase tracking-wider text-muted-foreground">{title}</h3>
      <div className="flex gap-2">
        <Input
          placeholder={`New ${title.toLowerCase().slice(0, -1)} name`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
        />
        <Button onClick={add} disabled={adding}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
      ) : (
        <div className="flex flex-wrap gap-2">
          {items.map((i) => (
            <div
              key={i.id}
              className="flex items-center gap-1 px-3 py-1 border border-border rounded-full text-sm"
            >
              <span>{i.name}</span>
              <button
                type="button"
                onClick={() => remove(i.id)}
                className="ml-1 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          ))}
          {items.length === 0 && (
            <p className="text-xs text-muted-foreground">None yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

const AdminTaxonomy = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-light tracking-wide">Blog Taxonomy</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage categories and tags for blog posts.
        </p>
      </div>
      <TaxonomyList table="blog_categories" title="Categories" />
      <TaxonomyList table="blog_tags" title="Tags" />
    </div>
  );
};

export default AdminTaxonomy;
