import { Request, Response } from "express";

export class AuthController {
  public register: (req: Request, res: Response) => void = (
    req: Request,
    res: Response
  ): void => {
    res.json("register");
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
