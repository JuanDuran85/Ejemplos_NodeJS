const { emailTemplate } = require("./js-foundations/01-template");
const { getUserById } = require("./js-foundations/03-callbacks.js");
require("./js-foundations/02-destructuring");
require("./js-foundations/04-arrow");
require("./js-foundations/05-factory-functions");

console.debug("-----------------------");

console.debug(emailTemplate);
const id = 3;
getUserById(id, (error, user) => {
  if (error) {
    console.error(error);
    throw new Error(error);
  }

  console.debug({ user });
});

console.debug("----------------------");
