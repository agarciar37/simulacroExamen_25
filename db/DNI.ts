import { MongoClient } from "mongodb"
import { DNI } from '../types.ts'

const url = Deno.env.get("MONGO_URL")

if (!url) {
  throw new Error('MONGO_URL environment variable is not set');
}

const client = new MongoClient(url);
await client.connect();

const db = client.db('DNIs');
const collection = db.collection<DNI>('DNI');

export default collection;