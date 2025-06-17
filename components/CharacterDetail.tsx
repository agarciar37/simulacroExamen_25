import { FunctionalComponent } from "preact";

type Props = {
  character: {
    name: string;
    house: string;
    image: string;
    patronus: string;
    wand: {
      wood: string;
      core: string;
      length: number;
    };
  };
};

const CharacterDetail: FunctionalComponent<Props> = ({ character }) => {
  const { name, house, image, patronus } = character;

  return (
    <div class="CharacterDetailContainer">
      <div class="CharacterCard">
        <h1>{name}</h1>
        <img src={image} alt={name} />
        <p>Casa: {house}</p>
        <p>Patronus: {patronus}</p>
        <p>Varita:</p>
        <ul>
          <li>Madera: {character.wand.wood}</li>
          <li>Núcleo: {character.wand.core}</li>
          <li>Longitud: {character.wand.length} cm</li>
        </ul>
      </div>
    </div>
  );
};

export default CharacterDetail;
