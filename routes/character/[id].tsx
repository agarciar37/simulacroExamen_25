import Axios from "axios"
import type { FreshContext, Handlers } from "$fresh/server.ts";
import CharacterDetail from "../../components/CharacterDetail.tsx";

type Character = {
    id: string;
    name: string;
    house: string;
    image: string;
    patronus: string;
    wand: {
      wood: string;
      core: string;
      length: number;
    }
};

type Data = {
    character: Character
}

export const handler: Handlers = {
    GET: async (_req: Request, ctx: FreshContext<unknown, Data>) => {
        const {id} = ctx.params;
        const url = `https://hp-api.onrender.com/api/character/${id}`

        try {
            const response = await Axios.get<Character[]>(url);
            const characters = response.data;
            const character = characters[0];

            return ctx.render({character})
        } catch (e) {
            return new Response("Error de API");
        }
    }
}

const Page = (props: {data: Data}) => {
    const {character} = props.data;

    return (
        <div class="container">
            <CharacterDetail character={props.data.character} />
        </div>
    );
};

export default Page;
