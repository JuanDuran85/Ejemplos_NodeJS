interface CheckServiceUserCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUserCase {
  constructor(
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  public async execute(url: string): Promise<boolean> {
    try {
      const reqResponse: Response = await fetch(url);
      if (reqResponse.status !== 200 || !reqResponse.ok) {
        throw new Error(`Error: ${reqResponse.status}, on service: ${url}`);
      }
      this.successCallback();
      return true;
    } catch (error) {
      this.errorCallback(`${error}`);
      return false;
    }
  }
}
