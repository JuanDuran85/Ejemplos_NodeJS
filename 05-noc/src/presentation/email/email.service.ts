import * as nodemailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugins";
import { LogRepository } from "../../domain/repository/log.repository";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

interface SenMailOptions {
  from: string;
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

interface Attachment {
  filename: string;
  path: string;
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
    const { from, htmlBody, subject, to, attachments = [] } = options;

    try {
      const sentInformation = await this.transporter.sendMail({
        from,
        to,
        subject,
        html: htmlBody,
        attachments,
      });
      this.logRepository.saveLog(
        new LogEntity({
          level: LogSeverityLevel.ERROR,
          message: `Email sent OK: ${JSON.stringify(sentInformation)}`,
          origin: "EmailService.ts",
        })
      );
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

  public async sendEmailWithFileSystemLogs(
    to: string | string[]
  ): Promise<boolean> {
    const subject = "Server Logs";
    const htmlBody = `
    <h1>Server Logs - NOC</h1>
    <p>This is the server logs.</p>
    <p>Please check the attached file.</p>
    `;

    const attachments: Attachment[] = [
      { filename: "all-logs.log", path: "./logs/all-logs.log" },
      { filename: "medium-logs.log", path: "./logs/medium-logs.log" },
      { filename: "high-logs.log", path: "./logs/high-logs.log" },
      { filename: "error-logs.log", path: "./logs/error-logs.log" },
    ];

    return this.sendEmail({
      from: envs.EMAIL_NAME,
      to,
      subject,
      htmlBody,
      attachments,
    });
  }
}
