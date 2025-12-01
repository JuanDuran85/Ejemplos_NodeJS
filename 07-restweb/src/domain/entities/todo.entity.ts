export class TodoEntity {
  public id: number;
  public task: string;
  public completedAt?: Date | null;

  constructor(idIn: number, taskIn: string, completedAtIn?: Date | null) {
    this.id = idIn;
    this.task = taskIn;
    this.completedAt = completedAtIn ?? null;
  }

  get isCompleted(): boolean {
    return !!this.completedAt;
  }
}
