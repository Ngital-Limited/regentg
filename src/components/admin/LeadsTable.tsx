import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Search, Trash2, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

type LeadRow = Record<string, any> & {
  id: string;
  status: string;
  admin_notes: string | null;
  created_at: string;
};

interface FieldDef {
  key: string;
  label: string;
  /** how to render in detail dialog. default = plain text */
  render?: (row: LeadRow) => React.ReactNode;
  /** if true, hidden from list table but shown in detail */
  detailOnly?: boolean;
  /** width hint for the table column */
  width?: string;
}

interface Props {
  table: "contact_submissions" | "visit_bookings" | "brochure_leads" | "job_applications";
  title: string;
  description?: string;
  primaryField: string; // shown as bold name in row
  secondaryField?: string; // shown beneath name (e.g. project_name)
  fields: FieldDef[];
}

const STATUS_OPTIONS = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "won", label: "Won" },
  { value: "lost", label: "Lost" },
];

const statusColor = (status: string) => {
  switch (status) {
    case "new":
      return "border-primary/40 text-primary bg-primary/5";
    case "contacted":
      return "border-amber-500/40 text-amber-400 bg-amber-500/5";
    case "qualified":
      return "border-blue-500/40 text-blue-400 bg-blue-500/5";
    case "won":
      return "border-green-500/40 text-green-400 bg-green-500/5";
    case "lost":
      return "border-muted-foreground/30 text-muted-foreground bg-muted/20";
    default:
      return "border-border text-muted-foreground";
  }
};

const formatDate = (d: string) =>
  new Date(d).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const LeadsTable = ({ table, title, description, primaryField, secondaryField, fields }: Props) => {
  const [rows, setRows] = useState<LeadRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selected, setSelected] = useState<LeadRow | null>(null);
  const [savingNotes, setSavingNotes] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setRows((data as LeadRow[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [table]);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from(table).update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    if (selected?.id === id) setSelected({ ...selected, status });
    toast.success("Status updated");
  };

  const saveNotes = async () => {
    if (!selected) return;
    setSavingNotes(true);
    const { error } = await supabase
      .from(table)
      .update({ admin_notes: selected.admin_notes })
      .eq("id", selected.id);
    setSavingNotes(false);
    if (error) return toast.error(error.message);
    setRows((prev) =>
      prev.map((r) => (r.id === selected.id ? { ...r, admin_notes: selected.admin_notes } : r))
    );
    toast.success("Notes saved");
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this lead permanently?")) return;
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) return toast.error(error.message);
    setRows((prev) => prev.filter((r) => r.id !== id));
    setSelected(null);
    toast.success("Deleted");
  };

  const filtered = rows.filter((r) => {
    if (statusFilter !== "all" && r.status !== statusFilter) return false;
    if (!search.trim()) return true;
    const hay = JSON.stringify(r).toLowerCase();
    return hay.includes(search.toLowerCase());
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-light tracking-wide uppercase text-foreground">{title}</h1>
        <div className="w-12 h-[2px] bg-primary mt-3" />
        {description && <p className="text-sm text-muted-foreground mt-3">{description}</p>}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search name, phone, email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {STATUS_OPTIONS.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="text-xs text-muted-foreground mb-3">
        {filtered.length} of {rows.length} {rows.length === 1 ? "entry" : "entries"}
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="border border-dashed border-border rounded-lg p-12 text-center">
          <p className="text-sm text-muted-foreground">No entries yet.</p>
        </div>
      ) : (
        <div className="border border-border rounded-md overflow-hidden bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-muted/30">
                <tr className="text-left">
                  <th className="px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground font-medium">
                    Submitted
                  </th>
                  <th className="px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground font-medium">
                    Contact
                  </th>
                  {fields
                    .filter((f) => !f.detailOnly)
                    .map((f) => (
                      <th
                        key={f.key}
                        className="px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground font-medium"
                        style={f.width ? { width: f.width } : undefined}
                      >
                        {f.label}
                      </th>
                    ))}
                  <th className="px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground font-medium">
                    Status
                  </th>
                  <th className="px-4 py-3 w-12"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-border last:border-0 hover:bg-muted/20 cursor-pointer transition-colors"
                    onClick={() => setSelected(row)}
                  >
                    <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                      {formatDate(row.created_at)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-foreground">{row[primaryField]}</div>
                      {secondaryField && row[secondaryField] && (
                        <div className="text-xs text-muted-foreground">{row[secondaryField]}</div>
                      )}
                    </td>
                    {fields
                      .filter((f) => !f.detailOnly)
                      .map((f) => (
                        <td key={f.key} className="px-4 py-3 text-xs text-foreground/80">
                          {f.render ? f.render(row) : row[f.key] || "—"}
                        </td>
                      ))}
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <Select value={row.status} onValueChange={(v) => updateStatus(row.id, v)}>
                        <SelectTrigger
                          className={`h-7 text-[11px] uppercase tracking-wider w-32 ${statusColor(
                            row.status
                          )}`}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {STATUS_OPTIONS.map((s) => (
                            <SelectItem key={s.value} value={s.value}>
                              {s.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => remove(row.id)}
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selected?.[primaryField]}</DialogTitle>
            <p className="text-xs text-muted-foreground">
              Submitted {selected && formatDate(selected.created_at)}
            </p>
          </DialogHeader>

          {selected && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {fields.map((f) => (
                  <div key={f.key} className="space-y-1">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      {f.label}
                    </p>
                    <div className="text-sm text-foreground break-words">
                      {f.render ? f.render(selected) : selected[f.key] || "—"}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4">
                <label className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-2">
                  Internal notes
                </label>
                <Textarea
                  rows={4}
                  value={selected.admin_notes || ""}
                  onChange={(e) =>
                    setSelected({ ...selected, admin_notes: e.target.value })
                  }
                  placeholder="Add follow-up notes…"
                />
                <div className="flex justify-end mt-2">
                  <Button size="sm" onClick={saveNotes} disabled={savingNotes}>
                    {savingNotes && <Loader2 className="h-3 w-3 mr-2 animate-spin" />}
                    Save notes
                  </Button>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            {selected && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => remove(selected.id)}
                className="mr-auto text-destructive border-destructive/30 hover:bg-destructive/10"
              >
                <Trash2 className="h-3 w-3 mr-2" />
                Delete
              </Button>
            )}
            <Button variant="outline" onClick={() => setSelected(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LeadsTable;
export { type FieldDef };
