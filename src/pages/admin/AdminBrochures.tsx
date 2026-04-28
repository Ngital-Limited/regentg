import LeadsTable from "@/components/admin/LeadsTable";

const AdminBrochures = () => (
  <LeadsTable
    table="brochure_leads"
    title="Brochure Download Leads"
    description="Visitors who requested to download a project brochure."
    primaryField="name"
    secondaryField="project_name"
    fields={[
      { key: "phone", label: "Phone" },
      { key: "email", label: "Email" },
      { key: "project_name", label: "Project" },
    ]}
  />
);

export default AdminBrochures;
