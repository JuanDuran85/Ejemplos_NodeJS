import * as nodemailer from "nodemailer";

export interface SenMailOptions {
  from: string;
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

export interface Attachment {
  filename: string;
  path: string;
}

export class EmailService {
  private readonly transporter: nodemailer.Transporter;

  constructor(mailService: string, mailerEmail: string, mailerKey: string) {
    this.transporter = nodemailer.createTransport({
      service: mailService,
      auth: {
        user: mailerEmail,
        pass: mailerKey,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  public async sendEmail(options: SenMailOptions): Promise<boolean> {
    const { from, htmlBody, subject, to, attachments = [] } = options;
    try {
      await this.transporter.sendMail({
        from,
        to,
        subject,
        html: htmlBody,
        attachments,
      });
      return true;
    } catch (error) {
      const errorMessage: string = `Error: ${error}. Please check email service.`;
      console.error(errorMessage);
      return false;
    }
  }
}
