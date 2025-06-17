import { FunctionalComponent } from "preact";

type Props = {
  character: {
    name: string;
    house: string;
    image: string;
    patronus: string;
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
      </div>
    </div>
  );
};

export default CharacterDetail;