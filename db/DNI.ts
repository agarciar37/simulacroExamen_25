import { MongoClient } from "mongodb"
import { DNI } from '../types.ts'

const MONGO_URL = "mongodb+srv://agarciar37:<db_password>@cluster0.nv27ans.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const url = MONGO_URL;

if (!url) {
  throw new Error('MONGO_URL environment variable is not set');
}

const client = new MongoClient(url);
await client.connect();

const db = client.db('DNIs');
const collection = db.collection<DNI>('DNI');

export default collection;
