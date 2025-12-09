import { NextFunction, Request, Response } from "express";

export class ValidateTypesMiddleware {
  public static validateTypes(checkTypes: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      const type: string = req.url.split("/").at(2) || "";

      if (!req.body) {
        req.body = {};
      }

      if (!checkTypes.includes(type)) {
        return res.status(400).json({
          error: `Invalid type ${type}. Valid types: ${checkTypes.join(", ")}`,
        });
      }

      req.body.type = type;

      next();
    };
  }
}
