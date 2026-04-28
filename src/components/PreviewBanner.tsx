import { Eye, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface PreviewBannerProps {
  status: "draft" | "published" | "scheduled";
  label?: string;
}

/**
 * Sticky banner shown to admins when viewing a page with ?preview=1.
 * Indicates the publication state of the content being previewed.
 */
const PreviewBanner = ({ status, label }: PreviewBannerProps) => {
  const location = useLocation();
  const exitTo = location.pathname; // strip query

  const styles = {
    draft: "bg-amber-500/95 text-black",
    scheduled: "bg-sky-500/95 text-black",
    published: "bg-emerald-500/95 text-black",
  }[status];

  const text = {
    draft: "Draft preview — not visible to public",
    scheduled: "Scheduled preview — not yet live",
    published: "Preview mode — content is live",
  }[status];

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[100] ${styles} shadow-md`}
      role="status"
    >
      <div className="container mx-auto px-4 py-2 flex items-center justify-between gap-3 text-xs sm:text-sm font-medium">
        <div className="flex items-center gap-2 min-w-0">
          <Eye className="h-4 w-4 flex-shrink-0" />
          <span className="truncate">
            {text}
            {label && <span className="opacity-75"> · {label}</span>}
          </span>
        </div>
        <Link
          to={exitTo}
          className="flex items-center gap-1 hover:underline flex-shrink-0"
        >
          <X className="h-3.5 w-3.5" /> Exit preview
        </Link>
      </div>
    </div>
  );
};

export default PreviewBanner;
