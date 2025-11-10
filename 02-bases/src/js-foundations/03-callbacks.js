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

function getUserById(id, callback) {
  const user = users.find(function (user) {
    return user.id === id;
  });

  if (!user) {
    return callback(`User not found with id ${id}`);
  }

  return callback(null, user);
}

module.exports = {
  getUserById,
};
