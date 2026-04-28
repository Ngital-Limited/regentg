import LeadsTable from "@/components/admin/LeadsTable";

const AdminContact = () => (
  <LeadsTable
    table="contact_submissions"
    title="Contact Submissions"
    description="General inquiries from the website Contact page."
    primaryField="name"
    secondaryField="subject"
    fields={[
      { key: "email", label: "Email" },
      { key: "phone", label: "Phone" },
      { key: "subject", label: "Subject", detailOnly: true },
      {
        key: "message",
        label: "Message",
        render: (r) => (
          <div className="whitespace-pre-wrap text-sm text-muted-foreground">{r.message}</div>
        ),
        detailOnly: true,
      },
    ]}
  />
);

export default AdminContact;
