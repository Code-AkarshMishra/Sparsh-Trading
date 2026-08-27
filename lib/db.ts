import mongoose from "mongoose";

// Disable command buffering globally so queries fail immediately if MongoDB is unreachable
mongoose.set("bufferCommands", false);

const globalForMongoose = global as typeof globalThis & {
  mongooseCache?: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null; failedAt?: number };
};

export async function connectDB(): Promise<typeof mongoose | null> {
  const uri = process.env.MONGODB_URI;
  if (!uri || uri.includes("<db_username>") || uri.includes("APNA_MONGO_USERNAME")) {
    return null;
  }

  if (!globalForMongoose.mongooseCache) {
    globalForMongoose.mongooseCache = { conn: null, promise: null };
  }

  // If failed recently (within last 30 seconds), skip immediate retry to prevent 10s stalls
  if (
    globalForMongoose.mongooseCache.failedAt &&
    Date.now() - globalForMongoose.mongooseCache.failedAt < 30000 &&
    !globalForMongoose.mongooseCache.conn
  ) {
    return null;
  }

  if (globalForMongoose.mongooseCache.conn && mongoose.connection.readyState === 1) {
    return globalForMongoose.mongooseCache.conn;
  }

  try {
    if (!globalForMongoose.mongooseCache.promise) {
      globalForMongoose.mongooseCache.promise = mongoose.connect(uri, {
        dbName: "sparsh-trading",
        serverSelectionTimeoutMS: 2000,
        connectTimeoutMS: 2000,
        bufferCommands: false
      });
    }
    globalForMongoose.mongooseCache.conn = await globalForMongoose.mongooseCache.promise;
    globalForMongoose.mongooseCache.failedAt = undefined;
    return globalForMongoose.mongooseCache.conn;
  } catch (error) {
    console.warn("MongoDB Atlas connection offline/restricted, continuing with offline storage fallback.");
    if (globalForMongoose.mongooseCache) {
      globalForMongoose.mongooseCache.promise = null;
      globalForMongoose.mongooseCache.conn = null;
      globalForMongoose.mongooseCache.failedAt = Date.now();
    }
    return null;
  }
}

