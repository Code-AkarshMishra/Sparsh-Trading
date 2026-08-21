import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true, unique: true, index: true },
    email: { type: String, trim: true, lowercase: true, sparse: true, unique: true, index: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ["SUPER_ADMIN", "ADMIN", "STAFF", "CUSTOMER"], default: "CUSTOMER", index: true },
    status: { type: String, enum: ["ACTIVE", "DISABLED"], default: "ACTIVE" },
    address: String,
    resetTokenHash: { type: String, select: false },
    resetTokenExpiresAt: Date
  },
  { timestamps: true }
);

export const User = models.User || mongoose.model("User", userSchema);
