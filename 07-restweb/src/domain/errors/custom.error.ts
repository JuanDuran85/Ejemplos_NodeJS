export class CustomError extends Error {
  public readonly message: string;
  public readonly statusCode: number = 400;

  constructor(messageIn: string, statusCodeIn?: number) {
    super(messageIn);
    this.message = messageIn;

    if (statusCodeIn) {
      this.statusCode = statusCodeIn;
    }
  }
}
