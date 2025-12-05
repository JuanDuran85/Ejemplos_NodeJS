import { regularExps } from "../../../utilities";

export class RegisterUserDto {
  private constructor(
    private readonly name: string,
    private readonly email: string,
    private readonly password: string
  ) {}

  public static createUser(object: {
    [key: string]: any;
  }): [string?, RegisterUserDto?] {
    const { name, email, password } = object;

    if (!name) return ["Missing name"];
    if (!email || regularExps.email.test(email))
      return ["Missing or wrong email. Please check your email"];
    if (!password) return ["Missing password"];

    return [undefined, new RegisterUserDto(name, email, password)];
  }
}
