import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
let db = null;
try {
  const mongoClient = new MongoClient(process.env.MONGO_URL);
  await mongoClient.connect();
  db = mongoClient.db(process.env.DATABASE);
} catch (e) {
  console.log("error ao se conectar ao banco", e);
}
export default db;
