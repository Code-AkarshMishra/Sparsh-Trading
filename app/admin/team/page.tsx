import { requireUser } from "@/lib/auth";
import { DataTable } from "@/components/DataTable";

export default async function AdminTeamPage() {
  await requireUser(["SUPER_ADMIN", "ADMIN", "STAFF"]);

  const team = [
    {
      name: "Aniket Mishra",
      role: "Owner / Founder",
      phone: "+91 9695041222",
      area: "Pratapgarh / Business Operations & Management",
      status: "ACTIVE"
    },
    {
      name: "Ankush Mishra",
      role: "Co-Founder",
      phone: "+91 8795662161",
      area: "Pratapgarh / Project Estimation & Client Advisory",
      status: "ACTIVE"
    },
    {
      name: "Adarsh Singh",
      role: "Co-Founder",
      phone: "+91 7007710096",
      area: "Pratapgarh / Workshop Fabrication & Site Fitting",
      status: "ACTIVE"
    },
    {
      name: "Akarsh Mishra",
      role: "DevOps & Technical Lead",
      phone: "N/A",
      area: "Platform Infrastructure & Security",
      status: "ACTIVE"
    }
  ];

  return (
    <div className="wrap" style={{ padding: "24px 0", maxWidth: "100%", boxSizing: "border-box" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <span className="brand-dot-pulse" />
        <span className="eyebrow" style={{ color: "var(--red-2)", margin: 0, fontWeight: 700 }}>
          Workforce &amp; Leadership
        </span>
      </div>
      <h1 className="display big-title" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}>
        Partners &amp; Leadership Team ({team.length})
      </h1>
      <p className="muted" style={{ margin: "6px 0 24px" }}>
        Official leadership directory and management team of Sparsh Trading.
      </p>

      <DataTable
        rows={team}
        columns={[
          { key: "name", label: "Team Member" },
          { key: "role", label: "Designation" },
          { key: "phone", label: "Contact Phone" },
          { key: "area", label: "Area of Responsibility" },
          { key: "status", label: "Status" }
        ]}
      />
    </div>
  );
}
