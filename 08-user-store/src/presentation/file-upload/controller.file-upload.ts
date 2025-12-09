import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { HandleError } from "../../domain";
import { FileUploadService } from "../services";

export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  public uploadFile: (req: Request, res: Response) => Promise<void> = async (
    req: Request,
    res: Response
  ) => {
    const file = req.body.files.at(0) as UploadedFile;
    this.fileUploadService
      .uploadSingle(file, `uploads/${req.body.type}`)
      .then((uploaded) => res.json(uploaded))
      .catch((error) => HandleError.handleError(error, res));
  };

  public uploadMultipleFiles = async (req: Request, res: Response) => {
    res.json({ msg: "uploadMultipleFiles" });
  };
}
