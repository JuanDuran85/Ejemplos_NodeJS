import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository: LogRepositoryImpl = new LogRepositoryImpl(
  new FileSystemDatasource()
);
const emailService: EmailService = new EmailService();

export class ServerApp {
  public static start(): void {
    console.debug("Server Started...");

    CronService.createJob("*/10 * * * * *", () => {
      const date: Date = new Date();
      console.debug("5 seconds: ", date.toString());
      const url: string = "http://localhost:3000";
      new CheckService(
        fileSystemLogRepository,
        () => console.debug(`${url} is up!`),
        (error) => console.error(error)
      ).execute(url);
    });
  }
}
