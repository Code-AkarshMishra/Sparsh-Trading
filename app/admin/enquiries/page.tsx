import { requireUser } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Enquiry } from "@/models/Core";
import { DataTable } from "@/components/DataTable";
import { fallbackStore } from "@/lib/offlineStore";

export default async function AdminEnquiries() {
  await requireUser(["SUPER_ADMIN", "ADMIN", "STAFF"]);
  const db = await connectDB();
  let rows: any[] = [];

  if (db) {
    try {
      rows = await Enquiry.find().sort({ createdAt: -1 }).lean();
    } catch {
      rows = fallbackStore.getEnquiries();
    }
  } else {
    rows = fallbackStore.getEnquiries();
  }

  return (
    <div className="wrap" style={{ padding: "32px 0" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <span className="brand-dot-pulse" />
        <span className="eyebrow" style={{ color: "var(--red-2)", margin: 0, fontWeight: 700 }}>
          Lead &amp; Enquiry Management
        </span>
      </div>
      <h1 className="display big-title">Project Enquiries ({rows.length})</h1>
      <div style={{ marginTop: 24 }}>
        <DataTable
          rows={JSON.parse(JSON.stringify(rows))}
          columns={[
            { key: "enquiryId", label: "Reference ID" },
            { key: "name", label: "Customer Name" },
            { key: "phone", label: "Phone" },
            { key: "location", label: "Site Location" },
            { key: "service", label: "Service" },
            { key: "requirement", label: "Requirement" },
            { key: "status", label: "Status" }
          ]}
        />
      </div>
    </div>
  );
}
