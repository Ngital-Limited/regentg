import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Download, User, Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface BrochureDownloadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectName: string;
  projectId?: string;
  brochureUrl?: string;
}

const BrochureDownloadDialog = ({ open, onOpenChange, projectName, projectId, brochureUrl }: BrochureDownloadDialogProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || !email.trim()) {
      toast({
        title: "Required Fields",
        description: "Please provide your name, email, and phone number.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("brochure_leads").insert({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      project_name: projectName,
      project_id: projectId || null,
    });

    if (error) {
      setLoading(false);
      toast({
        title: "Could not submit request",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    if (brochureUrl) {
      toast({
        title: "Download Starting",
        description: `Thank you ${name}! Your brochure for ${projectName} is opening.`,
      });
      const opened = window.open(brochureUrl, "_blank", "noopener,noreferrer");
      if (!opened) {
        window.location.href = brochureUrl;
      }
    } else {
      toast({
        title: "Request received",
        description: `Thank you ${name}! Our team will share the ${projectName} brochure with you shortly.`,
      });
    }

    setLoading(false);
    setName("");
    setEmail("");
    setPhone("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border/50 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-light uppercase tracking-[0.15em] text-foreground">
            Download Brochure
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            Please provide your details to download the {projectName} brochure.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="brochure-name" className="text-xs uppercase tracking-wider text-muted-foreground">
              Full Name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="brochure-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="pl-10 bg-background border-border/50 text-foreground placeholder:text-muted-foreground"
                required
                maxLength={100}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="brochure-email" className="text-xs uppercase tracking-wider text-muted-foreground">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="brochure-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="pl-10 bg-background border-border/50 text-foreground placeholder:text-muted-foreground"
                required
                maxLength={255}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="brochure-phone" className="text-xs uppercase tracking-wider text-muted-foreground">
              Phone Number
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="brochure-phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                type="tel"
                className="pl-10 bg-background border-border/50 text-foreground placeholder:text-muted-foreground"
                required
                maxLength={20}
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] hover:bg-primary/90"
          >
            {loading ? (
              "Processing..."
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Download Brochure
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BrochureDownloadDialog;
