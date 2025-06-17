import { Handlers } from "$fresh/server.ts";
import { Character } from "../../types.ts";
import { getDniCollection } from "../../db/DNI.ts";

interface State {
  dni: string;
}

export const handler: Handlers<Character[] | null, State> = {
  async GET(_req, ctx) {
    try {
      const collection = await getDniCollection();
      const user = await collection.findOne({ DNI: ctx.state.dni });
      if (!user) return new Response("not found", { status: 404 });
      return new Response(JSON.stringify(user.characters), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (_e) {
      return new Response("error", { status: 500 });
    }
  },

  async POST(req, ctx) {
    try {
      const character: Character = await req.json();
      const collection = await getDniCollection();
      await collection.updateOne(
        { DNI: ctx.state.dni },
        { $push: { characters: character } },
      );
      return new Response("added", { status: 200 });
    } catch (_e) {
      return new Response("error", { status: 500 });
    }
  },

  async DELETE(req, ctx) {
    try {
      const { id } = await req.json();
      const collection = await getDniCollection();
      await collection.updateOne(
        { DNI: ctx.state.dni },
        { $pull: { characters: { id } } },
      );
      return new Response("deleted", { status: 200 });
    } catch (_e) {
      return new Response("error", { status: 500 });
    }
  },
};