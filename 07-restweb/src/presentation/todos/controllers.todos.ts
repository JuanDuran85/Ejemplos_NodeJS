import { Request, Response } from "express";
import {
  CreateTodo,
  CreateTodoDto,
  DeleteTodo,
  GetByIdTodo,
  GetTodos,
  TodoEntity,
  TodoRepository,
  UpdateTodo,
  UpdateTodoDto,
} from "../../domain";

// This code needs to be refactored to add validation and logic, this is only a demo or basic implementation with not specific propose
export class TodosController {
  private readonly todoRepository: TodoRepository;

  constructor(todoRepositoryIn: TodoRepository) {
    this.todoRepository = todoRepositoryIn;
  }

  public getTodos = (req: Request, res: Response): void => {
    new GetTodos(this.todoRepository)
      .execute()
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({ error: String(error) }));
  };

  public getTodosById = (req: Request, res: Response): void => {
    const id: number | string = Number(req.params?.id);

    new GetByIdTodo(this.todoRepository)
      .execute(id)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({ error: String(error) }));
  };

  public createTodo = (
    req: Request,
    res: Response
  ): Response<any, Record<string, any>> | undefined => {
    const [error, createTodoDto] = CreateTodoDto.createTodo(req.body);

    if (error) return res.status(400).json({ error });

    new CreateTodo(this.todoRepository)
      .execute(createTodoDto!)
      .then((todo) => res.status(201).json(todo))
      .catch((error) => res.status(400).json({ error: String(error) }));
  };

  public updateTodo = (
    req: Request,
    res: Response
  ): Response<any, Record<string, any>> | undefined => {
    let resultTodo: TodoEntity;
    const id: number = Number(req.params?.id);
    const [error, updateTodoDto] = UpdateTodoDto.updateTodo({
      ...req.body,
      id,
    });

    if (error) return res.status(400).json({ error });

    new UpdateTodo(this.todoRepository)
      .execute(updateTodoDto!)
      .then((todo) => res.status(200).json(todo))
      .catch((error) => res.status(400).json({ error: String(error) }));
  };

  public deleteTodo = (
    req: Request,
    res: Response
  ): Response<unknown, Record<string, unknown>> | undefined => {
    let todoFound: TodoEntity;
    const id: number = Number(req.params?.id);
    if (Number.isNaN(id))
      return res.status(400).json({ error: "Invalid Id. It must be a number" });

    new DeleteTodo(this.todoRepository)
      .execute(id)
      .then((todo) => res.status(201).json(todo))
      .catch((error) => res.status(400).json({ error: String(error) }));
  };
}
