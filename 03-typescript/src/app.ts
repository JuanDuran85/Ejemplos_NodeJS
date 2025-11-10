import { Heroes } from "./data/heroes";
import { findHeroById } from "./services/heroes.service";

console.debug("---------------------------");
console.debug("---------------------------");

const hero: Heroes | undefined = findHeroById(1);

console.debug(hero?.name ?? "No hero found");

console.debug("---------------------------");
console.debug("---------------------------");
