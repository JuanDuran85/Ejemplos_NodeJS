import { compareSync, genSaltSync, hashSync } from "bcryptjs";

export class BcryptAdapter {
  public static hash(password: string): string {
    const salt: string = genSaltSync(10);
    return hashSync(password, salt);
  }

  public static compare(password: string, hashed: string): boolean {
    return compareSync(password, hashed);
  }
}
