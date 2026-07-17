import { Server } from "socket.io";
import { server } from "../express/server";
import { computeUserIdFromHeaders } from "./utils";
import { ROOMS } from "./rooms";
import { bisnoMixeiroAcceptEvent } from "./listeners/bisno-mixeiro-accept.event";
import Logger from "../pino/logger";

const io = new Server(server);
const socketLogger = Logger.publishTo({ context: "socket" });

io.on("connection", async (socket) => {
  const userId = computeUserIdFromHeaders(socket.handshake.auth);
  await socket.join(userId);

  // listeners
  socket.on(ROOMS.bisno.mixeiro.accept, bisnoMixeiroAcceptEvent);

  // emitters
  io.to(userId).emit("foo", "Testando...");
});

export { io, socketLogger };
