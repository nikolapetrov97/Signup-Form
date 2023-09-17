import express, { Application } from "express";
import mongoose from "mongoose";
import { config } from "./src/config/config";
import * as WebSocket from "ws";
import Account from "./src/models/account";

const app: Application = express();
const wss = new WebSocket.WebSocketServer({ noServer: true });
mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => console.log("connected"))
  .catch((e) => console.log(e));

const port = process.env.PORT || 443;

app.use(express.json());

wss.on("connection", (ws) => {
  console.log("WebSocket connected");

  // Send all accounts to the newly connected WebSocket client
  Account.find().then((accounts) => {
    ws.send(JSON.stringify({ type: "accounts", data: accounts }));
  });

  ws.on("message", async (message: string) => {
    const parsedMessage = JSON.parse(message);

    if (parsedMessage.type === "createAccount") {
      try {
        const newAccount = new Account(parsedMessage.data);
        await newAccount.save();
        const accounts = await Account.find();
        wss.clients.forEach((client) => {
          client.send(
            JSON.stringify({ type: "createAccountSuccess", data: accounts })
          );
        });
      } catch (error) {
        ws.send(
          JSON.stringify({
            type: "error",
            message: "Failed to create an account",
          })
        );
      }
    }
  });

  ws.on("close", () => {
    console.log("WebSocket disconnected");
  });
});

const server = app.listen(port, () => {
  console.log(`Server is up at http://localhost:${port}`);
});
server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (socket) => {
    wss.emit("connection", socket, request);
  });
});
