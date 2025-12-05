import { Router } from "express";
import { AuthController } from "./controller.auth";

export class AuthRoutes {
  static get routes(): Router {
    const router: Router = Router();
    const authController: AuthController = new AuthController();

    router.post("/login", authController.login);
    router.post("/register", authController.register);
    router.get("/validate-email/:token", authController.validateEmail);
    return router;
  }
}
