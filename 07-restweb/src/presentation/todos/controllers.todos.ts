import { Request, Response } from "express";

const todosToUse = [
  { id: 1, task: "Learn TypeScript", completed: false },
  { id: 2, task: "Build a REST API", completed: true },
  { id: 3, task: "Write Unit Tests", completed: false },
];

export class TodosController {
  public getTodos(
    req: Request,
    res: Response
  ): Response<unknown, Record<string, unknown>> {
    return res.json(todosToUse);
  }

  public getTodosById(
    req: Request,
    res: Response
  ): Response<unknown, Record<string, unknown>> {
    const id = Number(req.params?.id);
    const todoFound = todosToUse.find((todo) => todo.id === id);
    return res.json(todoFound);
  }
}
