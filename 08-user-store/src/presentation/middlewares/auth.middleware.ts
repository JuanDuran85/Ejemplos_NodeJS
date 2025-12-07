import { NextFunction, Request, Response } from "express";

import { envs, JwtGeneratorAdapter } from "../../config";
import { UserModel } from "../../data";
import { UserEntity } from "../../domain";

export class AuthMiddleware {
  public static async validateJwt(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const authorization: string | undefined = req.header("Authorization");
    if (!authorization)
      return res.status(401).json({ error: "No token provided" });
    if (!authorization.startsWith("Bearer "))
      return res.status(401).json({ error: "Invalid Bearer token" });

    const token: string = authorization.split(" ").at(1) || "";
    try {
      const payload = await new JwtGeneratorAdapter(envs).validateToken<{
        properties: {
          email: string;
          id: string;
        };
      }>(token);
      if (!payload) return res.status(401).json({ error: "Invalid token" });

      const user = await UserModel.findById(payload?.properties?.id);
      if (!user)
        return res.status(401).json({ error: "Invalid token - User wrong" });
      if (!user.emailValidated)
        return res
          .status(401)
          .json({ error: "Invalid token - Email not validated" });

      req.body.user = UserEntity.fromObject(user);
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
