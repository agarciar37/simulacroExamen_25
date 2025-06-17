import { FunctionComponent } from "preact";
import CharacterCard from "../components/CharacterCard.tsx";
import { useEffect, useState } from "preact/hooks";
import { searchTerm } from "../signals/charactersSignal.ts";

type Character = {
  name: string;
  image: string;
  house: string;
  id: string;
  
};

type Props = {
  characters: Character[];
};

const CharactersContainer: FunctionComponent<Props> = (props) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const filteredCharacters = props.characters.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  );

  useEffect(() => {
    const loadFavorites = async () => {
      const res = await fetch("/favorite");
      if (res.ok) {
        const data: Character[] = await res.json();
        setFavorites(data.map((c) => c.id));
      }
    };
    loadFavorites();
  }, []);

  const addFavorite = async (character: Character) => {
    await fetch("/favorite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(character),
    });
    setFavorites((prev) => [...prev, character.id]);
  };

  const removeFavorite = async (id: string) => {
    await fetch("/favorite", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setFavorites((prev) => prev.filter((favId) => favId !== id));
  };

  return (
    <div class="CharactersContainer">
      {filteredCharacters.map((character) => (
        <>
          <div class="CharacterCard" key={character.id}>
            <a href={`/character/${character.id}`}>
              <h2>{character.name}</h2>
              <img src={character.image} alt={character.name} />
            </a>
            {favorites.includes(character.id)
              ? (
                <button onClick={() => removeFavorite(character.id)}>
                  Eliminar de favoritos
                </button>
              )
              : (
                <button onClick={() => addFavorite(character)}>
                  Añadir a favoritos
                </button>
              )}
          </div>
        </>
      ))}
    </div>
  );
};

export default CharactersContainer;