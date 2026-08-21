import mongoose from "mongoose";

const globalForMongoose = global as typeof globalThis & {
  mongooseCache?: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
};

export async function connectDB(): Promise<typeof mongoose | null> {
  const uri = process.env.MONGODB_URI;
  if (!uri || uri.includes("<db_username>") || uri.includes("APNA_MONGO_USERNAME")) {
    // Unconfigured MongoDB placeholder - skip immediately with 0 delay
    return null;
  }

  if (!globalForMongoose.mongooseCache) {
    globalForMongoose.mongooseCache = { conn: null, promise: null };
  }

  if (globalForMongoose.mongooseCache.conn) {
    return globalForMongoose.mongooseCache.conn;
  }

  try {
    if (!globalForMongoose.mongooseCache.promise) {
      globalForMongoose.mongooseCache.promise = mongoose.connect(uri, {
        dbName: "sparsh-trading",
        serverSelectionTimeoutMS: 2500,
        connectTimeoutMS: 2500
      });
    }
    globalForMongoose.mongooseCache.conn = await globalForMongoose.mongooseCache.promise;
    return globalForMongoose.mongooseCache.conn;
  } catch (error) {
    console.warn("MongoDB connection offline, proceeding with direct email/storage:", (error as any)?.message);
    globalForMongoose.mongooseCache.promise = null;
    return null;
  }
}
