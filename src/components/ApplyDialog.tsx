import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

interface ApplyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobTitle: string;
}

const applySchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(6, "Invalid phone number").max(20),
});

const ApplyDialog = ({ open, onOpenChange, jobTitle }: ApplyDialogProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [cv, setCv] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const reset = () => {
    setName(""); setEmail(""); setPhone(""); setCoverLetter(""); setCv(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = applySchema.safeParse({ name, email, phone });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    if (!cv) {
      toast.error("Please attach your CV");
      return;
    }
    const allowed = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowed.includes(cv.type)) {
      toast.error("CV must be a PDF or Word document");
      return;
    }
    if (cv.size > 5 * 1024 * 1024) {
      toast.error("CV must be under 5MB");
      return;
    }

    setSubmitting(true);
    try {
      // Upload CV
      const ext = cv.name.split(".").pop() || "pdf";
      const safeName = name.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase();
      const path = `${Date.now()}-${safeName}.${ext}`;
      const { error: upErr } = await supabase.storage.from("cvs").upload(path, cv, {
        contentType: cv.type,
        upsert: false,
      });
      if (upErr) throw upErr;

      const { error: insErr } = await supabase.from("job_applications").insert({
        name,
        email,
        phone,
        position: jobTitle,
        cover_letter: coverLetter || null,
        cv_path: path,
        cv_filename: cv.name,
      });
      if (insErr) throw insErr;

      toast.success("Application submitted! We'll review and get back to you soon.");
      reset();
      onOpenChange(false);
    } catch (err: any) {
      toast.error(err.message || "Failed to submit application");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) reset(); onOpenChange(o); }}>
      <DialogContent className="bg-card border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-foreground font-light tracking-wide uppercase text-lg">
            Apply for {jobTitle}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-xs">
            Fill in your details and attach your CV. We'll be in touch.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="apply-name" className="text-xs uppercase tracking-wider text-muted-foreground">Full Name</Label>
            <Input id="apply-name" value={name} onChange={(e) => setName(e.target.value)} maxLength={100} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="apply-email" className="text-xs uppercase tracking-wider text-muted-foreground">Email</Label>
            <Input id="apply-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={255} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="apply-phone" className="text-xs uppercase tracking-wider text-muted-foreground">Phone</Label>
            <Input id="apply-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={20} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="apply-cover" className="text-xs uppercase tracking-wider text-muted-foreground">Cover Letter (optional)</Label>
            <Textarea id="apply-cover" rows={3} value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} maxLength={2000} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="apply-cv" className="text-xs uppercase tracking-wider text-muted-foreground">CV (PDF or Word, max 5MB)</Label>
            <Input
              id="apply-cv"
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={(e) => setCv(e.target.files?.[0] ?? null)}
              required
            />
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 uppercase tracking-[0.2em] text-xs"
          >
            {submitting ? "Submitting..." : "Submit Application"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ApplyDialog;
