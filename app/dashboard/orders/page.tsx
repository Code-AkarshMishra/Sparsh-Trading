import { requireUser } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Order } from "@/models/Core";
import { DataTable } from "@/components/DataTable";
import { orderStatuses } from "@/lib/business";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/Icons";

export default async function OrdersPage() {
  const user = await requireUser(["CUSTOMER"]);
  await connectDB();
  const orders = await Order.find({ customer: user.id }).sort({ createdAt: -1 }).lean();

  return (
    <div className="wrap" style={{ padding: "24px 0", maxWidth: "100%", boxSizing: "border-box" }}>
      {/* Top Header Split */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14, marginBottom: 20 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span className="brand-dot-pulse" />
            <span className="eyebrow" style={{ color: "var(--red-2)", margin: 0, fontWeight: 700 }}>
              Orders &amp; Production
            </span>
          </div>
          <h1 className="display big-title" style={{ fontSize: "clamp(1.7rem, 4vw, 2.3rem)", margin: "0 0 4px" }}>
            Order Tracker &amp; Status ({orders.length})
          </h1>
          <p className="muted" style={{ margin: 0, fontSize: "0.92rem" }}>
            Track the real-time fabrication and on-site fitting stages of your custom orders.
          </p>
        </div>

        <Link
          className="btn primary"
          href="/dashboard/new-order"
          style={{ padding: "10px 20px", fontSize: "0.92rem", fontWeight: 700, borderRadius: 8, display: "inline-flex", alignItems: "center", gap: 6 }}
        >
          + Place New Order
          <ArrowRightIcon width={14} height={14} />
        </Link>
      </div>

      {/* Production Stages Flow */}
      <div style={{ margin: "20px 0 28px" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 10, color: "var(--strong)" }}>
          Fabrication &amp; Delivery Workflow:
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: 8
          }}
        >
          {orderStatuses.map((s, idx) => (
            <div
              key={s}
              className="card"
              style={{
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid var(--border)",
                textAlign: "center"
              }}
            >
              <span style={{ fontSize: "0.68rem", color: "var(--red-2)", fontWeight: 800, display: "block" }}>
                STEP 0{idx + 1}
              </span>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--strong)", textTransform: "capitalize" }}>
                {s.toLowerCase().replaceAll("_", " ")}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      {orders.length > 0 ? (
        <div style={{ marginTop: 20 }}>
          <DataTable
            rows={JSON.parse(JSON.stringify(orders))}
            columns={[
              { key: "orderId", label: "Order ID" },
              { key: "service", label: "Product / Service" },
              { key: "currentStatus", label: "Production Status" },
              { key: "amount", label: "Amount" },
              { key: "createdAt", label: "Date" }
            ]}
          />
        </div>
      ) : (
        <div
          className="card"
          style={{
            padding: "44px 24px",
            textAlign: "center",
            borderRadius: 12,
            border: "1px dashed var(--border)",
            marginTop: 18
          }}
        >
          <p style={{ fontSize: "1.05rem", color: "var(--strong)", fontWeight: 600, margin: "0 0 8px" }}>
            You haven't placed an order yet.
          </p>
          <p className="muted" style={{ maxWidth: 500, margin: "0 auto 20px", fontSize: "0.92rem" }}>
            Submit your dimensions and material requirements. We will prepare your CAD drawing and quotation immediately.
          </p>
          <Link
            className="btn primary"
            href="/dashboard/new-order"
            style={{ padding: "12px 24px", fontSize: "0.95rem", borderRadius: 8, display: "inline-flex", alignItems: "center", gap: 8 }}
          >
            + Place Your First Order
            <ArrowRightIcon width={14} height={14} />
          </Link>
        </div>
      )}
    </div>
  );
}
