//@ts-ignore
import getAge from "get-age";

export const getAgePlugin: (birthdate: string) => number = (
  birthdate: string
) => {
  if (!birthdate) throw new Error("birthdate is required");
  return getAge(birthdate);
};
