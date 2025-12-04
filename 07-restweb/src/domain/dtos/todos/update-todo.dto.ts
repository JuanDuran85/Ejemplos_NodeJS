export class UpdateTodoDto {
  public readonly task?: string;
  public readonly completed?: boolean;
  public readonly completedAt?: Date;
  public readonly id: number;

  private constructor(
    taskIn: string,
    completedIn: boolean,
    completedAtIn: Date,
    idIn: number
  ) {
    this.id = idIn;
    this.task = taskIn;
    this.completed = completedIn;
    this.completedAt = completedAtIn;
  }

  public get values(): {
    [key: string]: unknown;
  } {
    const returnObject: { [key: string]: unknown } = {};
    if (this.task) returnObject.task = this.task;
    if (this.completed) returnObject.completed = this.completed;
    if (this.completedAt) returnObject.completedAt = this.completedAt;

    return returnObject;
  }

  public static updateTodo(props: {
    [key: string]: unknown;
  }): [string?, UpdateTodoDto?] {
    const { task, completed = false, completedAt = null, id } = props;
    let newCompletedAt: unknown = completedAt;
    let newCompleted: unknown = completed;

    if (!id || typeof id !== "number" || Number.isNaN(id)) {
      return ["Id is required and must be a number"];
    }
    
    if (completedAt) {
      newCompletedAt = new Date(completedAt as string);
      if (!(newCompletedAt instanceof Date)) {
        return ["CompletedAt must be a Date"];
      }
    }

    newCompleted = completedAt ? true : completed;

    return [
      undefined,
      new UpdateTodoDto(
        task as string,
        newCompleted as boolean,
        newCompletedAt as Date,
        id
      ),
    ];
  }
}
