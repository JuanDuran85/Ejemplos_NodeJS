import { BcryptAdapter, JwtGeneratorAdapter } from "../../config";
import { UserModel } from "../../data";
import {
  CustomErrors,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from "../../domain";

export class AuthServices {
  constructor(private readonly jwtGeneratorAdapter: JwtGeneratorAdapter) {}
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

  public async loginUser(loginUserDto: LoginUserDto): Promise<{
    user: Partial<UserEntity>;
    token: unknown;
  }> {
    const message: string =
      "Something when wrong. Please check your email and password";
    const userFound = await UserModel.findOne({ email: loginUserDto.email });

    if (!userFound) throw CustomErrors.badRequest(message);

    if (!BcryptAdapter.compare(loginUserDto.password, userFound.password))
      throw CustomErrors.unauthorizedRequest(message);

    const { password, ...restUser } = UserEntity.fromObject(userFound);

    const token: unknown = await this.jwtGeneratorAdapter.generateToken({
      id: restUser.id,
      email: restUser.email,
    });
    if (!token)
      throw CustomErrors.internalServerErrorRequest("Error generating token");

    return {
      user: restUser,
      token,
    };
  }
}
