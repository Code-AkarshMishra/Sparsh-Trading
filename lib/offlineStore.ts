import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";

export type StoredUser = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  passwordHash: string;
  role: "SUPER_ADMIN" | "ADMIN" | "STAFF" | "CUSTOMER";
  status: "ACTIVE" | "INACTIVE";
  address?: string;
  resetTokenHash?: string;
  resetTokenExpiresAt?: string;
  createdAt: string;
};

export type StoredEnquiry = {
  id: string;
  enquiryId: string;
  name: string;
  phone: string;
  email?: string;
  location?: string;
  service: string;
  requirement?: string;
  dimensions?: string;
  message?: string;
  status: string;
  customer?: string;
  createdAt: string;
};

export type StoredReview = {
  id: string;
  customerName: string;
  location?: string;
  projectType: string;
  rating: number;
  text: string;
  verified: boolean;
  createdAt: string;
};

const DATA_DIR = path.join(process.cwd(), "data");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readJsonFile<T>(filename: string, defaultData: T): T {
  try {
    ensureDataDir();
    const filePath = path.join(DATA_DIR, filename);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2), "utf-8");
      return defaultData;
    }
    const content = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(content) as T;
  } catch (error) {
    console.warn(`Error reading ${filename}, returning default:`, error);
    return defaultData;
  }
}

