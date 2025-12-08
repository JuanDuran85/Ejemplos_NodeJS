import { Router } from "express";
import { AuthRoutes } from "./auth";
import { CategoryRoutes } from "./category";
import { FileUploadRoutes } from "./file-upload";
import { ProductRoutes } from "./products";

export class AppRoutes {
  static get routes(): Router {
    const router: Router = Router();
    router.use("/api/auth", AuthRoutes.routes);
    router.use("/api/categories", CategoryRoutes.routes);
    router.use("/api/products", ProductRoutes.routes);
    router.use("/api/upload", FileUploadRoutes.routes);

    return router;
  }
}
