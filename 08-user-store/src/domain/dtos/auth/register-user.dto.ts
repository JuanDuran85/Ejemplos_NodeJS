import { regularExps } from "../../../utilities";

export class RegisterUserDto {
  private constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string
  ) {}

  public static createUser(object: {
    [key: string]: any;
  }): [string?, RegisterUserDto?] {
    const {
      name = undefined,
      email = undefined,
      password = undefined,
    } = object || {};

    if (!name) return ["Missing name"];
    if (!email || !regularExps.email.test(email))
      return ["Missing or wrong email. Please check your email"];
    if (!password || password?.length < 5 ||!regularExps.password.test(password))
      return ["Missing or Invalid password"];

    return [undefined, new RegisterUserDto(name, email, password)];
  }
}
