import { useState } from "react";
import { Share2, Link2, Check, Mail, MessageCircle } from "lucide-react";

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.87.24-1.46 1.49-1.46H17V4.45c-.27-.04-1.2-.12-2.27-.12-2.25 0-3.79 1.37-3.79 3.89V10.5H8.5v3H11V21h2.5z" />
  </svg>
);

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M18.244 3H21l-6.51 7.44L22.5 21h-6.79l-4.74-6.2L5.4 21H2.64l6.97-7.97L1.8 3h6.96l4.28 5.66L18.244 3zm-1.19 16.2h1.5L7.04 4.7H5.43l11.624 14.5z" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM8.34 18H5.67V9.67h2.67V18zM7 8.5a1.55 1.55 0 110-3.1 1.55 1.55 0 010 3.1zM18.34 18h-2.67v-4.05c0-.97-.02-2.22-1.35-2.22-1.36 0-1.57 1.06-1.57 2.15V18h-2.67V9.67h2.56v1.14h.04c.36-.68 1.24-1.4 2.55-1.4 2.73 0 3.23 1.8 3.23 4.13V18z" />
  </svg>
);
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
      icon: FacebookIcon,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: "X (Twitter)",
      icon: XIcon,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: "LinkedIn",
      icon: LinkedinIcon,
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
