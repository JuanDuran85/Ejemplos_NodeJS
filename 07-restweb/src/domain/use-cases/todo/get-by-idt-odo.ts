import { TodoEntity } from "../../entities";
import { TodoRepository } from "../../repositories";

export interface GetByIdTodoUseCase {
  execute(id: number): Promise<TodoEntity | null>;
}

export class GetByIdTodo implements GetByIdTodoUseCase {
  private readonly repository: TodoRepository;

  constructor(repositoryIn: TodoRepository) {
    this.repository = repositoryIn;
  }
  public execute(id: number): Promise<TodoEntity | null> {
    return this.repository.findById(id);
  }
}
