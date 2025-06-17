import type { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "axios";
import CharactersContainer from "../../islands/CharactersContainer.tsx";
import SearchBar from "../../islands/SearchBar.tsx";

// Middleware state: lo que viene del middleware
type State = {
    dni: string;
};

// Tipo de cada personaje
type Character = {
    id: string;
    name: string;
    house: string;
    image: string;
};

// Tipo de los datos que se pasan al componente
type Data = {
    dni: string;
    characters: Character[];
};

// Handler que carga los personajes y pasa los datos al render
export const handler: Handlers<Data, State> = {
    GET: async (_req: Request, ctx: FreshContext<State, Data>) => {
        const dni = ctx.state.dni;

        const url = "https://hp-api.onrender.com/api/characters";
        
        try {
            const response = await Axios.get<Character[]>(url);
            const characters = response.data;

            if (!characters) {
                return new Response("No se encontraron personajes.", { status: 404 });
            }

            return ctx.render({ dni, characters });
        } catch (e) {
            console.error("Error al llamar a la API:", e);
            return new Response("Error de API", { status: 500 });
        }
    }
}

export default function GreetPage(props: PageProps<{ characters: Character[]; dni: string }>) {
  return (
    <div class="container">
      <h1 class="text-2xl mb-4">Bienvenido, DNI: {props.data.dni}</h1>
      <form method="GET" action="/logout" class="mb-4">
        <button class="logout-button" type="submit">Logout</button>
      </form>
      <SearchBar />
      <CharactersContainer characters={props.data.characters} />
    </div>
  );
}