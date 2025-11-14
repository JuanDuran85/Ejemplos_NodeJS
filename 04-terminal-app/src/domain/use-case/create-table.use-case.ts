export interface CreateTableUseCase {
  execute: (options: CreateTableOptions) => string;
}

export interface CreateTableOptions {
  base: number;
  limit?: number;
}

export class CreateTable {
  public execute({ base, limit = 10 }: CreateTableOptions): string {
    let dataToSave: string = ``;

    for (let i = 1; i <= limit; i++) {
      dataToSave += `${base} * ${i} = ${base * i} \n`;
    }

    return dataToSave;
  }
}
