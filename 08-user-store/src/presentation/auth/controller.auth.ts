import { Request, Response } from "express";
import { HandleError, LoginUserDto, RegisterUserDto } from "../../domain";
import { AuthServices } from "../services";

export class AuthController {
  constructor(public readonly authServices: AuthServices) {}

  public register: (
    req: Request,
    res: Response
  ) => Response<unknown, Record<string, unknown>> | undefined = (
    req: Request,
    res: Response
  ): Response<unknown, Record<string, unknown>> | undefined => {
    const [error, registerUserDto] = RegisterUserDto.createUser(req.body);

    if (error) return res.status(400).json({ error });
    this.authServices
      .registerUser(registerUserDto!)
      .then((user) => res.json(user))
      .catch((error) => HandleError.handleError(error, res));
  };

  public login: (
    req: Request,
    res: Response
  ) => Response<any, Record<string, any>> | undefined = (
    req: Request,
    res: Response
  ): Response<unknown, Record<string, unknown>> | undefined => {
    const [error, loginUserDto] = LoginUserDto.loginUser(req.body);
    if (error) return res.status(400).json({ error });

    this.authServices
      .loginUser(loginUserDto!)
      .then((user) => res.json(user))
      .catch((error) => HandleError.handleError(error, res));
  };

  public validateEmail: (req: Request, res: Response) => void = (
    req: Request,
    res: Response
  ) => {
    const { token } = req.params;
    this.authServices
      .validateEmail(token)
      .then(() => {
        res.json("Email was Validated properly");
      })
      .catch((error) => HandleError.handleError(error, res));
  };
}
