import { describe, test, expect } from "@jest/globals";

import { buildMakePerson } from "../../src/js-foundations/05-factory-functions";

describe("05-factory-functions", () => {
  const getUUID = () => "12345";
  const getAge = (birthdate: string) => 10;

  test("buildMakePerson should return a function", () => {
    const makePerson = buildMakePerson({
      getUUID,
      getAge,
    });

    expect(makePerson).toBeInstanceOf(Function);
    expect(typeof makePerson).toBe("function");
  });

  test("makePerson should return an object person", () => {
    const makePerson = buildMakePerson({
      getUUID,
      getAge,
    });
    const personJhonDoe = makePerson({
      name: "Jhon Doe",
      birthdate: "1990-01-01",
    });
    expect(personJhonDoe).toEqual({
      id: "12345",
      name: "Jhon Doe",
      birthdate: "1990-01-01",
      age: 10,
    });
  });
});
