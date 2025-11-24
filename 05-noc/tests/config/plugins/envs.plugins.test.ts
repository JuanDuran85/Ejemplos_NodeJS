import { describe, expect, it, jest } from "@jest/globals";
import { envs } from "../../../src/config/plugins/envs.plugins";

describe("ENVS CONFIG TEST", () => {
  it("Should return envs options", () => {
    expect(envs).toEqual({
      PORT: 3000,
      EMAIL_NAME: "test_email@gmail.com",
      EMAIL_KEY: "123456789",
      PROD: false,
      EMAIL_SERVICE: "gmail",
      MONGO_URL: "mongodb://test:1590@localhost:27017/",
      MONGO_USER: "test",
      MONGO_PASSWORD: "1590",
      MONGO_DB_NAME: "NOC_TEST",
      POSTGRES_USER: "postgres_test",
      POSTGRES_PASSWORD: "9510",
      POSTGRES_URL: "postgresql://postgres_test:9510@localhost:5432/NOC",
      POSTGRES_PORT: "5432",
      POSTGRES_DB: "NOC_TEST",
    });
  });

  it("Should return error if not found env", async () => {
    jest.resetModules();
    process.env.PORT = "ABC";
    try {
      await import("../../../src/config/plugins/envs.plugins");
      expect(true).toBe(false);
    } catch (error) {
      expect(`${error}`).toContain('"PORT" should be a valid integer');
    }
  });
});
