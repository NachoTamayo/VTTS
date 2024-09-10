import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/VTTS";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

(global as any).mongoose = (global as any).mongoose || ({ conn: null, promise: null } as MongooseCache);

async function dbConnect() {
  if ((global as any).mongoose.conn) {
    return (global as any).mongoose.conn;
  }

  if (!(global as any).mongoose.promise) {
    (global as any).mongoose.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      return mongoose;
    });
  }
  (global as any).mongoose.conn = await (global as any).mongoose.promise;
  return (global as any).mongoose.conn;
}

export default dbConnect;
