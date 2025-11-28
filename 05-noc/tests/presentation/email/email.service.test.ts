import { describe, expect, it, jest } from "@jest/globals";
import * as nodemailer from "nodemailer";
import {
  EmailService,
  SenMailOptions,
} from "../../../src/presentation/email/email.service";
import { beforeEach } from "node:test";

jest.mock("nodemailer", () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockReturnValue(true),
  }),
}));

const emailService: EmailService = new EmailService();
const emailSendOptions: SenMailOptions = {
  from: "Randi_Predovic@hotmail.com",
  to: "Shania.Johnston@yahoo.com",
  subject: "Test Email to Send",
  htmlBody: "<p>This is a test email.</p>",
};
const emailAttachment: SenMailOptions = {
  from: "Randi_Predovic@hotmail.com",
  to: "Shania.Johnston@yahoo.com",
  subject: "Test Email to Send",
  htmlBody: "<p>This is a test email.</p>",
  attachments: [
    {
      filename: "test-log.log",
      path: "./logs/test-log.log",
    },
  ],
};
describe("Email Service Test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
  it("Should send an email", async () => {
    const resultEmailSent: boolean = await emailService.sendEmail(
      emailSendOptions
    );
    expect(resultEmailSent).toBeTruthy();
    expect(nodemailer.createTransport).toHaveBeenCalledTimes(1);
    expect(nodemailer.createTransport().sendMail).toHaveBeenCalledWith({
      from: "Randi_Predovic@hotmail.com",
      to: "Shania.Johnston@yahoo.com",
      subject: "Test Email to Send",
      html: "<p>This is a test email.</p>",
      attachments: expect.any(Array),
    });
  });

  it("Should send an email with system files log attachments", async () => {
    const resultEmailSent: boolean =
      await emailService.sendEmailWithFileSystemLogs([
        "Shania.Johnston@yahoo.com",
      ]);
    expect(resultEmailSent).toBeTruthy();
    expect(nodemailer.createTransport().sendMail).toHaveBeenCalledWith({
      from: "test_email@gmail.com",
      to: ["Shania.Johnston@yahoo.com"],
      subject: "Server Logs",
      html: `
    <h1>Server Logs - NOC</h1>
    <p>This is the server logs.</p>
    <p>Please check the attached file.</p>
    `,
      attachments: expect.arrayContaining([
        { filename: "all-logs.log", path: "./logs/all-logs.log" },
        { filename: "medium-logs.log", path: "./logs/medium-logs.log" },
        { filename: "high-logs.log", path: "./logs/high-logs.log" },
        { filename: "error-logs.log", path: "./logs/error-logs.log" },
      ]),
    });
  });
});
