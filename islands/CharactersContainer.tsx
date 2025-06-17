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

  return (
    <div class="CharactersContainer">
      {filteredCharacters.map((character) => (
        <a
          href={`/character/${character.id}`}
          className="CharacterCard"
          key={character.id}
        >
          <h2>{character.name}</h2>
          <img src={character.image} alt={character.name} />
        </a>
      ))}
    </div>
  );
};

export default CharactersContainer;
