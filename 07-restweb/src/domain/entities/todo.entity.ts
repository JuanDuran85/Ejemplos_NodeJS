export class TodoEntity {
  public id: number;
  public task: string;
  public completedAt?: Date | null;
  public completed?: boolean;

  constructor(
    idIn: number,
    taskIn: string,
    completedAtIn?: Date | null,
    completedIn?: boolean
  ) {
    this.id = idIn;
    this.task = taskIn;
    this.completedAt = completedAtIn ?? null;
    this.completed = completedIn ?? !!completedAtIn;
  }

  get isCompleted(): boolean {
    return !!this.completedAt;
  }

  public static fromObject(object: { [key: string]: unknown }): TodoEntity {
    const { id, task, completedAt, completed } = object;

    if (!id) throw new Error("Id is required");
    if (!task) throw new Error("Task is required");

    let newCompletedAt: Date | null = null;
    newCompletedAt = completedAt ? new Date(completedAt as string) : null;
    if (Number.isNaN(newCompletedAt?.getTime() as number))
      throw new Error("CompletedAt is not a valid date");

    return new TodoEntity(
      id as number,
      task as string,
      newCompletedAt,
      completed as boolean
    );
  }
}
