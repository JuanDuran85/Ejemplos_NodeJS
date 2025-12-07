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

type MailerToUse = {
  mailerService: string;
  mailerEmailName: string;
  mailerKey: string;
};

export class EmailService {
  private readonly transporter: nodemailer.Transporter;

  constructor({ mailerService, mailerEmailName, mailerKey }: MailerToUse) {
    this.transporter = nodemailer.createTransport({
      service: mailerService,
      auth: {
        user: mailerEmailName,
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
      console.debug("sending email...");
      return true;
    } catch (error) {
      const errorMessage: string = `Error: ${error}. Please check email service.`;
      console.error(errorMessage);
      return false;
    }
  }
}
