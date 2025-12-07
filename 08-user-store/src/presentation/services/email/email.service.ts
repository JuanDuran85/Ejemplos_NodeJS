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
  postToProvider: boolean;
};

export class EmailService {
  private readonly transporter: nodemailer.Transporter;
  private readonly postToProvider: boolean;

  constructor({
    mailerService,
    mailerEmailName,
    mailerKey,
    postToProvider,
  }: MailerToUse) {
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
    this.postToProvider = postToProvider;
  }

  public async sendEmail(options: SenMailOptions): Promise<boolean> {
    const { from, htmlBody, subject, to, attachments = [] } = options;
    try {
      if (!this.postToProvider) return true;
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
