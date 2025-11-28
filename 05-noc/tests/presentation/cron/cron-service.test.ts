import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { CronService } from "../../../src/presentation/cron/cron-service";
import { CronJob } from "cron";

const mockTick = jest.fn();
describe("Cron Service Test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it("Should create a new job", (done) => {
    const newJob: CronJob<null, null> = CronService.createJob(
      "* * * * * *",
      mockTick
    );

    setTimeout(() => {
      expect(mockTick).toHaveBeenCalledTimes(2);
      newJob.stop();
      done();
    }, 2000);
  });
});
