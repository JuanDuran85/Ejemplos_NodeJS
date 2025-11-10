import { httpClientPlugin as http } from "../plugins";


export const getPokemonNameByIdAsync: (
  id: string | number
) => Promise<string> = async (id: string | number) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  let pokemonName: string;

  try {
    const pokemon = await http.get(url);
    pokemonName = pokemon.name;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong");
  }

  return pokemonName;
};
