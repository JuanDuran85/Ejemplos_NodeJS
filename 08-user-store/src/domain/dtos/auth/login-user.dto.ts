import { regularExps } from "../../../utilities";

export class LoginUserDto {
  private constructor(
    public email: string,
    public password: string
  ) {}

  public static loginUser(object: {
    [key: string]: any;
  }): [string?, LoginUserDto?] {
    const { email, password } = object || {};

    if (!email || !password || !regularExps.email.test(email))
      return ["Missing name, email or password"];
    return [undefined, new LoginUserDto(email, password)];
  }
}
