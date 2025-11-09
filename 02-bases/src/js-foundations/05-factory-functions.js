const { getUUID, getAge } = require("../plugins");

const buildPerson = ({ name, birthdate }) => {
  return {
    id: getUUID(),
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
