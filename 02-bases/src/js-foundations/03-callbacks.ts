type Users = {
  id: number;
  name: string;
};

const users: Users[] = [
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

export function getUserById(
  id: number | string,
  callback: (error?: string, user?: Users) => void
) {
  const user: Users | undefined = users.find((user: Users) => user.id === id);

  if (!user) {
    return callback(`User not found with id ${id}`);
  }

  return callback(undefined, user);
}
