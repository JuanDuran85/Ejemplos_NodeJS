import { Router } from "express";
import { TodosController } from "./controllers.todos";
import { TodoDatasourceImpl, TodoRepositoryImpl } from "../../infrastructure";

export class TodosRoutes {
  public static get routes(): Router {
    const router: Router = Router();
    const datasource: TodoDatasourceImpl = new TodoDatasourceImpl();
    const todoRepository: TodoRepositoryImpl = new TodoRepositoryImpl(
      datasource
    );
    const todoController: TodosController = new TodosController(todoRepository);
    router.get("/", todoController.getTodos);
    router.get("/:id", todoController.getTodosById);
    router.post("/", todoController.createTodo);
    router.put("/:id", todoController.updateTodo);
    router.delete("/:id", todoController.deleteTodo);

    return router;
  }
}
