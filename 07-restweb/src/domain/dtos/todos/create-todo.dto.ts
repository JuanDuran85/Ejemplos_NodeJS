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
    const { task = "", completed = false, completedAt = null } = props;

    if (typeof task !== "string" || task.trim().length === 0) {
      return ["Task is required and must be a non empty string"];
    }
    if (typeof completed !== "boolean") {
      return ["Completed must be a boolean"];
    }
    const completedAtDate: Date | null = completedAt
      ? new Date(completedAt as string)
      : null;
    if (Number.isNaN(completedAtDate?.getTime())) {
      return ["CompletedAt must be a Date"];
    }

    const finalCompleted = completedAtDate ? true : completed;
    return [
      undefined,
      new CreateTodoDto(task, finalCompleted, completedAtDate),
    ];
  }
}
