import { CreateTodoDto, TodoDatasource, TodoEntity } from "../../domain";
import { UpdateTodoDto } from "../../domain/dtos";

export class TodoDatasourceImpl implements TodoDatasource {
  public create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    throw new Error("Method not implemented.");
  }
  public getAll(): Promise<TodoEntity[]> {
    throw new Error("Method not implemented.");
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
