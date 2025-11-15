import { describe, expect, test } from "@jest/globals";

const runCommand = async (args: string[]): Promise<any> => {
  process.argv = [...process.argv, ...args];
  const { yarg } = await import("../../../src/config/plugins/yargs.plugins");
  return yarg;
};

describe("yargs.plugin test", () => {
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
});
