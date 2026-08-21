import { requireUser } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Enquiry } from "@/models/Core";
import { DataTable } from "@/components/DataTable";

export default async function AdminEnquiries() {
  await requireUser(["SUPER_ADMIN", "ADMIN", "STAFF"]);
  await connectDB();
  const rows = await Enquiry.find().sort({ createdAt: -1 }).lean();
  return <div className="wrap"><h1 className="display big-title">Enquiries</h1><DataTable rows={JSON.parse(JSON.stringify(rows))} columns={[{ key: "enquiryId", label: "ID" }, { key: "name", label: "Name" }, { key: "phone", label: "Phone" }, { key: "service", label: "Service" }, { key: "status", label: "Status" }]} /></div>;
}
