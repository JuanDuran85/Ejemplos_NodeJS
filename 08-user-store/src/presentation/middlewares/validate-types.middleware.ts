import { NextFunction, Request, Response } from "express";

export class ValidateTypesMiddleware {
  public static validateTypes(req: Request, res: Response, next: NextFunction) {    
    const type: string = req.url.split("/").at(2) || "";
    const validTypes: string[] = ["users", "products", "categories"];
    
    if (!req.body) {
      req.body = {};
    }

    console.debug({type});

    if (!validTypes.includes(type)) {
      return res.status(400).json({
        error: `Invalid type ${type}. Valid types: ${validTypes.join(", ")}`,
      });
    }

    req.body.type = type;

    next();
  }
}
