import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDataSource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDataSource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const logRepositoryFileSystem: LogRepositoryImpl = new LogRepositoryImpl(
  new FileSystemDatasource()
);

const logRepositoryMongoDb: LogRepositoryImpl = new LogRepositoryImpl(
  new MongoLogDataSource()
);

const logRepositoryPostgres: LogRepositoryImpl = new LogRepositoryImpl(
  new PostgresLogDataSource()
);

const emailService: EmailService = new EmailService();

export class ServerApp {
  public static async start(): Promise<void> {
    console.debug("Server Started...");
    CronService.createJob("*/10 * * * * *", () => {
      const date: Date = new Date();
      console.debug("5 seconds: ", date.toString());
      const url: string = "http://alirafael.com";
      new CheckServiceMultiple(
        [logRepositoryFileSystem, logRepositoryMongoDb, logRepositoryPostgres],
        () => console.debug(`${url} is up!`),
        (error) => console.error(error)
      ).execute(url);
    });
  }
}
