type User = { id: number; name: string };

const users: User[] = [
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

export const getUserByIdArrow = (
  id: number | string,
  callback: (error?: string, user?: User) => void
) => {
  const user = users.find((user) => user.id === id);

  return user
    ? callback(`User not found with id ${id}`)
    : callback(undefined, user);
};
