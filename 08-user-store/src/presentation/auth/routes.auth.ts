import { Router } from "express";
import { AuthController } from "./controller.auth";
import { AuthServices } from "../services";
import { envs, JwtGeneratorAdapter } from "../../config";

const jwtSeed: string = envs.JWT_SEED;

export class AuthRoutes {
  static get routes(): Router {
    const router: Router = Router();
    const jwtGeneratorAdapter: JwtGeneratorAdapter = new JwtGeneratorAdapter(
      jwtSeed
    );
    const authService: AuthServices = new AuthServices(jwtGeneratorAdapter);
    const authController: AuthController = new AuthController(authService);

    router.post("/login", authController.login);
    router.post("/register", authController.register);
    router.get("/validate-email/:token", authController.validateEmail);
    return router;
  }
}
