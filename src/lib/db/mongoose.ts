/**
 * MongoDB connection (Mongoose) with a global cache so hot reloads / serverless
 * invocations (Vercel) reuse one connection instead of opening a new one each time.
 * Author: Avijit Ghosh
 *
 * Usage (server only):
 *   import { connectDB } from "@/lib/db/mongoose";
 *   await connectDB();
 */
import mongoose from "mongoose";

import { logger } from "@/lib/logger";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const cache: MongooseCache = globalThis.mongooseCache ?? { conn: null, promise: null };
globalThis.mongooseCache = cache;

export async function connectDB(): Promise<typeof mongoose> {
  if (cache.conn) {
    return cache.conn;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not set. Add it to .env (see .env.example).");
  }

  if (!cache.promise) {
    mongoose.set("strictQuery", true);
    cache.promise = mongoose
      .connect(uri, {
        dbName: process.env.MONGODB_DB ?? "ag_appliance",
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 8000,
      })
      .then((m) => {
        logger.info("MongoDB connected", { db: m.connection.name });
        return m;
      })
      .catch((err: unknown) => {
        cache.promise = null;
        logger.error("MongoDB connection failed", {
          error: err instanceof Error ? err.message : String(err),
        });
        throw err;
      });
  }

  cache.conn = await cache.promise;
  return cache.conn;
}

export async function disconnectDB(): Promise<void> {
  if (cache.conn) {
    await cache.conn.disconnect();
    cache.conn = null;
    cache.promise = null;
  }
}
