import { Router } from "express";
import { envs } from "../../config";
import { AuthMiddleware } from "../middlewares";
import { CategoryController } from "./controller.category";

const totalEnvs: { [key: string]: string | number | boolean } = envs;
export class CategoryRoutes {
  static get routes(): Router {
    const router: Router = Router();
    const categoryController: CategoryController = new CategoryController();
    router.get("/", categoryController.getCategory);
    router.post(
      "/",
      [AuthMiddleware.validateJwt],
      categoryController.createCategory
    );
    return router;
  }
}
