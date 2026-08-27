import { requireUser } from "@/lib/auth";
import { DataTable } from "@/components/DataTable";

export default async function AdminTeamPage() {
  await requireUser(["SUPER_ADMIN", "ADMIN", "STAFF"]);

  const team = [
    { name: "Akarsh Mishra", role: "Co-Founder & Technical Operations", phone: "+91 8795662161", area: "Pratapgarh / Project Estimation & Client Advisory", status: "ACTIVE" },
    { name: "Sparsh Mishra", role: "Co-Founder & Site Installation Lead", phone: "+91 7007710096", area: "Pratapgarh / Workshop Fabrication & Site Fitting", status: "ACTIVE" },
    { name: "Senior Fabrication Master", role: "TIG/MIG Welding & CNC Steel Cutting", phone: "Workshop Direct", area: "Pratapgarh Workshop Hub", status: "ACTIVE" },
    { name: "uPVC Installation Specialist", role: "Multi-Chamber Windows & Door Sealing", phone: "On-Site Team", area: "UP Installation Division", status: "ACTIVE" }
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
        Partners &amp; Fabrication Team ({team.length})
      </h1>
      <p className="muted" style={{ margin: "6px 0 24px" }}>
        Leadership directory, project supervisors, and on-site craftsmen managing fabrication projects.
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
