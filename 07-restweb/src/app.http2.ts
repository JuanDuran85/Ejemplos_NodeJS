import http2 from "node:http2";
import * as fs from "node:fs";

const server: http2.Http2SecureServer = http2.createSecureServer(
  {
    key: fs.readFileSync("./keys/server.key"),
    cert: fs.readFileSync("./keys/server.crt"),
  },
  (req: http2.Http2ServerRequest, res: http2.Http2ServerResponse) => {
    console.debug(req.url);

    try {
      if (req.url === "/") {
        const htmlFile: string = fs.readFileSync(
          "./public/index.html",
          "utf-8"
        );
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(htmlFile);
        return;
      }
      const filePath: string = `./public${req.url}`;
      const responseContent: Buffer = fs.readFileSync(filePath);
      let contentType: string = "text/plain";
      if (req.url?.endsWith(".js")) {
        contentType = "application/javascript";
      } else if (req.url?.endsWith(".css")) {
        contentType = "text/css";
      } else if (req.url?.endsWith(".html")) {
        contentType = "text/html";
      }
      res.writeHead(200, { "Content-Type": contentType });
      res.end(responseContent);
    } catch (error) {
      console.error("Error: ", String(error));
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("404 Not Found");
    }
  }
);

server.listen(3000, () => {
  console.debug("Server running on port 3000 with http2");
});
