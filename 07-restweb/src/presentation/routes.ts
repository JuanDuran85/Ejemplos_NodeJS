import { Router } from "express";
import { TodosRoutes } from "./todos";

export class AppRoutes {
  public static get routes(): Router {
    const router: Router = Router();
    router.use("/api/todos", TodosRoutes.routes);
    return router;
  }
}
