import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import { CheckService } from "../../../../src/domain/use-cases/checks/check-service";
import { LogEntity } from "../../../../src/domain/entities/log.entity";

const mockLogRepository = {
  saveLog: jest.fn() as any,
  getLogs: jest.fn() as any,
};

const successCallBack = jest.fn();
const errorCallBack = jest.fn();

const checkService: CheckService = new CheckService(
  mockLogRepository,
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
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
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
      expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
        expect.any(LogEntity)
      );
    });
});
