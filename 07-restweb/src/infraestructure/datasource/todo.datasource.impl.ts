import { prisma } from "../../data";
import {
  CreateTodoDto,
  TodoDatasource,
  TodoEntity,
  UpdateTodoDto,
} from "../../domain";

export class TodoDatasourceImpl implements TodoDatasource {
  public create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    throw new Error("Method not implemented.");
  }
  public async getAll(): Promise<TodoEntity[]> {
    const todosFound = await prisma.todo.findMany();

    return todosFound.map((todo) => TodoEntity.fromObject(todo));
  }
  public findById(id: number): Promise<TodoEntity | null> {
    throw new Error("Method not implemented.");
  }
  public updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    throw new Error("Method not implemented.");
  }
  public deleteById(id: number): Promise<TodoEntity> {
    throw new Error("Method not implemented.");
  }
}
