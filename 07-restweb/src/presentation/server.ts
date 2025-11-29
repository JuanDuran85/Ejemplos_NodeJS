import express from "express";

export class ServerApp {
  private app: express.Express = express();
  public async start() {
    console.debug("server running");

    // middlewares
    // public folder
    this.app.use(express.static("public"))

    this.app.listen(3000, () => {
      console.debug("Server is listening on port 3000");
    });
  }
}
