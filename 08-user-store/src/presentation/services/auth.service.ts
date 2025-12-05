import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomErrors, RegisterUserDto, UserEntity } from "../../domain";

export class AuthServices {
  public async registerUser(registerUserDto: RegisterUserDto): Promise<{
    user: Partial<UserEntity>;
    token: string;
  }> {
    const existUser = await UserModel.findOne({ email: registerUserDto.email });
    if (existUser) throw CustomErrors.badRequest("Email already exists");

    try {
      const user = new UserModel(registerUserDto);
      user.password = BcryptAdapter.hash(registerUserDto.password);

      await user.save();
      //jwt

      // email confirmation

      const { password, ...restUserEntity } = UserEntity.fromObject(user);

      return {
        user: restUserEntity,
        token: "ABCD",
      };
    } catch (error) {
      console.debug(String(error));
      throw CustomErrors.internalServerErrorRequest(`${error}`);
    }
  }
}
