import { UserModel } from "../../data";
import { CustomErrors, RegisterUserDto } from "../../domain";

export class AuthServices {
  public async registerUser(registerUserDto: RegisterUserDto) {
    const existUser = await UserModel.findOne({ email: registerUserDto.email });
    if (existUser) throw CustomErrors.badRequest("Email already exists");

    return "OK";
  }
}
