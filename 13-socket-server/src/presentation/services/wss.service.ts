import { Server } from "node:http";
import { WebSocket, WebSocketServer } from "ws";

interface Options {
  server: Server;
  path?: string;
}

export class WssService {
  private static _instance: WssService;
  private wss: WebSocketServer;

  private constructor(options: Options) {
    const { server, path = "/ws" } = options;
    this.wss = new WebSocketServer({ server, path });
  }

  public static get instance(): WssService {
    if (!WssService._instance) {
      throw new Error("WssService not initialized");
    }
    return WssService._instance;
  }

  public static initWss(options: Options) {
    WssService._instance = new WssService(options);
  }

  public start() {
    this.wss.on("connection", (ws: WebSocket) => {
      console.debug("Client Connected");
      ws.on("error", console.error);
      ws.on("close", () => {
        console.debug("Client Disconnected");
      });
    });
  }
}
