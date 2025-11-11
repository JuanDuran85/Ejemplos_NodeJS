//@ts-ignore
import getAge from "get-age";

export const getAgePlugin: (birthdate: string) => number = (
  birthdate: string
) => {
  if (!birthdate) return new Error("birthdate is required");
  return getAge(birthdate);
};
