import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import ImageUpload from "@/components/admin/ImageUpload";

type Slide = { titleLine1: string; titleLine2: string; subtitle: string; image: string };

type Settings = {
  hero: { headline: string; subheadline: string; cta_label: string };
  hero_slides: Slide[];
  about: { title: string; body: string };
  stats: {
    projects_completed: string;
    years_experience: string;
    happy_families: string;
    ongoing_projects: string;
  };
};

const defaults: Settings = {
  hero: { headline: "", subheadline: "", cta_label: "" },
  hero_slides: [],
  about: { title: "", body: "" },
  stats: {
    projects_completed: "",
    years_experience: "",
    happy_families: "",
    ongoing_projects: "",
  },
};

const AdminHomepage = () => {
  const [settings, setSettings] = useState<Settings>(defaults);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("key, value")
        .in("key", ["hero", "hero_slides", "about", "stats"]);
      if (error) toast.error(error.message);
      const next: Settings = { ...defaults, hero_slides: [] };
      data?.forEach((row: any) => {
        if (row.key === "hero_slides") {
          next.hero_slides = Array.isArray(row.value) ? row.value : (row.value?.slides ?? []);
        } else {
          (next as any)[row.key] = { ...(defaults as any)[row.key], ...row.value };
        }
      });
      setSettings(next);
      setLoading(false);
    })();
  }, []);

  const save = async () => {
    setSaving(true);
    const rows = [
      { key: "hero", value: settings.hero },
      { key: "hero_slides", value: settings.hero_slides as any },
      { key: "about", value: settings.about },
      { key: "stats", value: settings.stats },
    ];
    const { error } = await supabase.from("site_settings").upsert(rows, { onConflict: "key" });
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Homepage updated");
  };

  const updateSlide = (idx: number, patch: Partial<Slide>) => {
    setSettings((s) => ({
      ...s,
      hero_slides: s.hero_slides.map((sl, i) => (i === idx ? { ...sl, ...patch } : sl)),
    }));
  };
  const addSlide = () => {
    setSettings((s) => ({
      ...s,
      hero_slides: [...s.hero_slides, { titleLine1: "", titleLine2: "", subtitle: "", image: "" }],
    }));
  };
  const removeSlide = (idx: number) => {
    setSettings((s) => ({ ...s, hero_slides: s.hero_slides.filter((_, i) => i !== idx) }));
  };

  if (loading)
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-light tracking-wide">Homepage</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Edit the headlines, copy, and stats shown on the home page.
        </p>
      </div>

      {/* HERO */}
      <section className="space-y-4">
        <h2 className="text-xs uppercase tracking-wider text-primary">Hero Section</h2>
        <div>
          <Label>Headline</Label>
          <Input
            value={settings.hero.headline}
            onChange={(e) =>
              setSettings({ ...settings, hero: { ...settings.hero, headline: e.target.value } })
            }
          />
        </div>
        <div>
          <Label>Subheadline</Label>
          <Textarea
            rows={2}
            value={settings.hero.subheadline}
            onChange={(e) =>
              setSettings({
                ...settings,
                hero: { ...settings.hero, subheadline: e.target.value },
              })
            }
          />
        </div>
        <div>
          <Label>CTA button label</Label>
          <Input
            value={settings.hero.cta_label}
            onChange={(e) =>
              setSettings({ ...settings, hero: { ...settings.hero, cta_label: e.target.value } })
            }
          />
        </div>
      </section>

      {/* ABOUT */}
      <section className="space-y-4">
        <h2 className="text-xs uppercase tracking-wider text-primary">About Section</h2>
        <div>
          <Label>Title</Label>
          <Input
            value={settings.about.title}
            onChange={(e) =>
              setSettings({ ...settings, about: { ...settings.about, title: e.target.value } })
            }
          />
        </div>
        <div>
          <Label>Body</Label>
          <Textarea
            rows={5}
            value={settings.about.body}
            onChange={(e) =>
              setSettings({ ...settings, about: { ...settings.about, body: e.target.value } })
            }
          />
        </div>
      </section>

      {/* STATS */}
      <section className="space-y-4">
        <h2 className="text-xs uppercase tracking-wider text-primary">Stats</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Projects completed</Label>
            <Input
              value={settings.stats.projects_completed}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  stats: { ...settings.stats, projects_completed: e.target.value },
                })
              }
            />
          </div>
          <div>
            <Label>Years of experience</Label>
            <Input
              value={settings.stats.years_experience}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  stats: { ...settings.stats, years_experience: e.target.value },
                })
              }
            />
          </div>
          <div>
            <Label>Happy families</Label>
            <Input
              value={settings.stats.happy_families}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  stats: { ...settings.stats, happy_families: e.target.value },
                })
              }
            />
          </div>
          <div>
            <Label>Ongoing projects</Label>
            <Input
              value={settings.stats.ongoing_projects}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  stats: { ...settings.stats, ongoing_projects: e.target.value },
                })
              }
            />
          </div>
        </div>
      </section>

      <div className="flex justify-end pt-4 border-t border-border">
        <Button onClick={save} disabled={saving}>
          {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          Save changes
        </Button>
      </div>
    </div>
  );
};

export default AdminHomepage;
