import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { LogoutButton } from "@/components/LogoutButton";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  await requireUser(["CUSTOMER"]);
  return <div className="dashboard"><aside className="sidebar"><h2 className="display">Customer</h2><Link href="/dashboard">Overview</Link><Link href="/dashboard/orders">My Orders</Link><Link href="/dashboard/invoices">Invoices</Link><Link href="/contact">New Enquiry</Link><LogoutButton /></aside><main className="section">{children}</main></div>;
}
