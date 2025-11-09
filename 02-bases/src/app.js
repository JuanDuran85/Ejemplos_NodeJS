const { emailTemplate } = require("./js-foundations/01-template");
require("./js-foundations/02-destructuring");
const { getUserById } = require("./js-foundations/03-callbacks.js");

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
