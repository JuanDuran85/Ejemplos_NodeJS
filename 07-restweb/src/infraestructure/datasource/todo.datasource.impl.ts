import { prisma } from "../../data";
import {
  CreateTodoDto,
  TodoDatasource,
  TodoEntity,
  UpdateTodoDto,
} from "../../domain";

export class TodoDatasourceImpl implements TodoDatasource {
  public async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const newTodo = await prisma.todo.create({
      data: createTodoDto,
    });
    return TodoEntity.fromObject(newTodo);
  }

  public async getAll(): Promise<TodoEntity[]> {
    const todosFound = await prisma.todo.findMany();

    return todosFound.map((todo) => TodoEntity.fromObject(todo));
  }

  public async findById(id: number): Promise<TodoEntity> {
    const todoFound = await prisma.todo.findUnique({
      where: { id: Number(id) },
    });
    if (!todoFound) throw new Error(`Todo with id ${id} not found`);
    return TodoEntity.fromObject(todoFound);
  }

  public async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    await this.findById(updateTodoDto.id);

    const todoUpdated = await prisma.todo.update({
      where: { id: Number(updateTodoDto.id) },
      data: updateTodoDto,
    });
    return TodoEntity.fromObject(todoUpdated);
  }

  public async deleteById(id: number): Promise<TodoEntity> {
    await this.findById(id);

    const todoDelete = await prisma.todo.delete({
      where: { id: Number(id) },
    });
    return TodoEntity.fromObject(todoDelete);
  }
}
