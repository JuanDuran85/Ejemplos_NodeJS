import { describe, test, expect, jest } from "@jest/globals";

import getAge from "get-age";

import { getAgePlugin } from "../../src/plugins/get-age.plugin";

jest.mock("get-age");

describe("plugins/get-age.plugin.ts", () => {
  test("should return the age", () => {
    const birthdate: string = "1990-01-01";
    (getAge as jest.Mock).mockReturnValue(35);
    const age: number = getAgePlugin(birthdate);
    expect(typeof age).toBe("number");
  });

  test("should return an error if birthdate is not provided", () => {
    const birthdate = undefined;
    expect(() => getAgePlugin(birthdate!)).toThrow();
  });

  test("should return zero years", () => {
    const birthdate = "1990-01-01";
    (getAge as jest.Mock).mockReturnValue(0);

    const age = getAgePlugin(birthdate);

    expect(age).toBe(0);
    expect(getAge).toHaveBeenCalledWith(birthdate);
  });
});
