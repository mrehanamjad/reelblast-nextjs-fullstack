import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI environment variable");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectionToDatabase() {
  // If a connection already exists, return it
  if (cached.conn ) {
    return cached.conn;
  }

  // If there's no pending connection promise, create one
  if (!cached.promise) {
    const opts = {
      bufferCommands: true,

      /* In Mongoose, bufferCommands: true means that 
      if you try to run a database query before the connection is fully established,
      Mongoose will store (buffer) the query and
      execute it once the database is connected. */

      maxPoolSize: 10,

      /*
      It means that a maximum of 10 connections can be used at the same time.
      If all 10 connections are busy, new requests will have to
      wait until a connection becomes available.
      */
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then(() => mongoose.connection);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
}
