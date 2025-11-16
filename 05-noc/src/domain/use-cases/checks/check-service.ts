import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUserCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUserCase {
  private readonly logRepository: LogRepository;
  private readonly successCallback: SuccessCallback;
  private readonly errorCallback: ErrorCallback;

  constructor(
    logRepository: LogRepository,
    successCallback: SuccessCallback,
    errorCallback: ErrorCallback
  ) {
    this.logRepository = logRepository;
    this.successCallback = successCallback;
    this.errorCallback = errorCallback;
  }

  public async execute(url: string): Promise<boolean> {
    try {
      const reqResponse: Response = await fetch(url);
      if (reqResponse.status !== 200 || !reqResponse.ok) {
        throw new Error(`Error: ${reqResponse.status}, on service: ${url}`);
      }
      const logToSave: LogEntity = new LogEntity(
        LogSeverityLevel.LOW,
        `Service ${url} is working`
      );
      this.logRepository.saveLog(logToSave);
      this.successCallback();
      return true;
    } catch (error) {
      const errorMessage = `${error}`;
      const logToSave = new LogEntity(LogSeverityLevel.ERROR, errorMessage);
      this.logRepository.saveLog(logToSave);
      this.errorCallback(errorMessage);
      return false;
    }
  }
}
