import { Router } from "express";
import { TodosController } from "./controllers.todos";

export class TodosRoutes {
  public static get routes(): Router {
    const router: Router = Router();
    const todoController: TodosController = new TodosController();
    router.get("/", todoController.getTodos);
    router.get("/:id", todoController.getTodosById);
    return router;
  }
}
