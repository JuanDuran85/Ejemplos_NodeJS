import { Router } from "express";
import { envs } from "../../config";
import { AuthMiddleware } from "../middlewares";
import { CategoryController } from "./controller.category";
import { CategoryService } from "../services";

const totalEnvs: { [key: string]: string | number | boolean } = envs;
export class CategoryRoutes {
  public static get routes(): Router {
    const router: Router = Router();
    const categoryService: CategoryService = new CategoryService();
    const categoryController: CategoryController = new CategoryController(
      categoryService
    );
    router.get("/", categoryController.getCategory);
    router.post(
      "/",
      [AuthMiddleware.validateJwt],
      categoryController.createCategory
    );
    return router;
  }
}
