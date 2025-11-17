import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface OptionsSendEmail {
  from: string;
  to: string | string[];
  subject: string;
  htmlBody: string;
}

interface SendEmailWithoutAttachmentsUseCase {
  execute: (optionsSendEmail: OptionsSendEmail) => Promise<boolean>;
}

export class SendEmailWithoutAttachments
  implements SendEmailWithoutAttachmentsUseCase
{
  private readonly logRepository: LogRepository;
  private readonly emailServices: EmailService;
  constructor(logRepository: LogRepository, emailServices: EmailService) {
    this.logRepository = logRepository;
    this.emailServices = emailServices;
  }
  public async execute(options: OptionsSendEmail): Promise<boolean> {
    const { to, from, htmlBody, subject } = options;

    try {
      const sent: boolean = await this.emailServices.sendEmail({
        from,
        to,
        subject,
        htmlBody,
      });
      if (!sent) throw new Error("Error sending email");
      this.logRepository.saveLog(
        new LogEntity({
          level: LogSeverityLevel.LOW,
          message: `Email without attachments, sent successfully to: ${to}`,
          origin: "SendEmail.ts",
        })
      );
      return true;
    } catch (error) {
      this.logRepository.saveLog(
        new LogEntity({
          level: LogSeverityLevel.ERROR,
          message: String(error),
          origin: "SendEmail.ts",
        })
      );
      return false;
    }
  }
}
