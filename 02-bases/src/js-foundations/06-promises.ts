import { httpClientPlugin as http } from "../plugins";

export const getPokemonId: (id: string | number) => Promise<string> = async (
  id: string | number
): Promise<string> => {
  const url: string = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const pokemon = await http.get(url);
  return pokemon.name;
};
