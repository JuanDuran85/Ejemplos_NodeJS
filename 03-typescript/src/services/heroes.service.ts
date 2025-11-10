import { Heroes, heroes } from "../data/heroes";

export const findHeroById: (id: number) => Heroes | undefined = (id: number) => {
  return heroes.find((hero: Heroes) => hero.id === id);
};
