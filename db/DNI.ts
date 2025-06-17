import client from "./client.ts";
import { DNI } from "../types.ts";

const db = client.db("DNIs");
const collection = db.collection<DNI>("DNI");

export default collection;
