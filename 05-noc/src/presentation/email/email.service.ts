import * as nodemailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugins";
import { LogRepository } from "../../domain/repository/log.repository";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

interface SenMailOptions {
  from: string;
  to: string;
  subject: string;
  htmlBody: string;
  attachments?: string[];
}

export class EmailService {
  private readonly logRepository: LogRepository;

  constructor(logRepository: LogRepository) {
    this.logRepository = logRepository;
  }

  private readonly transporter: nodemailer.Transporter =
    nodemailer.createTransport({
      service: envs.EMAIL_SERVICE,
      auth: {
        user: envs.EMAIL_NAME,
        pass: envs.EMAIL_KEY,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

  public async sendEmail(options: SenMailOptions): Promise<boolean> {
    const { from, htmlBody, subject, to } = options;

    try {
      const sentInformation = await this.transporter.sendMail({
        from,
        to,
        subject,
        html: htmlBody,
      });
      console.debug(sentInformation);
      return true;
    } catch (error) {
      const errorMessage: string = `Error: ${error}. Please check email service.`;
      const logToSave: LogEntity = new LogEntity({
        level: LogSeverityLevel.ERROR,
        message: errorMessage,
        origin: "EmailService.ts",
      });
      this.logRepository.saveLog(logToSave);

      return false;
    }
  }
}
