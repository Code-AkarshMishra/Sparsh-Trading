import { z } from "zod";
import { connectDB } from "@/lib/db";
import { ok, fail, handleError, verifyAllowedOrigin } from "@/lib/api";
import { Review } from "@/models/Core";
import { fallbackStore } from "@/lib/offlineStore";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

const reviewSchema = z.object({
  customerName: z.string().min(2).max(100).trim(),
  location: z.string().max(100).optional(),
  projectType: z.string().min(2).max(100).trim(),
  rating: z.number().min(1).max(5),
  text: z.string().min(10).max(1000).trim()
});

export async function GET() {
  try {
    const db = await connectDB();
    if (db) {
      try {
        const reviews = await Review.find({ published: true }).sort({ createdAt: -1 }).limit(100).lean();
        if (reviews && reviews.length > 0) return ok({ reviews });
      } catch {
        // Fallback
      }
    }
    const reviews = fallbackStore.getReviews();
    return ok({ reviews });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: Request) {
  try {
    if (!verifyAllowedOrigin(request)) {
      return fail("Cross-origin review submission blocked.", 403);
    }

    const clientIp = getClientIp(request);
    const rateCheck = checkRateLimit(`review_${clientIp}`, { limit: 5, windowMs: 15 * 60 * 1000 });
    if (!rateCheck.allowed) {
      return fail("Too many review submissions. Please try again later.", 429);
    }

    const rawBody = await request.json();
    const body = reviewSchema.parse(rawBody);

    // Save in offline store
    const saved = fallbackStore.addReview({
      customerName: body.customerName,
      location: body.location || "Pratapgarh",
      projectType: body.projectType,
      rating: body.rating,
      text: body.text
    });

    // Also sync to MongoDB if online and active
    try {
      const db = await connectDB();
      if (db) {
        await Review.create({
          customerName: body.customerName,
          text: body.text,
          rating: body.rating,
          published: true
        });
      }
    } catch {
      // MongoDB offline - offline store already persisted
    }

    return ok({ review: saved, message: "Thank you! Your review has been submitted successfully." });
  } catch (error) {
    return handleError(error);
  }
}
