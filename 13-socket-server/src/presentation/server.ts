import compression from "compression";
import express, { Router } from "express";
import { IncomingMessage, Server, ServerResponse } from "node:http";
import path from "node:path";

interface Options {
  port: number;
  routes: Router;
  public_path?: string;
}

export class ServerApp {
  public readonly app: express.Express = express();
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;
  private serverListener?: Server<
    typeof IncomingMessage,
    typeof ServerResponse
  >;

  constructor(options: Options) {
    const { port, public_path = "public", routes } = options;
    this.port = port;
    this.routes = routes;
    this.publicPath = public_path;
    this.configurations();
  }

  private configurations() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(compression());

    this.app.use(express.static(this.publicPath));

    this.app.use(this.routes);
    // /{*any}
    this.app.get(/^\/(?!api).*/, (req, res) => {
      const indexPath: string = path.join(
        __dirname,
        `../../${this.publicPath}/index.html`
      );
      res.sendFile(indexPath);
    });
  }

  public async start() {
    this.serverListener = this.app.listen(this.port, () => {
      console.debug(`Server running on port ${this.port}`);
    });
  }
}
