import { describe, expect, jest, test } from "@jest/globals";
import { ServerApp } from "../src/presentation/server-app";

describe("App test", () => {
  test("should call Server.run with values", async () => {
    const serverRunMock = jest.fn();
    ServerApp.run = serverRunMock;

    process.argv = [
      "node",
      "app.js",
      "-b",
      "5",
      "-l",
      "10",
      "-s",
      "-n",
      "multiplication-table",
      "-d",
      "output",
    ];

    await import("../src/app");

    expect(serverRunMock).toHaveBeenCalledWith({
      base: 5,
      limit: 10,
      show: true,
      name: "multiplication-table",
      destination: "output",
    });
  });
});
