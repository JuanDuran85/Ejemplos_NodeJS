const users = [
  {
    id: 1,
    name: "Leanne Graham",
  },
  {
    id: 2,
    name: "Ervin Howell",
  },
  {
    id: 3,
    name: "Clementine Bauch",
  },
  {
    id: 4,
    name: "Patricia Lebsack",
  },
  {
    id: 5,
    name: "Chelsey Dietrich",
  },
  {
    id: 6,
    name: "Mrs. Dennis Schulist",
  },
];

const getUserById = (id, callback) => {
  const user = users.find((user) => user.id === id);

  return user ? callback(`User not found with id ${id}`) : callback(null, user);
};

module.exports = {
  getUserById,
};
