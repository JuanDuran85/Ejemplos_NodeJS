import { NextFunction, Request, Response } from "express";
import { FileArray } from "express-fileupload";

export class FileUploadMiddleware {
  public static containFiles(req: Request, res: Response, next: NextFunction) {
    const files: FileArray | null | undefined = req.files;

    if (!req.body) {
      req.body = {};
    }

    if (!files || Object.keys(files).length === 0) {
      return res.status(400).json({ error: "No files were uploaded" });
    }

    if (Array.isArray(files.file)) {
      req.body["files"] = files.file;
    } else {
      req.body["files"] = [files.file];
    }

    next();
  }
}
