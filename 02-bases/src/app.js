const { emailTemplate } = require("./js-foundations/01-template");
const { getUserById } = require("./js-foundations/03-callbacks.js");
const { buildMakePerson } = require("./js-foundations/05-factory-functions");
const getPokemonById = require("./js-foundations/06-promises.js");
const { getUUID, getAge } = require("./plugins");
require("./js-foundations/02-destructuring");
require("./js-foundations/04-arrow");

console.debug("-----------------------");
console.debug(emailTemplate);
console.debug("----------------------");

const id = 3;
getUserById(id, (error, user) => {
  if (error) {
    console.error(error);
    throw new Error(error);
  }

  console.debug({ user });
});
console.debug("----------------------");
const makePerson = buildMakePerson({ getUUID, getAge });
const objPerson = {
  name: "Granville",
  birthdate: "1990-05-01",
};

const granville = makePerson(objPerson);
console.debug({ granville });

console.debug("----------------------");

getPokemonById(22)
  .then((pokemon) => console.debug({ pokemon }))
  .catch((error) => console.error(error));

console.debug("----------------------");
console.debug("----------------------");
console.debug("----------------------");
console.debug("----------------------");
console.debug("----------------------");
