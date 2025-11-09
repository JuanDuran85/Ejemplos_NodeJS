const getPokemonId = (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  return fetch(url)
    .then((response) => response.json())
    .then((pokemon) => pokemon.name)
    .catch((error) => {
      console.error({ error });
      throw new Error("Something went wrong");
    })
    .finally(() => console.debug("finally"));
};

module.exports = getPokemonId;
