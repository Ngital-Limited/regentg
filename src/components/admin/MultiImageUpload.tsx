import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Upload, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { publicUrl } from "./ImageUpload";

interface MultiImageUploadProps {
  bucket: "project-images" | "blog-images";
  value: string[];
  onChange: (paths: string[]) => void;
  label?: string;
}

const MultiImageUpload = ({ bucket, value, onChange, label = "Gallery" }: MultiImageUploadProps) => {
  const [uploading, setUploading] = useState(false);

  const handleFiles = async (files: FileList) => {
    setUploading(true);
    try {
      const uploaded: string[] = [];
      for (const file of Array.from(files)) {
        if (file.size > 10 * 1024 * 1024) {
          toast.error(`${file.name} exceeds 10 MB`);
          continue;
        }
        const ext = file.name.split(".").pop() || "jpg";
        const path = `${crypto.randomUUID()}.${ext}`;
        const { error } = await supabase.storage.from(bucket).upload(path, file);
        if (error) {
          toast.error(`${file.name}: ${error.message}`);
        } else {
          uploaded.push(path);
        }
      }
      if (uploaded.length) {
        onChange([...value, ...uploaded]);
        toast.success(`${uploaded.length} image(s) uploaded`);
      }
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async (path: string) => {
    await supabase.storage.from(bucket).remove([path]);
    onChange(value.filter((p) => p !== path));
  };

  return (
    <div className="space-y-2">
      <label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</label>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {value.map((path) => (
          <div key={path} className="relative group aspect-square">
            <img src={publicUrl(bucket, path)!} alt="" className="w-full h-full object-cover rounded-md border border-border" />
            <Button
              type="button"
              size="icon"
              variant="destructive"
              className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100"
              onClick={() => handleRemove(path)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
        <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-border rounded-md cursor-pointer hover:border-primary/50">
          {uploading ? (
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          ) : (
            <>
              <Upload className="h-5 w-5 text-muted-foreground mb-1" />
              <span className="text-[10px] text-muted-foreground">Add</span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            disabled={uploading}
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
          />
        </label>
      </div>
    </div>
  );
};

export default MultiImageUpload;
