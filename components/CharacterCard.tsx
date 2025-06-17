import { FunctionalComponent } from "preact";

type Props = {
    character: {
        id: string
        name: string;
        house: string;
        image: string;
    };
};

const CharacterCard: FunctionalComponent<Props> = ({ character }) => {
    const { id, name, house, image } = character;

    return (
        <div class="CharacterCard">
            <h3>{character.name}</h3>
            <a href={`/character/${character.id}`}>
                <img src={character.image} alt={character.name} width="150" />
            </a>
        </div>
    );
};

export default CharacterCard;
