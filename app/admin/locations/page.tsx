import { requireUser } from "@/lib/auth";
import { DataTable } from "@/components/DataTable";

export default async function AdminLocationsPage() {
  await requireUser(["SUPER_ADMIN", "ADMIN", "STAFF"]);

  const locations = [
    { district: "Pratapgarh", hub: "Workshop Hub & Head Office", turnaround: "Same-Day Site Survey", pincodes: "230001, 230002, 230144", status: "ACTIVE" },
    { district: "Sultanpur", hub: "Regional Service Hub", turnaround: "24-48 Hours", pincodes: "228001, 228119, 228125", status: "ACTIVE" },
    { district: "Jaunpur", hub: "Regional Service Hub", turnaround: "24-48 Hours", pincodes: "222001, 222136, 222142", status: "ACTIVE" },
    { district: "Prayagraj (Allahabad)", hub: "Residential & Commercial Hub", turnaround: "24-48 Hours", pincodes: "211001, 211002, 211019", status: "ACTIVE" },
    { district: "Varanasi (Kashi)", hub: "Architectural Railings & uPVC", turnaround: "48 Hours", pincodes: "221001, 221005, 221010", status: "ACTIVE" },
    { district: "Lucknow", hub: "Turnkey Modular Kitchens & Railings", turnaround: "48-72 Hours", pincodes: "226001, 226010, 226024", status: "ACTIVE" },
    { district: "Raebareli & Amethi", hub: "Extended Service Area", turnaround: "48 Hours", pincodes: "229001, 227409", status: "ACTIVE" }
  ];

  return (
    <div className="wrap" style={{ padding: "24px 0", maxWidth: "100%", boxSizing: "border-box" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <span className="brand-dot-pulse" />
        <span className="eyebrow" style={{ color: "var(--red-2)", margin: 0, fontWeight: 700 }}>
          Coverage &amp; Logistics
        </span>
      </div>
      <h1 className="display big-title" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}>
        Service Coverage Areas &amp; Regional Hubs ({locations.length})
      </h1>
      <p className="muted" style={{ margin: "6px 0 24px" }}>
        Active districts across Uttar Pradesh with on-site laser measurement and dispatch logistics.
      </p>

      <DataTable
        rows={locations}
        columns={[
          { key: "district", label: "District / City" },
          { key: "hub", label: "Service Type" },
          { key: "turnaround", label: "Survey Turnaround" },
          { key: "pincodes", label: "Key Pincodes" },
          { key: "status", label: "Operational Status" }
        ]}
      />
    </div>
  );
}
