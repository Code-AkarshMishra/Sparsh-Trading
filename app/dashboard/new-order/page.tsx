import { requireUser } from "@/lib/auth";
import { EnquiryForm } from "@/components/EnquiryForm";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/Icons";

export default async function NewOrderPage() {
  const user = await requireUser(["CUSTOMER"]);

  return (
    <div className="wrap" style={{ padding: "24px 0", maxWidth: 900, boxSizing: "border-box" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span className="brand-dot-pulse" />
            <span className="eyebrow" style={{ color: "var(--red-2)", margin: 0, fontWeight: 700 }}>
              Order Placement
            </span>
          </div>
          <h1 className="display big-title" style={{ fontSize: "clamp(1.7rem, 4vw, 2.3rem)", margin: "0 0 4px" }}>
            Place a New Custom Order
          </h1>
          <p className="muted" style={{ margin: 0, fontSize: "0.92rem" }}>
            Submit your fabrication requirements, dimensions, or site measurements. Our workshop team will confirm pricing and dispatch.
          </p>
        </div>

        <Link className="btn" href="/dashboard/orders" style={{ fontSize: "0.86rem", borderRadius: 8 }}>
          ← Back to Orders
        </Link>
      </div>

      <div style={{ marginTop: 20 }}>
        <EnquiryForm />
      </div>
    </div>
  );
}
