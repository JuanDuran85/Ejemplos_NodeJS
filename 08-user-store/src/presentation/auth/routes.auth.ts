import { Router } from "express";
import { AuthController } from "./controller.auth";
import { AuthServices } from "../services";

export class AuthRoutes {
  static get routes(): Router {
    const router: Router = Router();
    const authService: AuthServices = new AuthServices();
    const authController: AuthController = new AuthController(authService);

    router.post("/login", authController.login);
    router.post("/register", authController.register);
    router.get("/validate-email/:token", authController.validateEmail);
    return router;
  }
}
