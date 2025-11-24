import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceMultipleUserCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

const nameFile: string = "check-service";

export class CheckServiceMultiple implements CheckServiceMultipleUserCase {
  private readonly logRepository: LogRepository[];
  private readonly successCallback: SuccessCallback | undefined;
  private readonly errorCallback: ErrorCallback | undefined;

  constructor(
    logRepository: LogRepository[],
    successCallback: SuccessCallback,
    errorCallback: ErrorCallback
  ) {
    this.logRepository = logRepository;
    this.successCallback = successCallback;
    this.errorCallback = errorCallback;
  }

  private callLogsRepositories(log: LogEntity): void {
    this.logRepository.forEach((logRepository) => {
      logRepository.saveLog(log);
    });
  }

  public async execute(url: string): Promise<boolean> {
    try {
      const reqResponse: Response = await fetch(url);
      if (reqResponse.status !== 200 || !reqResponse.ok) {
        throw new Error(`Error: ${reqResponse.status}, on service: ${url}`);
      }
      const logToSave: LogEntity = new LogEntity({
        level: LogSeverityLevel.LOW,
        message: `Service ${url} is working`,
        origin: nameFile,
      });
      this.callLogsRepositories(logToSave);
      this.successCallback?.();
      return true;
    } catch (error) {
      const errorMessage: string = `${url} is not Ok. Error: ${error}. Please check.`;
      const logToSave: LogEntity = new LogEntity({
        level: LogSeverityLevel.ERROR,
        message: errorMessage,
        origin: nameFile,
      });
      this.callLogsRepositories(logToSave);
      this.errorCallback?.(errorMessage);
      return false;
    }
  }
}
