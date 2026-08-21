import mongoose, { Schema, models } from "mongoose";

const fileSchema = new Schema({ url: String, name: String, type: String, size: Number }, { _id: false });

const enquirySchema = new Schema(
  {
    enquiryId: { type: String, unique: true, index: true },
    customer: { type: Schema.Types.ObjectId, ref: "User", index: true },
    name: { type: String, required: true },
    phone: { type: String, required: true, index: true },
    email: String,
    location: String,
    service: { type: String, required: true, index: true },
    requirement: String,
    dimensions: String,
    budgetRange: String,
    preferredContactMethod: String,
    message: String,
    uploads: [fileSchema],
    status: { type: String, default: "NEW", index: true },
    adminResponse: String,
    assignedTo: { type: Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);
enquirySchema.index({ createdAt: -1, status: 1 });

const serviceSchema = new Schema(
  { slug: { type: String, unique: true }, title: String, description: String, category: String, items: [String], images: [fileSchema], applications: [String], materials: [String], benefits: [String], faq: [{ q: String, a: String }], published: { type: Boolean, default: true }, seo: Object },
  { timestamps: true }
);

const productSchema = new Schema(
  { name: String, category: String, material: String, design: String, application: String, description: String, images: [fileSchema], price: Number, service: { type: Schema.Types.ObjectId, ref: "Service" }, published: { type: Boolean, default: true }, seo: Object },
  { timestamps: true }
);
productSchema.index({ name: "text", category: "text", material: "text" });

const projectSchema = new Schema(
  { title: String, category: String, location: String, date: Date, description: String, materials: [String], images: [fileSchema], beforeAfter: [fileSchema], status: String, featured: { type: Boolean, default: false }, published: { type: Boolean, default: false }, seo: Object },
  { timestamps: true }
);

const gallerySchema = new Schema({ title: String, category: String, image: fileSchema, project: { type: Schema.Types.ObjectId, ref: "Project" }, published: { type: Boolean, default: false } }, { timestamps: true });

const orderSchema = new Schema(
  {
    orderId: { type: String, unique: true, index: true },
    customer: { type: Schema.Types.ObjectId, ref: "User", index: true },
    enquiry: { type: Schema.Types.ObjectId, ref: "Enquiry" },
    items: [{ name: String, quantity: Number, dimensions: String, material: String, unitPrice: Number, notes: String }],
    amount: Number,
    currentStatus: { type: String, default: "ENQUIRY", index: true },
    expectedCompletionDate: Date,
    assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
    documents: [fileSchema],
    notes: String
  },
  { timestamps: true }
);

const orderStatusHistorySchema = new Schema(
  { order: { type: Schema.Types.ObjectId, ref: "Order", index: true }, status: String, note: String, attachment: fileSchema, updatedBy: { type: Schema.Types.ObjectId, ref: "User" } },
  { timestamps: true }
);

const invoiceSchema = new Schema(
  {
    invoiceNumber: { type: String, unique: true, index: true },
    customer: { type: Schema.Types.ObjectId, ref: "User", index: true },
    order: { type: Schema.Types.ObjectId, ref: "Order" },
    billingAddress: String,
    items: [{ name: String, quantity: Number, unitPrice: Number }],
    subtotal: Number,
    discount: { type: Number, default: 0 },
    taxRate: { type: Number, default: 0 },
    taxAmount: { type: Number, default: 0 },
    total: Number,
    paymentStatus: { type: String, enum: ["DRAFT", "ISSUED", "PARTIALLY_PAID", "PAID", "OVERDUE", "CANCELLED"], default: "DRAFT", index: true },
    dueDate: Date,
    notes: String
  },
  { timestamps: true }
);

const simpleSchemas = {
  Payment: new Schema({ invoice: { type: Schema.Types.ObjectId, ref: "Invoice" }, amount: Number, method: String, status: String }, { timestamps: true }),
  Review: new Schema({ customerName: String, text: String, rating: Number, published: { type: Boolean, default: false } }, { timestamps: true }),
  Notification: new Schema({ user: { type: Schema.Types.ObjectId, ref: "User", index: true }, type: String, title: String, message: String, read: { type: Boolean, default: false } }, { timestamps: true }),
  ActivityLog: new Schema({ user: { type: Schema.Types.ObjectId, ref: "User" }, action: String, entity: String, entityId: String, ip: String, metadata: Object }, { timestamps: true }),
  SiteSettings: new Schema({ key: { type: String, unique: true }, value: Schema.Types.Mixed }, { timestamps: true }),
  TeamMember: new Schema({ name: String, role: String, bio: String, published: { type: Boolean, default: false } }, { timestamps: true })
};

export const Enquiry = models.Enquiry || mongoose.model("Enquiry", enquirySchema);
export const Service = models.Service || mongoose.model("Service", serviceSchema);
export const Product = models.Product || mongoose.model("Product", productSchema);
export const Project = models.Project || mongoose.model("Project", projectSchema);
export const GalleryItem = models.GalleryItem || mongoose.model("GalleryItem", gallerySchema);
export const Order = models.Order || mongoose.model("Order", orderSchema);
export const OrderStatusHistory = models.OrderStatusHistory || mongoose.model("OrderStatusHistory", orderStatusHistorySchema);
export const Invoice = models.Invoice || mongoose.model("Invoice", invoiceSchema);
export const Payment = models.Payment || mongoose.model("Payment", simpleSchemas.Payment);
export const Review = models.Review || mongoose.model("Review", simpleSchemas.Review);
export const Notification = models.Notification || mongoose.model("Notification", simpleSchemas.Notification);
export const ActivityLog = models.ActivityLog || mongoose.model("ActivityLog", simpleSchemas.ActivityLog);
export const SiteSettings = models.SiteSettings || mongoose.model("SiteSettings", simpleSchemas.SiteSettings);
export const TeamMember = models.TeamMember || mongoose.model("TeamMember", simpleSchemas.TeamMember);
