import { Server } from "socket.io";
import Logger from "../pino/logger";
import { server } from "../express/server";
import { computeUserIdFromHeaders } from "./utils";

const appSocket = new Server(server, {
  cors: { origin: "*" },
});
const socketLogger = Logger.publishTo({
  context: "socket",
});

// ============================================================

appSocket.on("connection", async (socket) => {
  const userId = computeUserIdFromHeaders(socket.handshake.auth);
  await socket.join(userId);
});

export { appSocket, socketLogger };
