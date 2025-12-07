import { Response } from "express";
import { CustomErrors } from "./custom.error";

export class HandleError {
  public static handleError(error: unknown, res: Response) {
    if (error instanceof CustomErrors) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error(String(error));
    return res.status(500).json({ error: "Internal server error" });
  }
}
