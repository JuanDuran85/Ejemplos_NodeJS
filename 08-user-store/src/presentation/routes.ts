import { Router } from "express";
import { AuthRoutes } from "./auth";

export class AppRoutes {
  static get routes(): Router {
    const router: Router = Router();
    router.use("/api/auth", AuthRoutes.routes);
    return router;
  }
}
