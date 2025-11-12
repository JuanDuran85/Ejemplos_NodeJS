import { describe, test, expect } from "@jest/globals";

import { getUserById } from "../../src/js-foundations/03-callbacks";
describe("App", () => {
  test("should get user by id ", () => {
    const user = getUserById(1, (error, user) => {
      expect(user).toBeDefined();
    });
    console.debug(user);
  });

  test('Should get an error',() =>{
    const user = getUserById(23, (error, user) => {
      expect(error).toBeDefined();
      expect(error).toBe("User not found with id 23");
    });
    console.debug(user);
  })
});
