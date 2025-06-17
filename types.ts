import { OptionalId } from "mongodb";

export type DNI = {
    DNI: string;
    characters: Character[]
};

export type Character = {
    id: string;
    name: string;
    house: string;
    image: string;
};

export type ContactDB = OptionalId<Omit<DNI, "id">>;