import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { LogEntity } from "../../../../src/domain/entities/log.entity";
import { CheckServiceMultiple } from "../../../../src/domain/use-cases/checks/check-service-multiple";

const mockLogRepository1 = {
  saveLog: jest.fn() as any,
  getLogs: jest.fn() as any,
};
const mockLogRepository2 = {
  saveLog: jest.fn() as any,
  getLogs: jest.fn() as any,
};
const mockLogRepository3 = {
  saveLog: jest.fn() as any,
  getLogs: jest.fn() as any,
};

const successCallBack = jest.fn();
const errorCallBack = jest.fn();

const checkService: CheckServiceMultiple = new CheckServiceMultiple(
  [mockLogRepository1, mockLogRepository2, mockLogRepository3],
  successCallBack,
  errorCallBack
);

describe("Check Service Test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("Should call successCallBack when fetch returns true", async () => {
    const wasSuccessCall: boolean = await checkService.execute(
      "https://alirafael.com"
    );
    expect(wasSuccessCall).toBeTruthy();
    expect(successCallBack).toHaveBeenCalled();
    expect(errorCallBack).not.toHaveBeenCalled();
    expect(mockLogRepository1.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(mockLogRepository2.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(mockLogRepository3.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
  });

  it("Should call errorCallBack when fetch returns false", async () => {
    const wasSuccessCall: boolean = await checkService.execute(
      "https://alirsdsdsdafael.com"
    );
    expect(wasSuccessCall).toBeFalsy();
    expect(successCallBack).not.toHaveBeenCalled();
    expect(errorCallBack).toHaveBeenCalled();
    expect(mockLogRepository1.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(mockLogRepository3.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
  });
});
