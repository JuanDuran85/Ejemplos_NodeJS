import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailWithoutAttachments } from "../domain/use-cases/email/send-email-without-attachment";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";
import { SendEmailWithAttachmentLogs } from "../domain/use-cases/email/send-email-with-attachment-logs";

const fileSystemLogRepository: LogRepositoryImpl = new LogRepositoryImpl(
  new FileSystemDatasource()
);
const emailService: EmailService = new EmailService();

export class ServerApp {
  public static start(): void {
    console.debug("Server Started...");

    /*     new SendEmailWithoutAttachments(
      fileSystemLogRepository,
      emailService
    ).execute({
      from: "test@gmail.com",
      to: "test@gmail.com",
      subject: "Test Email",
      htmlBody: `
        <h1>Test Email</h1>
        <p>This is a test email.</p>
        <p>Thank you.</p>
      `,
    });

    new SendEmailWithAttachmentLogs(
      fileSystemLogRepository,
      emailService
    ).execute(["test@gmail.com"]); */

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
