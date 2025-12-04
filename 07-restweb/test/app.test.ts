import { describe, expect, it, jest } from "@jest/globals";
import { ServerApp } from "../src/presentation/server";
import { envs } from "../src/config";

jest.mock("../src/presentation/server");
describe("App Test", () => {
  it("Should work", async () => {
    await import("../src/app");
    expect(ServerApp).toHaveBeenCalledTimes(1);
    expect(ServerApp).toHaveBeenCalledWith({
      port: envs.PORT,
      public_path: envs.PUBLIC_PATH,
      routes: expect.any(Function),
    });

    expect(ServerApp.prototype.start).toHaveBeenCalledTimes(1);
    expect(ServerApp.prototype.start).toHaveBeenCalledWith();
  });
});
