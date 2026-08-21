import { requireUser } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { DataTable } from "@/components/DataTable";

export default async function AdminCustomers() {
  await requireUser(["SUPER_ADMIN", "ADMIN"]);
  await connectDB();
  const rows = await User.find({ role: "CUSTOMER" }).select("-passwordHash").sort({ createdAt: -1 }).lean();
  return <div className="wrap"><h1 className="display big-title">Customers</h1><DataTable rows={JSON.parse(JSON.stringify(rows))} columns={[{ key: "name", label: "Name" }, { key: "phone", label: "Phone" }, { key: "email", label: "Email" }, { key: "status", label: "Status" }]} /></div>;
}
