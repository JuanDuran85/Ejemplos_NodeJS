export const getPokemonId = (id: string | number) => {
  const url: string = `https://pokeapi.co/api/v2/pokemon/${id}`;
  return fetch(url)
    .then((response) => response.json())
    .then((pokemon) => pokemon.name)
    .catch((error) => {
      console.error({ error });
      throw new Error("Something went wrong");
    })
    .finally(() => console.debug("finally"));
};
