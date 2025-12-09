import { UploadedFile } from "express-fileupload";
import path from "node:path";
import * as fs from "node:fs";
import { CustomErrors } from "../../../domain";
import { UuidAdapter } from "../../../config";

// create an express file upload adapter

export class FileUploadService {
  constructor(private readonly uuidAdapter: UuidAdapter) {}

  private checkFolder(folderPath: string) {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
  }

  public async uploadSingle(
    file: UploadedFile,
    folder: string = "uploads",
    validExtensions: string[] = ["png", "jpg", "jpeg", "gif"]
  ): Promise<{
    fileName: string;
  }> {
    try {
      const fileExtension: string = file.mimetype.split("/").at(1) || "";

      if (!validExtensions.includes(fileExtension))
        throw CustomErrors.badRequest(
          `Invalid extension ${fileExtension}. Valid extensions: ${validExtensions.join(
            ", "
          )}`
        );

      const destination: string = path.resolve(
        __dirname,
        "../../../../",
        folder
      );
      this.checkFolder(destination);
      const fileName: string = `${this.uuidAdapter.v4()}.${fileExtension}`;
      file.mv(`${destination}/${fileName}`);
      return { fileName };
    } catch (error) {
      console.error(String(error));
      throw error;
    }
  }

  public uploadMultiple(
    file: [UploadedFile],
    folder: string = "uploads",
    validExtensions: string[] = ["png", "jpg", "jpeg", "gif"]
  ) {
    console.debug("uploadMultipleFiles");
  }
}
