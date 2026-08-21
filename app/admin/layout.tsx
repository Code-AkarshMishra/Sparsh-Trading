import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { LogoutButton } from "@/components/LogoutButton";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireUser(["SUPER_ADMIN", "ADMIN", "STAFF"]);
  const nav = ["Dashboard", "Customers", "Enquiries", "Orders", "Products", "Services", "Projects", "Gallery", "Reviews", "Invoices", "Payments", "Team", "Locations", "Notifications", "Activity Logs", "Settings"];
  const content = new Set(["Products", "Services", "Projects", "Gallery"]);
  return <div className="dashboard"><aside className="sidebar"><h2 className="display">Admin</h2>{nav.map((n) => <Link key={n} href={n === "Dashboard" ? "/admin" : content.has(n) ? "/admin/content" : `/admin/${n.toLowerCase().replaceAll(" ", "-")}`}>{n}</Link>)}<LogoutButton /></aside><main className="section">{children}</main></div>;
}
