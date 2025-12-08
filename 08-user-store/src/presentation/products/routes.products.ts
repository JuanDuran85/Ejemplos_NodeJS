import { Router } from "express";
import { ProductController } from "./controller.products";
import { AuthMiddleware } from "../middlewares";

export class ProductRoutes {
  public static get routes(): Router {
    const router: Router = Router();
    const productController: ProductController = new ProductController();
    router.get("/", productController.getAllProducts);
    router.post(
      "/",
      [AuthMiddleware.validateJwt],
      productController.createProduct
    );
    return router;
  }
}
