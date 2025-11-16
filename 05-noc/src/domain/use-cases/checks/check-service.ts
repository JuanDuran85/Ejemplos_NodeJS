interface CheckServiceUserCase {
  execute(url: string): Promise<boolean>;
}

export class CheckService implements CheckServiceUserCase {
  public async execute(url: string): Promise<boolean> {
    try {
      const reqResponse: Response = await fetch(url);
      if (reqResponse.status !== 200 || !reqResponse.ok) {
        throw new Error(`Error: ${reqResponse.status}, on service: ${url}`);
      }
      console.debug(`${url} is ok...`);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
