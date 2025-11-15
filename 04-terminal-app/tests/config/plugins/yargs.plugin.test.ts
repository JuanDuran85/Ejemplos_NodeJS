import { describe, expect, jest, test, beforeEach } from "@jest/globals";

const runCommand = async (args: string[]): Promise<any> => {
  process.argv = [...process.argv, ...args];
  const { yarg } = await import("../../../src/config/plugins/yargs.plugins");
  return yarg;
};

const originalArgv: string[] = process.argv;

describe("yargs.plugin test", () => {
  beforeEach(() => {
    process.argv = originalArgv;
    jest.resetModules();
  });

  test("should return default value", async () => {
    const result = await runCommand(["-b", "5"]);
    expect(result.b).toBe(5);
    expect(result.l).toBe(10);
    expect(result).toEqual(
      expect.objectContaining({
        b: 5,
        l: 10,
        s: false,
        n: "multiplication-table",
        d: "output",
      })
    );
  });

  test("should return configuration with custom values", async () => {
    const result = await runCommand([
      "-b",
      "15",
      "-l",
      "20",
      "-s",
      "-n",
      "test_name",
      "-d",
      "test_destination",
    ]);
    expect(result).toEqual(
      expect.objectContaining({
        b: 15,
        l: 20,
        s: true,
        n: "test_name",
        d: "test_destination",
      })
    );
  });
});
