import { Server } from "socket.io";
import { io as SocketClient } from "socket.io-client";
import { server } from "../express/server";
import { computeUserIdFromHeaders } from "./utils";
import { ROOMS } from "./rooms";
import { bisnoMixeiroAcceptEvent } from "./listeners/bisno-mixeiro-accept.event";
import Logger from "../pino/logger";
import env from "@src/config/env";

const io = new Server(server);
const evolutionSocket = SocketClient(env("SERVER_URL"), {
  auth: { apiKey: env("AUTHENTICATION_API_KEY") },
  transports: ["websocket", "polling"],
  reconnection: true,
});
const socketLogger = Logger.publishTo({ context: "socket" });

// ============================================================

io.on("connection", async (socket) => {
  const userId = computeUserIdFromHeaders(socket.handshake.auth);
  await socket.join(userId);

  socket.on(ROOMS.bisno.mixeiro.accept, bisnoMixeiroAcceptEvent);

  io.to(userId).emit("foo", "Testando...");
});

evolutionSocket.on("connect", () => {
  socketLogger.info("✅ Connected to Evolution API");
});

evolutionSocket.on("connect_error", (err) => {
  socketLogger.error("Evolution connection error:", err.message);
});

export { io, socketLogger, evolutionSocket };
