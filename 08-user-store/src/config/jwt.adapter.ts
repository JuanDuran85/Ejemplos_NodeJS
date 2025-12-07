import jwt from "jsonwebtoken";

export class JwtGeneratorAdapter {
  constructor(
    private readonly totalEnvs: { [key: string]: string | number | boolean }
  ) {}

  public async generateToken(
    payload: any,
    duration: number | `${number}${"s" | "m" | "h" | "d"}` = "2h"
  ): Promise<unknown> {
    return new Promise((resolve) => {
      jwt.sign(
        payload,
        this.totalEnvs["JWT_SEED"] as string,
        { expiresIn: duration },
        (err, token) => {
          if (err) return resolve(null);
          resolve(token);
        }
      );
    });
  }

  public async validateToken<T>(token: string): Promise<T | null > {
    return new Promise((resolve) => {
      jwt.verify(
        token,
        this.totalEnvs["JWT_SEED"] as string,
        (err, decoded) => {
          if (err) return resolve(null);
          resolve(decoded as T);
        }
      );
    });
  }
}
