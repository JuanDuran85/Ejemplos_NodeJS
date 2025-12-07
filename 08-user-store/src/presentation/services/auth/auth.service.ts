import { BcryptAdapter, JwtGeneratorAdapter } from "../../../config";
import { UserModel } from "../../../data";
import {
  CustomErrors,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from "../../../domain";
import { EmailService } from "../email";

export class AuthServices {
  constructor(
    private readonly emailService: EmailService,
    private readonly jwtGeneratorAdapter: JwtGeneratorAdapter,
    private readonly totalEnvs: { [key: string]: string | number }
  ) {}

  private async generateTokenByOneProperty(property: string): Promise<string> {
    return (await this.jwtGeneratorAdapter.generateToken({
      property,
    })) as string;
  }

  private async sendEmailValidationLink(email: string): Promise<boolean> {
    const token: string = await this.generateTokenByOneProperty(email);
    if (!token)
      throw CustomErrors.internalServerErrorRequest("Error generating token");

    const link: string = `${this.totalEnvs["WEB_SERVICE_URL"]}/api/auth/validate-email/${token}`;
    const html: string = `
      <h1>Validate your email</h1>
      <p>Click on the following link to validate your email</p>
      <a href="${link}">Validate your email: ${email}</a>
    `;

    const options = {
      from: this.totalEnvs["EMAIL_SERVICE"] as string,
      to: email,
      subject: "Validate your email",
      htmlBody: html,
    };
    const isSet: boolean = await this.emailService.sendEmail(options);
    if (!isSet)
      throw CustomErrors.internalServerErrorRequest("Error sending email");

    return true;
  }

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
      await this.sendEmailValidationLink(user.email);
      const { password, ...restUserEntity } = UserEntity.fromObject(user);

      const token: string = await this.generateTokenByOneProperty(user.email);
      if (!token)
        throw CustomErrors.internalServerErrorRequest("Error generating token");

      return {
        user: restUserEntity,
        token,
      };
    } catch (error) {
      console.debug(String(error));
      throw CustomErrors.internalServerErrorRequest(`${error}`);
    }
  }

  public async loginUser(loginUserDto: LoginUserDto): Promise<{
    user: Partial<UserEntity>;
    token: string;
  }> {
    const message: string =
      "Something when wrong. Please check your email and password";
    const userFound = await UserModel.findOne({ email: loginUserDto.email });

    if (!userFound) throw CustomErrors.badRequest(message);

    if (!BcryptAdapter.compare(loginUserDto.password, userFound.password))
      throw CustomErrors.unauthorizedRequest(message);

    const { password, ...restUser } = UserEntity.fromObject(userFound);

    const token: string = await this.generateTokenByOneProperty(
      userFound.email
    );
    if (!token)
      throw CustomErrors.internalServerErrorRequest("Error generating token");

    return {
      user: restUser,
      token,
    };
  }

  public async validateEmail(token: string): Promise<boolean> {
    const payload: unknown = await this.jwtGeneratorAdapter.validateToken(
      token
    );

    if (!payload) {
      throw CustomErrors.unauthorizedRequest("Invalid token");
    }

    const { property: email } = payload as { property: string };
    if (!email)
      throw CustomErrors.internalServerErrorRequest("Email not found");

    const user = await UserModel.findOne({ email });
    if (!user) throw CustomErrors.internalServerErrorRequest("Email not found");

    user.emailValidated = true;
    await user.save();

    return true;
  }
}
