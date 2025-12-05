import { Request, Response } from "express";
import { RegisterUserDto } from "../../domain";
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
    console.debug(req.body);
    const [error, registerUserDto] = RegisterUserDto.createUser(req.body);

    if (error) return res.status(400).json({ error });
    this.authServices
      .registerUser(registerUserDto!)
      .then((user) => res.json(user));
  };

  public login: (req: Request, res: Response) => void = (
    req: Request,
    res: Response
  ): void => {
    res.json("login");
  };

  public validateEmail: (req: Request, res: Response) => void = (
    req: Request,
    res: Response
  ): void => {
    res.json("validate-email");
  };
}
