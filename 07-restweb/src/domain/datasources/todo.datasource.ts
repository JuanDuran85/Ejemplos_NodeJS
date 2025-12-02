import { CreateTodoDto, UpdateTodoDto } from "../dtos";
import { TodoEntity } from "../entities";

export abstract class TodoDatasource {
  public abstract create(createTodoDto: CreateTodoDto): Promise<TodoEntity>;
  public abstract getAll(): Promise<TodoEntity[]>;
  public abstract findById(id: number): Promise<TodoEntity | null>;
  public abstract updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity>;
  public abstract deleteById(id: number): Promise<TodoEntity>;
}
