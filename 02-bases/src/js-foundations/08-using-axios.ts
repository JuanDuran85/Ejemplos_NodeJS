import { httpClientAxiosPlugin } from "../plugins";

export const getPokemonByIdAsyncAxios = async (id: string | number) => {
  const url: string = `https://pokeapi.co/api/v2/pokemon/${id}`;
  let pokemon;

  try {
    pokemon = await httpClientAxiosPlugin.get(url);
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong");
  }

  return pokemon.name;
};
