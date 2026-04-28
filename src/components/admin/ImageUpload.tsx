import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Upload, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
  bucket: "project-images" | "blog-images";
  value?: string | null;
  onChange: (path: string | null) => void;
  label?: string;
  accept?: string;
}

export function publicUrl(bucket: string, path?: string | null) {
  if (!path) return null;
  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
}

const ImageUpload = ({ bucket, value, onChange, label = "Image", accept = "image/*" }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const preview = publicUrl(bucket, value);

  const handleFile = async (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image must be under 10 MB");
      return;
    }
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage.from(bucket).upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });
      if (error) throw error;
      onChange(path);
      toast.success("Image uploaded");
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async () => {
    if (value) {
      await supabase.storage.from(bucket).remove([value]);
    }
    onChange(null);
  };

  return (
    <div className="space-y-2">
      <label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</label>
      {preview ? (
        <div className="relative group">
          <img src={preview} alt="" className="w-full h-48 object-cover rounded-md border border-border" />
          <Button
            type="button"
            size="icon"
            variant="destructive"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-md cursor-pointer hover:border-primary/50 transition-colors">
          {uploading ? (
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          ) : (
            <>
              <Upload className="h-6 w-6 text-muted-foreground mb-2" />
              <span className="text-sm text-muted-foreground">Click to upload</span>
            </>
          )}
          <input
            type="file"
            accept={accept}
            className="hidden"
            disabled={uploading}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </label>
      )}
    </div>
  );
};

export default ImageUpload;
