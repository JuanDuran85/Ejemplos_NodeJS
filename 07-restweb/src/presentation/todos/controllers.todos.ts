import { Request, Response } from "express";

type Todo = {
  id: number;
  task: string;
  completed: boolean;
  completedAt: Date | null;
};

const todosToUse: Todo[] = [
  { id: 1, task: "Learn TypeScript", completed: false, completedAt: null },
  { id: 2, task: "Build a REST API", completed: true, completedAt: null },
  { id: 3, task: "Write Unit Tests", completed: false, completedAt: null },
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
    const {
      completed = false,
      task,
      completedAt = null,
    } = req.body as unknown as Todo;

    if (!task) return res.status(400).json({ error: "Task is required" });
    const newTodo: Todo = {
      id: todosToUse.length + 1,
      task,
      completed,
      completedAt,
    };

    todosToUse.push(newTodo);
    res.json(newTodo);
  };

  public updateTodo = (req: Request, res: Response) => {
    const id: number = Number(req.params?.id);

    if (Number.isNaN(id))
      return res.status(400).json({ error: "Invalid Id. It must be a number" });

    const todoFound: Todo | undefined = todosToUse.find(
      (todo: Todo) => todo.id === id
    );
    if (!todoFound)
      return res.status(404).json({ error: `Todo not found with id: ${id}` });

    const { completed, task, completedAt } = req.body as unknown as Todo;

    todoFound.task = task ?? todoFound.task;
    todoFound.completed = completed ?? todoFound.completed;
    completedAt === null
      ? (todoFound.completedAt = null)
      : (todoFound.completedAt = new Date(
          completedAt ?? todoFound.completedAt
        ));

    res.json(todoFound);
  };

  public deleteTodo = (req: Request, res: Response) => {
    const id: number = Number(req.params?.id);
    if (Number.isNaN(id))
      return res.status(400).json({ error: "Invalid Id. It must be a number" });

    const todoFound: Todo | undefined = todosToUse.find(
      (todo: Todo) => todo.id === id
    );
    if (!todoFound)
      return res.status(404).json({ error: `Todo not found with id: ${id}` });

    const indexToDelete: number = todosToUse.indexOf(todoFound);
    todosToUse.splice(indexToDelete, 1);
    res.json(todoFound);
  };
}
