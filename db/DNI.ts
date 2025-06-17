import { MongoClient } from "mongodb";
import { DNI } from "../types.ts";

const MONGO_URL = Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
    console.error("MONGO_URL not found");
    throw Error("Enter a valid MONGO_URL");
}

async function connectClient(): Promise<MongoClient> {
    const client = new MongoClient(MONGO_URL as string);
    await client.connect();
    console.info("Connected successfully to MongoDB");
    return client;
}

export async function getDniCollection() {
    const client = await connectClient();
    return client.db("DNIs").collection<DNI>("DNI");
}