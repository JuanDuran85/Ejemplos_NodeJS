import jwt from "jsonwebtoken";

export class JwtGeneratorAdapter {
  constructor(private readonly totalEnvs: { [key: string]: string | number }) {}

  public async generateToken(
    payload: any,
    duration: number | `${number}${"s" | "m" | "h" | "d"}` = "2h"
  ) {
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

  public async validateToken(token: string) {
    return;
  }
}
