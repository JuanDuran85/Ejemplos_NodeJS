import { TodoEntity } from "../../entities";
import { TodoRepository } from "../../repositories";

export interface GetTodoUseCase {
  execute(): Promise<TodoEntity[]>;
}

export class GetTodos implements GetTodoUseCase {
  private readonly repository: TodoRepository;

  constructor(repositoryIn: TodoRepository) {
    this.repository = repositoryIn;
  }
  public execute(): Promise<TodoEntity[]> {
    return this.repository.getAll();
  }
}
