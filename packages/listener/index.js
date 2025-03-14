#!/usr/bin/env node
/* global process */
import { program } from "commander";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { version } = JSON.parse(
  readFileSync(join(__dirname, "package.json"), "utf8")
);

program
  .name("listener")
  .version(version)
  .description(
    "A simple tool to proxy HTTP requests to WebSocket clients. Intended for proxying ZPL print requests to previewers."
  )
  .option("-p, --port <number>", "Specify the HTTP port number", parseInt)
  .option(
    "-w, --wsPort <number>",
    "Specify the WebSockets port number",
    parseInt
  )
  .parse(process.argv);

const options = program.opts();

import http from "http";
import { WebSocketServer } from "ws";
import { v4 } from "uuid";

const port = options.port || 3000;
const wsPort = options.wsPort || 8080;
const maxBodySize = 1024 * 1024; // 1MB limit

const MAX_CLIENTS = 100;
const clients = new Set();

function startServer(server, port, type, retries = 3) {
  return new Promise((resolve, reject) => {
    server.listen(port, "127.0.0.1");

    server.on("listening", () => {
      console.log(
        `  ➜  ${type} server: \x1b[1m${type === "HTTP" ? "http" : "ws"}://${server.address().address}:${server.address().port}\x1b[0m`
      );
      resolve(server);
    });

    server.on("error", (error) => {
      if (error.code === "EADDRINUSE") {
        console.log(`Port ${port} is in use for ${type} server`);
        if (retries > 0) {
          console.log(`Retrying with port ${port + 1}...`);
          server.close();
          startServer(server, port + 1, type, retries - 1)
            .then(resolve)
            .catch(reject);
        } else {
          reject(
            new Error(`Could not find an available port for ${type} server`)
          );
        }
      } else {
        reject(error);
      }
    });
  });
}

const wss = new WebSocketServer({
  noServer: true,
  clientTracking: true,
});

const wsServer = http.createServer();

wsServer.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});

wss.on("connection", (ws) => {
  const id = v4();

  if (wss.clients.size > MAX_CLIENTS) {
    console.log(`Maximum number of connections reached: ${MAX_CLIENTS}`);
    ws.close(1013, "Maximum number of connections reached");
    return;
  }

  console.log("Client connected:", id);
  ws.id = id;
  clients.add(ws);

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
    clients.delete(ws);
  });

  ws.on("close", () => {
    console.log("Client disconnected:", id);
    clients.delete(ws);
  });
});

wss.on("error", (error) => {
  console.error("WebSocket server error:", error);
});

function broadcast(message) {
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      console.log("Broadcasting message to client:", client.id);
      client.send(message);
    }
  });
  return clients.size;
}

const server = http.createServer((req, res) => {
  console.log("HTTP request received:", req.method, req.url);
  if (req.method !== "POST") {
    res.writeHead(405, { "Content-Type": "text/plain" });
    res.end("Method Not Allowed");
    return;
  }

  if (req.url !== "/") {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
    return;
  }

  if (!req.headers["content-type"]?.includes("text/plain")) {
    res.writeHead(415, { "Content-Type": "text/plain" });
    res.end("Unsupported Media Type");
    return;
  }

  let body = "";
  let bodySize = 0;

  req.on("data", (chunk) => {
    bodySize += chunk.length;
    if (bodySize > maxBodySize) {
      res.writeHead(413, { "Content-Type": "text/plain" });
      res.end("Payload Too Large");
      req.destroy();
      return;
    }
    body += chunk;
  });

  req.on("end", () => {
    const clients = broadcast(body);
    console.log(`Message sent to ${clients} WebSocket client(s)`);
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Message sent to WebSocket clients");
  });
});

server.on("error", (error) => {
  console.error("HTTP server error:", error);
});

console.log(`\x1b[36m\x1b[1m
ZPL×JS Listener v${version}\x1b[0m
\x1b[2mproxy ZPL print requests to WebSocket clients\x1b[0m
`);

Promise.all([
  startServer(server, port, "HTTP"),
  startServer(wsServer, wsPort, "WebSocket"),
])
  .then(() => {
    console.log("\x1b[2mAll servers started successfully\x1b[0m\n");
  })
  .catch((error) => {
    console.error("Failed to start servers:", error);
    process.exit(1);
  });

function shutdown() {
  console.log("Performing graceful shutdown...");

  clients.forEach((client) => {
    if (client.close) client.close();
  });

  wss.close(() => {
    console.log("WebSocket server closed.");
  });

  server.close(() => {
    console.log("HTTP server closed.");
    process.exit(0);
  });
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
