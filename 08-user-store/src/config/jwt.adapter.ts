import jwt from "jsonwebtoken";

export class JwtGeneratorAdapter {
  constructor(private readonly jwtSeed: string) {}

  public async generateToken(
    payload: any,
    duration: number | `${number}${"s" | "m" | "h" | "d"}` = "2h"
  ) {
    return new Promise((resolve) => {
      jwt.sign(payload, this.jwtSeed, { expiresIn: duration }, (err, token) => {
        if (err) return resolve(null);
        resolve(token);
      });
    });
  }

  public async validateToken(token: string) {
    return;
  }
}
