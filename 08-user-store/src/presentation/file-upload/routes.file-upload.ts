import { Router } from "express";
import { envs, UuidAdapter } from "../../config";
import { FileUploadService } from "../services";
import { FileUploadController } from "./controller.file-upload";
import { FileUploadMiddleware, ValidateTypesMiddleware } from "../middlewares";

const totalEnvs: { [key: string]: string | number | boolean } = envs;
export class FileUploadRoutes {
  public static get routes(): Router {
    const router: Router = Router();
    const uuidAdapter: UuidAdapter = new UuidAdapter();
    const fileUploadService: FileUploadService = new FileUploadService(
      uuidAdapter
    );
    const fileUploadController: FileUploadController = new FileUploadController(
      fileUploadService
    );

    router.use(FileUploadMiddleware.containFiles);
    router.use(ValidateTypesMiddleware.validateTypes);
    router.post("/single/:type", fileUploadController.uploadFile);
    router.post("/multiple/:type", fileUploadController.uploadMultipleFiles);
    return router;
  }
}
