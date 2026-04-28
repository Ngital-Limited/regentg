import LeadsTable from "@/components/admin/LeadsTable";

const AdminVisits = () => (
  <LeadsTable
    table="visit_bookings"
    title="Site Visit Requests"
    description="Visitors who requested to schedule a site visit."
    primaryField="name"
    secondaryField="project_name"
    fields={[
      { key: "phone", label: "Phone" },
      { key: "email", label: "Email" },
      { key: "project_name", label: "Project", detailOnly: true },
      {
        key: "preferred_date",
        label: "Preferred date",
        render: (r) =>
          r.preferred_date
            ? new Date(r.preferred_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : "—",
      },
      { key: "preferred_time", label: "Time" },
      {
        key: "notes",
        label: "Notes from visitor",
        render: (r) => (
          <div className="whitespace-pre-wrap text-sm text-muted-foreground">
            {r.notes || "—"}
          </div>
        ),
        detailOnly: true,
      },
    ]}
  />
);

export default AdminVisits;
