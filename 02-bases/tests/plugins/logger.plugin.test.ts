import { describe, test, expect, jest } from "@jest/globals";

import { buildLogger, logger as winstonLogger } from "../../src/plugins";

describe("plugins/logger.plugin.ts", () => {
  test("buildLogger Should return a function logger", () => {
    const logger = buildLogger("app.ts");

    expect(typeof logger).toBe("object");
    expect(typeof logger.log).toBe("function");
    expect(typeof logger.error).toBe("function");
    expect(logger).toHaveProperty("log");
    expect(logger).toHaveProperty("error");
  });

  test("Should log a message", () => {
    const winstonLoggerMock = jest.spyOn(winstonLogger, "log");

    const message: string = "test message";
    const service = "test-service";

    const logger = buildLogger(service);

    logger.log(message);

    expect(winstonLoggerMock).toHaveBeenCalledWith(
      "info",
      expect.objectContaining({
        level: "info",
        message,
        service,
      })
    );
  });
});
