import { Router } from "express";
import { AuthController } from "./controller.auth";
import { AuthServices, EmailService } from "../services";
import { envs, JwtGeneratorAdapter } from "../../config";

const jwtSeed: string = envs.JWT_SEED;
const totalEnvs: { [key: string]: string | number } = envs;

export class AuthRoutes {
  static get routes(): Router {
    const router: Router = Router();
    const jwtGeneratorAdapter: JwtGeneratorAdapter = new JwtGeneratorAdapter(
      totalEnvs
    );
    const emailService: EmailService = new EmailService({
      mailerService: String(totalEnvs["EMAIL_SERVICE"] as string),
      mailerEmailName: String(totalEnvs["EMAIL_NAME"]),
      mailerKey: String(totalEnvs["EMAIL_KEY"] as string),
    });
    const authService: AuthServices = new AuthServices(
      emailService,
      jwtGeneratorAdapter,
      totalEnvs
    );
    const authController: AuthController = new AuthController(authService);

    router.post("/login", authController.login);
    router.post("/register", authController.register);
    router.get("/validate-email/:token", authController.validateEmail);
    return router;
  }
}
