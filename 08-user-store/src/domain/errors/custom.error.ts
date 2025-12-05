export class CustomErrors extends Error {
  private constructor(
    public readonly statusCode: number,
    public readonly message: string
  ) {
    super(message);
  }

  public static badRequest(message: string): CustomErrors {
    return new CustomErrors(400, message);
  }

  public static unauthorizedRequest(message: string): CustomErrors {
    return new CustomErrors(401, message);
  }

  public static forbiddenRequest(message: string): CustomErrors {
    return new CustomErrors(403, message);
  }

  public static notFoundRequest(message: string): CustomErrors {
    return new CustomErrors(404, message);
  }

  public static internalServerErrorRequest(message: string): CustomErrors {
    return new CustomErrors(500, message);
  }
}
