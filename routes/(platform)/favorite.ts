import { Handlers } from "$fresh/server.ts";
import collection from "../../db/DNI.ts";
import { Character } from "../../types.ts";

interface State {
  dni: string;
}

export const handler: Handlers<null, State> = {
  async POST(req, ctx) {
    try {
      const character: Character = await req.json();
      await collection.updateOne(
        { DNI: ctx.state.dni },
        { $push: { characters: character } },
      );
      return new Response("added", { status: 200 });
    } catch (_e) {
      return new Response("error", { status: 500 });
    }
  },
};