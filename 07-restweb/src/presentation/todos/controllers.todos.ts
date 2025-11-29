import { Request, Response } from "express";

type Todo = {
  id: number;
  task: string;
  completed: boolean;
};

const todosToUse: Todo[] = [
  { id: 1, task: "Learn TypeScript", completed: false },
  { id: 2, task: "Build a REST API", completed: true },
  { id: 3, task: "Write Unit Tests", completed: false },
];

export class TodosController {
  public getTodos = (
    req: Request,
    res: Response
  ): Response<unknown, Record<string, unknown>> => {
    return res.json(todosToUse);
  };

  public getTodosById: (req: Request, res: Response) => void = (
    req: Request,
    res: Response
  ): Response<unknown, Record<string, unknown>> => {
    const id: number | string = Number(req.params?.id);
    if (Number.isNaN(id))
      return res.status(400).json({ error: "Invalid Id. It must be a number" });

    const todoFound: Todo | undefined = todosToUse.find(
      (todo: Todo) => todo.id === id
    );
    return todoFound
      ? res.json(todoFound)
      : res.status(404).json({ error: `Todo not found with id: ${id}` });
  };

  public createTodo = (req: Request, res: Response) => {
    const body = req.body;
    res.json(body);
  };
}
