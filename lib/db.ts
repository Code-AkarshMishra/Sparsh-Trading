import mongoose from "mongoose";

const globalForMongoose = global as typeof globalThis & {
  mongooseCache?: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
};

export async function connectDB(): Promise<typeof mongoose | null> {
  const uri = process.env.MONGODB_URI;
  if (!uri || uri.includes("<db_username>")) {
    console.warn("MongoDB URI is unconfigured or contains placeholder <db_username>. Running in offline DB mode.");
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
        serverSelectionTimeoutMS: 5000
      });
    }
    globalForMongoose.mongooseCache.conn = await globalForMongoose.mongooseCache.promise;
    return globalForMongoose.mongooseCache.conn;
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    globalForMongoose.mongooseCache.promise = null;
    return null;
  }
}
