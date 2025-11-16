import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";

export class ServerApp {
  public static start(): void {
    console.debug("Server Started...");
    CronService.createJob("*/5 * * * * *", () => {
      const date: Date = new Date();
      console.debug("5 seconds: ", date.toString());
      const url: string = "http://localhost:3000";
      new CheckService(
        () => console.debug(`${url} is up!`),
        (error) => console.error(error)
      ).execute(url);
    });
  }
}
