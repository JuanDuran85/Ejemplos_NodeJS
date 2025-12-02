import { TodoEntity } from "../../entities";
import { TodoRepository } from "../../repositories";

export interface DeleteTodoUseCase {
  execute(id: number): Promise<TodoEntity>;
}

export class DeleteTodo implements DeleteTodoUseCase {
  private readonly repository: TodoRepository;

  constructor(repositoryIn: TodoRepository) {
    this.repository = repositoryIn;
  }
  public execute(id: number): Promise<TodoEntity> {
    return this.repository.deleteById(id);
  }
}
