import {
  createServer,
  IncomingMessage,
  Server,
  ServerResponse,
} from "node:http";
import { EnvVarAdapter } from "./config";
import { AppRoutes, ServerApp, WssService } from "./presentation";

(async () => {
  main();
})();

async function main() {
  const envs = EnvVarAdapter.getEnvs();
  const server: ServerApp = new ServerApp({
    port: envs.PORT,
    public_path: envs.PUBLIC_PATH,
    routes: AppRoutes.routes,
  });

  const httpServer: Server<typeof IncomingMessage, typeof ServerResponse> =
    createServer(server.app);

  WssService.initWss({
    server: httpServer,
  });

  httpServer.listen(envs.PORT, () => {
    console.log(`Server running on port ${envs.PORT}`);
  });
}
