import { CronService } from "./cron/cron-service";

export class ServerApp {
  public static start(): void {
    console.debug("Server Started...");
    CronService.createJob("*/5 * * * * *", () => {
      const date: Date = new Date();
      console.debug("5 seconds: ", date.toString());
    });
  }
}
