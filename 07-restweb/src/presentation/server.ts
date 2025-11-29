import express from "express";
import path from "node:path";

interface Options {
  port: number;
  public_path?: string;
}

export class ServerApp {
  private readonly app: express.Express = express();
  private readonly port: number;
  private readonly publicPath: string;

  constructor(options: Options) {
    const { port, public_path = "public" } = options;
    this.port = port;
    this.publicPath = public_path;
  }
  public async start() {
    console.debug("server running");

    // middlewares
    // public folder
    this.app.use(express.static(this.publicPath));
    this.app.get("/{*any}", (req, res) => {
      const indexPath: string = path.join(
        __dirname,
        `../../${this.publicPath}/index.html`
      );
      res.sendFile(indexPath);
    });

    this.app.listen(this.port, () => {
      console.debug(`Server is listening on port ${this.port}`);
    });
  }
}
