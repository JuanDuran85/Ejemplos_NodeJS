import { Request, Response } from "express";
import {
  CreateTodoDto,
  TodoEntity,
  TodoRepository,
  UpdateTodoDto,
} from "../../domain";

// This code needs to be refactored to add validation and logic, this is only a demo or basic implementation with not specific propose
export class TodosController {
  private readonly todoRepository: TodoRepository;

  constructor(todoRepositoryIn: TodoRepository) {
    this.todoRepository = todoRepositoryIn;
  }

  public getTodos = async (
    req: Request,
    res: Response
  ): Promise<Response<unknown, Record<string, unknown>>> => {
    const todosFound: TodoEntity[] = await this.todoRepository.getAll();
    return res.json(todosFound);
  };

  public getTodosById: (req: Request, res: Response) => void = async (
    req: Request,
    res: Response
  ): Promise<Response<unknown, Record<string, unknown>>> => {
    const id: number | string = Number(req.params?.id);
    if (Number.isNaN(id))
      return res.status(400).json({ error: "Invalid Id. It must be a number" });
    try {
      const todoFoundById: TodoEntity | null =
        await this.todoRepository.findById(id);
      return res.json(todoFoundById);
    } catch (error) {
      console.error(String(error));
      return res.status(404).json({ error: `Todo not found with id: ${id}` });
    }
  };

  public createTodo = async (
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined> => {
    const [error, createTodoDto] = CreateTodoDto.createTodo(req.body);

    if (error) return res.status(400).json({ error });

    const newTodo: TodoEntity = await this.todoRepository.create(
      createTodoDto!
    );
    res.status(201).json(newTodo);
  };

  public updateTodo = async (
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined> => {
    let resultTodo: TodoEntity;
    const id: number = Number(req.params?.id);
    const [error, updateTodoDto] = UpdateTodoDto.updateTodo({
      ...req.body,
      id,
    });

    if (error) return res.status(400).json({ error });

    try {
      resultTodo = await this.todoRepository.updateById(updateTodoDto!);
    } catch (error) {
      return res.status(404).json({ error });
    }
    return res.json(resultTodo);
  };

  public deleteTodo = async (
    req: Request,
    res: Response
  ): Promise<Response<unknown, Record<string, unknown>> | undefined> => {
    let todoFound: TodoEntity;
    const id: number = Number(req.params?.id);
    if (Number.isNaN(id))
      return res.status(400).json({ error: "Invalid Id. It must be a number" });

    try {
      todoFound = await this.todoRepository.deleteById(id);
    } catch (error) {
      console.debug(String(error));
      return res.status(404).json({ error: `Todo not found with id: ${id}` });
    }
    return res.json(todoFound);
  };
}
