import { describe, test, expect } from "@jest/globals";

import { getUUID } from "../../src/plugins";

describe("plugins/get-id.plugin", () => {
  test("getUUID should return a uuid", () => {
    const uuid = getUUID();

    expect(typeof uuid).toBe("string");
    expect(uuid.length).toBe(36);
  });
});
