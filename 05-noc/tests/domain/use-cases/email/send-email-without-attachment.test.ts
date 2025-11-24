import { afterAll, describe, expect, it, jest } from "@jest/globals";
import { beforeEach } from "node:test";
import { LogRepository } from "../../../../src/domain/repository/log.repository";
import { SendEmailWithoutAttachments } from "../../../../src/domain/use-cases/email/send-email-without-attachment";
import { LogEntity } from "../../../../src/domain/entities/log.entity";

const logRepositoryMock = {
  saveLog: jest.fn(),
  getLogs: jest.fn(),
} as unknown as LogRepository;

const emailServiceMock = {
  sendEmail: jest.fn(),
  sendEmailWithFileSystemLogs: jest.fn(),
};

const sendEmail: SendEmailWithoutAttachments = new SendEmailWithoutAttachments(
  logRepositoryMock,
  emailServiceMock as any
);

const optionToSendEmail = {
  from: "test@email.com",
  to: "to_email_test@email.com",
  subject: "Orin",
  htmlBody: "<h1>Test Email</h1>",
};

describe("Send Email without attachments TEST", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });
  it("Should return true when the email is OK ...", async () => {
    emailServiceMock.sendEmail.mockReturnValueOnce(true);
    const emailDone: boolean = await sendEmail.execute(optionToSendEmail);
    expect(emailDone).toBeTruthy();
    expect(emailServiceMock.sendEmail).toHaveBeenCalledTimes(1);
    expect(emailServiceMock.sendEmail).toHaveBeenCalledWith(optionToSendEmail);
    expect(logRepositoryMock.saveLog).toHaveBeenCalledTimes(1);
    expect(logRepositoryMock.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
  });

  it("should return an error when can not send email", async () => {
    emailServiceMock.sendEmail.mockReturnValueOnce(false);
    const emailDone: boolean = await sendEmail.execute(optionToSendEmail);
    expect(emailDone).toBeFalsy();
    expect(emailServiceMock.sendEmail).toHaveBeenCalledWith(optionToSendEmail);
    expect(logRepositoryMock.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
  });
});
