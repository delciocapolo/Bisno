import { ROOMS } from "./rooms";
import { Server } from "socket.io";
import Logger from "../pino/logger";
import { server } from "../express/server";
import { computeUserIdFromHeaders } from "./utils";
import { bisnoMixeiroAcceptEvent } from "./listeners/bisno-mixeiro-accept.event";

const io = new Server(server);
const socketLogger = Logger.publishTo({ context: "socket" });

// ============================================================

io.on("connection", async (socket) => {
  const userId = computeUserIdFromHeaders(socket.handshake.auth);
  await socket.join(userId);

  socket.on(ROOMS.bisno.mixeiro.accept, bisnoMixeiroAcceptEvent);

  io.to(userId).emit("foo", "Testando...");
});

export { io, socketLogger };
