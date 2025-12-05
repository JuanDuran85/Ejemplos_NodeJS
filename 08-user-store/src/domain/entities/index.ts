import { CustomErrors } from "../errors";

export class UserEntity {
  constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly email: string,
    private readonly emailValidated: boolean,
    private readonly password: string,
    private readonly role: string,
    private readonly status: string,
    private readonly img?: string
  ) {}

  public static fromObject(object: { [key: string]: any }): UserEntity {
    const {
      id,
      _id,
      name,
      email,
      emailValidated,
      password,
      role,
      status,
      img = undefined,
    } = object;

    if (!_id && !id) {
      throw CustomErrors.badRequest("Missing id");
    }

    if (!name) throw CustomErrors.badRequest("Missing name");
    if (!email) throw CustomErrors.badRequest("Missing email");
    if (emailValidated === undefined)
      throw CustomErrors.badRequest("Missing emailValidated");
    if (!password) throw CustomErrors.badRequest("Missing password");
    if (!role) throw CustomErrors.badRequest("Missing role");
    if (!status) throw CustomErrors.badRequest("Missing status");

    return new UserEntity(
      _id || id,
      name,
      email,
      emailValidated,
      password,
      role,
      status,
      img
    );
  }
}
