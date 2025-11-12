import { describe, test, expect } from "@jest/globals";

import { getPokemonId } from "../../src/js-foundations/06-promises";

describe("js-foundations/06-promises", () => {
  test("Should return a pokemon", async () => {
    const pokemonId: number = 1;

    const pokemonName: string = await getPokemonId(pokemonId);
    expect(pokemonName).toBe("bulbasaur");
  });
});
