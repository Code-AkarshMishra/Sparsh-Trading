import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { LogoutButton } from "@/components/LogoutButton";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireUser(["SUPER_ADMIN", "ADMIN", "STAFF"]);

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: "📊" },
    { label: "Customers", href: "/admin/customers", icon: "👥" },
    { label: "Enquiries", href: "/admin/enquiries", icon: "📩" },
    { label: "Orders", href: "/admin/orders", icon: "📦" },
    { label: "Content Hub", href: "/admin/content", icon: "📁" },
    { label: "Reviews", href: "/admin/reviews", icon: "⭐" },
    { label: "Invoices", href: "/admin/invoices", icon: "🧾" },
    { label: "Team", href: "/admin/team", icon: "👷" },
    { label: "Locations", href: "/admin/locations", icon: "📍" },
    { label: "Notifications", href: "/admin/notifications", icon: "🔔" },
    { label: "Activity Logs", href: "/admin/activity-logs", icon: "🔒" },
    { label: "Settings", href: "/admin/settings", icon: "⚙️" }
  ];

  return (
    <div className="dashboard-layout-root" style={{ minHeight: "100vh", background: "var(--page-bg)" }}>
      {/* Mobile Top Navigation Scroll Bar */}
      <header
        className="admin-mobile-topbar"
        style={{
          borderBottom: "1px solid var(--border)",
          background: "var(--surface)",
          padding: "12px 16px",
          position: "sticky",
          top: 0,
          zIndex: 40
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span className="brand-dot-pulse" />
            <span style={{ fontWeight: 800, color: "var(--strong)", fontSize: "1.05rem" }}>
              Sparsh Admin Panel
            </span>
          </div>
          <LogoutButton />
        </div>

        {/* Scrollable Nav Chips */}
        <nav
          style={{
            display: "flex",
            gap: 8,
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
            paddingBottom: 4
          }}
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 14px",
                borderRadius: 20,
                fontSize: "0.82rem",
                fontWeight: 700,
                background: "var(--surface-2)",
                color: "var(--text)",
                border: "1px solid var(--border)",
                whiteSpace: "nowrap",
                textDecoration: "none"
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </header>

      {/* Main Container */}
      <div className="admin-body-split" style={{ display: "flex", width: "100%", minHeight: "calc(100vh - 60px)" }}>
        {/* Desktop Sidebar */}
        <aside
          className="admin-desktop-sidebar"
          style={{
            width: 260,
            flexShrink: 0,
            borderRight: "1px solid var(--border)",
            background: "var(--surface)",
            padding: "24px 16px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <div>
            <div style={{ padding: "0 8px 20px", borderBottom: "1px solid var(--border)", marginBottom: 16 }}>
              <span className="eyebrow" style={{ color: "var(--red-2)", margin: 0 }}>Management Console</span>
              <h2 className="display" style={{ fontSize: "1.4rem", margin: "4px 0 0" }}>Sparsh Admin</h2>
            </div>

            <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 12px",
                    borderRadius: 8,
                    fontSize: "0.92rem",
                    fontWeight: 700,
                    color: "var(--text)",
                    textDecoration: "none",
                    transition: "background 0.15s ease"
                  }}
                >
                  <span style={{ fontSize: "1rem" }}>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div style={{ paddingTop: 16, borderTop: "1px solid var(--border)" }}>
            <LogoutButton />
          </div>
        </aside>

        {/* Content Area */}
        <main
          style={{
            flex: 1,
            width: "100%",
            maxWidth: "100%",
            boxSizing: "border-box",
            padding: "clamp(16px, 3vw, 36px)",
            overflowX: "hidden"
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
