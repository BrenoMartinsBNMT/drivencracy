import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

try {
  const mongoClient = new MongoClient(process.env.MONGO_URL);
} catch {}
