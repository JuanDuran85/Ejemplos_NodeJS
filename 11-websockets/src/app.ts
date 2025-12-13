import { IncomingMessage } from "node:http";
import WebSocket, { WebSocketServer } from "ws";

const port: number = 3000;
const wss: WebSocket.Server<typeof WebSocket, typeof IncomingMessage> =
  new WebSocketServer({
    port,
    perMessageDeflate: {
      zlibDeflateOptions: {
        // See zlib defaults.
        chunkSize: 1024,
        memLevel: 7,
        level: 3,
      },
      zlibInflateOptions: {
        chunkSize: 10 * 1024,
      },
      clientNoContextTakeover: true,
      serverNoContextTakeover: true,
      serverMaxWindowBits: 10,
      concurrencyLimit: 10,
      threshold: 1024,
    },
  });

wss.on("connection", function connection(ws) {
  console.debug("Client connected");
  ws.on("error...", console.error);

  ws.on("message", function message(data) {
    console.log("received from client: %s", data);
    const payload = JSON.stringify({
      type: "custom-message",
      payload: data.toString(),
    });
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(payload, { binary: false });
      }
    });
  });

  ws.on("close", () => {
    console.debug("Client disconnected");
  });
});

console.debug(`server running on port ${port}`);
