import { NextFunction, Request, Response } from "express";
import { EnvVarAdapter } from "../../config";

export class GitHubSha256Middleware {
  private static readonly encoder: TextEncoder = new TextEncoder();

  public static async verifyGithubSignature(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const xHubSignature: string = String(req.headers["x-hub-signature-256"]);
    const body: string = JSON.stringify(req.body) || "";
    const secret: string = EnvVarAdapter.getEnvs().SECRET_TOKEN;
    const isValid: boolean = await GitHubSha256Middleware.verifySignature(
      secret,
      xHubSignature,
      body
    );

    if (isValid) {
      next();
    } else {
      res.status(401).json({ error: " Invalid Signature" });
    }
  }

  private static async verifySignature(
    secret: string,
    header: string,
    payload: string
  ): Promise<boolean> {
    try {
      let parts: string[] = header.split("=");
      let sigHex: string = parts[1];

      let algorithm = { name: "HMAC", hash: { name: "SHA-256" } };

      let keyBytes: Uint8Array<ArrayBuffer> =
        GitHubSha256Middleware.encoder.encode(secret);
      let extractable = false;
      let key: CryptoKey = await crypto.subtle.importKey(
        "raw",
        keyBytes,
        algorithm,
        extractable,
        ["sign", "verify"]
      );

      let sigBytes: Uint8Array<ArrayBuffer> = this.hexToBytes(sigHex);
      let dataBytes: Uint8Array<ArrayBuffer> =
        GitHubSha256Middleware.encoder.encode(payload);
      let equal: boolean = await crypto.subtle.verify(
        algorithm.name,
        key,
        sigBytes,
        dataBytes
      );

      return equal;
    } catch (error) {
      console.error(String(error));
      return false;
    }
  }

  private static hexToBytes(hex: string): Uint8Array<ArrayBuffer> {
    let len: number = hex.length / 2;
    let bytes: Uint8Array<ArrayBuffer> = new Uint8Array(len);

    let index = 0;
    for (let i = 0; i < hex.length; i += 2) {
      let c: string = hex.slice(i, i + 2);
      let b: number = Number.parseInt(c, 16);
      bytes[index] = b;
      index += 1;
    }

    return bytes;
  }
}
