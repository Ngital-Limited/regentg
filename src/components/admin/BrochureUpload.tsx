import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Upload, FileText, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface BrochureUploadProps {
  value?: string | null;
  onChange: (path: string | null) => void;
}

const BrochureUpload = ({ value, onChange }: BrochureUploadProps) => {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file: File) => {
    if (file.type !== "application/pdf") {
      toast.error("Only PDF files allowed");
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      toast.error("PDF must be under 20 MB");
      return;
    }
    setUploading(true);
    try {
      const path = `${crypto.randomUUID()}.pdf`;
      const { error } = await supabase.storage.from("brochures").upload(path, file);
      if (error) throw error;
      onChange(path);
      toast.success("Brochure uploaded");
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async () => {
    if (value) await supabase.storage.from("brochures").remove([value]);
    onChange(null);
  };

  return (
    <div className="space-y-2">
      <label className="text-xs uppercase tracking-wider text-muted-foreground">Brochure (PDF)</label>
      {value ? (
        <div className="flex items-center justify-between p-3 border border-border rounded-md bg-card">
          <div className="flex items-center gap-2 text-sm">
            <FileText className="h-4 w-4 text-primary" />
            <span className="truncate">{value.split("/").pop()}</span>
          </div>
          <Button type="button" size="icon" variant="ghost" onClick={handleRemove}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <label className="flex items-center justify-center gap-2 w-full h-16 border-2 border-dashed border-border rounded-md cursor-pointer hover:border-primary/50">
          {uploading ? (
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          ) : (
            <>
              <Upload className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Upload PDF brochure</span>
            </>
          )}
          <input
            type="file"
            accept="application/pdf"
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

export default BrochureUpload;
