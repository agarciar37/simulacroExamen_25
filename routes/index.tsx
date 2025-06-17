import { FreshContext, Handlers } from "$fresh/server.ts";
import LoginForm from "../components/LoginForm.tsx";
import { getDniCollection } from "../db/DNI.ts";

export const handler: Handlers = {
  GET: async (req: Request, ctx: FreshContext) => {
    const url = new URL(req.url);
    const dni = url.searchParams.get("dni");

    if (!dni) return ctx.render();


    const collection = await getDniCollection();
    // Comprobar si el DNI ya existe en MongoDB
    const exists = await collection.findOne({ DNI: dni });
    if (!exists) {
      await collection.insertOne({
        DNI: dni,
        characters: []
      });
    }

    const headers = new Headers();
    headers.append("Set-Cookie", `dni=${dni}; path=/`);
    headers.append("location", "/greet");
    return new Response(null, {
      status: 302,
      headers
    });
  }
}

export default function Home() {
  return <LoginForm />;
}