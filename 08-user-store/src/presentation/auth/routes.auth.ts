import { Router } from "express";
import { AuthController } from "./controller.auth";
import { AuthServices } from "../services";
import { envs } from "../../config";

const jwtSeed: string = envs.JWT_SEED;

export class AuthRoutes {
  static get routes(): Router {
    const router: Router = Router();
    const authService: AuthServices = new AuthServices(jwtSeed);
    const authController: AuthController = new AuthController(authService);

    router.post("/login", authController.login);
    router.post("/register", authController.register);
    router.get("/validate-email/:token", authController.validateEmail);
    return router;
  }
}
