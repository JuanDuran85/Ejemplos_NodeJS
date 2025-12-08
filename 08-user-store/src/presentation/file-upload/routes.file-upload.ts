import { Router } from "express";
import { envs } from "../../config";
import { FileUploadService } from "../services";
import { FileUploadController } from "./controller.file-upload";

const totalEnvs: { [key: string]: string | number | boolean } = envs;
export class FileUploadRoutes {
  public static get routes(): Router {
    const router: Router = Router();
    const fileUploadService: FileUploadService = new FileUploadService();
    const fileUploadController: FileUploadController = new FileUploadController(
      fileUploadService
    );
    router.post("/single/:type", fileUploadController.uploadFile);
    router.post("/multiple/:type", fileUploadController.uploadMultipleFiles);
    return router;
  }
}
