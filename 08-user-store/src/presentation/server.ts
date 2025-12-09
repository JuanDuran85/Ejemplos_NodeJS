import express, { Router } from "express";
import fileUpload from "express-fileupload";
import path from "node:path";
import compression from "compression";
import { IncomingMessage, Server, ServerResponse } from "node:http";

interface Options {
  port: number;
  routes: Router;
  public_path?: string;
}

export class ServerApp {
  public readonly app: express.Express = express();
  private readonly port: number;
  private readonly routes: Router;
  private readonly publicPath: string;
  private serverListener?: Server<
    typeof IncomingMessage,
    typeof ServerResponse
  >;

  constructor(options: Options) {
    const { port, public_path = "public", routes } = options;
    this.port = port;
    this.routes = routes;
    this.publicPath = public_path;
  }

  public async start() {
    console.debug("server running");

    //* Middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(compression());
    this.app.use(
      fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
      })
    );

    //* Public Folder
    this.app.use(express.static(this.publicPath));

    //* ROUTES
    this.app.use(this.routes);

    //*SPA
    this.app.get("/{*any}", (req, res) => {
      const indexPath: string = path.join(
        __dirname,
        `../../${this.publicPath}/index.html`
      );
      res.sendFile(indexPath);
    });

    this.serverListener = this.app.listen(this.port, () => {
      console.debug(`Server is listening on port ${this.port}`);
    });
  }

  public close() {
    this.serverListener?.close();
  }
}
