import { UpdateTodoDto } from "../../dtos";
import { TodoEntity } from "../../entities";
import { TodoRepository } from "../../repositories";

export interface UpdateTodoUseCase {
  execute(updateDto: UpdateTodoDto): Promise<TodoEntity>;
}

export class UpdateTodo implements UpdateTodoUseCase {
  private readonly repository: TodoRepository;

  constructor(repositoryIn: TodoRepository) {
    this.repository = repositoryIn;
  }
  public execute(updateDto: UpdateTodoDto): Promise<TodoEntity> {
    return this.repository.updateById(updateDto);
  }
}
