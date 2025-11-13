import { httpClientPlugin as http } from "../plugins";

export const getPokemonId: (id: string | number) => Promise<string> = async (
  id: string | number
): Promise<string> => {
  try {
    const url: string = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const pokemon = await http.get(url);
    return pokemon.name;
  } catch (error) {
    throw new Error(`Something went wrong - Pokemon not found with id ${id}`);
  }
};
