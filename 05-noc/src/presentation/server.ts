import { CronJob } from "cron";

export class ServerApp {
  public static start(): void {
    console.debug("Server Started...");

    const job: CronJob<null, null> = new CronJob("*/3 * * * * *", () => {
      const date = new Date();
      console.log(
        `Server run at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
      );
    });

    job.start();
  }
}
