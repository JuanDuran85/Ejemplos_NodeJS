import { Request, Response } from "express";

export class AuthController {
  constructor() {}

  public register = (req: Request, res: Response): void => {
    res.json("register");
  };

  public login = (req: Request, res: Response): void => {
    res.json("login");
  };

  public validateEmail = (req: Request, res: Response): void => {
    res.json("validate-email");
  };
}
