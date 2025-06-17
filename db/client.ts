import { MongoClient } from "mongodb";

const url = Deno.env.get("MONGO_URL");

if (!url) {
  throw new Error("MONGO_URL environment variable is not set");
}

const client = new MongoClient(url);
await client.connect();

export default client;
