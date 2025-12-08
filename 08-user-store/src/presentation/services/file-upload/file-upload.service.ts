import { UploadedFile } from "express-fileupload";
import path from "node:path";
import * as fs from "node:fs";
import { CustomErrors } from "../../../domain";

export class FileUploadService {
  private checkFolder(folderPath: string) {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
  }

  public async uploadSingle(
    file: UploadedFile,
    folder: string = "uploads",
    validExtensions: string[] = ["png", "jpg", "jpeg", "gif"]
  ) {
    try {
      const fileExtension: string = file.mimetype.split("/").at(1) || "";
      const destination: string = path.resolve(
        __dirname,
        "../../../../",
        folder
      );
      this.checkFolder(destination);

      file.mv(`${destination}/image-${file.name}.${fileExtension}`)
      console.debug(`${destination}/image-${file.name}.${fileExtension}`);
    } catch (error) {
      console.error(String(error));
      throw CustomErrors.internalServerErrorRequest("Error uploading file");
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
