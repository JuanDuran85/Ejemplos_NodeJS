const getPokemonByIdAsync = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  let namePokemon = "";

  try {
    const response = await fetch(url);
    namePokemon = await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong");
  }

  return namePokemon.name;
};

module.exports = getPokemonByIdAsync;
