import { Request, Response } from "express";
import { FileUploadService } from "../services";
import { FileArray, UploadedFile } from "express-fileupload";
import { HandleError } from "../../domain";

export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  public uploadFile = async (req: Request, res: Response) => {
    const files: FileArray | null | undefined = req.files;
    if (!files || Object.keys(files).length === 0) {
      return res.status(400).json({ msg: "No files were uploaded" });
    }

    const file = req.files?.file as UploadedFile;
    this.fileUploadService
      .uploadSingle(file)
      .then((uploaded) => res.json(uploaded))
      .catch((error) => HandleError.handleError(error, res));
  };

  public uploadMultipleFiles = async (req: Request, res: Response) => {
    res.json({ msg: "uploadMultipleFiles" });
  };
}
