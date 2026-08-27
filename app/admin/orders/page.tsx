import { requireUser } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Order } from "@/models/Core";
import { STAGE_MESSAGES, getOrderStatusWhatsAppUrl } from "@/lib/orderNotification";
import Link from "next/link";

export default async function AdminOrders() {
  await requireUser(["SUPER_ADMIN", "ADMIN", "STAFF"]);
  const db = await connectDB();
  let rows: any[] = [];

  if (db) {
    try {
      rows = await Order.find().populate("customer", "name phone").sort({ createdAt: -1 }).lean();
    } catch {
      rows = [];
    }
  }

  return (
    <div className="wrap" style={{ padding: "32px 0", maxWidth: 1080 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14, marginBottom: 20 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span className="brand-dot-pulse" />
            <span className="eyebrow" style={{ color: "var(--red-2)", margin: 0, fontWeight: 700 }}>
              Workshop Floor &amp; Customer Orders
            </span>
          </div>
          <h1 className="display big-title" style={{ margin: "0 0 4px", fontSize: "clamp(1.8rem, 4vw, 2.4rem)" }}>
            Fabrication Orders ({rows.length})
          </h1>
          <p className="muted" style={{ margin: 0, fontSize: "0.92rem" }}>
            Track fabrication milestones and dispatch 1-click live WhatsApp status alerts to customers.
          </p>
        </div>
      </div>

      {/* Orders List */}
      {rows.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 20 }}>
          {rows.map((ord: any) => {
            const customerName = ord.customer?.name || "Valued Client";
            const customerPhone = ord.customer?.phone || ord.phone || "";
            const currentStage = ord.currentStatus || "FABRICATION";
            const stageMeta = STAGE_MESSAGES[currentStage] || { label: currentStage, desc: "Order in progress" };

            const waTrackingUrl = customerPhone
              ? getOrderStatusWhatsAppUrl({
                  customerPhone,
                  customerName,
                  orderId: ord.orderId,
                  service: ord.items?.[0]?.name || "Custom Fabrication Order",
                  status: currentStage,
                  expectedDate: ord.expectedCompletionDate ? new Date(ord.expectedCompletionDate).toLocaleDateString() : undefined,
                  notes: ord.notes
                })
              : null;

            return (
              <div
                key={String(ord._id)}
                className="card"
                style={{
                  padding: "20px 22px",
                  borderRadius: 10,
                  border: "1px solid var(--border)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 16
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: "0.82rem", fontWeight: 800, color: "var(--red-2)", letterSpacing: "0.03em" }}>
                      {ord.orderId}
                    </span>
                    <span
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        padding: "2px 8px",
                        borderRadius: 12,
                        background: "rgba(22, 163, 74, 0.12)",
                        color: "#16a34a"
                      }}
                    >
                      {stageMeta.label}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "2px 0 4px", color: "var(--strong)" }}>
                    {customerName} {customerPhone ? `(+91 ${customerPhone})` : ""}
                  </h3>
                  <p className="muted" style={{ margin: 0, fontSize: "0.86rem" }}>
                    {stageMeta.desc}
                  </p>
                </div>

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {waTrackingUrl && (
                    <a
                      className="btn whatsapp-action"
                      href={waTrackingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ padding: "8px 14px", fontSize: "0.84rem", borderRadius: 6, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 6 }}
                    >
                      💬 Send WhatsApp Update
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div
          className="card"
          style={{
            padding: "48px 24px",
            textAlign: "center",
            borderRadius: 12,
            border: "1px dashed var(--border)",
            marginTop: 20
          }}
        >
          <p style={{ fontSize: "1.05rem", color: "var(--strong)", fontWeight: 600, margin: "0 0 6px" }}>
            No active fabrication orders in database.
          </p>
          <p className="muted" style={{ maxWidth: 460, margin: "0 auto", fontSize: "0.9rem" }}>
            Customer orders submitted from the client dashboard will appear here with live WhatsApp dispatch tools.
          </p>
        </div>
      )}
    </div>
  );
}
