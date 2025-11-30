export class CreateTodoDto {
  public readonly task: string;
  public readonly completed: boolean;
  public readonly completedAt: Date | null;
  //id: number;

  private constructor(
    taskIn: string,
    completedIn: boolean,
    completedAtIn: Date | null
  ) {
    this.task = taskIn;
    this.completed = completedIn;
    this.completedAt = completedAtIn;
  }

  public static createTodo(props: {
    [key: string]: unknown;
  }): [string?, CreateTodoDto?] {
    const { task, completed, completedAt = null } = props;

    if (typeof task !== "string" || task.trim().length === 0) {
      return ["Task is required and must be a non empty string"];
    }
    if (typeof completed !== "boolean") {
      return ["Completed must be a boolean"];
    }
    if (completedAt !== null && !(completedAt instanceof Date)) {
      return ["CompletedAt must be a Date"];
    }
    return [undefined, new CreateTodoDto(task, completed, completedAt)];
  }
}
