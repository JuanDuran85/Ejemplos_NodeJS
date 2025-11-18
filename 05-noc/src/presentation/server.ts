import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDataSource } from "../infrastructure/datasources/mongo-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const logRepository: LogRepositoryImpl = new LogRepositoryImpl(
  //new FileSystemDatasource()
  new MongoLogDataSource()
);
const emailService: EmailService = new EmailService();

export class ServerApp {
  public static start(): void {
    console.debug("Server Started...");

    CronService.createJob("*/5 * * * * *", () => {
      const date: Date = new Date();
      console.debug("5 seconds: ", date.toString());
      const url: string = "http://alirafael.com";
      new CheckService(
        logRepository,
        () => console.debug(`${url} is up!`),
        (error) => console.error(error)
      ).execute(url);
    });
  }
}
