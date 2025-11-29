import http from "node:http";
import * as fs from "node:fs";

const server = http.createServer(
  (req: http.IncomingMessage, res: http.ServerResponse) => {
    console.debug(req.url);
    if (req.url === "/") {
      const htmlFile: string = fs.readFileSync("./public/index.html", "utf-8");
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(htmlFile);
      return;
    }

    if (req.url?.includes(".js")) {
      res.writeHead(200, { "Content-Type": "application/javascript" });
    } else if (req.url?.includes(".css")) {
      res.writeHead(200, { "Content-Type": "text/css" });
    } else {
      res.writeHead(404, { "Content-Type": "text/html" });
    }

    const responseContent: string = fs.readFileSync(
      `./public${req.url}`,
      "utf-8"
    );
    res.end(responseContent);
  }
);

server.listen(3000, () => {
  console.debug("Server running on port 3000");
});
