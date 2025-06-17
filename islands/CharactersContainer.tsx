import { FunctionComponent } from "preact";
import CharacterCard from "../components/CharacterCard.tsx";
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
  const filteredCharacters = props.characters.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  );

  const addFavorite = async (character: Character) => {
    await fetch("/favorite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(character),
    });
  };

  return (
    <div class="CharactersContainer">
      {filteredCharacters.map((character) => (
        <div key={character.id}>
          <div class="CharacterCard">
            <a href={`/character/${character.id}`}>
              <h2>{character.name}</h2>
              <img src={character.image} alt={character.name} />
            </a>
            <button onClick={() => addFavorite(character)}>
              Añadir a favoritos
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CharactersContainer;