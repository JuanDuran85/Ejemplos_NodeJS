type MakePerson = {
  name: string;
  birthdate: string;
};

type BuildMakerPersonOptions = {
  getUUID: () => string;
  getAge: (birthdate: string) => number;
};

export const buildMakePerson: ({
  getUUID,
  getAge,
}: BuildMakerPersonOptions) => ({ name, birthdate }: MakePerson) => {
  id: string;
  name: string;
  birthdate: string;
  age: number;
} = ({ getUUID, getAge }: BuildMakerPersonOptions) => {
  return ({ name, birthdate }: MakePerson) => {
    return {
      id: getUUID(),
      name,
      birthdate,
      age: getAge(birthdate),
    };
  };
};
