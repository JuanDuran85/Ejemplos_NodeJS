import { Router } from "express";
import { CategoryController } from "./controller.category";

export class CategoryRoutes {
  static get routes(): Router {
    const router: Router = Router();
    const categoryController: CategoryController = new CategoryController();
    router.get("/", categoryController.getCategory);
    router.post("/", categoryController.createCategory);
    return router;
  }
}
