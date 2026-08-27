import React from "react";

export function DataTable({
  rows,
  columns
}: {
  rows: any[];
  columns: { key: string; label: string }[];
}) {
  return (
    <div
      className="table-wrap card"
      style={{
        width: "100%",
        maxWidth: "100%",
        overflow: "hidden",
        boxSizing: "border-box",
        border: "1.5px solid var(--border)",
        borderRadius: 12,
        background: "var(--surface)",
        padding: 0
      }}
    >
      <div
        className="table-responsive"
        style={{
          width: "100%",
          maxWidth: "100%",
          overflowX: "auto",
          WebkitOverflowScrolling: "touch"
        }}
      >
        <table
          className="table"
          style={{
            width: "100%",
            minWidth: 620,
            borderCollapse: "collapse",
            fontSize: "0.9rem",
            textAlign: "left"
          }}
        >
          <thead>
            <tr style={{ background: "var(--surface-2)", borderBottom: "2px solid var(--border)" }}>
              {columns.map((c) => (
                <th
                  key={c.key}
                  style={{
                    padding: "14px 16px",
                    fontWeight: 800,
                    color: "var(--strong)",
                    fontSize: "0.82rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    whiteSpace: "nowrap"
                  }}
                >
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length ? (
              rows.map((row, i) => (
                <tr
                  key={row._id || row.id || row.enquiryId || i}
                  style={{
                    borderBottom: "1px solid var(--border)",
                    transition: "background 0.15s ease"
                  }}
                >
                  {columns.map((c) => {
                    const val = row[c.key];
                    const isStatus = c.key.toLowerCase().includes("status");
                    const isId = c.key.toLowerCase().includes("id");

                    return (
                      <td
                        key={c.key}
                        style={{
                          padding: "14px 16px",
                          color: isId ? "var(--red-2)" : "var(--text)",
                          fontWeight: isId ? 700 : 500,
                          verticalAlign: "middle"
                        }}
                      >
                        {isStatus && typeof val === "string" ? (
                          <span
                            style={{
                              display: "inline-block",
                              padding: "4px 10px",
                              borderRadius: 20,
                              fontSize: "0.75rem",
                              fontWeight: 800,
                              background:
                                val === "NEW" || val === "PENDING"
                                  ? "rgba(217, 45, 32, 0.12)"
                                  : val === "COMPLETED" || val === "PAID"
                                  ? "rgba(16, 185, 129, 0.12)"
                                  : "rgba(100, 116, 139, 0.12)",
                              color:
                                val === "NEW" || val === "PENDING"
                                  ? "var(--red-2)"
                                  : val === "COMPLETED" || val === "PAID"
                                  ? "#059669"
                                  : "var(--muted)"
                            }}
                          >
                            {val}
                          </span>
                        ) : (
                          String(val ?? "—")
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  style={{
                    textAlign: "center",
                    padding: "36px 16px",
                    color: "var(--muted)"
                  }}
                >
                  <div className="empty" style={{ fontSize: "0.95rem" }}>
                    No records found in this category.
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
