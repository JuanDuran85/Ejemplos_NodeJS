type MakePerson = {
  name: string;
  birthdate: string;
};

type BuildMakerPersonOptions = {
  getUUID: () => string;
  getAge: (birthdate: string) => number;
};

export const buildMakePerson = ({
  getUUID,
  getAge,
}: BuildMakerPersonOptions) => {
  return ({ name, birthdate }: MakePerson) => {
    return {
      id: getUUID(),
      name,
      birthdate,
      age: getAge(birthdate),
    };
  };
};
