import { getUserById } from "./js-foundations";
import {
  buildLogger,
  getAgePlugin,
  getUUID,
  httpClientAxiosPlugin,
  httpClientPlugin,
} from "./plugins";

getUserById("1", (error, user) => {
  if (error) {
    console.error(error);
  } else {
    console.debug(user);
  }
});

const logger = buildLogger("app.ts");

logger.log("Logger from app.ts");
logger.error("Error from app.ts");

getAgePlugin("1990-01-01");
console.debug(getUUID());

httpClientAxiosPlugin
  .get("https://jsonplaceholder.typicode.com/todos/1")
  .then((response) => console.debug(response));
const pokemonName = httpClientPlugin.get("https://pokeapi.co/api/v2/pokemon/1");
pokemonName.then((response) => console.debug(response));