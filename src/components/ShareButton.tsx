import { useState } from "react";
import { Share2, Link2, Check, Mail, Facebook, Linkedin, Twitter, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface ShareButtonProps {
  title: string;
  text?: string;
  /** Optional explicit URL. Defaults to current window.location.href */
  url?: string;
  className?: string;
  label?: string;
}

const ShareButton = ({ title, text, url, className = "", label = "Share" }: ShareButtonProps) => {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");
  const shareText = text || title;

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedText = encodeURIComponent(shareText);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy link");
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text: shareText, url: shareUrl });
        setOpen(false);
        return true;
      } catch {
        // user cancelled — fall through to popover
      }
    }
    return false;
  };

  const handleTriggerClick = async (e: React.MouseEvent) => {
    // On mobile devices with native share, prefer that
    if (typeof navigator !== "undefined" && navigator.share && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)) {
      e.preventDefault();
      const shared = await handleNativeShare();
      if (shared) return;
      setOpen(true);
    }
  };

  const socialLinks = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      name: "Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: "X (Twitter)",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: "Email",
      icon: Mail,
      href: `mailto:?subject=${encodedTitle}&body=${encodedText}%0A%0A${encodedUrl}`,
    },
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          onClick={handleTriggerClick}
          className={`inline-flex items-center gap-2 px-4 py-2 border border-border bg-card hover:border-primary/50 hover:text-primary text-foreground text-xs uppercase tracking-[0.2em] transition-colors ${className}`}
          aria-label="Share this page"
        >
          <Share2 className="w-3.5 h-3.5" />
          {label}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2 bg-card border-border" align="end">
        <div className="flex flex-col">
          <button
            onClick={handleCopy}
            className="flex items-center gap-3 px-3 py-2.5 text-left text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors rounded-sm"
          >
            {copied ? <Check className="w-4 h-4 text-primary" /> : <Link2 className="w-4 h-4" />}
            <span>{copied ? "Copied!" : "Copy link"}</span>
          </button>
          {socialLinks.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 text-left text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors rounded-sm"
            >
              <s.icon className="w-4 h-4" />
              <span>{s.name}</span>
            </a>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ShareButton;
