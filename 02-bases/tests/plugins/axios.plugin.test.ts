import { describe, test, expect, jest, afterEach } from "@jest/globals";

import axios from "axios";

import { httpClientAxiosPlugin } from "../../src/plugins/axios.plugin";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

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

describe("httpClientAxiosPlugin - Mock", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Should return a user", async () => {
    // Arrange
    const mockData = { id: 1, name: "Test User" };
    const mockResponse = { data: mockData };
    const testUrl: string = "https://api.example.com/users/1";

    mockedAxios.get.mockResolvedValue(mockResponse);

    // Act
    const result = await httpClientAxiosPlugin.get(testUrl);

    // Assert
    expect(result).toEqual(mockData);
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(testUrl);
  });

  test("Should  throw an error if the request fails", async () => {
    // Arrange
    const testUrl = "https://api.example.com/users/1";
    const mockError = new Error("Network Error");

    mockedAxios.get.mockRejectedValue(mockError);

    // Act & Assert
    await expect(httpClientAxiosPlugin.get(testUrl)).rejects.toThrow(
      "Network Error"
    );
    expect(mockedAxios.get).toHaveBeenCalledWith(testUrl);
  });
});