function writeJsonFile<T>(filename: string, data: T) {
  try {
    ensureDataDir();
    const filePath = path.join(DATA_DIR, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.warn(`Error writing ${filename}:`, error);
  }
}

// Initial Admin & Demo User Seed
const DEFAULT_HASH = bcrypt.hashSync("admin123", 10);
const DEFAULT_USERS: StoredUser[] = [
  {
    id: "admin-1",
    name: "Sparsh Trading Admin",
    phone: "8795662161",
    email: "admin@sparshtrading.com",
    passwordHash: DEFAULT_HASH,
    role: "SUPER_ADMIN",
    status: "ACTIVE",
    createdAt: new Date().toISOString()
  },
  {
    id: "admin-2",
    name: "Partner Admin",
    phone: "7007710096",
    email: "partner@sparshtrading.com",
    passwordHash: DEFAULT_HASH,
    role: "ADMIN",
    status: "ACTIVE",
    createdAt: new Date().toISOString()
  },
  {
    id: "cust-1",
    name: "Akarsh Mishra",
    phone: "9876543210",
    email: "client@sparshtrading.com",
    passwordHash: bcrypt.hashSync("client123", 10),
    role: "CUSTOMER",
    status: "ACTIVE",
    address: "Civil Lines, Pratapgarh",
    createdAt: new Date().toISOString()
  }
];

const DEFAULT_REVIEWS: StoredReview[] = [
  {
    id: "rev-1",
    customerName: "Virendra Singh",
    location: "Civil Lines, Pratapgarh",
    projectType: "Modular Kitchen & Toughened Glass Balcony Railing",
    rating: 5,
    text: "Excellent craftsmanship and solid finish! The modular kitchen acrylic cabinets and SS 304 glass railing were fitted with millimeter precision. Highly recommend Sparsh Trading in Pratapgarh.",
    verified: true,
    createdAt: "2026-06-15T10:30:00.000Z"
  },
  {
    id: "rev-2",
    customerName: "Anand Shukla",
    location: "Meera Bhawan Road, Pratapgarh",
    projectType: "Heavy Steel Main Entrance Gate & Window Grills",
    rating: 5,
    text: "Heavy duty structural steel work with smooth welds and anti-rust finish. The team took accurate site measurements and delivered right on time.",
    verified: true,
    createdAt: "2026-07-02T14:15:00.000Z"
  },
  {
    id: "rev-3",
    customerName: "Dr. R. K. Pandey",
    location: "Katra Road, Pratapgarh",
    projectType: "Soundproof uPVC 3-Track Sliding Windows",
    rating: 5,
    text: "Fitted 8 large uPVC sliding windows with mosquito mesh. Noticeable noise reduction from the main road and flawless sliding action.",
    verified: true,
    createdAt: "2026-07-20T16:45:00.000Z"
  },
  {
    id: "rev-4",
    customerName: "Mohd. Tariq",
    location: "City Road, Pratapgarh",
    projectType: "PPGI Pre-Painted Steel Door & Window Frames",
    rating: 5,
    text: "Procured PPGI frames for our 3-story residential project. Much better stability than traditional wooden chaukhat and 100% termite proof.",
    verified: true,
    createdAt: "2026-08-05T11:20:00.000Z"
  }
];

export const fallbackStore = {
  // Users
  getUsers(): StoredUser[] {
    return readJsonFile<StoredUser[]>("users.json", DEFAULT_USERS);
  },
  findUserByLogin(login: string): StoredUser | null {
    const users = this.getUsers();
    const l = login.trim().toLowerCase();
    return users.find((u) => u.phone === login || (u.email && u.email.toLowerCase() === l)) || null;
  },
  createUser(data: Omit<StoredUser, "id" | "createdAt">): StoredUser {
    const users = this.getUsers();
    const newUser: StoredUser = {
      ...data,
      id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    writeJsonFile("users.json", users);
    return newUser;
  },
  setResetToken(login: string, resetTokenHash: string, expiresAt: string): boolean {
    const users = this.getUsers();
    const l = login.trim().toLowerCase();
    const user = users.find((u) => u.phone === login || (u.email && u.email.toLowerCase() === l));
    if (!user) return false;
    user.resetTokenHash = resetTokenHash;
    user.resetTokenExpiresAt = expiresAt;
    writeJsonFile("users.json", users);
    return true;
  },
  updatePasswordWithToken(login: string, tokenHash: string, newPasswordHash: string): boolean {
    const users = this.getUsers();
    const l = login.trim().toLowerCase();
    const user = users.find((u) => u.phone === login || (u.email && u.email.toLowerCase() === l));
    if (!user || !user.resetTokenHash || !user.resetTokenExpiresAt) return false;
    if (new Date(user.resetTokenExpiresAt).getTime() < Date.now()) return false;
    if (user.resetTokenHash !== tokenHash) return false;
    user.passwordHash = newPasswordHash;
    user.resetTokenHash = undefined;
    user.resetTokenExpiresAt = undefined;
    writeJsonFile("users.json", users);
    return true;
  },
  updatePassword(userId: string, newPasswordHash: string): boolean {
    const users = this.getUsers();
    const user = users.find((u) => u.id === userId);
    if (!user) return false;
    user.passwordHash = newPasswordHash;
    user.resetTokenHash = undefined;
    user.resetTokenExpiresAt = undefined;
    writeJsonFile("users.json", users);
    return true;
  },

  // Enquiries
  getEnquiries(userId?: string): StoredEnquiry[] {
    const enquiries = readJsonFile<StoredEnquiry[]>("enquiries.json", []);
    if (userId) {
      return enquiries.filter((e) => e.customer === userId);
    }
    return enquiries;
  },
  saveEnquiry(data: Omit<StoredEnquiry, "id" | "createdAt">): StoredEnquiry {
    const enquiries = this.getEnquiries();
    const newEnquiry: StoredEnquiry = {
      ...data,
      id: `enq_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString()
    };
    enquiries.unshift(newEnquiry);
    writeJsonFile("enquiries.json", enquiries);
    return newEnquiry;
  },

  // Reviews
  getReviews(): StoredReview[] {
    return readJsonFile<StoredReview[]>("reviews.json", DEFAULT_REVIEWS);
  },
  addReview(data: Omit<StoredReview, "id" | "createdAt" | "verified">): StoredReview {
    const reviews = this.getReviews();
    const newRev: StoredReview = {
      ...data,
      id: `rev_${Date.now()}`,
      verified: true,
      createdAt: new Date().toISOString()
    };
    reviews.unshift(newRev);
    writeJsonFile("reviews.json", reviews);
    return newRev;
  }
};
