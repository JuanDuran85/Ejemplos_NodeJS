import { describe, test, expect } from "@jest/globals";

import { getUserById } from "../../src/js-foundations/03-callbacks";
describe("App", () => {
  test("should get user by id ", () => {
    const id: number = 1;
    getUserById(id, (error, user) => {
      expect(user).toBeDefined();
      expect(user).toMatchObject({
        id: 1,
        name: "Leanne Graham",
      });
      expect(user?.name).toContain("Leanne Graham");
      expect(user?.name).toEqual("Leanne Graham");
      expect(error).toBeUndefined();
    });
  });

  test("Should get an error", () => {
    const id: number = 23;
    getUserById(id, (error, user) => {
      expect(user).toBeUndefined();
      expect(error).toBeDefined();
      expect(error).toBe("User not found with id 23");
    });
  });
});
