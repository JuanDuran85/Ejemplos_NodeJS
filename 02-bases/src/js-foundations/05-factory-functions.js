const { v4: uuidv4 } = require("uuid");
const getAge = require('get-age');

const buildPerson = ({ name, birthdate }) => {
  return {
    id: uuidv4(),
    name,
    birthdate,
    age: getAge(birthdate),
  };
};

const obePerson = {
  name: "Eldon",
  birthdate: "1985-01-09",
};

const eldon = buildPerson(obePerson);
console.debug(eldon);