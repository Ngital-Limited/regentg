import LeadsTable from "@/components/admin/LeadsTable";
import { supabase } from "@/integrations/supabase/client";
import { Download } from "lucide-react";
import { toast } from "sonner";

const downloadCv = async (path: string, filename?: string | null) => {
  const { data, error } = await supabase.storage.from("cvs").createSignedUrl(path, 60);
  if (error || !data) {
    toast.error("Could not generate download link");
    return;
  }
  const a = document.createElement("a");
  a.href = data.signedUrl;
  a.download = filename || "cv";
  a.target = "_blank";
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const AdminApplications = () => (
  <LeadsTable
    table="job_applications"
    title="Job Applications"
    description="Career applications submitted via the Career page."
    primaryField="name"
    secondaryField="position"
    fields={[
      { key: "email", label: "Email" },
      { key: "phone", label: "Phone" },
      { key: "position", label: "Position", detailOnly: true },
      {
        key: "cv_path",
        label: "CV",
        render: (r) =>
          r.cv_path ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                downloadCv(r.cv_path, r.cv_filename);
              }}
              className="inline-flex items-center gap-1 text-primary hover:underline text-xs"
            >
              <Download className="h-3 w-3" />
              {r.cv_filename || "Download CV"}
            </button>
          ) : (
            "—"
          ),
      },
      {
        key: "cover_letter",
        label: "Cover letter",
        render: (r) => (
          <div className="whitespace-pre-wrap text-sm text-muted-foreground">
            {r.cover_letter || "—"}
          </div>
        ),
        detailOnly: true,
      },
    ]}
  />
);

export default AdminApplications;
