// In-memory sliding window / token bucket rate limiter for API routes

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const ipStore = new Map<string, RateLimitRecord>();

// Clean up expired entries every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of ipStore.entries()) {
      if (now > record.resetAt) {
        ipStore.delete(key);
      }
    }
  }, 5 * 60 * 1000).unref?.();
}

export interface RateLimitOptions {
  limit: number; // max requests
  windowMs: number; // time window in milliseconds
}

export function checkRateLimit(
  identifier: string,
  options: RateLimitOptions = { limit: 60, windowMs: 60 * 1000 }
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const record = ipStore.get(identifier);

  if (!record || now > record.resetAt) {
    ipStore.set(identifier, {
      count: 1,
      resetAt: now + options.windowMs
    });
    return {
      allowed: true,
      remaining: options.limit - 1,
      resetAt: now + options.windowMs
    };
  }

  if (record.count >= options.limit) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: record.resetAt
    };
  }

  record.count += 1;
  return {
    allowed: true,
    remaining: options.limit - record.count,
    resetAt: record.resetAt
  };
}

/**
 * Distributed rate limiter for serverless environments (BUG-004)
 * Uses Upstash Redis REST if configured; gracefully falls back to in-memory store.
 */
export async function checkRateLimitAsync(
  identifier: string,
  options: RateLimitOptions = { limit: 60, windowMs: 60 * 1000 }
): Promise<{ allowed: boolean; remaining: number; resetAt: number }> {
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (upstashUrl && upstashToken) {
    try {
      const key = `ratelimit:${identifier}`;
      const res = await fetch(`${upstashUrl}/pipeline`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${upstashToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify([
          ["INCR", key],
          ["PEXPIRE", key, options.windowMs, "NX"],
          ["PTTL", key]
        ]),
        cache: "no-store"
      });

      if (res.ok) {
        const results = await res.json();
        const count = typeof results[0]?.result === "number" ? results[0].result : 1;
        const ttl = typeof results[2]?.result === "number" && results[2].result > 0 ? results[2].result : options.windowMs;
        const resetAt = Date.now() + ttl;
        const allowed = count <= options.limit;
        const remaining = Math.max(0, options.limit - count);

        return { allowed, remaining, resetAt };
      }
    } catch (err: any) {
      console.warn("Upstash Redis rate limit check failed, falling back to memory:", err?.message || err);
    }
  }

  // Fallback to in-memory check
  return checkRateLimit(identifier, options);
}

export function getClientIp(request: Request): string {
  const xForwardedFor = request.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    return xForwardedFor.split(",")[0].trim();
  }
  const xRealIp = request.headers.get("x-real-ip");
  if (xRealIp) {
    return xRealIp.trim();
  }
  return "127.0.0.1";
}
