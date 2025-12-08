import { Router } from "express";
import { ProductController } from "./controller.products";
import { AuthMiddleware } from "../middlewares";
import { ProductsService } from "../services";

export class ProductRoutes {
  public static get routes(): Router {
    const router: Router = Router();
    const productService: ProductsService = new ProductsService();
    const productController: ProductController = new ProductController(
      productService
    );
    router.get("/", productController.getAllProducts);
    router.post(
      "/",
      [AuthMiddleware.validateJwt],
      productController.createProduct
    );
    return router;
  }
}
