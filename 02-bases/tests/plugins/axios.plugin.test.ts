import { describe, test, expect, jest } from "@jest/globals";

describe("plugins/axios.plugin", () => {
  test("should return an object", () => {
    const axios = jest.fn(() => ({
      get: jest.fn((url: string) =>
        Promise.resolve({
          id: 1,
          name: "Leanne Graham",
          username: "Bret",
          email: "Sincere@april.biz",
          address: {
            street: "Kulas Light",
            suite: "Apt. 556",
            city: "Gwenborough",
            zipcode: "92998-3874",
            geo: {
              lat: "-37.3159",
              lng: "81.1496",
            },
          },
          phone: "1-770-736-8031 x56442",
          website: "hildegard.org",
          company: {
            name: "Romaguera-Crona",
            catchPhrase: "Multi-layered client-server neural-net",
            bs: "harness real-time e-markets",
          },
        })
      ),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    }));
    const result = axios().get("https://jsonplaceholder.typicode.com/users");
    expect(typeof result).toBe("object");
    expect(axios.mock.calls.length).toBe(1);
  });
});
