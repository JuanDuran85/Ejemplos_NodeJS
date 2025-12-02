import { CreateTodoDto } from "../../dtos";
import { TodoEntity } from "../../entities";
import { TodoRepository } from "../../repositories";

export interface CreateTodoUseCase {
  execute(createDto: CreateTodoDto): Promise<TodoEntity>;
}

export class CreateTodo implements CreateTodoUseCase {
  private readonly repository: TodoRepository;

  constructor(repositoryIn: TodoRepository) {
    this.repository = repositoryIn;
  }
  public execute(createDto: CreateTodoDto): Promise<TodoEntity> {
    return this.repository.create(createDto);
  }
}
