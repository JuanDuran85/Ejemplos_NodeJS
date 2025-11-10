const { httpAxios } = require("../plugins");

const getPokemonByIdAsyncAxios = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  let pokemon;

  try {
    pokemon = await httpAxios.get(url);
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong");
  }

  return pokemon.name;
};

module.exports = getPokemonByIdAsyncAxios;
