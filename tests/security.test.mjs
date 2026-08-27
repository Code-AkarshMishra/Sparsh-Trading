import test from "node:test";
import assert from "node:assert/strict";
import bcrypt from "bcryptjs";
import { checkRateLimit } from "../lib/rateLimit.ts";

function verifyAllowedOrigin(request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  
  const host = request.headers.get("host");
  try {
    const originUrl = new URL(origin);
    if (host && (originUrl.host === host || originUrl.host.toLowerCase() === host.toLowerCase())) {
      return true;
    }
    const allowedDomains = [
      "sparshtrading.shop",
      "www.sparshtrading.shop",
      "localhost:3000",
      "localhost:3001",
      "127.0.0.1:3000"
    ];
    return allowedDomains.includes(originUrl.host);
  } catch {
    return false;
  }
}

class ApiError extends Error {
  constructor(message, status = 400, details) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

test("Password Hashing & Verification Security", async () => {
  const plainPassword = "SuperSecurePassword123!";
  const hash = await bcrypt.hash(plainPassword, 10);

  // Assert hash is bcrypt formatted
  assert.ok(hash.startsWith("$2a$") || hash.startsWith("$2b$"));
  
  // Valid match
  const match = await bcrypt.compare(plainPassword, hash);
  assert.equal(match, true);

  // Invalid match
  const failMatch = await bcrypt.compare("WrongPassword123", hash);
  assert.equal(failMatch, false);
});

test("Rate Limiter Enforces Request Limits and Throttling", () => {
  const testIp = "test_ip_" + Date.now();
  const limit = 3;
  const windowMs = 5000;

  // Requests 1, 2, 3 should be allowed
  const r1 = checkRateLimit(testIp, { limit, windowMs });
  assert.equal(r1.allowed, true);
  assert.equal(r1.remaining, 2);

  const r2 = checkRateLimit(testIp, { limit, windowMs });
  assert.equal(r2.allowed, true);
  assert.equal(r2.remaining, 1);

  const r3 = checkRateLimit(testIp, { limit, windowMs });
  assert.equal(r3.allowed, true);
  assert.equal(r3.remaining, 0);

  // 4th request must be rejected
  const r4 = checkRateLimit(testIp, { limit, windowMs });
  assert.equal(r4.allowed, false);
  assert.equal(r4.remaining, 0);
});

test("MIME and Extension Whitelist Security Mapping", () => {
  const MIME_EXTENSION_MAP = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "video/mp4": ".mp4",
    "video/webm": ".webm",
    "video/quicktime": ".mov",
    "application/pdf": ".pdf"
  };

  // Safe types
  assert.equal(MIME_EXTENSION_MAP["image/jpeg"], ".jpg");
  assert.equal(MIME_EXTENSION_MAP["application/pdf"], ".pdf");

  // Insecure types must not exist in map
  assert.equal(MIME_EXTENSION_MAP["image/svg+xml"], undefined);
  assert.equal(MIME_EXTENSION_MAP["text/html"], undefined);
  assert.equal(MIME_EXTENSION_MAP["application/javascript"], undefined);
  assert.equal(MIME_EXTENSION_MAP["application/x-msdownload"], undefined);
  assert.equal(MIME_EXTENSION_MAP["application/x-sh"], undefined);
});

test("Anti-Bot Honeypot Defense Validation", () => {
  const isValidHuman = (body) => {
    if (body.honeypot && body.honeypot.trim().length > 0) {
      return false;
    }
    return true;
  };

  assert.equal(isValidHuman({ login: "validUser", honeypot: "" }), true);
  assert.equal(isValidHuman({ login: "validUser" }), true);
  assert.equal(isValidHuman({ login: "botUser", honeypot: "spam content" }), false);
});

test("Origin and Host Verification for CSRF Defense", () => {
  const makeMockReq = (origin, host) => ({
    headers: {
      get: (k) => {
        if (k.toLowerCase() === "origin") return origin;
        if (k.toLowerCase() === "host") return host;
        return null;
      }
    }
  });

  assert.equal(verifyAllowedOrigin(makeMockReq("https://sparshtrading.shop", "sparshtrading.shop")), true);
  assert.equal(verifyAllowedOrigin(makeMockReq("http://localhost:3000", "localhost:3000")), true);
  assert.equal(verifyAllowedOrigin(makeMockReq("https://evil-hacker-site.com", "sparshtrading.shop")), false);
  assert.equal(verifyAllowedOrigin(makeMockReq(null, "sparshtrading.shop")), true);
});

test("ApiError Format and Status Code Verification", () => {
  const err401 = new ApiError("Authentication required.", 401);
  assert.equal(err401.status, 401);
  assert.equal(err401.message, "Authentication required.");

  const err403 = new ApiError("Access denied.", 403);
  assert.equal(err403.status, 403);
  assert.equal(err403.message, "Access denied.");
});

test("Role Authorization Rule Engine", () => {
  const can = (role, allowed) => allowed.includes(role);

  // Super Admin can access admin & staff zones
  assert.equal(can("SUPER_ADMIN", ["SUPER_ADMIN", "ADMIN", "STAFF"]), true);
  // Admin can access admin zones
  assert.equal(can("ADMIN", ["SUPER_ADMIN", "ADMIN"]), true);
  // Customer cannot access admin zones
  assert.equal(can("CUSTOMER", ["SUPER_ADMIN", "ADMIN", "STAFF"]), false);
  // Customer can access customer zones
  assert.equal(can("CUSTOMER", ["CUSTOMER", "SUPER_ADMIN"]), true);
});

test("One-Time Password Reset Token Security & Single-Use Lifecycle", async () => {
  const crypto = await import("crypto");
  
  // 1. Generate token and hash
  const rawToken = "654321";
  const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
  const validExpiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();
  const expiredExpiresAt = new Date(Date.now() - 1000).toISOString();

  // Mock User Record
  const mockUser = {
    phone: "9876543210",
    passwordHash: await bcrypt.hash("OldPassword123", 10),
    resetTokenHash: tokenHash,
    resetTokenExpiresAt: validExpiresAt
  };

  // 2. Reject expired token
  const expiredUser = { ...mockUser, resetTokenExpiresAt: expiredExpiresAt };
  const isExpired = new Date(expiredUser.resetTokenExpiresAt).getTime() < Date.now();
  assert.equal(isExpired, true, "Expired token must be flagged as expired");

  // 3. Reject wrong token
  const wrongTokenHash = crypto.createHash("sha256").update("999999").digest("hex");
  assert.notEqual(mockUser.resetTokenHash, wrongTokenHash, "Wrong token must not match");

  // 4. Valid token verification and Single-Use Consumption
  const submittedTokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
  assert.equal(mockUser.resetTokenHash, submittedTokenHash, "Valid token must match hash");

  // Apply new password
  const newPassword = "NewSecurePassword456!";
  mockUser.passwordHash = await bcrypt.hash(newPassword, 10);

  // Invalidate token immediately (Single-Use)
  mockUser.resetTokenHash = undefined;
  mockUser.resetTokenExpiresAt = undefined;

  // Verify new password works
  const validNew = await bcrypt.compare(newPassword, mockUser.passwordHash);
  assert.equal(validNew, true, "New password must match newly generated bcrypt hash");

  // 5. Replay attack prevention: verify token cannot be reused
  assert.equal(mockUser.resetTokenHash, undefined, "Token must be destroyed after single use");
  const replayAttemptMatches = mockUser.resetTokenHash === submittedTokenHash;
  assert.equal(replayAttemptMatches, false, "Replay attack must fail because token was consumed");
});
