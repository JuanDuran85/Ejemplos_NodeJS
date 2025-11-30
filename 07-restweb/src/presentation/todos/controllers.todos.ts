import { Request, Response } from "express";
import { prisma } from "../../data";
import { CreateTodoDto } from "../../domain";

type Todo = {
  completed: boolean;
  completedAt: Date | null;
  id: number;
  task: string;
};

// This code needs to be refactored to add validation and logic, this is only a demo or basic implementation with not specific propose
export class TodosController {
  public getTodos = async (
    req: Request,
    res: Response
  ): Promise<Response<unknown, Record<string, unknown>>> => {
    const todosFound: Todo[] = await prisma.todo.findMany();
    return res.json(todosFound);
  };

  public getTodosById: (req: Request, res: Response) => void = async (
    req: Request,
    res: Response
  ): Promise<Response<unknown, Record<string, unknown>>> => {
    const id: number | string = Number(req.params?.id);
    if (Number.isNaN(id))
      return res.status(400).json({ error: "Invalid Id. It must be a number" });

    const todoFound: Todo | null = await prisma.todo.findUnique({
      where: { id: Number(id) },
    });

    return todoFound
      ? res.json(todoFound)
      : res.status(404).json({ error: `Todo not found with id: ${id}` });
  };

  public createTodo = async (
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined> => {
    const [error, createTodoDto] = CreateTodoDto.createTodo(req.body);

    if (error) return res.status(400).json({ error });

    const newTodo: Todo = await prisma.todo.create({
      data: createTodoDto!,
    });

    res.json(newTodo);
  };

  public updateTodo = async (
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined> => {
    let resultTodo: Todo;
    const id: number = Number(req.params?.id);

    if (Number.isNaN(id))
      return res.status(400).json({ error: "Invalid Id. It must be a number" });
    // create all the validations for the fields to update
    try {
      resultTodo = await prisma.todo.update({
        where: { id: Number(id) },
        data: {
          task: req.body.task,
          completed: req.body.completed,
          completedAt: req.body.completedAt,
        },
      });
    } catch (error) {
      console.error(String(error));
      return res.status(404).json({ error: `Todo not found with id: ${id}` });
    }
    res.json(resultTodo);
  };

  public deleteTodo = async (
    req: Request,
    res: Response
  ): Promise<Response<unknown, Record<string, unknown>> | undefined> => {
    let todoFound: Todo;
    const id: number = Number(req.params?.id);
    if (Number.isNaN(id))
      return res.status(400).json({ error: "Invalid Id. It must be a number" });

    try {
      todoFound = await prisma.todo.delete({
        where: { id: Number(id) },
      });
    } catch (error) {
      console.debug(String(error));
      return res.status(404).json({ error: `Todo not found with id: ${id}` });
    }
    return res.json(todoFound);
  };
}
