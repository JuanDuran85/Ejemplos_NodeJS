import { Request, Response } from "express";

export class FileUploadController {
  public uploadFile = async (req: Request, res: Response) => {
    res.json({ msg: "uploadFile" });
  };

  public uploadMultipleFiles = async (req: Request, res: Response) => {
    res.json({ msg: "uploadMultipleFiles" });
  };
}
