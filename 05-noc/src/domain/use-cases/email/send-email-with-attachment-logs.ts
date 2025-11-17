import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface SendEmailWithAttachmentLogsUseCase {
  execute: (to: string | string[]) => Promise<boolean>;
}

export class SendEmailWithAttachmentLogs
  implements SendEmailWithAttachmentLogsUseCase
{
  private readonly logRepository: LogRepository;
  private readonly emailServices: EmailService;
  constructor(logRepository: LogRepository, emailServices: EmailService) {
    this.logRepository = logRepository;
    this.emailServices = emailServices;
  }
  public async execute(to: string | string[]): Promise<boolean> {
    try {
      const sent: boolean =
        await this.emailServices.sendEmailWithFileSystemLogs(to);
      if (!sent) throw new Error("Error sending email");
      this.logRepository.saveLog(
        new LogEntity({
          level: LogSeverityLevel.LOW,
          message: `Email with attachments, sent successfully to: ${to}`,
          origin: "SendEmailLogs.ts",
        })
      );
      return true;
    } catch (error) {
      this.logRepository.saveLog(
        new LogEntity({
          level: LogSeverityLevel.ERROR,
          message: String(error),
          origin: "SendEmailLogs.ts",
        })
      );
      return false;
    }
  }
}
