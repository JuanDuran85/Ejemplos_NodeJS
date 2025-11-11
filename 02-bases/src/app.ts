import {
  buildLogger,
  getAgePlugin,
  getUUID,
  httpClientAxiosPlugin,
  httpClientPlugin,
} from "./plugins";

const logger = buildLogger("app.ts");

logger.log("Logger from app.ts");
logger.error("Error from app.ts");

getAgePlugin("1990-01-01");
console.debug(getUUID());

httpClientAxiosPlugin
  .get("https://jsonplaceholder.typicode.com/todos/1")
  .then((response) => console.debug(response));
httpClientPlugin
  .get("https://jsonplaceholder.typicode.com/todos/1")
  .then((response) => console.debug(response));
